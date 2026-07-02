import type { SoundSettings } from '../game/types';

const STORAGE_KEYS = {
  BEST_SCORE: 'mathrain_bestScore',
  BEST_COMBO: 'mathrain_bestCombo',
  RECENT_RESULTS: 'mathrain_recentResults',
  SOUND_SETTINGS: 'mathrain_soundSettings',
  SELECTED_MODE: 'mathrain_selectedMode',
  SELECTED_LEVEL: 'mathrain_selectedLevel',
  STUDENT_NAME: 'mathrain_studentName',
} as const;

export function getStudentName(): string {
  return localStorage.getItem(STORAGE_KEYS.STUDENT_NAME) || '';
}

export function setStudentName(name: string): void {
  localStorage.setItem(STORAGE_KEYS.STUDENT_NAME, name.trim());
}

export function getBestScore(): number {
  return parseInt(localStorage.getItem(STORAGE_KEYS.BEST_SCORE) || '0', 10);
}

export function setBestScore(score: number): void {
  const current = getBestScore();
  if (score > current) {
    localStorage.setItem(STORAGE_KEYS.BEST_SCORE, String(score));
  }
}

export function getBestCombo(): number {
  return parseInt(localStorage.getItem(STORAGE_KEYS.BEST_COMBO) || '0', 10);
}

export function setBestCombo(combo: number): void {
  const current = getBestCombo();
  if (combo > current) {
    localStorage.setItem(STORAGE_KEYS.BEST_COMBO, String(combo));
  }
}

export function getSoundSettings(): SoundSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SOUND_SETTINGS);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { enabled: true, volume: 0.7 };
}

export function setSoundSettings(settings: SoundSettings): void {
  localStorage.setItem(STORAGE_KEYS.SOUND_SETTINGS, JSON.stringify(settings));
}

export function getSelectedMode(): string {
  return localStorage.getItem(STORAGE_KEYS.SELECTED_MODE) || 'add_sub';
}

export function setSelectedMode(modeId: string): void {
  localStorage.setItem(STORAGE_KEYS.SELECTED_MODE, modeId);
}

export function getSelectedLevel(): string {
  return localStorage.getItem(STORAGE_KEYS.SELECTED_LEVEL) || 'ADD_01';
}

export function setSelectedLevel(levelId: string): void {
  localStorage.setItem(STORAGE_KEYS.SELECTED_LEVEL, levelId);
}

export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
}
