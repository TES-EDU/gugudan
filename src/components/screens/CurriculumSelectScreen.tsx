import React from 'react';
import { useGameStore } from '../../stores/gameStore';
import { GUGUDAN_STAGES } from '../../data/gugudanData';

const FONT_FAMILY = "'OwnglyphParkDaHyun', sans-serif";

const CurriculumSelectScreen: React.FC = () => {
  const setScreen = useGameStore((s) => s.setScreen);
  const selectLevel = useGameStore((s) => s.selectLevel);
  const levelId = useGameStore((s) => s.levelId);
  const startGame = useGameStore((s) => s.startGame);
  const startFlashcard = useGameStore((s) => s.startFlashcard);

  const selectedStage = GUGUDAN_STAGES.find(s => s.id === levelId) ?? GUGUDAN_STAGES[2];

  const handleRainMode = () => startGame();
  const handleFlashcardMode = () => startFlashcard();

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden"
      style={{
        fontFamily: FONT_FAMILY,
        background: 'linear-gradient(180deg, #FEFAE0 0%, #FAEDCD 100%)',
      }}
    >
      {/* Top Bar */}
      <div
        className="flex items-center justify-between px-4 py-3 shadow-sm"
        style={{
          backgroundColor: 'rgba(254,250,224,0.92)',
          backdropFilter: 'blur(8px)',
          borderBottom: '2px solid #E9EDC9',
        }}
      >
        <button
          onClick={() => setScreen('start')}
          className="text-2xl px-3 py-1 rounded-xl hover:bg-white/60 active:scale-95 transition-all"
          style={{ color: '#5C4A1E' }}
        >
          ←
        </button>
        <h1 className="text-2xl font-bold" style={{ color: '#5C4A1E' }}>
          단 선택
        </h1>
        <button
          onClick={() => setScreen('settings')}
          className="text-2xl px-3 py-1 rounded-xl hover:bg-white/60 active:scale-95 transition-all"
          style={{ color: '#5C4A1E' }}
        >
          ⚙️
        </button>
      </div>

      {/* Stage Grid */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}
        >
          {GUGUDAN_STAGES.map((stage) => {
            const isSelected = stage.id === levelId;
            return (
              <button
                key={stage.id}
                onClick={() => selectLevel(stage.id)}
                className="flex items-center justify-center rounded-2xl transition-all duration-150 active:scale-95 hover:shadow-md"
                style={{
                  backgroundColor: isSelected ? stage.color : '#FFFFFF',
                  border: `2px solid ${isSelected ? stage.color : '#E9EDC9'}`,
                  boxShadow: isSelected ? `0 4px 14px ${stage.color}66` : '0 1px 4px rgba(0,0,0,0.06)',
                  minHeight: '64px',
                  padding: '8px 4px',
                }}
              >
                <span
                  className="font-bold leading-tight text-center"
                  style={{
                    color: isSelected ? '#FFFFFF' : '#5C4A1E',
                    fontSize: stage.label.length > 3 ? 'clamp(0.85rem, 2vw, 1.1rem)' : 'clamp(1.1rem, 2.5vw, 1.4rem)',
                  }}
                >
                  {stage.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Info + Mode Buttons */}
      <div
        className="px-4 py-4"
        style={{ backgroundColor: 'rgba(254,250,224,0.95)', borderTop: '2px solid #E9EDC9' }}
      >
        {/* Selected Info */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold" style={{ color: '#5C4A1E' }}>
            {selectedStage.label}
          </span>
          <span className="text-sm" style={{ color: '#8B6E3C' }}>
            {selectedStage.type === 'times'
              ? `${selectedStage.n} × 1 ~ ${selectedStage.n} × 9`
              : '11×11 ~ 19×19'}
          </span>
        </div>

        {/* Mode Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleRainMode}
            className="flex-1 py-4 rounded-2xl font-bold text-xl transition-all duration-150 active:scale-95 hover:shadow-lg flex items-center justify-center gap-2"
            style={{
              backgroundColor: '#CCD5AE',
              color: '#3D5229',
              boxShadow: '0 4px 12px rgba(174,191,136,0.4)',
            }}
          >
            🌧️ 산성비
          </button>
          <button
            onClick={handleFlashcardMode}
            className="flex-1 py-4 rounded-2xl font-bold text-xl text-white transition-all duration-150 active:scale-95 hover:shadow-lg flex items-center justify-center gap-2"
            style={{
              backgroundColor: '#AEBF88',
              boxShadow: '0 4px 12px rgba(174,191,136,0.5)',
            }}
          >
            🃏 플래시카드
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurriculumSelectScreen;
