import Processor from './processor.js';

export function scoreMapper(score) {
  if (score >= 2) {
    return "responsible";
  }

  if (score === 1 || score === 2) {
    return "regular";
  }

  return "economic";
}

export function advise(user) {
  const { risk_questions } = user;

  const baseScore = risk_questions.reduce((acc, q) => acc + q, 0);

  const baseOutput = {
    auto: baseScore,
    disability: baseScore,
    home: baseScore,
    life: baseScore
  };

  return new Processor(user, baseOutput)
    .processPossessions()
    .processAge()
    .processIncome()
    .processHouse()
    .processDependents()
    .processMarriage()
    .processVehicle()
    .output;
}

export default {
  advise
};