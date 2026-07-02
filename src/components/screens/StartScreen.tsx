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
  const [testCode, setTestCode] = useState('');
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
          className="h-10 px-4 rounded-full bg-white/70 backdrop-blur-sm shadow-sm flex items-center justify-center gap-2 transition-all hover:bg-white/90 hover:shadow-md hover:scale-105 active:scale-95"
          style={{ color: '#5D4E37' }}
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          <span className="text-sm font-bold tracking-tight">{soundEnabled ? '효과음 ON' : '효과음 OFF'}</span>
        </button>
        <button
          onClick={toggleFullscreen}
          className="h-10 px-4 rounded-full bg-white/70 backdrop-blur-sm shadow-sm flex items-center justify-center gap-2 transition-all hover:bg-white/90 hover:shadow-md hover:scale-105 active:scale-95"
          style={{ color: '#5D4E37' }}
        >
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          <span className="text-sm font-bold tracking-tight">전체화면</span>
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

      {/* Name and Code Inputs */}
      <div className="mb-6 w-72 flex flex-col gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="학생 이름을 입력하세요"
          className="w-full text-center py-3 px-4 rounded-xl text-xl shadow-md border-2 border-amber-200 outline-none focus:border-amber-400 bg-white/90 transition-colors"
          style={{ color: '#5D4E37' }}
        />
        <input
          type="text"
          value={testCode}
          onChange={(e) => setTestCode(e.target.value)}
          placeholder="응시코드"
          className="w-full text-center py-3 px-4 rounded-xl text-xl shadow-md border-2 border-amber-200 outline-none focus:border-amber-400 bg-white/90 transition-colors uppercase placeholder:normal-case"
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


    </div>
  );
};

export default StartScreen;
