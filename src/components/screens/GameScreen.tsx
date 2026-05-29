import React, { useEffect, useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import GameArea from '../game/GameArea';
import InputPanel from '../input/InputPanel';
import { useGameLoop } from '../../hooks/useGameLoop';
import { useSound } from '../../hooks/useSound';

const FONT_FAMILY = "'OwnglyphParkDaHyun', sans-serif";

const GameScreen: React.FC = () => {
  const status = useGameStore((s) => s.status);
  const resumeGame = useGameStore((s) => s.resumeGame);
  const goToResult = useGameStore((s) => s.goToResult);
  const { playPause, playGameOver } = useSound();

  const [showGameOver, setShowGameOver] = useState(false);

  // Activate game loop
  useGameLoop();

  // Handle game over transition
  useEffect(() => {
    if (status === 'gameOver') {
      playGameOver();
      setShowGameOver(true);
      const timer = setTimeout(() => {
        setShowGameOver(false);
        goToResult();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status, goToResult, playGameOver]);

  const handleResume = () => {
    playPause();
    resumeGame();
  };

  return (
    <div className="fixed inset-0 flex flex-row" style={{ fontFamily: FONT_FAMILY }}>
      {/* Left: Game Area */}
      <div className="w-[55%] md:w-[60%] h-full">
        <GameArea />
      </div>

      {/* Right: Input Panel */}
      <div className="w-[45%] md:w-[40%] h-full">
        <InputPanel />
      </div>

      {/* Pause Overlay */}
      {status === 'paused' && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl px-12 py-8 shadow-2xl flex flex-col items-center gap-6">
            <span className="text-5xl">⏸️</span>
            <h2 className="text-3xl font-bold" style={{ color: '#5D4E37' }}>
              일시정지
            </h2>
            <div className="flex flex-col gap-4 w-full">
              <button
                onClick={handleResume}
                className="w-full px-10 py-4 rounded-2xl text-2xl font-bold text-white shadow-lg
                           transition-all duration-150 active:scale-95 hover:shadow-xl"
                style={{ backgroundColor: '#F5C542' }}
              >
                ▶️ 계속하기
              </button>
              <button
                onClick={() => goToResult()}
                className="w-full px-10 py-4 rounded-2xl text-2xl font-bold shadow-lg
                           transition-all duration-150 active:scale-95 hover:shadow-xl"
                style={{ backgroundColor: '#FFFFFF', color: '#5D4E37', border: '2px solid #5D4E37' }}
              >
                🛑 끝내기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Over Overlay */}
      {showGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div
            className="text-6xl font-bold text-white"
            style={{
              textShadow: '0 0 30px rgba(255,0,0,0.5)',
              animation: 'gameOverPulse 1s ease-in-out infinite',
            }}
          >
            게임 오버
          </div>
          <style>{`
            @keyframes gameOverPulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.1); opacity: 0.8; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
