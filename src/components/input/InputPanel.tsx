import React from 'react';
import { useGameStore } from '../../stores/gameStore';
import CurrentInput from './CurrentInput';
import Keypad from './Keypad';
import { useSound } from '../../hooks/useSound';

const FONT_FAMILY = "'OwnglyphParkDaHyun', sans-serif";

const InputPanel: React.FC = () => {
  const pauseGame = useGameStore((s) => s.pauseGame);
  const bgmEnabled = useGameStore((s) => s.bgmEnabled);
  const setBgmEnabled = useGameStore((s) => s.setBgmEnabled);
  const { playPause, playClick } = useSound();

  const timeLeft = useGameStore((s) => s.timeLeft);

  const handlePause = () => {
    playPause();
    pauseGame();
  };

  const toggleBgm = () => {
    playClick();
    setBgmEnabled(!bgmEnabled);
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="flex flex-col h-full relative"
      style={{
        fontFamily: FONT_FAMILY,
        backgroundColor: '#FFF8E8',
      }}
    >
      {/* Top left timer */}
      <div className="absolute top-3 left-3 z-10 flex items-center justify-center">
        <span
          className="text-lg md:text-xl font-bold bg-white px-4 py-2 rounded-full shadow-sm"
          style={{ color: '#776757', border: '3px solid #776757' }}
        >
          {formatTime(timeLeft)}
        </span>
      </div>

      {/* Top right buttons */}
      <div className="absolute top-3 right-3 z-10 flex gap-2">
        <button
          onClick={toggleBgm}
          className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-xl transition-all duration-150 active:scale-90 hover:shadow-lg"
        >
          {bgmEnabled ? '🎵' : '🔇'}
        </button>
        <button
          onClick={handlePause}
          className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-xl transition-all duration-150 active:scale-90 hover:shadow-lg"
          style={{ color: '#5D4E37' }}
        >
          ⏸️
        </button>
      </div>

      {/* Current input area - 30% */}
      <div className="flex-[3] min-h-0 border-b border-amber-200/50">
        <CurrentInput />
      </div>

      {/* Keypad area - 70% */}
      <div className="flex-[7] min-h-0">
        <Keypad />
      </div>
    </div>
  );
};

export default InputPanel;
