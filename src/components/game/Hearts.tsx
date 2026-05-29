import React, { useEffect, useState } from 'react';

interface HeartsProps {
  lives: number;
  maxLives?: number;
}

const Hearts: React.FC<HeartsProps> = ({ lives, maxLives = 5 }) => {
  const [shaking, setShaking] = useState(false);
  const [prevLives, setPrevLives] = useState(lives);

  useEffect(() => {
    if (lives < prevLives) {
      setShaking(true);
      const timer = setTimeout(() => setShaking(false), 400);
      setPrevLives(lives);
      return () => clearTimeout(timer);
    }
    setPrevLives(lives);
  }, [lives, prevLives]);

  return (
    <div
      className={`flex gap-1 p-3 ${shaking ? 'animate-shake' : ''}`}
      style={{
        animation: shaking ? 'heartShake 0.4s ease-in-out' : undefined,
      }}
    >
      {Array.from({ length: maxLives }, (_, i) => (
        <svg
          key={i}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={i < lives ? '#EB5E5E' : '#E0E0E0'}
          className="transition-colors duration-200"
          style={{
            transform: shaking && i === lives ? 'scale(1.2)' : 'scale(1)',
            width: 'clamp(20px, 3vw, 32px)',
            height: 'clamp(20px, 3vw, 32px)'
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" />
        </svg>
      ))}

      {/* Inline keyframes for shake animation */}
      <style>{`
        @keyframes heartShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-4px); }
          40% { transform: translateX(4px); }
          60% { transform: translateX(-3px); }
          80% { transform: translateX(3px); }
        }
      `}</style>
    </div>
  );
};

export default Hearts;
