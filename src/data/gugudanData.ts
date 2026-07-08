// ============================================================
// 구구단 21단계 데이터 & 문제 생성
// ============================================================

export interface GugudanStage {
  id: string;           // 'GG_00' ~ 'GG_19', 'GG_SQ'
  n: number;            // 해당 단의 숫자 (제곱수 단은 -1)
  label: string;        // 표시 라벨
  type: 'times' | 'square';
  icon: string;
  color: string;        // 카드 강조색
}

export interface GugudanProblem {
  expression: string;   // 예) "2×7"
  answer: number;
  a: number;
  b: number;
}

// ── 21단계 정의 ──────────────────────────────────────────────
export const GUGUDAN_STAGES: GugudanStage[] = [
  { id: 'GG_00', n: 0,  label: '0단',   type: 'times',  icon: '', color: '#CCD5AE' },
  { id: 'GG_01', n: 1,  label: '1단',   type: 'times',  icon: '', color: '#CCD5AE' },
  { id: 'GG_02', n: 2,  label: '2단',   type: 'times',  icon: '', color: '#AEBF88' },
  { id: 'GG_03', n: 3,  label: '3단',   type: 'times',  icon: '', color: '#CCD5AE' },
  { id: 'GG_04', n: 4,  label: '4단',   type: 'times',  icon: '', color: '#AEBF88' },
  { id: 'GG_05', n: 5,  label: '5단',   type: 'times',  icon: '', color: '#C4D08A' },
  { id: 'GG_06', n: 6,  label: '6단',   type: 'times',  icon: '', color: '#AEBF88' },
  { id: 'GG_07', n: 7,  label: '7단',   type: 'times',  icon: '', color: '#CCD5AE' },
  { id: 'GG_08', n: 8,  label: '8단',   type: 'times',  icon: '', color: '#AEBF88' },
  { id: 'GG_09', n: 9,  label: '9단',   type: 'times',  icon: '', color: '#C4D08A' },
  { id: 'GG_10', n: 10, label: '10단',  type: 'times',  icon: '', color: '#AEBF88' },
  { id: 'GG_11', n: 11, label: '11단',  type: 'times',  icon: '', color: '#CCD5AE' },
  { id: 'GG_12', n: 12, label: '12단',  type: 'times',  icon: '', color: '#AEBF88' },
  { id: 'GG_13', n: 13, label: '13단',  type: 'times',  icon: '', color: '#C4D08A' },
  { id: 'GG_14', n: 14, label: '14단',  type: 'times',  icon: '', color: '#AEBF88' },
  { id: 'GG_15', n: 15, label: '15단',  type: 'times',  icon: '', color: '#CCD5AE' },
  { id: 'GG_16', n: 16, label: '16단',  type: 'times',  icon: '', color: '#AEBF88' },
  { id: 'GG_17', n: 17, label: '17단',  type: 'times',  icon: '', color: '#C4D08A' },
  { id: 'GG_18', n: 18, label: '18단',  type: 'times',  icon: '', color: '#AEBF88' },
  { id: 'GG_19', n: 19, label: '19단',  type: 'times',  icon: '', color: '#CCD5AE' },
  { id: 'GG_SQ', n: -1, label: '제곱수', type: 'square', icon: '', color: '#AEBF88' },
];

export function getStageById(id: string): GugudanStage | undefined {
  return GUGUDAN_STAGES.find(s => s.id === id);
}

// ── 문제 생성 ──────────────────────────────────────────────
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 구구단 문제 하나 생성
 * @param stageId  'GG_00' ~ 'GG_19' | 'GG_SQ'
 * @param includeCommutative  교환법칙 포함 여부 (2단에서 7×2 형태도 출제)
 */
export function generateGugudanProblem(
  stageId: string,
  includeCommutative = false
): GugudanProblem {
  const stage = getStageById(stageId);
  if (!stage) throw new Error(`Unknown stageId: ${stageId}`);

  if (stage.type === 'square') {
    // 제곱수 단: 11²~19² 중 랜덤
    const base = randomInt(11, 19);
    const answer = base * base;
    return { expression: `${base}×${base}`, answer, a: base, b: base };
  }

  // 일반 단: N × rand(1,9)
  const n = stage.n;
  const multiplier = randomInt(1, 9);

  if (includeCommutative && n !== 0 && n !== 1 && Math.random() < 0.3) {
    // 30% 확률로 교환법칙 형태 (multiplier × n)
    return {
      expression: `${multiplier}×${n}`,
      answer: multiplier * n,
      a: multiplier,
      b: n,
    };
  }

  return {
    expression: `${n}×${multiplier}`,
    answer: n * multiplier,
    a: n,
    b: multiplier,
  };
}

/**
 * 플래시카드 모드용: 해당 단의 1~9 전체 문제를 순서대로 반환
 */
export function generateFlashcardSequence(
  stageId: string,
  includeCommutative = false
): GugudanProblem[] {
  const stage = getStageById(stageId);
  if (!stage) throw new Error(`Unknown stageId: ${stageId}`);

  if (stage.type === 'square') {
    // 제곱수 단: 11²~19² 순서대로
    return Array.from({ length: 9 }, (_, i) => {
      const base = i + 11;
      return { expression: `${base}×${base}`, answer: base * base, a: base, b: base };
    });
  }

  const n = stage.n;
  const problems: GugudanProblem[] = [];

  for (let i = 1; i <= 9; i++) {
    problems.push({
      expression: `${n}×${i}`,
      answer: n * i,
      a: n,
      b: i,
    });
    // 교환법칙 ON이고, n이 1도 i도 n도 아닌 경우 역방향 추가
    if (includeCommutative && n !== i && n > 1 && i > 1) {
      problems.push({
        expression: `${i}×${n}`,
        answer: i * n,
        a: i,
        b: n,
      });
    }
  }

  return problems;
}
