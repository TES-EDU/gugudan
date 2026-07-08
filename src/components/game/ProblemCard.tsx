import React, { useEffect, useState } from 'react';
import type { Problem } from '../../game/types';
import { useGameStore } from '../../stores/gameStore';

const FONT_FAMILY = "'OwnglyphParkDaHyun', sans-serif";

interface ProblemCardProps {
  problem: Problem;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
  const lastRemoveEvent = useGameStore((s) => s.lastRemoveEvent);
  const [entering, setEntering] = useState(true);
  const [removing, setRemoving] = useState(false);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setEntering(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Removal sparkle animation
  useEffect(() => {
    if (
      lastRemoveEvent &&
      lastRemoveEvent.ids.includes(problem.id)
    ) {
      setRemoving(true);
    }
  }, [lastRemoveEvent, problem.id]);

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${problem.x}px`,
        transform: `translateY(${problem.y}px)`,
        top: 0,
        transition: removing ? 'all 0.3s ease-out' : undefined,
        opacity: removing ? 0 : entering ? 0 : 1,
        scale: removing ? '1.3' : entering ? '0.8' : '1',
        willChange: 'transform',
      }}
    >
      <div
        className="px-4 py-2 md:px-5 md:py-3 bg-white flex items-center justify-center
                    whitespace-nowrap select-none"
        style={{
          fontFamily: FONT_FAMILY,
          border: '3px solid #CCD5AE',
          borderRadius: '9999px',
          boxShadow: '0 4px 12px rgba(204,213,174,0.35)',
          animation: entering ? 'fadeScaleIn 0.3s ease-out forwards' : undefined,
        }}
      >
        <span
          className="text-xl md:text-2xl lg:text-3xl font-bold"
          style={{ color: '#5C4A1E' }}
        >
          {problem.expression}
        </span>
      </div>

      {/* Sparkle effect on removal */}
      {removing && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl" style={{ animation: 'sparkle 0.3s ease-out forwards' }}>
            ✨
          </span>
        </div>
      )}

      <style>{`
        @keyframes fadeScaleIn {
          from {
            opacity: 0;
            transform: scale(0.7);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes sparkle {
          0% {
            opacity: 1;
            transform: scale(0.5);
          }
          100% {
            opacity: 0;
            transform: scale(2);
          }
        }
      `}</style>
    </div>
  );
};

export default ProblemCard;
