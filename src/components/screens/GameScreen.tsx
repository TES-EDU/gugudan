import React, { useEffect, useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import GameArea from '../game/GameArea';
import InputPanel from '../input/InputPanel';
import { useGameLoop } from '../../hooks/useGameLoop';
import { useSound } from '../../hooks/useSound';
import FlashcardGameScreen from './FlashcardGameScreen';

const FONT_FAMILY = "'OwnglyphParkDaHyun', sans-serif";

const GameScreen: React.FC = () => {
  const status = useGameStore((s) => s.status);
  const gameMode = useGameStore((s) => s.gameMode);
  const resumeGame = useGameStore((s) => s.resumeGame);
  const goToResult = useGameStore((s) => s.goToResult);
  const speedMultiplier = useGameStore((s) => s.speedMultiplier);
  const setSpeedMultiplier = useGameStore((s) => s.setSpeedMultiplier);
  const { playPause, playGameOver } = useSound();

  const [showGameOver, setShowGameOver] = useState(false);

  // Activate game loop (산성비 모드에서만 실제 동작)
  useGameLoop();

  // Handle game over transition
  useEffect(() => {
    if (status === 'gameOver' && gameMode === 'rain') {
      playGameOver();
      setShowGameOver(true);
      const timer = setTimeout(() => {
        setShowGameOver(false);
        goToResult();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status, gameMode, goToResult, playGameOver]);

  // 플래시카드 모드면 해당 화면으로 분기 (hooks 이후에)
  if (gameMode === 'flashcard') {
    return <FlashcardGameScreen />;
  }

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
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="pause-modal bg-white rounded-3xl w-full max-w-[500px] px-6 py-6 md:px-10 md:py-10 shadow-2xl flex flex-col items-center gap-4 md:gap-6 max-h-[95vh] overflow-y-auto">
            <span className="pause-icon text-4xl md:text-5xl">⏸️</span>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#5D4E37' }}>
              일시정지
            </h2>
            
            {/* Speed Control in Pause */}
            <div className="w-full bg-gray-50 rounded-2xl px-5 py-4 md:py-6 my-1 shadow-inner">
              <div className="text-xs md:text-sm font-bold text-gray-500 mb-4 md:mb-6 text-center">게임 속도 변경</div>
              
              <div className="relative mb-6">
                {/* Custom Track Container */}
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
                        <span className={`absolute top-0 whitespace-nowrap font-bold transition-all duration-300`}
                          style={{ color: isActive ? '#5C891F' : '#9E9E9E', fontSize: isActive ? '13px' : '11px', transform: isActive ? 'scale(1.1)' : 'scale(1)' }}>
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-3 md:gap-4 w-full mt-2 md:mt-4">
              <button
                onClick={() => goToResult()}
                className="flex-1 px-4 py-3 md:py-4 rounded-2xl text-lg md:text-xl font-bold shadow-md
                           transition-all duration-150 active:scale-95 hover:shadow-lg"
                style={{ backgroundColor: '#FFFFFF', color: '#5C4A1E', border: '2px solid #5C4A1E' }}
              >
                🛑 끝내기
              </button>
              <button
                onClick={handleResume}
                className="flex-[2] px-4 py-3 md:py-4 rounded-2xl text-lg md:text-xl font-bold text-white shadow-lg
                           transition-all duration-150 active:scale-95 hover:shadow-xl"
                style={{ backgroundColor: '#AEBF88' }}
              >
                ▶️ 계속하기
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
