// 연산자 타입
export type Operator = '+' | '-' | '×' | '÷';

// 문제 태그
export type ProblemTag =
  | 'addition'
  | 'subtraction'
  | 'multiplication'
  | 'division'
  | 'mixed'
  | 'one_digit'
  | 'two_digit'
  | 'three_digit'
  | 'carry'
  | 'borrow'
  | 'no_remainder'
  | 'multiplication_table'
  | 'large_number'
  | 'order_of_operations';

// 문제 객체
export interface Problem {
  id: string;
  expression: string;
  answer: number;
  operator: Operator;
  x: number;
  y: number;
  fallSpeed: number;
  tags: ProblemTag[];
  levelId: string;
  createdAt: number;
}

// 게임 상태
export type GameStatus = 'ready' | 'playing' | 'paused' | 'gameOver' | 'result';

export interface GameState {
  status: GameStatus;
  modeId: string;
  levelId: string;
  score: number;
  lives: number;
  combo: number;
  maxCombo: number;
  currentInput: string;
  activeProblems: Problem[];
  correctCount: number;
  wrongCount: number;
  missedCount: number;
  answeredProblems: ProblemResult[];
  missedProblems: Problem[];
}

// 문제 결과 기록
export interface ProblemResult {
  problemId: string;
  expression: string;
  correctAnswer: number;
  userAnswer: number | null;
  result: 'correct' | 'wrong' | 'missed';
  tags: ProblemTag[];
  responseTimeMs?: number;
}

// 사운드 설정
export interface SoundSettings {
  enabled: boolean;
  volume: number;
}

// 화면 타입
export type ScreenType =
  | 'start'
  | 'modeSelect'
  | 'levelSelect'
  | 'game'
  | 'result'
  | 'settings';

// 모드 정의
export interface GameMode {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  levelIds: string[];
}

// 레벨 정의
export interface GameLevel {
  id: string;
  name: string;
  modeId: string;
  operator: Operator | 'mixed';
  generateProblem: () => { expression: string; answer: number; operator: Operator; tags: ProblemTag[] };
  fallSpeed: number;
  spawnInterval: number;
  maxActiveProblems: number;
}

// 난이도 변수
export interface DifficultyConfig {
  fallSpeed: number;
  spawnInterval: number;
  maxActiveProblems: number;
  inputDigitLimit: number;
  lives: number;
}

// 점수 상수
export const SCORE_PER_CORRECT = 10;
export const COMBO_BONUS_INTERVAL = 5;
export const COMBO_BONUS_SCORE = 20;
export const DEFAULT_LIVES = 5;
export const DEFAULT_INPUT_DIGIT_LIMIT = 5;
