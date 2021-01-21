export class Processor {
  constructor(user, baseInsuranceScores) {
    this.user = user;
    this.insuranceRiskScores = baseInsuranceScores;
  }

  get output() {
    return this.insuranceRiskScores;
  }

  processPossessions() {
    const possessionInsurancePairs = [
      ["income", "disability"],
      ["vehicle", "auto"],
      ["house", "home"]
    ];

    for (const [possession, insurance] of possessionInsurancePairs) {
      if (!this.user[possession]) {
        this.insuranceRiskScores[insurance] = "ineligible";
      }
    }

    return this;
  }

  processAge() {
    const { age } = this.user;

    if (age > 60) {
      this.insuranceRiskScores.disability = "ineligible";
      this.insuranceRiskScores.life = "ineligible";
    }
    
    if (age >= 30 && age <= 40) {
      this.addRiskScoreToAll(-1);
    }
    
    if (age < 30) {
      this.addRiskScoreToAll(-2);
    }

    return this;
  }

  processIncome() {
    if (this.user.income > 200000) {
      this.addRiskScoreToAll(-1);
    }

    return this;
  }

  processHouse() {
    const { house: { ownership_status: ownership }} = this.user;
    if (ownership === "mortgaged") {
      this.addRiskScore("home", 1);
      this.addRiskScore("disability", 1);
    }

    return this;
  }
  
  processDependents() {
    if (this.user.dependents) {
      this.addRiskScore("life", 1);
      this.addRiskScore("disability", 1);
    }

    return this;
  }

  processMarriage() {
    if (this.user.marital_status === "married") {
      this.addRiskScore("life", 1);
      this.addRiskScore("disability", -1);
    }

    return this;
  }

  processVehicle() {
    const now = new Date();
    const carDate = new Date(this.user.vehicle.year);
    const epochYear = 1970;

    const yearsPast = new Date(now - carDate).getFullYear() - epochYear;

    if (yearsPast < 5) {
      this.addRiskScore("vehicle", 1);
    }

    return this;
  }

  addRiskScore(insurance, score) {
    if (this.insuranceRiskScores[insurance] !== "ineligible") {
      this.insuranceRiskScores[insurance] += score;
    }
  }

  addRiskScoreToAll(score) {
    for (const key of Object.keys(this.insuranceRiskScores)) {
      this.addRiskScore(key, score);
    }
  }

}

export function processScore(user, baseInsuranceScores) {
  return new Processor(user, baseInsuranceScores)
    .processPossessions()
    .processAge()
    .processIncome()
    .processHouse()
    .processDependents()
    .processMarriage()
    .processVehicle()
    .output;
}

export default processScore;
