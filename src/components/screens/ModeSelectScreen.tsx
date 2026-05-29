import React from 'react';
import { useGameStore } from '../../stores/gameStore';
import { MODES } from '../../data/modes';

const FONT_FAMILY = "'OwnglyphParkDaHyun', sans-serif";

const ModeSelectScreen: React.FC = () => {
  const setScreen = useGameStore((s) => s.setScreen);
  const selectMode = useGameStore((s) => s.selectMode);

  const handleSelectMode = (modeId: string) => {
    selectMode(modeId);
    setScreen('levelSelect');
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center overflow-y-auto"
      style={{
        fontFamily: FONT_FAMILY,
        backgroundColor: '#FFF8F0',
      }}
    >
      {/* Header */}
      <div className="w-full flex items-center px-6 pt-6 pb-4">
        <button
          onClick={() => setScreen('start')}
          className="text-2xl px-4 py-2 rounded-xl transition-all duration-150 active:scale-95
                     hover:bg-white/60"
          style={{ color: '#5D4E37' }}
        >
          ← 뒤로
        </button>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-8" style={{ color: '#5D4E37' }}>
        모드 선택
      </h1>

      {/* Mode cards grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 px-6 pb-10 max-w-3xl w-full">
        {MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => handleSelectMode(mode.id)}
            className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-md
                       transition-all duration-150 active:scale-95 hover:shadow-lg
                       text-left overflow-hidden"
            style={{ borderLeft: `5px solid ${mode.color}` }}
          >
            {/* Icon */}
            <span className="text-4xl flex-shrink-0 mt-1">{mode.icon}</span>

            {/* Text */}
            <div className="flex flex-col min-w-0">
              <span
                className="text-xl font-bold truncate"
                style={{ color: '#5D4E37' }}
              >
                {mode.name}
              </span>
              <span className="text-sm text-gray-500 mt-1 line-clamp-2">
                {mode.description}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModeSelectScreen;
