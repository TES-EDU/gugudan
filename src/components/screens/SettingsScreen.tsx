import React, { useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { clearAllData } from '../../utils/storage';

const FONT_FAMILY = "'OwnglyphParkDaHyun', sans-serif";

const SettingsScreen: React.FC = () => {
  const setScreen = useGameStore((s) => s.setScreen);
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const soundVolume = useGameStore((s) => s.soundVolume);
  const setSoundEnabled = useGameStore((s) => s.setSoundEnabled);
  const setSoundVolume = useGameStore((s) => s.setSoundVolume);
  const speedMultiplier = useGameStore((s) => s.speedMultiplier);
  const setSpeedMultiplier = useGameStore((s) => s.setSpeedMultiplier);

  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearData = () => {
    clearAllData();
    setShowConfirm(false);
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
      <h1 className="text-4xl font-bold mb-10" style={{ color: '#5D4E37' }}>
        ⚙️ 설정
      </h1>

      {/* Settings card */}
      <div className="bg-white rounded-3xl shadow-lg px-8 py-8 max-w-md w-[90%]">
        {/* Sound toggle */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xl font-bold" style={{ color: '#5D4E37' }}>
            🔊 효과음
          </span>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`relative w-14 h-8 rounded-full transition-colors duration-200 ${
              soundEnabled ? 'bg-green-400' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-200 ${
                soundEnabled ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Volume slider (only when sound enabled) */}
        {soundEnabled && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg" style={{ color: '#5D4E37' }}>
                볼륨
              </span>
              <span className="text-lg font-bold" style={{ color: '#E8A838' }}>
                {Math.round(soundVolume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={soundVolume}
              onChange={(e) => setSoundVolume(parseFloat(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #F5C542 0%, #F5C542 ${soundVolume * 100}%, #E0D5C5 ${soundVolume * 100}%, #E0D5C5 100%)`,
              }}
            />
          </div>
        )}

        {/* Speed Control */}
        <div className="mb-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-bold" style={{ color: '#5D4E37' }}>
              속도 조절
            </span>
          </div>
          <div className="flex gap-2">
            {[
              { label: '느리게', value: 0.7 },
              { label: '보통', value: 1.0 },
              { label: '빠르게', value: 1.5 },
            ].map((speed) => (
              <button
                key={speed.label}
                onClick={() => setSpeedMultiplier(speed.value)}
                className="flex-1 py-2 rounded-xl text-lg font-bold transition-all duration-150 shadow-sm hover:shadow-md"
                style={{
                  backgroundColor: speedMultiplier === speed.value ? '#F5C542' : '#F5F5F5',
                  color: speedMultiplier === speed.value ? '#FFFFFF' : '#5D4E37',
                  border: speedMultiplier === speed.value ? '2px solid #F5C542' : '2px solid transparent',
                }}
              >
                {speed.label}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6" />

        {/* Clear data */}
        <div>
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full py-3 rounded-2xl text-lg font-bold transition-all duration-150
                       active:scale-95 hover:bg-red-50"
            style={{
              color: '#F44336',
              border: '2px solid #F44336',
              backgroundColor: 'transparent',
            }}
          >
            🗑️ 데이터 초기화
          </button>
        </div>
      </div>

      {/* Confirm dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div
            className="bg-white rounded-3xl shadow-2xl px-8 py-6 max-w-sm w-[85%] flex flex-col items-center gap-5"
            style={{ fontFamily: FONT_FAMILY }}
          >
            <span className="text-4xl">⚠️</span>
            <h3 className="text-xl font-bold text-center" style={{ color: '#5D4E37' }}>
              정말 모든 데이터를 삭제하시겠습니까?
            </h3>
            <p className="text-sm text-gray-500 text-center">
              최고 점수, 설정 등 모든 저장 데이터가 삭제됩니다.
            </p>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-2xl text-lg font-bold
                           transition-all duration-150 active:scale-95"
                style={{ backgroundColor: '#E0E0E0', color: '#5D4E37' }}
              >
                취소
              </button>
              <button
                onClick={handleClearData}
                className="flex-1 py-3 rounded-2xl text-lg font-bold text-white
                           transition-all duration-150 active:scale-95"
                style={{ backgroundColor: '#F44336' }}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsScreen;
