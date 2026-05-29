import { SCORE_PER_CORRECT, COMBO_BONUS_INTERVAL, COMBO_BONUS_SCORE } from './types';
import type { Problem, ProblemResult } from './types';

export interface SubmitResult {
  isCorrect: boolean;
  matchedProblems: Problem[];
  scoreGained: number;
  newCombo: number;
  bonusTriggered: boolean;
}

/**
 * 입력값과 활성 문제를 비교하여 매칭 결과를 반환한다.
 * 같은 답인 문제가 여러 개일 경우 모두 제거한다.
 */
export function evaluateAnswer(
  inputValue: string,
  activeProblems: Problem[],
  currentCombo: number
): SubmitResult {
  const numericAnswer = parseInt(inputValue, 10);

  if (isNaN(numericAnswer)) {
    return {
      isCorrect: false,
      matchedProblems: [],
      scoreGained: 0,
      newCombo: 0,
      bonusTriggered: false,
    };
  }

  const matched = activeProblems.filter(p => p.answer === numericAnswer);

  if (matched.length === 0) {
    return {
      isCorrect: false,
      matchedProblems: [],
      scoreGained: 0,
      newCombo: 0,
      bonusTriggered: false,
    };
  }

  // 점수 계산
  let scoreGained = matched.length * SCORE_PER_CORRECT;
  let newCombo = currentCombo + matched.length;
  let bonusTriggered = false;

  // 콤보 보너스: 5의 배수를 넘을 때마다 보너스
  const prevBonusCount = Math.floor(currentCombo / COMBO_BONUS_INTERVAL);
  const newBonusCount = Math.floor(newCombo / COMBO_BONUS_INTERVAL);
  const bonusTimes = newBonusCount - prevBonusCount;

  if (bonusTimes > 0) {
    scoreGained += bonusTimes * COMBO_BONUS_SCORE;
    bonusTriggered = true;
  }

  return {
    isCorrect: true,
    matchedProblems: matched,
    scoreGained,
    newCombo,
    bonusTriggered,
  };
}

/**
 * 문제 결과 기록 생성
 */
export function createProblemResult(
  problem: Problem,
  userAnswer: number | null,
  result: 'correct' | 'wrong' | 'missed',
  responseTimeMs?: number
): ProblemResult {
  return {
    problemId: problem.id,
    expression: problem.expression,
    correctAnswer: problem.answer,
    userAnswer,
    result,
    tags: problem.tags,
    responseTimeMs,
  };
}

/**
 * 오답률 계산
 */
export function calcWrongRate(correctCount: number, wrongCount: number): number {
  const total = correctCount + wrongCount;
  if (total === 0) return 0;
  return wrongCount / total;
}

/**
 * 실패율 계산 (놓친 문제 포함)
 */
export function calcFailureRate(
  correctCount: number,
  wrongCount: number,
  missedCount: number
): number {
  const total = correctCount + wrongCount + missedCount;
  if (total === 0) return 0;
  return (wrongCount + missedCount) / total;
}

/**
 * 취약 태그 분석
 */
export function analyzeWeakTags(
  results: ProblemResult[]
): { tag: string; wrongCount: number; total: number; rate: number }[] {
  const tagStats: Record<string, { wrong: number; total: number }> = {};

  for (const r of results) {
    for (const tag of r.tags) {
      if (!tagStats[tag]) tagStats[tag] = { wrong: 0, total: 0 };
      tagStats[tag].total++;
      if (r.result === 'wrong' || r.result === 'missed') {
        tagStats[tag].wrong++;
      }
    }
  }

  return Object.entries(tagStats)
    .map(([tag, stats]) => ({
      tag,
      wrongCount: stats.wrong,
      total: stats.total,
      rate: stats.total > 0 ? stats.wrong / stats.total : 0,
    }))
    .sort((a, b) => b.rate - a.rate);
}
