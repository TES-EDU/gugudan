import { create } from 'zustand';
import type { Problem, ProblemResult, ScreenType, GameStatus } from '../game/types';
import { DEFAULT_LIVES, DEFAULT_GAME_DURATION_SECONDS } from '../game/types';
import { evaluateAnswer, createProblemResult } from '../game/scoring';
import { generateCurriculumProblem } from '../game/curriculumProblemGenerator';
import { getUnitById } from '../data/curriculum';
import { setBestScore, setBestCombo } from '../utils/storage';

interface GameStore {
  // 화면 상태
  screen: ScreenType;
  setScreen: (screen: ScreenType) => void;

  // 게임 상태
  status: GameStatus;
  modeId: string;
  levelId: string;
  score: number;
  lives: number;
  combo: number;
  maxCombo: number;
  timeLeft: number;
  currentInput: string;
  activeProblems: Problem[];
  correctCount: number;
  wrongCount: number;
  missedCount: number;
  answeredProblems: ProblemResult[];
  missedProblems: Problem[];

  // 게임 영역 크기 (GameArea 렌더링 후 설정)
  gameAreaWidth: number;
  gameAreaHeight: number;
  setGameAreaSize: (width: number, height: number) => void;

  // 사운드
  soundEnabled: boolean;
  soundVolume: number;
  bgmEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  setSoundVolume: (volume: number) => void;
  setBgmEnabled: (enabled: boolean) => void;

  // 설정
  speedMultiplier: number;
  setSpeedMultiplier: (multiplier: number) => void;

  setTimeLeft: (time: number) => void;

  // 액션
  selectMode: (modeId: string) => void;
  selectLevel: (levelId: string) => void;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  appendInput: (digit: string) => void;
  deleteInput: () => void;
  clearInput: () => void;
  submitAnswer: () => { isCorrect: boolean; matchedCount: number; bonusTriggered: boolean };
  spawnProblem: () => void;
  updateProblems: (deltaTime: number) => void;
  removeProblem: (id: string, reason: 'correct' | 'missed') => void;
  endGame: () => void;
  goToResult: () => void;
  resetGame: () => void;

  // 최근 제거 이벤트 (애니메이션용)
  lastRemoveEvent: { ids: string[]; timestamp: number } | null;
  lastWrongEvent: { timestamp: number } | null;
}

let problemCounter = 0;

export const useGameStore = create<GameStore>((set, get) => ({
  // 초기 상태
  screen: 'start',
  status: 'ready',
  modeId: 'add_sub',
  levelId: 'ADD_01',
  score: 0,
  lives: DEFAULT_LIVES,
  combo: 0,
  maxCombo: 0,
  timeLeft: DEFAULT_GAME_DURATION_SECONDS,
  currentInput: '',
  activeProblems: [],
  correctCount: 0,
  wrongCount: 0,
  missedCount: 0,
  answeredProblems: [],
  missedProblems: [],
  gameAreaWidth: 0,
  gameAreaHeight: 0,
  soundEnabled: true,
  soundVolume: 0.7,
  bgmEnabled: false,
  speedMultiplier: 1.0,
  lastRemoveEvent: null,
  lastWrongEvent: null,

  setScreen: (screen) => set({ screen }),
  setTimeLeft: (time) => set({ timeLeft: time }),

  setGameAreaSize: (width, height) => set({ gameAreaWidth: width, gameAreaHeight: height }),

  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
  setSoundVolume: (volume) => set({ soundVolume: volume }),
  setBgmEnabled: (enabled) => set({ bgmEnabled: enabled }),

  setSpeedMultiplier: (multiplier) => set({ speedMultiplier: multiplier }),

  selectMode: (modeId) => set({ modeId }),
  selectLevel: (levelId) => set({ levelId }),

  startGame: () => {
    problemCounter = 0;
    set({
      status: 'playing',
      screen: 'game',
      score: 0,
      lives: DEFAULT_LIVES,
      combo: 0,
      maxCombo: 0,
      timeLeft: DEFAULT_GAME_DURATION_SECONDS,
      currentInput: '',
      activeProblems: [],
      correctCount: 0,
      wrongCount: 0,
      missedCount: 0,
      answeredProblems: [],
      missedProblems: [],
      lastRemoveEvent: null,
      lastWrongEvent: null,
    });
  },

  pauseGame: () => set({ status: 'paused' }),
  resumeGame: () => set({ status: 'playing' }),

  appendInput: (digit) => {
    const { currentInput } = get();
    if (currentInput.length >= 5) return; // inputDigitLimit
    set({ currentInput: currentInput + digit });
  },

  deleteInput: () => {
    const { currentInput } = get();
    set({ currentInput: currentInput.slice(0, -1) });
  },

  clearInput: () => set({ currentInput: '' }),

  submitAnswer: () => {
    const state = get();
    if (state.status !== 'playing' || state.currentInput === '') {
      return { isCorrect: false, matchedCount: 0, bonusTriggered: false };
    }

    const result = evaluateAnswer(state.currentInput, state.activeProblems, state.combo);

    if (result.isCorrect) {
      const matchedIds = result.matchedProblems.map(p => p.id);
      const newAnswered = [
        ...state.answeredProblems,
        ...result.matchedProblems.map(p =>
          createProblemResult(p, parseInt(state.currentInput, 10), 'correct')
        ),
      ];
      const newMaxCombo = Math.max(state.maxCombo, result.newCombo);

      set({
        score: state.score + result.scoreGained,
        combo: result.newCombo,
        maxCombo: newMaxCombo,
        correctCount: state.correctCount + result.matchedProblems.length,
        activeProblems: state.activeProblems.filter(p => !matchedIds.includes(p.id)),
        answeredProblems: newAnswered,
        currentInput: '',
        lastRemoveEvent: { ids: matchedIds, timestamp: Date.now() },
      });
    } else {
      const newAnswered = [
        ...state.answeredProblems,
        {
          problemId: 'wrong_input',
          expression: `입력: ${state.currentInput}`,
          correctAnswer: -1,
          userAnswer: parseInt(state.currentInput, 10),
          result: 'wrong' as const,
          tags: [],
        },
      ];

      set({
        wrongCount: state.wrongCount + 1,
        combo: 0,
        answeredProblems: newAnswered,
        currentInput: '',
        lastWrongEvent: { timestamp: Date.now() },
      });
    }

    return {
      isCorrect: result.isCorrect,
      matchedCount: result.matchedProblems.length,
      bonusTriggered: result.bonusTriggered,
    };
  },

  spawnProblem: () => {
    const state = get();
    if (state.status !== 'playing') return;

    const unit = getUnitById(state.levelId);
    if (!unit) return;
    if (state.activeProblems.length >= unit.maxActiveProblems) return;

    const generated = generateCurriculumProblem(state.levelId);
    const cardWidth = 160;
    const maxX = Math.max(state.gameAreaWidth - cardWidth - 10, 10);
    const x = Math.random() * maxX + 5;

    const problem: Problem = {
      id: `p_${++problemCounter}_${Date.now()}`,
      expression: generated.expression,
      answer: generated.answer,
      operator: generated.operator,
      x,
      y: -60,
      fallSpeed: unit.fallSpeed,
      tags: generated.tags,
      levelId: state.levelId,
      createdAt: Date.now(),
      gradeId: generated.gradeId,
      unitId: generated.unitId,
    };

    set({ activeProblems: [...state.activeProblems, problem] });
  },

  updateProblems: (deltaTime) => {
    const state = get();
    if (state.status !== 'playing') return;

    const bottomLine = state.gameAreaHeight - 10;
    const reached: Problem[] = [];
    const updated: Problem[] = [];

    for (const p of state.activeProblems) {
      const newY = p.y + p.fallSpeed * state.speedMultiplier * deltaTime;
      if (newY >= bottomLine) {
        reached.push(p);
      } else {
        updated.push({ ...p, y: newY });
      }
    }

    if (reached.length > 0) {
      const newLives = state.lives - reached.length;
      const newMissed = [
        ...state.missedProblems,
        ...reached,
      ];
      const newAnswered = [
        ...state.answeredProblems,
        ...reached.map(p => createProblemResult(p, null, 'missed')),
      ];

      set({
        activeProblems: updated,
        lives: Math.max(0, newLives),
        missedCount: state.missedCount + reached.length,
        missedProblems: newMissed,
        answeredProblems: newAnswered,
        combo: 0,
      });

      if (newLives <= 0) {
        get().endGame();
      }
    } else {
      set({ activeProblems: updated });
    }
  },

  removeProblem: (id, reason) => {
    const state = get();
    const problem = state.activeProblems.find(p => p.id === id);
    if (!problem) return;

    if (reason === 'missed') {
      set({
        activeProblems: state.activeProblems.filter(p => p.id !== id),
        lives: Math.max(0, state.lives - 1),
        missedCount: state.missedCount + 1,
        missedProblems: [...state.missedProblems, problem],
        combo: 0,
      });
    }
  },

  endGame: () => {
    const state = get();
    setBestScore(state.score);
    setBestCombo(state.maxCombo);
    set({ status: 'gameOver' });
  },

  goToResult: () => set({ screen: 'result', status: 'result' }),

  resetGame: () => {
    problemCounter = 0;
    set({
      status: 'ready',
      score: 0,
      lives: DEFAULT_LIVES,
      combo: 0,
      maxCombo: 0,
      currentInput: '',
      activeProblems: [],
      correctCount: 0,
      wrongCount: 0,
      missedCount: 0,
      answeredProblems: [],
      missedProblems: [],
      lastRemoveEvent: null,
      lastWrongEvent: null,
    });
  },
}));
