import React from 'react';
import { useGameStore } from '../../stores/gameStore';
import { useSound } from '../../hooks/useSound';

const FONT_FAMILY = "'OwnglyphParkDaHyun', sans-serif";

const Keypad: React.FC = () => {
  const appendInput = useGameStore((s) => s.appendInput);
  const deleteInput = useGameStore((s) => s.deleteInput);
  const submitAnswer = useGameStore((s) => s.submitAnswer);
  const { playClick, playCorrect, playWrong, playMultiCorrect } = useSound();

  const handleNumberPress = (digit: string) => {
    playClick();
    appendInput(digit);
  };

  const handleDelete = () => {
    playClick();
    deleteInput();
  };

  const handleSubmit = () => {
    const result = submitAnswer();
    if (result.isCorrect) {
      if (result.matchedCount > 1) {
        playMultiCorrect();
      } else {
        playCorrect();
      }
    } else {
      playWrong();
    }
  };

  const numberButton = (digit: string) => (
    <button
      key={digit}
      onClick={() => handleNumberPress(digit)}
      className="flex items-center justify-center shadow-sm
                 transition-all duration-100 active:scale-95 active:bg-gray-100
                 hover:shadow-md select-none"
      style={{
        fontFamily: FONT_FAMILY,
        backgroundColor: '#FFFFFF',
        borderRadius: '48px',
        color: '#776757',
        fontSize: 'clamp(1.5rem, 3vw, 3rem)',
        fontWeight: 'bold',
      }}
    >
      {digit}
    </button>
  );

  const actionButton = (label: string, onClick: () => void) => (
    <button
      onClick={onClick}
      className="flex items-center justify-center shadow-sm
                 transition-all duration-100 active:scale-95 active:brightness-90
                 hover:shadow-md select-none"
      style={{
        fontFamily: FONT_FAMILY,
        backgroundColor: '#FFE08B',
        borderRadius: '48px',
        color: '#776757',
        fontSize: 'clamp(1.2rem, 2.5vw, 2.25rem)',
        fontWeight: 'bold',
      }}
    >
      {label}
    </button>
  );

  return (
    <div className="h-full p-3 md:p-4 flex flex-col">
      <div className="grid grid-cols-3 gap-2 md:gap-3 flex-1">
        {/* Row 1: 7 8 9 */}
        {numberButton('7')}
        {numberButton('8')}
        {numberButton('9')}

        {/* Row 2: 4 5 6 */}
        {numberButton('4')}
        {numberButton('5')}
        {numberButton('6')}

        {/* Row 3: 1 2 3 */}
        {numberButton('1')}
        {numberButton('2')}
        {numberButton('3')}

        {/* Row 4: 지우기 0 입력 */}
        {actionButton('지우기', handleDelete)}
        {numberButton('0')}
        {actionButton('입력', handleSubmit)}
      </div>
    </div>
  );
};

export default Keypad;
