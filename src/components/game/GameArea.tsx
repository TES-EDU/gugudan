import React, { useRef, useEffect } from 'react';
import { useGameStore } from '../../stores/gameStore';
import Hearts from './Hearts';
import ScoreDisplay from './ScoreDisplay';
import ComboDisplay from './ComboDisplay';
import ProblemCard from './ProblemCard';
import bgImage from '/BG_img.jpg';

const GameArea: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const setGameAreaSize = useGameStore((s) => s.setGameAreaSize);
  const activeProblems = useGameStore((s) => s.activeProblems);
  const lives = useGameStore((s) => s.lives);
  const score = useGameStore((s) => s.score);
  const combo = useGameStore((s) => s.combo);

  // Measure and report game area size
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setGameAreaSize(width, height);
      }
    });

    observer.observe(container);

    // Initial measurement
    const rect = container.getBoundingClientRect();
    setGameAreaSize(rect.width, rect.height);

    return () => {
      observer.disconnect();
    };
  }, [setGameAreaSize]);

  return (
    <div
      ref={containerRef}
      className="relative h-full overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Semi-transparent overlay for readability */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />

      {/* Top UI Container (Perfect horizontal & vertical centering) */}
      <div className="absolute top-3 left-3 right-3 h-12 z-10 pointer-events-none">
        {/* Hearts - Left */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-auto">
          <Hearts lives={lives} maxLives={5} />
        </div>

        {/* Combo - Exact Center */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-80">
          {combo >= 2 && <ComboDisplay combo={combo} />}
        </div>

        {/* Score - Right */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-auto">
          <ScoreDisplay score={score} />
        </div>
      </div>

      {/* Falling problem cards */}
      {activeProblems.map((problem) => (
        <ProblemCard key={problem.id} problem={problem} />
      ))}
    </div>
  );
};

export default GameArea;
