import React from 'react';
import { useGameStore } from '../../stores/gameStore';
import { getLevelsByMode } from '../../data/levels';
import { MODES } from '../../data/modes';

const FONT_FAMILY = "'OwnglyphParkDaHyun', sans-serif";

const LevelSelectScreen: React.FC = () => {
  const setScreen = useGameStore((s) => s.setScreen);
  const selectLevel = useGameStore((s) => s.selectLevel);
  const startGame = useGameStore((s) => s.startGame);
  const modeId = useGameStore((s) => s.modeId);

  const currentMode = MODES.find((m) => m.id === modeId);
  const levels = getLevelsByMode(modeId);

  const handleSelectLevel = (levelId: string) => {
    selectLevel(levelId);
    startGame();
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
          onClick={() => setScreen('modeSelect')}
          className="text-2xl px-4 py-2 rounded-xl transition-all duration-150 active:scale-95
                     hover:bg-white/60"
          style={{ color: '#5D4E37' }}
        >
          ← 뒤로
        </button>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-2" style={{ color: '#5D4E37' }}>
        {currentMode?.icon} {currentMode?.name ?? '레벨 선택'}
      </h1>
      <p className="text-lg text-gray-500 mb-8">
        레벨을 선택하세요
      </p>

      {/* Level list */}
      <div className="flex flex-col gap-3 px-6 pb-10 max-w-lg w-full">
        {levels.map((level, index) => (
          <button
            key={level.id}
            onClick={() => handleSelectLevel(level.id)}
            className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm
                       transition-all duration-150 active:scale-95 hover:shadow-md
                       text-left"
            style={{ borderLeft: `4px solid ${currentMode?.color ?? '#ccc'}` }}
          >
            {/* Level number badge */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
              style={{ backgroundColor: currentMode?.color ?? '#999' }}
            >
              {index + 1}
            </div>

            {/* Level name */}
            <span className="text-xl font-bold" style={{ color: '#5D4E37' }}>
              {level.name}
            </span>
          </button>
        ))}

        {levels.length === 0 && (
          <p className="text-center text-gray-400 text-lg py-8">
            이 모드에 사용 가능한 레벨이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default LevelSelectScreen;
