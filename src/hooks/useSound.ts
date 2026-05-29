import { useCallback, useEffect } from 'react';
import { useGameStore } from '../stores/gameStore';
import {
  playClickSound,
  playCorrectSound,
  playWrongSound,
  playMissSound,
  playMultiCorrectSound,
  playPauseSound,
  playGameOverSound,
  playBGM,
  pauseBGM
} from '../utils/sound';

interface UseSoundReturn {
  playClick: () => void;
  playCorrect: () => void;
  playWrong: () => void;
  playMiss: () => void;
  playMultiCorrect: () => void;
  playPause: () => void;
  playGameOver: () => void;
}

export function useSound(): UseSoundReturn {
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const soundVolume = useGameStore((s) => s.soundVolume);
  const bgmEnabled = useGameStore((s) => s.bgmEnabled);

  useEffect(() => {
    if (bgmEnabled) {
      playBGM(soundVolume * 0.5); // BGM is usually quieter
    } else {
      pauseBGM();
    }
  }, [bgmEnabled, soundVolume]);

  const playClick = useCallback(() => {
    if (soundEnabled) playClickSound(soundVolume);
  }, [soundEnabled, soundVolume]);

  const playCorrect = useCallback(() => {
    if (soundEnabled) playCorrectSound(soundVolume);
  }, [soundEnabled, soundVolume]);

  const playWrong = useCallback(() => {
    if (soundEnabled) playWrongSound(soundVolume);
  }, [soundEnabled, soundVolume]);

  const playMiss = useCallback(() => {
    if (soundEnabled) playMissSound(soundVolume);
  }, [soundEnabled, soundVolume]);

  const playMultiCorrect = useCallback(() => {
    if (soundEnabled) playMultiCorrectSound(soundVolume);
  }, [soundEnabled, soundVolume]);

  const playPause = useCallback(() => {
    if (soundEnabled) playPauseSound(soundVolume);
  }, [soundEnabled, soundVolume]);

  const playGameOver = useCallback(() => {
    if (soundEnabled) playGameOverSound(soundVolume);
  }, [soundEnabled, soundVolume]);

  return {
    playClick,
    playCorrect,
    playWrong,
    playMiss,
    playMultiCorrect,
    playPause,
    playGameOver,
  };
}
