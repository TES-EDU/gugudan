import React, { useEffect, useState } from 'react';

const FONT_FAMILY = "'OwnglyphParkDaHyun', sans-serif";

interface ComboDisplayProps {
  combo: number;
}

const ComboDisplay: React.FC<ComboDisplayProps> = ({ combo }) => {
  const [pulsing, setPulsing] = useState(false);
  const [prevCombo, setPrevCombo] = useState(combo);

  useEffect(() => {
    if (combo > prevCombo && combo >= 2) {
      setPulsing(true);
      const timer = setTimeout(() => setPulsing(false), 400);
      setPrevCombo(combo);
      return () => clearTimeout(timer);
    }
    setPrevCombo(combo);
  }, [combo, prevCombo]);

  if (combo < 2) return null;

  return (
    <div
      className="transition-transform duration-200"
      style={{
        fontFamily: FONT_FAMILY,
        transform: pulsing ? 'scale(1.25)' : 'scale(1)',
      }}
    >
      <span
        className="text-lg md:text-xl font-bold"
        style={{
          color: '#E8A838',
          textShadow: '0 0 10px rgba(232,168,56,0.6), 0 0 20px rgba(232,168,56,0.3)',
        }}
      >
        x{combo} 콤보!
      </span>

      <style>{`
        @keyframes comboPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default ComboDisplay;
