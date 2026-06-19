import type { Operator, ProblemTag } from './types';

// 랜덤 정수 생성 (min~max 포함)
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 문제 생성 결과 타입
interface GeneratedProblem {
  expression: string;
  answer: number;
  operator: Operator;
  tags: ProblemTag[];
}

// ========== 덧셈 ==========

function genAdd01(): GeneratedProblem {
  let a: number, b: number;
  do { a = randomInt(1, 9); b = randomInt(1, 9); } while (a + b > 10);
  return { expression: `${a} + ${b} =`, answer: a + b, operator: '+', tags: ['addition', 'one_digit'] };
}

function genAdd02(): GeneratedProblem {
  let a: number, b: number;
  do { a = randomInt(1, 19); b = randomInt(1, 9); } while (a + b > 20);
  return { expression: `${a} + ${b} =`, answer: a + b, operator: '+', tags: ['addition'] };
}

function genAdd03(): GeneratedProblem {
  let a: number, b: number;
  do { a = randomInt(1, 50); b = randomInt(1, 50); } while (a + b > 50);
  return { expression: `${a} + ${b} =`, answer: a + b, operator: '+', tags: ['addition'] };
}

function genAdd04(): GeneratedProblem {
  let a: number, b: number;
  do { a = randomInt(1, 99); b = randomInt(1, 99); } while (a + b > 100);
  return { expression: `${a} + ${b} =`, answer: a + b, operator: '+', tags: ['addition'] };
}

function genAdd05(): GeneratedProblem {
  const a = randomInt(10, 99);
  const b = randomInt(1, 9);
  return { expression: `${a} + ${b} =`, answer: a + b, operator: '+', tags: ['addition', 'two_digit'] };
}

function genAdd06(): GeneratedProblem {
  const a = randomInt(10, 99);
  const b = randomInt(10, 99);
  return { expression: `${a} + ${b} =`, answer: a + b, operator: '+', tags: ['addition', 'two_digit'] };
}

function genAdd07(): GeneratedProblem {
  let a: number, b: number;
  do {
    a = randomInt(10, 99);
    b = randomInt(1, 99);
  } while ((a % 10) + (b % 10) < 10);
  return { expression: `${a} + ${b} =`, answer: a + b, operator: '+', tags: ['addition', 'carry'] };
}

function genAdd08(): GeneratedProblem {
  const a = randomInt(100, 999);
  const b = randomInt(100, 999);
  return { expression: `${a} + ${b} =`, answer: a + b, operator: '+', tags: ['addition', 'three_digit'] };
}

// ========== 뺄셈 ==========

function genSub01(): GeneratedProblem {
  const a = randomInt(1, 9);
  const b = randomInt(1, a);
  return { expression: `${a} - ${b} =`, answer: a - b, operator: '-', tags: ['subtraction', 'one_digit'] };
}

function genSub02(): GeneratedProblem {
  const a = randomInt(1, 20);
  const b = randomInt(1, a);
  return { expression: `${a} - ${b} =`, answer: a - b, operator: '-', tags: ['subtraction'] };
}

function genSub03(): GeneratedProblem {
  const a = randomInt(1, 50);
  const b = randomInt(1, a);
  return { expression: `${a} - ${b} =`, answer: a - b, operator: '-', tags: ['subtraction'] };
}

function genSub04(): GeneratedProblem {
  const a = randomInt(1, 100);
  const b = randomInt(1, a);
  return { expression: `${a} - ${b} =`, answer: a - b, operator: '-', tags: ['subtraction'] };
}

function genSub05(): GeneratedProblem {
  const a = randomInt(10, 99);
  const b = randomInt(1, 9);
  return { expression: `${a} - ${b} =`, answer: a - b, operator: '-', tags: ['subtraction', 'two_digit'] };
}

function genSub06(): GeneratedProblem {
  const a = randomInt(10, 99);
  const b = randomInt(10, a);
  return { expression: `${a} - ${b} =`, answer: a - b, operator: '-', tags: ['subtraction', 'two_digit'] };
}

function genSub07(): GeneratedProblem {
  let a: number, b: number;
  do {
    a = randomInt(10, 99);
    b = randomInt(1, a);
  } while ((a % 10) >= (b % 10));
  return { expression: `${a} - ${b} =`, answer: a - b, operator: '-', tags: ['subtraction', 'borrow'] };
}

function genSub08(): GeneratedProblem {
  const a = randomInt(100, 999);
  const b = randomInt(100, a);
  return { expression: `${a} - ${b} =`, answer: a - b, operator: '-', tags: ['subtraction', 'three_digit'] };
}

// ========== 구구단 ==========

function genTable(n: number): GeneratedProblem {
  const b = randomInt(1, 9);
  return { expression: `${n} × ${b} =`, answer: n * b, operator: '×', tags: ['multiplication_table'] };
}

function genTableAll(): GeneratedProblem {
  const a = randomInt(2, 9);
  const b = randomInt(1, 9);
  return { expression: `${a} × ${b} =`, answer: a * b, operator: '×', tags: ['multiplication_table'] };
}

// ========== 곱셈 ==========

function genMul01(): GeneratedProblem {
  const a = randomInt(2, 9);
  const b = randomInt(1, 9);
  return { expression: `${a} × ${b} =`, answer: a * b, operator: '×', tags: ['multiplication', 'multiplication_table'] };
}

function genMul02(): GeneratedProblem {
  const a = randomInt(10, 99);
  const b = randomInt(2, 9);
  return { expression: `${a} × ${b} =`, answer: a * b, operator: '×', tags: ['multiplication', 'two_digit'] };
}

function genMul03(): GeneratedProblem {
  const a = randomInt(100, 999);
  const b = randomInt(2, 9);
  return { expression: `${a} × ${b} =`, answer: a * b, operator: '×', tags: ['multiplication', 'three_digit'] };
}

function genMul04(): GeneratedProblem {
  const a = randomInt(1, 9) * 10;
  const b = randomInt(2, 9);
  return { expression: `${a} × ${b} =`, answer: a * b, operator: '×', tags: ['multiplication'] };
}

function genMul05(): GeneratedProblem {
  const a = randomInt(1, 9) * 10;
  const b = randomInt(1, 9) * 10;
  return { expression: `${a} × ${b} =`, answer: a * b, operator: '×', tags: ['multiplication'] };
}

function genMul06(): GeneratedProblem {
  const a = randomInt(10, 99);
  const b = randomInt(10, 99);
  return { expression: `${a} × ${b} =`, answer: a * b, operator: '×', tags: ['multiplication', 'two_digit'] };
}

// ========== 나눗셈 (나머지 없음) ==========

function genDiv01(): GeneratedProblem {
  const q = randomInt(1, 9);
  const d = randomInt(2, 9);
  const n = q * d;
  return { expression: `${n} ÷ ${d} =`, answer: q, operator: '÷', tags: ['division', 'no_remainder'] };
}

function genDiv02(): GeneratedProblem {
  let q: number, d: number, n: number;
  do { q = randomInt(2, 20); d = randomInt(2, 9); n = q * d; } while (n > 99);
  return { expression: `${n} ÷ ${d} =`, answer: q, operator: '÷', tags: ['division', 'no_remainder'] };
}

function genDiv03(): GeneratedProblem {
  let q: number, d: number, n: number;
  do { q = randomInt(10, 99); d = randomInt(2, 9); n = q * d; } while (n > 999);
  return { expression: `${n} ÷ ${d} =`, answer: q, operator: '÷', tags: ['division', 'no_remainder'] };
}

function genDiv04(): GeneratedProblem {
  let q: number, d: number, n: number;
  do { q = randomInt(2, 9); d = randomInt(10, 99); n = q * d; } while (n > 999);
  return { expression: `${n} ÷ ${d} =`, answer: q, operator: '÷', tags: ['division', 'no_remainder'] };
}

function genDiv05(): GeneratedProblem {
  let q: number, d: number, n: number;
  do { q = randomInt(2, 20); d = randomInt(10, 99); n = q * d; } while (n > 999);
  return { expression: `${n} ÷ ${d} =`, answer: q, operator: '÷', tags: ['division', 'no_remainder'] };
}

// ========== 혼합계산 ==========

function genOrder01(): GeneratedProblem {
  const ops: Operator[] = ['+', '-', '×', '÷'];
  const op = ops[randomInt(0, 3)];
  let a: number, b: number, answer: number;

  if (op === '+') {
    a = randomInt(1, 50); b = randomInt(1, 50); answer = a + b;
  } else if (op === '-') {
    a = randomInt(1, 99); b = randomInt(1, a); answer = a - b;
  } else if (op === '×') {
    a = randomInt(2, 9); b = randomInt(1, 9); answer = a * b;
  } else {
    const q = randomInt(1, 9); const d = randomInt(2, 9);
    a = q * d; b = d; answer = q;
  }
  const opStr = op;
  return { expression: `${a} ${opStr} ${b} =`, answer, operator: op, tags: ['mixed'] };
}

function genOrder02(): GeneratedProblem {
  const ops = ['+', '-'] as const;
  let a: number, b: number, c: number, mid: number, answer: number;
  const op1 = ops[randomInt(0, 1)];
  const op2 = ops[randomInt(0, 1)];

  do {
    a = randomInt(1, 30); b = randomInt(1, 30); c = randomInt(1, 30);
    mid = op1 === '+' ? a + b : a - b;
    answer = op2 === '+' ? mid + c : mid - c;
  } while (mid < 0 || answer < 0);

  return { expression: `${a} ${op1} ${b} ${op2} ${c} =`, answer, operator: '+', tags: ['mixed'] };
}

function genOrder03(): GeneratedProblem {
  const a = randomInt(1, 20);
  const b = randomInt(2, 9);
  const c = randomInt(1, 9);
  const answer = a + b * c;
  return { expression: `${a} + ${b} × ${c} =`, answer, operator: '×', tags: ['mixed', 'order_of_operations'] };
}

function genOrder04(): GeneratedProblem {
  const a = randomInt(1, 10);
  const b = randomInt(1, 10);
  const c = randomInt(2, 9);
  const answer = (a + b) * c;
  return { expression: `(${a} + ${b}) × ${c} =`, answer, operator: '×', tags: ['mixed', 'order_of_operations'] };
}

function genOrder05(): GeneratedProblem {
  const a = randomInt(2, 9);
  const b = randomInt(2, 9);
  const product = a * b;
  // c가 product를 나누어 떨어지게 하기 위해 c를 product의 약수로 선택
  const divisors = [];
  for (let i = 1; i <= product; i++) {
    if (product % i === 0 && i <= 9) divisors.push(i);
  }
  const d = divisors[randomInt(0, divisors.length - 1)];
  const answer = product / d;
  return { expression: `${a} × ${b} ÷ ${d} =`, answer, operator: '÷', tags: ['mixed', 'division', 'no_remainder'] };
}

// ========== 레벨 → 생성기 매핑 ==========

const generatorMap: Record<string, () => GeneratedProblem> = {
  ADD_01: genAdd01, ADD_02: genAdd02, ADD_03: genAdd03, ADD_04: genAdd04,
  ADD_05: genAdd05, ADD_06: genAdd06, ADD_07: genAdd07, ADD_08: genAdd08,
  SUB_01: genSub01, SUB_02: genSub02, SUB_03: genSub03, SUB_04: genSub04,
  SUB_05: genSub05, SUB_06: genSub06, SUB_07: genSub07, SUB_08: genSub08,
  TABLE_02: () => genTable(2), TABLE_03: () => genTable(3),
  TABLE_04: () => genTable(4), TABLE_05: () => genTable(5),
  TABLE_06: () => genTable(6), TABLE_07: () => genTable(7),
  TABLE_08: () => genTable(8), TABLE_09: () => genTable(9),
  TABLE_ALL: genTableAll,
  MUL_01: genMul01, MUL_02: genMul02, MUL_03: genMul03,
  MUL_04: genMul04, MUL_05: genMul05, MUL_06: genMul06,
  DIV_01: genDiv01, DIV_02: genDiv02, DIV_03: genDiv03,
  DIV_04: genDiv04, DIV_05: genDiv05,
  ORDER_01: genOrder01, ORDER_02: genOrder02, ORDER_03: genOrder03,
  ORDER_04: genOrder04, ORDER_05: genOrder05,
};

// 섞어서 모드의 포함 레벨
const mixLevelMap: Record<string, string[]> = {
  MIX_ADD_SUB_BASIC: ['ADD_01', 'ADD_02', 'ADD_03', 'ADD_04', 'SUB_01', 'SUB_02', 'SUB_03', 'SUB_04'],
  MIX_ADD_SUB_ADV: ['ADD_05', 'ADD_06', 'ADD_07', 'ADD_08', 'SUB_05', 'SUB_06', 'SUB_07', 'SUB_08'],
  MIX_MUL_DIV_BASIC: ['MUL_01', 'DIV_01'],
  MIX_MUL_DIV_ADV: ['MUL_02', 'MUL_03', 'MUL_04', 'MUL_05', 'MUL_06', 'DIV_02', 'DIV_03', 'DIV_04', 'DIV_05'],
  MIX_ALL_NATURAL: [
    'ADD_01', 'ADD_02', 'ADD_03', 'ADD_04', 'ADD_05', 'ADD_06', 'ADD_07', 'ADD_08',
    'SUB_01', 'SUB_02', 'SUB_03', 'SUB_04', 'SUB_05', 'SUB_06', 'SUB_07', 'SUB_08',
    'MUL_01', 'MUL_02', 'MUL_03', 'MUL_04', 'MUL_05', 'MUL_06',
    'DIV_01', 'DIV_02', 'DIV_03', 'DIV_04', 'DIV_05',
  ],
};

/**
 * 레벨 ID를 받아 문제를 생성한다.
 * 섞어서 모드일 경우 포함 레벨 중 랜덤으로 하나를 선택한다.
 */
export function generateProblem(levelId: string): GeneratedProblem {
  // 섞어서 모드인 경우
  if (mixLevelMap[levelId]) {
    const subLevels = mixLevelMap[levelId];
    const chosen = subLevels[randomInt(0, subLevels.length - 1)];
    return generatorMap[chosen]();
  }

  const generator = generatorMap[levelId];
  if (!generator) {
    throw new Error(`Unknown level: ${levelId}`);
  }
  return generator();
}

export { generatorMap, mixLevelMap };
