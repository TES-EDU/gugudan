import { useEffect, useRef } from 'react';
import { useGameStore } from '../stores/gameStore';
import { getUnitById } from '../data/curriculum';

export function useGameLoop(): void {
  const status = useGameStore((s) => s.status);
  const levelId = useGameStore((s) => s.levelId);
  const updateProblems = useGameStore((s) => s.updateProblems);
  const spawnProblem = useGameStore((s) => s.spawnProblem);

  const lastTimeRef = useRef<number>(0);
  const spawnTimerRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (status !== 'playing') return;

    const unit = getUnitById(levelId);
    const spawnInterval = unit ? unit.spawnInterval / 1000 : 3.5; // seconds

    lastTimeRef.current = 0;
    spawnTimerRef.current = spawnInterval; // spawn immediately on first frame

    const loop = (timestamp: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = timestamp;
        // Spawn one problem immediately
        spawnProblem();
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      const deltaTime = (timestamp - lastTimeRef.current) / 1000; // seconds
      lastTimeRef.current = timestamp;

      // Clamp deltaTime to prevent huge jumps (e.g. when tab regains focus)
      const clampedDelta = Math.min(deltaTime, 0.1);

      // Decrement timer
      const state = useGameStore.getState();
      if (state.timeLeft > 0) {
        const newTime = state.timeLeft - clampedDelta;
        if (newTime <= 0) {
          state.setTimeLeft(0);
          state.endGame();
          return;
        } else {
          state.setTimeLeft(newTime);
        }
      }

      // Update falling problems
      updateProblems(clampedDelta);

      // Track spawn interval (adjusted by speed multiplier)
      const currentMultiplier = state.speedMultiplier;
      const adjustedSpawnInterval = spawnInterval / currentMultiplier;
      spawnTimerRef.current += clampedDelta;
      if (spawnTimerRef.current >= adjustedSpawnInterval) {
        spawnTimerRef.current -= adjustedSpawnInterval;
        spawnProblem();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [status, levelId, updateProblems, spawnProblem]);
}
