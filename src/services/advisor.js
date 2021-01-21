import processScore from './processor.js';

export function scoreMessage(score) {
  if (score === 'ineligible') {
    return score;
  }

  if (score >= 3) {
    return "responsible";
  }

  if (score === 1 || score === 2) {
    return "regular";
  }

  return "economic";
}

export function mapScore(processedScore) {
  const mappedScore = { ...processedScore };

  for (const insurance in mappedScore) {
    mappedScore[insurance] = scoreMessage(mappedScore[insurance])
  }

  return mappedScore;
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

  const processedScore = processScore(user, baseOutput);

  return mapScore(processedScore);
}

export default {
  advise
};