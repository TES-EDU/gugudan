import React, { useState, useCallback, useEffect } from 'react';
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
  const includeCommutative = useGameStore((s) => s.includeCommutative);
  const setIncludeCommutative = useGameStore((s) => s.setIncludeCommutative);

  const [showConfirm, setShowConfirm] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch (_) { /* ignore */ }
  }, []);

  const handleClearData = () => {
    clearAllData();
    setShowConfirm(false);
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center overflow-y-auto"
      style={{
        fontFamily: FONT_FAMILY,
        background: 'linear-gradient(180deg, #FEFAE0 0%, #FAEDCD 100%)',
      }}
    >
      {/* Header */}
      <div className="w-full flex items-center px-6 pt-6 pb-4">
        <button
          onClick={() => setScreen('curriculumSelect')}
          className="text-2xl px-4 py-2 rounded-xl transition-all duration-150 active:scale-95
                     hover:bg-white/60"
          style={{ color: '#5C4A1E' }}
        >
          ← 뒤로
        </button>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-6" style={{ color: '#5C4A1E' }}>
        ⚙️ 설정
      </h1>

      <div className="rounded-3xl shadow-lg px-8 py-8 max-w-md w-[90%]" style={{ backgroundColor: 'rgba(255,255,255,0.85)', border: '1.5px solid #E9EDC9' }}>
        {/* 교환법칙 토글 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xl font-bold block" style={{ color: '#5C4A1E' }}>
              🔄 역방향 문제 포함
            </span>
            <span className="text-xs" style={{ color: '#8B6E3C' }}>
              예) 2단에서 7×2도 유출
            </span>
          </div>
          <button
            onClick={() => setIncludeCommutative(!includeCommutative)}
            className={`relative w-14 h-8 rounded-full transition-colors duration-200 ${
              includeCommutative ? '' : 'bg-gray-300'
            }`}
            style={includeCommutative ? { backgroundColor: '#CCD5AE' } : {}}
          >
            <div
              className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-200 ${
                includeCommutative ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="border-t my-4" style={{ borderColor: '#E9EDC9' }} />

        {/* Sound toggle */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xl font-bold" style={{ color: '#5C4A1E' }}>
            🔊 효과음
          </span>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`relative w-14 h-8 rounded-full transition-colors duration-200 ${
              soundEnabled ? '' : 'bg-gray-300'
            }`}
            style={soundEnabled ? { backgroundColor: '#CCD5AE' } : {}}
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
                background: `linear-gradient(to right, #AEBF88 0%, #AEBF88 ${soundVolume * 100}%, #E0D5C5 ${soundVolume * 100}%, #E0D5C5 100%)`,
              }}
            />
          </div>
        )}

        {/* Speed Control */}
        <div className="mb-6 mt-6">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xl font-bold" style={{ color: '#5C4A1E' }}>
              속도 조절
            </span>
          </div>
          <div className="w-full bg-white rounded-2xl px-5 py-6 my-2 shadow-inner">
            <div className="relative mb-6">
              <div className="absolute top-3 left-2 right-2 h-2.5 bg-gray-200 rounded-full" />
              <div 
                className="absolute top-3 left-2 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `calc(${([0.7, 1.0, 1.5, 2.0].indexOf(speedMultiplier) / 3) * 100}% - 4px)`, backgroundColor: '#AEBF88' }} 
              />

              <input 
                type="range" 
                min="0" max="3" step="1" 
                value={[0.7, 1.0, 1.5, 2.0].indexOf(speedMultiplier)}
                onChange={(e) => setSpeedMultiplier([0.7, 1.0, 1.5, 2.0][parseInt(e.target.value)])}
                className="relative w-full h-8 opacity-0 cursor-pointer z-20"
              />
              
              {/* Dots */}
              <div className="absolute top-4 left-2 right-2 flex justify-between pointer-events-none z-10 -translate-y-1/2">
                {[0, 1, 2, 3].map(idx => {
                  const isActive = [0.7, 1.0, 1.5, 2.0].indexOf(speedMultiplier) === idx;
                  const isPassed = [0.7, 1.0, 1.5, 2.0].indexOf(speedMultiplier) >= idx;
                  return (
                    <div key={idx} className="relative w-0 h-0 flex items-center justify-center">
                      <div className={`absolute rounded-full transition-all duration-300
                                      ${isActive ? 'w-7 h-7 bg-white shadow-md' : 
                                        isPassed ? 'w-3.5 h-3.5' : 'w-3.5 h-3.5 bg-gray-300'}`}
                        style={isActive ? { border: '6px solid #AEBF88' } : isPassed ? { backgroundColor: '#AEBF88' } : {}}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Labels */}
              <div className="flex justify-between mt-4 px-2">
                {['느리게', '보통', '빠르게', '매우 빠름'].map((label, idx) => {
                  const isActive = [0.7, 1.0, 1.5, 2.0].indexOf(speedMultiplier) === idx;
                  return (
                    <div key={label} className="relative w-0 flex justify-center">
                      <span className="absolute top-0 whitespace-nowrap font-bold transition-all duration-300"
                        style={{ color: isActive ? '#5C891F' : '#9E9E9E', fontSize: isActive ? '13px' : '11px' }}>
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t my-6" style={{ borderColor: '#E9EDC9' }} />

        {/* Fullscreen toggle */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xl font-bold" style={{ color: '#5C4A1E' }}>
            📱 전체화면
          </span>
          <button
            onClick={toggleFullscreen}
            className={`relative w-14 h-8 rounded-full transition-colors duration-200 ${
              isFullscreen ? '' : 'bg-gray-300'
            }`}
            style={isFullscreen ? { backgroundColor: '#CCD5AE' } : {}}
          >
            <div
              className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-200 ${
                isFullscreen ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <p className="text-xs mb-6" style={{ color: '#9E9E9E' }}>
          태블릿에서 크롬 탭을 숨기고 전체 화면으로 플레이합니다.
        </p>

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
