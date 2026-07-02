import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { getBestScore, getStudentName, setStudentName as saveStudentName } from '../../utils/storage';

const FONT_FAMILY = "'OwnglyphParkDaHyun', sans-serif";

const StartScreen: React.FC = () => {
  const setScreen = useGameStore((s) => s.setScreen);
  const bestScore = getBestScore();
  const [name, setName] = useState('');

  useEffect(() => {
    setName(getStudentName());
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

        {/* 설정 */}
        <button
          onClick={() => setScreen('settings')}
          className="py-4 px-8 rounded-2xl text-2xl font-bold shadow-md
                     transition-all duration-150 active:scale-95 hover:shadow-lg"
          style={{ backgroundColor: '#FFFFFF', color: '#5D4E37' }}
        >
          ⚙️ 설정
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
