import React from 'react';
import { useGameStore } from '../../stores/gameStore';
import { analyzeWeakTags, calcWrongRate } from '../../game/scoring';

const FONT_FAMILY = "'OwnglyphParkDaHyun', sans-serif";

// Tag label map for Korean display
const TAG_LABELS: Record<string, string> = {
  addition: '덧셈',
  subtraction: '뺄셈',
  multiplication: '곱셈',
  division: '나눗셈',
  mixed: '혼합',
  one_digit: '한 자리',
  two_digit: '두 자리',
  three_digit: '세 자리',
  carry: '받아올림',
  borrow: '받아내림',
  no_remainder: '나머지 없음',
  multiplication_table: '구구단',
  large_number: '큰 수',
  order_of_operations: '연산 순서',
};

const ResultScreen: React.FC = () => {
  const score = useGameStore((s) => s.score);
  const correctCount = useGameStore((s) => s.correctCount);
  const wrongCount = useGameStore((s) => s.wrongCount);
  const missedCount = useGameStore((s) => s.missedCount);
  const maxCombo = useGameStore((s) => s.maxCombo);
  const answeredProblems = useGameStore((s) => s.answeredProblems);
  const resetGame = useGameStore((s) => s.resetGame);
  const startGame = useGameStore((s) => s.startGame);
  const setScreen = useGameStore((s) => s.setScreen);

  const wrongRate = calcWrongRate(correctCount, wrongCount);
  const weakTags = analyzeWeakTags(answeredProblems);
  const significantWeakTags = weakTags.filter((t) => t.rate > 0 && t.total >= 2).slice(0, 5);

  const handleRetry = () => {
    resetGame();
    startGame();
  };

  const handleHome = () => {
    resetGame();
    setScreen('start');
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-y-auto py-8"
      style={{
        fontFamily: FONT_FAMILY,
        background: 'linear-gradient(135deg, #FFF8E1 0%, #FFE0B2 50%, #FFCC80 100%)',
      }}
    >
      {/* Result Card */}
      <div className="bg-white rounded-3xl shadow-xl px-8 md:px-12 py-8 max-w-md w-[90%]">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6" style={{ color: '#5D4E37' }}>
          📊 결과
        </h1>

        {/* Score */}
        <div className="text-center mb-8">
          <span
            className="text-6xl font-bold"
            style={{ color: '#E8A838' }}
          >
            {score}
          </span>
          <span className="text-2xl ml-2" style={{ color: '#8B7355' }}>
            점
          </span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatItem label="✅ 정답" value={correctCount} color="#4CAF50" />
          <StatItem label="❌ 오답" value={wrongCount} color="#F44336" />
          <StatItem label="💨 놓침" value={missedCount} color="#FF9800" />
          <StatItem label="🔥 최고 콤보" value={maxCombo} color="#E8A838" />
        </div>

        {/* Wrong rate */}
        <div className="text-center mb-6 px-4 py-3 rounded-xl bg-gray-50">
          <span className="text-lg" style={{ color: '#5D4E37' }}>
            오답률:{' '}
            <span className="font-bold text-xl" style={{ color: wrongRate > 0.3 ? '#F44336' : '#4CAF50' }}>
              {(wrongRate * 100).toFixed(1)}%
            </span>
          </span>
        </div>

        {/* Weak tags analysis */}
        {significantWeakTags.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3" style={{ color: '#5D4E37' }}>
              📌 취약 유형
            </h3>
            <div className="flex flex-wrap gap-2">
              {significantWeakTags.map((t) => (
                <span
                  key={t.tag}
                  className="px-3 py-1 rounded-full text-sm font-bold text-white"
                  style={{
                    backgroundColor:
                      t.rate > 0.5 ? '#F44336' : t.rate > 0.3 ? '#FF9800' : '#FFC107',
                  }}
                >
                  {TAG_LABELS[t.tag] ?? t.tag} ({(t.rate * 100).toFixed(0)}%)
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleRetry}
            className="w-full py-4 rounded-2xl text-xl font-bold text-white shadow-md
                       transition-all duration-150 active:scale-95 hover:shadow-lg"
            style={{ backgroundColor: '#F5C542' }}
          >
            🔄 다시하기
          </button>
          <button
            onClick={handleHome}
            className="w-full py-4 rounded-2xl text-xl font-bold shadow-md
                       transition-all duration-150 active:scale-95 hover:shadow-lg"
            style={{ backgroundColor: '#FFFFFF', color: '#5D4E37', border: '2px solid #E0D5C5' }}
          >
            🏠 홈으로
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper component for stat items
const StatItem: React.FC<{ label: string; value: number; color: string }> = ({
  label,
  value,
  color,
}) => (
  <div className="flex flex-col items-center p-3 rounded-xl bg-gray-50">
    <span className="text-sm text-gray-500 mb-1">{label}</span>
    <span className="text-2xl font-bold" style={{ color }}>
      {value}
    </span>
  </div>
);

export default ResultScreen;
