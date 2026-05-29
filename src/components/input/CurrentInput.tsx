import React, { useEffect, useState } from 'react';
import { useGameStore } from '../../stores/gameStore';

const FONT_FAMILY = "'OwnglyphParkDaHyun', sans-serif";

const CurrentInput: React.FC = () => {
  const currentInput = useGameStore((s) => s.currentInput);
  const [popping, setPopping] = useState(false);
  const [prevLength, setPrevLength] = useState(currentInput.length);

  useEffect(() => {
    if (currentInput.length > prevLength) {
      setPopping(true);
      const timer = setTimeout(() => setPopping(false), 150);
      setPrevLength(currentInput.length);
      return () => clearTimeout(timer);
    }
    setPrevLength(currentInput.length);
  }, [currentInput.length, prevLength]);

  return (
    <div
      className="flex items-center justify-center h-full px-4"
      style={{ fontFamily: FONT_FAMILY }}
    >
      {currentInput ? (
        <span
          className="text-5xl md:text-6xl lg:text-7xl font-bold transition-transform duration-150"
          style={{
            color: '#F5C344',
            transform: popping ? 'scale(1.15)' : 'scale(1)',
          }}
        >
          {currentInput}
        </span>
      ) : (
        <span
          className="text-5xl md:text-6xl lg:text-7xl font-bold opacity-30"
          style={{ color: '#F5C344' }}
        >
          ?
        </span>
      )}
    </div>
  );
};

export default CurrentInput;
