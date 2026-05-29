import React, { useEffect, useState } from 'react';

const FONT_FAMILY = "'OwnglyphParkDaHyun', sans-serif";

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  const [popping, setPopping] = useState(false);
  const [prevScore, setPrevScore] = useState(score);

  useEffect(() => {
    if (score !== prevScore) {
      setPopping(true);
      const timer = setTimeout(() => setPopping(false), 300);
      setPrevScore(score);
      return () => clearTimeout(timer);
    }
  }, [score, prevScore]);

  return (
    <span
      className="text-lg md:text-xl font-bold bg-white px-4 py-2 rounded-full shadow-sm transition-transform duration-200 inline-block"
      style={{
        fontFamily: FONT_FAMILY,
        color: '#776757',
        border: '3px solid #776757',
        transform: popping ? 'scale(1.15)' : 'scale(1)',
      }}
    >
      {score} 점
    </span>
  );
};

export default ScoreDisplay;
