import React from 'react';
import FlashcardArea from '../game/FlashcardArea';
import InputPanel from '../input/InputPanel';

const FONT_FAMILY = "'OwnglyphParkDaHyun', sans-serif";

/**
 * 플래시카드 게임 화면
 * - 산성비(GameScreen)와 완전히 동일한 레이아웃 / 비율 사용
 * - 왼쪽: FlashcardArea (배경이미지 + 큰 문제 텍스트 + 피드백 오버레이)
 * - 오른쪽: InputPanel (산성비와 동일한 키패드 패널 — 타이머/하트 없음)
 */
const FlashcardGameScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex flex-row" style={{ fontFamily: FONT_FAMILY }}>
      {/* 좌: 플래시카드 게임 영역 — GameArea와 동일한 비율 */}
      <div className="w-[55%] md:w-[60%] h-full">
        <FlashcardArea />
      </div>

      {/* 우: 입력 패널 — 산성비와 완전히 동일 */}
      <div className="w-[45%] md:w-[40%] h-full">
        <InputPanel />
      </div>
    </div>
  );
};

export default FlashcardGameScreen;
