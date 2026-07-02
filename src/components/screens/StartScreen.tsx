import React, { useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { useGameStore } from '../../stores/gameStore';
import { getBestScore, getStudentName, setStudentName as saveStudentName } from '../../utils/storage';

const FONT_FAMILY = "'OwnglyphParkDaHyun', sans-serif";

const StartScreen: React.FC = () => {
  const setScreen = useGameStore((s) => s.setScreen);
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const setSoundEnabled = useGameStore((s) => s.setSoundEnabled);
  const bestScore = getBestScore();
  const [name, setName] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);

  useEffect(() => {
    setName(getStudentName());
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
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleStart = () => {
    saveStudentName(name);
    setScreen('curriculumSelect');
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{
        fontFamily: FONT_FAMILY,
        background: 'linear-gradient(135deg, #FFF8E1 0%, #FFE0B2 30%, #FFCC80 60%, #FFB74D 100%)',
      }}
    >
      {/* Top Right Actions */}
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
        >
          {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
        <button
          onClick={toggleFullscreen}
          className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg hover:bg-orange-600 transition-colors"
        >
          {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
        </button>
      </div>

      {/* Title */}
      <h1
        className="text-6xl md:text-7xl font-bold mb-12 text-center"
        style={{
          color: '#5D4E37',
          textShadow: '3px 3px 6px rgba(0,0,0,0.15), 0 0 20px rgba(255,193,7,0.3)',
        }}
      >
        🌧️ 산성비 연산 게임
      </h1>

      {/* Name Input */}
      <div className="mb-6 w-72">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="학생 이름을 입력하세요"
          className="w-full text-center py-3 px-4 rounded-xl text-xl shadow-md border-2 border-amber-200 outline-none focus:border-amber-400 bg-white/90"
          style={{ color: '#5D4E37' }}
        />
      </div>

      {/* Button grid */}
      <div className="grid grid-cols-1 gap-4 w-72">
        {/* 게임 시작 */}
        <button
          onClick={handleStart}
          className="py-4 px-8 rounded-2xl text-2xl font-bold text-white shadow-lg
                     transition-all duration-150 active:scale-95 hover:shadow-xl hover:brightness-110"
          style={{ backgroundColor: '#F5C542' }}
        >
          🎮 게임 시작
        </button>

        {/* 성적표 (disabled) */}
        <button
          disabled
          className="py-4 px-8 rounded-2xl text-2xl font-bold shadow-md
                     opacity-50 cursor-not-allowed"
          style={{ backgroundColor: '#E0E0E0', color: '#9E9E9E' }}
        >
          📊 성적표
        </button>
      </div>

      {/* Teacher page shortcut */}
      <div className="mt-4">
        <button
          onClick={() => {
            window.location.href = '?admin=true';
          }}
          className="text-sm font-medium transition-colors hover:text-amber-700"
          style={{ color: '#8D7B68', textDecoration: 'underline' }}
        >
          선생님 페이지 가기
        </button>
      </div>

      {/* Best score */}
      {bestScore > 0 && (
        <div className="mt-10 px-6 py-3 rounded-full bg-white/70 backdrop-blur-sm shadow-sm">
          <span className="text-lg" style={{ color: '#5D4E37' }}>
            🏆 최고 점수: <span className="font-bold text-xl" style={{ color: '#E8A838' }}>{bestScore} 점</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default StartScreen;
