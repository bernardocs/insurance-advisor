import { scoreMessage } from '../../src/services/advisor.js';

describe('scoreMessage', () => {
  test.each`
    score            | message
    ${'ineligible'}  | ${'ineligible'}
    ${10}            | ${'responsible'}
    ${3}             | ${'responsible'}
    ${2}             | ${'regular'}
    ${1}             | ${'regular'}
    ${0}             | ${'economic'}
    ${-10}           | ${'economic'}
  `('map score `$score` to `$message`', ({ score, message }) => {
    expect(scoreMessage(score)).toBe(message)
  });
});
