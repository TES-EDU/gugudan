import React, { useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { useGameStore } from '../../stores/gameStore';
import { getStudentName, setStudentName as saveStudentName } from '../../utils/storage';

const FONT_FAMILY = "'OwnglyphParkDaHyun', sans-serif";

const StartScreen: React.FC = () => {
  const setScreen = useGameStore((s) => s.setScreen);
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const setSoundEnabled = useGameStore((s) => s.setSoundEnabled);
  const [name, setName] = useState('');
  const [testCode, setTestCode] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);

  // iOS Safari doesn't support the Fullscreen API at all
  const canFullscreen = !!document.documentElement.requestFullscreen;

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
    if (!name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }
    if (testCode.trim().toUpperCase() !== 'LQ4QEG') {
      alert('응시코드가 올바르지 않습니다.');
      return;
    }
    saveStudentName(name);
    setScreen('curriculumSelect');
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-auto"
      style={{
        fontFamily: FONT_FAMILY,
        background: 'linear-gradient(135deg, #FFF8E1 0%, #FFE0B2 30%, #FFCC80 60%, #FFB74D 100%)',
      }}
    >
      {/* Top Right Actions */}
      <div className="absolute top-3 right-3 md:top-6 md:right-6 flex items-center gap-2 md:gap-3 z-10">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="h-8 md:h-10 px-3 md:px-4 rounded-full bg-white/70 backdrop-blur-sm shadow-sm flex items-center justify-center gap-1.5 md:gap-2 transition-all hover:bg-white/90 hover:shadow-md hover:scale-105 active:scale-95"
          style={{ color: '#5D4E37' }}
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          <span className="text-xs md:text-sm font-bold tracking-tight">{soundEnabled ? '효과음 ON' : '효과음 OFF'}</span>
        </button>
        {canFullscreen && (
          <button
            onClick={toggleFullscreen}
            className="h-8 md:h-10 px-3 md:px-4 rounded-full bg-white/70 backdrop-blur-sm shadow-sm flex items-center justify-center gap-1.5 md:gap-2 transition-all hover:bg-white/90 hover:shadow-md hover:scale-105 active:scale-95"
            style={{ color: '#5D4E37' }}
          >
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            <span className="text-xs md:text-sm font-bold tracking-tight">전체화면</span>
          </button>
        )}
      </div>

      {/* Title - smaller on short screens */}
      <h1
        className="text-3xl landscape:text-2xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-12 text-center mt-10 md:mt-0"
        style={{
          color: '#5D4E37',
          textShadow: '2px 2px 4px rgba(0,0,0,0.15), 0 0 15px rgba(255,193,7,0.3)',
        }}
      >
        🌧️ 산성비 연산 게임
      </h1>

      {/* Name and Code Inputs + Start button - horizontal on landscape mobile only */}
      <div className="w-72 flex flex-col items-center gap-2 landscape:flex-row landscape:gap-3 landscape:w-auto md:flex-col md:w-auto md:gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="학생 이름을 입력하세요"
          className="w-full landscape:w-44 md:w-72 text-center py-2 md:py-3 px-4 rounded-xl text-base md:text-xl shadow-md border-2 border-amber-200 outline-none focus:border-amber-400 bg-white/90 transition-colors"
          style={{ color: '#5D4E37' }}
        />
        <input
          type="text"
          value={testCode}
          onChange={(e) => setTestCode(e.target.value)}
          placeholder="응시코드"
          className="w-full landscape:w-36 md:w-72 text-center py-2 md:py-3 px-4 rounded-xl text-base md:text-xl shadow-md border-2 border-amber-200 outline-none focus:border-amber-400 bg-white/90 transition-colors uppercase placeholder:normal-case"
          style={{ color: '#5D4E37' }}
        />
        <button
          onClick={handleStart}
          className="w-full landscape:w-auto md:w-72 py-2 md:py-4 px-8 rounded-2xl text-xl md:text-2xl font-bold text-white shadow-lg
                     transition-all duration-150 active:scale-95 hover:shadow-xl hover:brightness-110 whitespace-nowrap"
          style={{ backgroundColor: '#F5C542' }}
        >
          🎮 게임 시작
        </button>
      </div>

      {/* Teacher page shortcut */}
      <div className="mt-2 md:mt-4">
        <button
          onClick={() => {
            window.location.href = '?admin=true';
          }}
          className="text-xs md:text-sm font-medium transition-colors hover:text-amber-700"
          style={{ color: '#8D7B68', textDecoration: 'underline' }}
        >
          선생님 페이지 가기
        </button>
      </div>

    </div>
  );
};

export default StartScreen;
