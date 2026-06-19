// 연산자 타입
export type Operator = '+' | '-' | '×' | '÷' | 'mixed';

// 문제 태그 — v0.2: string으로 확장 (커리큘럼 태그 수용)
export type ProblemTag = string;

// 문제 종류 — v0.2
export type ProblemKind = 'normal' | 'blank';

// 학년 그룹 — v0.3
export type GradeId = 'G1' | 'G2' | 'G3' | 'G4';

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

  // v0.2 커리큘럼 필드
  problemKind?: ProblemKind;
  gradeId?: GradeId;
  chapterId?: string;
  unitId?: string;
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

// 화면 타입 — v0.2: curriculumSelect 추가
export type ScreenType =
  | 'start'
  | 'modeSelect'
  | 'levelSelect'
  | 'curriculumSelect'
  | 'game'
  | 'result'
  | 'settings';

// 모드 정의 (v0.1 호환)
export interface GameMode {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  levelIds: string[];
}

// 레벨 정의 (v0.1 호환)
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

// === v0.3 커리큘럼 타입 ===

export type ProblemCategory = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'mixed';

export interface CurriculumUnit {
  id: string;
  gradeId: GradeId;
  unitId: string;
  title: string;
  category: ProblemCategory;
  order: number;
  tags: string[];
  examples: string[];
  
  fallSpeed: number;
  spawnInterval: number;
  maxActiveProblems: number;
  generatorKey: string;
}

export interface CurriculumGrade {
  id: GradeId;
  title: string;
  units: CurriculumUnit[];
}

// 점수 상수
export const SCORE_PER_CORRECT = 10;
export const COMBO_BONUS_INTERVAL = 5;
export const COMBO_BONUS_SCORE = 20;
export const DEFAULT_LIVES = 5;
export const DEFAULT_INPUT_DIGIT_LIMIT = 5;

// 타이머 상수 — 3분
export const DEFAULT_GAME_DURATION_SECONDS = 180;

