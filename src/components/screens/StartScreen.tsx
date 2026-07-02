import React from 'react';
import { useGameStore } from '../../stores/gameStore';
import { getBestScore } from '../../utils/storage';

const FONT_FAMILY = "'OwnglyphParkDaHyun', sans-serif";

const StartScreen: React.FC = () => {
  const setScreen = useGameStore((s) => s.setScreen);
  const bestScore = getBestScore();

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

      {/* Button grid */}
      <div className="grid grid-cols-1 gap-4 w-72">
        {/* 게임 시작 */}
        <button
          onClick={() => setScreen('curriculumSelect')}
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

        {/* 선생님 페이지 */}
        <button
          onClick={() => {
            window.location.search = '?admin=true';
          }}
          className="py-4 px-8 rounded-2xl text-2xl font-bold shadow-md
                     transition-all duration-150 active:scale-95 hover:shadow-lg"
          style={{ backgroundColor: '#E3F2FD', color: '#0D47A1' }}
        >
          👨‍🏫 선생님 페이지
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
