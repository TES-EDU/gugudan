import React from 'react';
import { useGameStore } from '../../stores/gameStore';
import { getStageById } from '../../data/gugudanData';

const FONT_FAMILY = "'OwnglyphParkDaHyun', sans-serif";

const FlashcardArea: React.FC = () => {
  const levelId = useGameStore((s) => s.levelId);
  const flashcardProblems = useGameStore((s) => s.flashcardProblems);
  const flashcardIndex = useGameStore((s) => s.flashcardIndex);
  const flashcardResult = useGameStore((s) => s.flashcardResult);
  const setScreen = useGameStore((s) => s.setScreen);
  const resetGame = useGameStore((s) => s.resetGame);

  const stage = getStageById(levelId);
  const currentProblem = flashcardProblems[flashcardIndex];
  const total = flashcardProblems.length;

  const handleBack = () => {
    resetGame();
    setScreen('curriculumSelect');
  };

  // 피드백에 따른 배경색
  const bgColor =
    flashcardResult === 'correct' ? '#E8F5E9' : // 연한 초록
    flashcardResult === 'wrong'   ? '#FFEBEE' : // 연한 빨강
    '#E9EDC9'; // 카드 배경색 (#E9EDC9)

  return (
    <div
      className="relative h-full overflow-hidden flex items-center justify-center transition-colors duration-300"
      style={{
        backgroundColor: bgColor,
        fontFamily: FONT_FAMILY,
      }}
    >

      {/* 좌상단: 뒤로가기 */}
      <div className="absolute top-3 left-3 z-20">
        <button
          onClick={handleBack}
          className="px-4 py-2 rounded-full font-bold text-lg shadow-md transition-all active:scale-95"
          style={{
            backgroundColor: 'rgba(255,255,255,0.88)',
            color: '#5C4A1E',
            border: '2px solid rgba(174,191,136,0.5)',
          }}
        >
          ←
        </button>
      </div>

      {/* 우상단: 단 이름 + 진행 */}
      <div className="absolute top-3 right-3 z-20">
        <span
          className="px-4 py-2 rounded-full font-bold text-lg shadow-md"
          style={{
            backgroundColor: 'rgba(255,255,255,0.88)',
            color: '#5C4A1E',
            border: '2px solid rgba(174,191,136,0.5)',
          }}
        >
          {stage?.label}&nbsp;&nbsp;{flashcardIndex + 1}/{total}
        </span>
      </div>

      {/* 하단 진행바 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1.5 z-20"
        style={{ backgroundColor: 'rgba(233,237,201,0.5)' }}
      >
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${(flashcardIndex / total) * 100}%`,
            background: 'linear-gradient(90deg, #CCD5AE, #AEBF88)',
          }}
        />
      </div>

      {/* 문제 텍스트 — 배경 위에 크게 직접 표시 */}
      {currentProblem && (
        <div className="relative z-10 flex flex-col items-center justify-center select-none w-full h-full">
          {/* 메인 식 */}
          <div
            className="font-bold text-center leading-none"
            style={{
              color: '#5C4A1E',
              fontSize: 'clamp(5rem, 15vw, 12rem)', // 글자 크기 대폭 키움
            }}
          >
            {currentProblem.expression}
          </div>

          {/* 피드백 영역 (absolute로 띄워서 메인 식이 밀려 올라가지 않게 함) */}
          <div className="absolute top-[70%] left-1/2 -translate-x-1/2 w-full flex justify-center">
            {/* 오답 시 정답 표시 */}
            {flashcardResult === 'wrong' && (
              <div
                className="px-6 py-2 rounded-2xl font-bold text-center"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  color: '#E53935',
                  fontSize: 'clamp(1.2rem, 3.5vw, 2.2rem)',
                  boxShadow: '0 4px 16px rgba(229,57,53,0.2)',
                }}
              >
                정답: {currentProblem.answer}
              </div>
            )}

            {/* 정답 시 체크 */}
            {flashcardResult === 'correct' && (
              <div
                className="font-bold text-center"
                style={{
                  color: '#43A047',
                  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                  textShadow: '0 2px 8px rgba(255,255,255,0.6)',
                }}
              >
                ✓ {currentProblem.answer}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardArea;
