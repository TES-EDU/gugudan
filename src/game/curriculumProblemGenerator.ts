import type { ProblemTag, Operator, GradeId } from './types';
import { getUnitById } from '../data/curriculum';

export interface GeneratedProblem {
  expression: string;
  answer: number;
  operator: Operator | 'mixed';
  tags: ProblemTag[];
  gradeId: GradeId;
  unitId: string;
}

// ==========================================
// Helper Functions
// ==========================================
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function hasCarry(a: number, b: number): boolean {
  let tempA = a, tempB = b;
  while (tempA > 0 && tempB > 0) {
    if ((tempA % 10) + (tempB % 10) >= 10) return true;
    tempA = Math.floor(tempA / 10);
    tempB = Math.floor(tempB / 10);
  }
  return false;
}

function hasBorrow(a: number, b: number): boolean {
  let tempA = a, tempB = b;
  while (tempA > 0 && tempB > 0) {
    if ((tempA % 10) < (tempB % 10)) return true;
    tempA = Math.floor(tempA / 10);
    tempB = Math.floor(tempB / 10);
  }
  return false;
}

// ==========================================
// Generators
// ==========================================

export function generateCurriculumProblem(unitId: string): GeneratedProblem {
  const unit = getUnitById(unitId);
  if (!unit) throw new Error(`Unknown unitId: ${unitId}`);

  let a = 0, b = 0, c = 0, answer = 0;
  let expression = '';
  let operator: Operator | 'mixed' = '+';
  
  switch (unitId) {
    // G1 (20 units)
    case 'G1_U01': // 더하기(+1, +2, +3)
      b = randomInt(1, 3); a = randomInt(1, 9); answer = a + b; operator = '+'; expression = `${a}+${b}`; break;
    case 'G1_U02': // 더하기(+4, +5, +6)
      b = randomInt(4, 6); a = randomInt(1, 9); answer = a + b; operator = '+'; expression = `${a}+${b}`; break;
    case 'G1_U03': // 더하기(+7, +8, +9)
      b = randomInt(7, 9); a = randomInt(1, 9); answer = a + b; operator = '+'; expression = `${a}+${b}`; break;
    case 'G1_U04': // 합이 15 이하인 덧셈
      do { a = randomInt(1, 14); b = randomInt(1, 14 - a); answer = a + b; } while(answer > 15 || answer < 2);
      operator = '+'; expression = `${a}+${b}`; break;
    case 'G1_U05': // 합이 20 이하인 덧셈
      do { a = randomInt(5, 15); b = randomInt(5, 15); answer = a + b; } while(answer > 20 || answer <= 10);
      operator = '+'; expression = `${a}+${b}`; break;
    case 'G1_U06': // (몇십)+(몇)
      a = randomInt(1, 9) * 10; b = randomInt(1, 9); answer = a + b; operator = '+'; expression = `${a}+${b}`; break;
    case 'G1_U07': // (몇십)+(몇십)
      a = randomInt(1, 8) * 10; b = randomInt(1, 9 - (a/10)) * 10; answer = a + b; operator = '+'; expression = `${a}+${b}`; break;
    case 'G1_U08': // (몇십 몇)+(몇)
      a = randomInt(1, 8) * 10 + randomInt(1, 8); b = randomInt(1, 9 - (a%10)); answer = a + b; operator = '+'; expression = `${a}+${b}`; break;
    case 'G1_U09': // (몇십 몇)+(몇십)
      a = randomInt(1, 8) * 10 + randomInt(1, 9); b = randomInt(1, 9 - Math.floor(a/10)) * 10; answer = a + b; operator = '+'; expression = `${a}+${b}`; break;
    case 'G1_U10': // 덧셈 종합(합이 50 이하인 수)
      do { a = randomInt(10, 40); b = randomInt(10, 40); answer = a + b; } while(answer > 50);
      operator = '+'; expression = `${a}+${b}`; break;
    case 'G1_U11': // 빼기(-1, -2, -3, -4, -5)
      b = randomInt(1, 5); a = randomInt(b, b + 9); answer = a - b; operator = '-'; expression = `${a}-${b}`; break;
    case 'G1_U12': // 빼기(-6, -7, -8, -9, -10)
      b = randomInt(6, 10); a = randomInt(b, b + 9); answer = a - b; operator = '-'; expression = `${a}-${b}`; break;
    case 'G1_U13': // (몇십)-(몇십)
      b = randomInt(1, 8) * 10; a = randomInt(b/10 + 1, 9) * 10; answer = a - b; operator = '-'; expression = `${a}-${b}`; break;
    case 'G1_U14': // (몇십 몇)-(몇십)
      b = randomInt(1, 8) * 10; a = randomInt(b/10 + 1, 9) * 10 + randomInt(1, 9); answer = a - b; operator = '-'; expression = `${a}-${b}`; break;
    case 'G1_U15': // (몇십)-(몇)
      a = randomInt(2, 9) * 10; b = randomInt(1, 9); answer = a - b; operator = '-'; expression = `${a}-${b}`; break;
    case 'G1_U16': // (몇십 몇)-(몇)
      a = randomInt(2, 9) * 10 + randomInt(1, 9); b = randomInt(1, 9); answer = a - b; operator = '-'; expression = `${a}-${b}`; break;
    case 'G1_U17': // 뺄셈 종합
      b = randomInt(11, 40); a = randomInt(b + 1, 50); answer = a - b; operator = '-'; expression = `${a}-${b}`; break;
    case 'G1_U18': // 세 수의 덧셈
      a = randomInt(1, 9); b = randomInt(1, 9); c = randomInt(1, 9); answer = a + b + c; operator = '+'; expression = `${a}+${b}+${c}`; break;
    case 'G1_U19': // 세 수의 뺄셈
      c = randomInt(1, 9); b = randomInt(1, 9); a = randomInt(b + c + 1, b + c + 10); answer = a - b - c; operator = '-'; expression = `${a}-${b}-${c}`; break;
    case 'G1_U20': // 세 수의 계산
      if (Math.random() > 0.5) {
        a = randomInt(1, 10); b = randomInt(1, 10); c = randomInt(1, a + b); answer = a + b - c; expression = `${a}+${b}-${c}`;
      } else {
        b = randomInt(1, 10); a = randomInt(b + 1, 15); c = randomInt(1, 10); answer = a - b + c; expression = `${a}-${b}+${c}`;
      }
      operator = 'mixed'; break;

    // G2 (18 units)
    case 'G2_U01': // 받아올림 없는 (두 자리 수)+(한 자리 수)
      do { a = randomInt(11, 88); b = randomInt(1, 8); answer = a + b; } while(hasCarry(a, b));
      operator = '+'; expression = `${a}+${b}`; break;
    case 'G2_U02': // 받아올림 없는 (두 자리 수)+(두 자리 수)
      do { a = randomInt(11, 88); b = randomInt(11, 88); answer = a + b; } while(hasCarry(a, b) || answer >= 100);
      operator = '+'; expression = `${a}+${b}`; break;
    case 'G2_U03': // 받아올림 있는 (두 자리 수)+(한 자리 수)
      do { a = randomInt(11, 89); b = randomInt(2, 9); answer = a + b; } while(!hasCarry(a, b));
      operator = '+'; expression = `${a}+${b}`; break;
    case 'G2_U04': // 받아올림 있는 (두 자리 수)+(두 자리 수)
      do { a = randomInt(11, 89); b = randomInt(11, 89); answer = a + b; } while(!hasCarry(a, b) || answer >= 100);
      operator = '+'; expression = `${a}+${b}`; break;
    case 'G2_U05': // 받아올림 없는 (세 자리 수)+(세 자리 수)
      do { a = randomInt(111, 888); b = randomInt(111, 888); answer = a + b; } while(hasCarry(a, b) || answer >= 1000);
      operator = '+'; expression = `${a}+${b}`; break;
    case 'G2_U06': // 받아올림 있는 (세 자리 수)+(두 자리 수)
      do { a = randomInt(111, 889); b = randomInt(11, 89); answer = a + b; } while(!hasCarry(a, b) || answer >= 1000);
      operator = '+'; expression = `${a}+${b}`; break;
    case 'G2_U07': // 받아올림 있는 (세 자리 수)+(세 자리 수)
      do { a = randomInt(111, 889); b = randomInt(111, 889); answer = a + b; } while(!hasCarry(a, b) || answer >= 1000);
      operator = '+'; expression = `${a}+${b}`; break;
    case 'G2_U08': // 받아올림 없는 (네 자리 수)+(네 자리 수)
      do { a = randomInt(1111, 8888); b = randomInt(1111, 8888); answer = a + b; } while(hasCarry(a, b) || answer >= 10000);
      operator = '+'; expression = `${a}+${b}`; break;
    case 'G2_U09': // 세 수의 덧셈
      a = randomInt(11, 30); b = randomInt(11, 30); c = randomInt(11, 30); answer = a + b + c; operator = '+'; expression = `${a}+${b}+${c}`; break;
    case 'G2_U10': // 받아내림 없는 (두 자리 수)-(한 자리 수)
      do { b = randomInt(1, 8); a = randomInt(11, 99); answer = a - b; } while(hasBorrow(a, b) || answer < 0);
      operator = '-'; expression = `${a}-${b}`; break;
    case 'G2_U11': // 받아내림 없는 (두 자리 수)-(두 자리 수)
      do { b = randomInt(11, 88); a = randomInt(b, 99); answer = a - b; } while(hasBorrow(a, b) || answer < 0);
      operator = '-'; expression = `${a}-${b}`; break;
    case 'G2_U12': // 받아내림 있는 (두 자리 수)-(한 자리 수)
      do { b = randomInt(2, 9); a = randomInt(21, 98); answer = a - b; } while(!hasBorrow(a, b) || answer <= 0);
      operator = '-'; expression = `${a}-${b}`; break;
    case 'G2_U13': // 받아내림 있는 (두 자리 수)-(두 자리 수)
      do { b = randomInt(12, 89); a = randomInt(b + 1, 98); answer = a - b; } while(!hasBorrow(a, b) || answer <= 0);
      operator = '-'; expression = `${a}-${b}`; break;
    case 'G2_U14': // 받아내림 없는 (세 자리 수)-(세 자리 수)
      do { b = randomInt(111, 888); a = randomInt(b, 999); answer = a - b; } while(hasBorrow(a, b) || answer < 0);
      operator = '-'; expression = `${a}-${b}`; break;
    case 'G2_U15': // 받아내림 있는 (세 자리 수)-(두 자리 수)
      do { b = randomInt(12, 89); a = randomInt(111, 998); answer = a - b; } while(!hasBorrow(a, b) || answer <= 0);
      operator = '-'; expression = `${a}-${b}`; break;
    case 'G2_U16': // 받아내림 없는 (네 자리 수)-(네 자리 수)
      do { b = randomInt(1111, 8888); a = randomInt(b, 9999); answer = a - b; } while(hasBorrow(a, b) || answer < 0);
      operator = '-'; expression = `${a}-${b}`; break;
    case 'G2_U17': // 세 수의 뺄셈
      do { c = randomInt(11, 30); b = randomInt(11, 30); a = randomInt(b + c + 1, 99); answer = a - b - c; } while(answer < 0);
      operator = '-'; expression = `${a}-${b}-${c}`; break;
    case 'G2_U18': // 세 수의 혼합계산
      if (Math.random() > 0.5) {
        do { a = randomInt(11, 40); b = randomInt(11, 40); c = randomInt(11, a + b); answer = a + b - c; } while(answer < 0);
        expression = `${a}+${b}-${c}`;
      } else {
        do { b = randomInt(11, 40); a = randomInt(b + 1, 60); c = randomInt(11, 40); answer = a - b + c; } while(answer < 0);
        expression = `${a}-${b}+${c}`;
      }
      operator = 'mixed'; break;

    // G3 (24 units)
    case 'G3_U01': // 받아올림 있는 (세 자리 수)+(세 자리 수)
      do { a = randomInt(111, 889); b = randomInt(111, 889); answer = a + b; } while(!hasCarry(a, b) || answer >= 2000);
      operator = '+'; expression = `${a}+${b}`; break;
    case 'G3_U02': // 받아내림 있는 (세 자리 수)-(세 자리 수)
      do { b = randomInt(112, 889); a = randomInt(b + 1, 998); answer = a - b; } while(!hasBorrow(a, b));
      operator = '-'; expression = `${a}-${b}`; break;
    case 'G3_U03': // 받아올림 있는 (네 자리 수)+(세 자리 수)
      do { a = randomInt(1111, 8889); b = randomInt(111, 889); answer = a + b; } while(!hasCarry(a, b));
      operator = '+'; expression = `${a}+${b}`; break;
    case 'G3_U04': // 받아내림 있는 (네 자리 수)-(세 자리 수)
      do { b = randomInt(112, 889); a = randomInt(1111, 9998); answer = a - b; } while(!hasBorrow(a, b));
      operator = '-'; expression = `${a}-${b}`; break;
    case 'G3_U05': // 네 자리 수의 세 수의 계산
      if (Math.random() > 0.5) {
        a = randomInt(1000, 4000); b = randomInt(1000, 4000); c = randomInt(1000, a + b); answer = a + b - c; expression = `${a}+${b}-${c}`;
      } else {
        b = randomInt(1000, 4000); a = randomInt(b + 1, 6000); c = randomInt(1000, 3000); answer = a - b + c; expression = `${a}-${b}+${c}`;
      }
      operator = 'mixed'; break;
    case 'G3_U06': // (몇십)×(한 자리 수)
      a = randomInt(2, 9) * 10; b = randomInt(2, 9); answer = a * b; operator = '×'; expression = `${a}×${b}`; break;
    case 'G3_U07': // (두 자리 수)×(한 자리 수)
      a = randomInt(11, 99); b = randomInt(2, 9); answer = a * b; operator = '×'; expression = `${a}×${b}`; break;
    case 'G3_U08': // (세 자리 수)×(한 자리 수)
      a = randomInt(101, 999); b = randomInt(2, 9); answer = a * b; operator = '×'; expression = `${a}×${b}`; break;
    case 'G3_U09': // (네 자리 수)×(한 자리 수)
      a = randomInt(1001, 3000); b = randomInt(2, 6); answer = a * b; operator = '×'; expression = `${a}×${b}`; break;
    case 'G3_U10': // (몇십)×(몇십)
      a = randomInt(2, 9) * 10; b = randomInt(2, 9) * 10; answer = a * b; operator = '×'; expression = `${a}×${b}`; break;
    case 'G3_U11': // (몇백)×(몇백)
      a = randomInt(2, 9) * 100; b = randomInt(2, 9) * 100; answer = a * b; operator = '×'; expression = `${a}×${b}`; break;
    case 'G3_U12': // (두 자리 수)×(두 자리 수)
      a = randomInt(11, 99); b = randomInt(11, 50); answer = a * b; operator = '×'; expression = `${a}×${b}`; break;
    case 'G3_U13': // (세 자리 수)×(두 자리 수)
      a = randomInt(101, 400); b = randomInt(11, 40); answer = a * b; operator = '×'; expression = `${a}×${b}`; break;
    case 'G3_U14': // (네 자리 수)×(두 자리 수)
      a = randomInt(1001, 2000); b = randomInt(11, 20); answer = a * b; operator = '×'; expression = `${a}×${b}`; break;
    case 'G3_U15': // (몇십)÷(몇)
      b = randomInt(2, 9); answer = randomInt(2, 9) * 10; a = b * answer; operator = '÷'; expression = `${a}÷${b}`; break;
    case 'G3_U16': // (몇백)÷(몇)
      b = randomInt(2, 9); answer = randomInt(2, 9) * 100; a = b * answer; operator = '÷'; expression = `${a}÷${b}`; break;
    case 'G3_U17': // (몇십)÷(몇십)
      b = randomInt(2, 9) * 10; answer = randomInt(2, 9); a = b * answer; operator = '÷'; expression = `${a}÷${b}`; break;
    case 'G3_U18': // (몇백)÷(몇십)
      b = randomInt(2, 9) * 10; answer = randomInt(2, 9) * 10; a = b * answer; operator = '÷'; expression = `${a}÷${b}`; break;
    case 'G3_U19': // (몇백 몇십)÷(몇십)
      b = randomInt(2, 9) * 10; answer = randomInt(11, 20); a = b * answer; operator = '÷'; expression = `${a}÷${b}`; break;
    case 'G3_U20': // (두 자리 수)÷(한 자리 수)
      b = randomInt(2, 9); answer = randomInt(11, Math.floor(99/b)); a = b * answer; operator = '÷'; expression = `${a}÷${b}`; break;
    case 'G3_U21': // (세 자리 수)÷(한 자리 수)
      b = randomInt(2, 9); answer = randomInt(Math.floor(100/b)+1, Math.floor(999/b)); a = b * answer; operator = '÷'; expression = `${a}÷${b}`; break;
    case 'G3_U22': // (네 자리 수)÷(한 자리 수)
      b = randomInt(2, 9); answer = randomInt(Math.floor(1000/b)+1, Math.floor(4000/b)); a = b * answer; operator = '÷'; expression = `${a}÷${b}`; break;
    case 'G3_U23': // (두 자리 수)÷(두 자리 수)
      b = randomInt(11, 49); answer = randomInt(2, Math.floor(99/b)); a = b * answer; operator = '÷'; expression = `${a}÷${b}`; break;
    case 'G3_U24': // (세 자리 수)÷(두 자리 수)
      b = randomInt(11, 99); answer = randomInt(Math.floor(100/b)+1, Math.floor(999/b)); a = b * answer; operator = '÷'; expression = `${a}÷${b}`; break;

    // G4 (21 units)
    case 'G4_U01': // 네 자리 수의 덧셈과 뺄셈
      if (Math.random() > 0.5) {
        a = randomInt(1000, 8999); b = randomInt(1000, 9999 - a); answer = a + b; operator = '+'; expression = `${a}+${b}`;
      } else {
        b = randomInt(1000, 8999); a = randomInt(b + 1, 9999); answer = a - b; operator = '-'; expression = `${a}-${b}`;
      }
      break;
    case 'G4_U02': // 다섯 자리 수의 덧셈과 뺄셈
      if (Math.random() > 0.5) {
        a = randomInt(10000, 89999); b = randomInt(10000, 99999 - a); answer = a + b; operator = '+'; expression = `${a}+${b}`;
      } else {
        b = randomInt(10000, 89999); a = randomInt(b + 1, 99999); answer = a - b; operator = '-'; expression = `${a}-${b}`;
      }
      break;
    case 'G4_U03': // 큰 수의 덧셈과 뺄셈
      if (Math.random() > 0.5) {
        a = randomInt(100000, 899999); b = randomInt(100000, 999999 - a); answer = a + b; operator = '+'; expression = `${a}+${b}`;
      } else {
        b = randomInt(100000, 899999); a = randomInt(b + 1, 999999); answer = a - b; operator = '-'; expression = `${a}-${b}`;
      }
      break;
    case 'G4_U04': // (두 자리 수)×(한 자리 수)
      a = randomInt(11, 99); b = randomInt(2, 9); answer = a * b; operator = '×'; expression = `${a}×${b}`; break;
    case 'G4_U05': // (세 자리 수)×(한 자리 수)
      a = randomInt(101, 999); b = randomInt(2, 9); answer = a * b; operator = '×'; expression = `${a}×${b}`; break;
    case 'G4_U06': // (네 자리 수)×(한 자리 수)
      a = randomInt(1001, 9999); b = randomInt(2, 9); answer = a * b; operator = '×'; expression = `${a}×${b}`; break;
    case 'G4_U07': // (두 자리 수)×(두 자리 수)
      a = randomInt(11, 99); b = randomInt(11, 99); answer = a * b; operator = '×'; expression = `${a}×${b}`; break;
    case 'G4_U08': // (세 자리 수)×(두 자리 수)
      a = randomInt(101, 999); b = randomInt(11, 99); answer = a * b; operator = '×'; expression = `${a}×${b}`; break;
    case 'G4_U09': // (네 자리 수)×(두 자리 수)
      a = randomInt(1001, 3000); b = randomInt(11, 40); answer = a * b; operator = '×'; expression = `${a}×${b}`; break;
    case 'G4_U10': // 세 수의 곱셈
      a = randomInt(2, 9); b = randomInt(2, 9); c = randomInt(2, 9); answer = a * b * c; operator = '×'; expression = `${a}×${b}×${c}`; break;
    case 'G4_U11': // 10배수의 곱셈
      a = randomInt(11, 99); b = randomItem([10, 100, 1000]); answer = a * b; operator = '×'; expression = `${a}×${b}`; break;
    case 'G4_U12': // 10배수의 나눗셈
      b = randomItem([10, 100, 1000]); answer = randomInt(11, 99); a = b * answer; operator = '÷'; expression = `${a}÷${b}`; break;
    case 'G4_U13': // (두 자리 수)÷(한 자리 수)
      b = randomInt(2, 9); answer = randomInt(11, Math.floor(99/b)); a = b * answer; operator = '÷'; expression = `${a}÷${b}`; break;
    case 'G4_U14': // (두 자리 수)÷(두 자리 수)
      b = randomInt(11, 49); answer = randomInt(2, Math.floor(99/b)); a = b * answer; operator = '÷'; expression = `${a}÷${b}`; break;
    case 'G4_U15': // (세 자리 수)÷(두 자리 수)
      b = randomInt(11, 99); answer = randomInt(Math.floor(100/b)+1, Math.floor(999/b)); a = b * answer; operator = '÷'; expression = `${a}÷${b}`; break;
    case 'G4_U16': // (네 자리 수)÷(두 자리 수)
      b = randomInt(11, 99); answer = randomInt(Math.floor(1000/b)+1, Math.floor(9999/b)); a = b * answer; operator = '÷'; expression = `${a}÷${b}`; break;
    case 'G4_U17': // (네 자리 수)÷(세 자리 수)
      b = randomInt(101, 999); answer = randomInt(Math.floor(1000/b)+1, Math.floor(9999/b)); a = b * answer; operator = '÷'; expression = `${a}÷${b}`; break;
    case 'G4_U18': // 덧셈과 뺄셈의 혼합 계산
      if (Math.random() > 0.5) {
        a = randomInt(11, 99); b = randomInt(11, 99); c = randomInt(11, a + b); answer = a + b - c; expression = `${a}+${b}-${c}`;
      } else {
        b = randomInt(11, 99); a = randomInt(b + 1, 150); c = randomInt(11, 99); answer = a - b + c; expression = `${a}-${b}+${c}`;
      }
      operator = 'mixed'; break;
    case 'G4_U19': // 곱셈과 나눗셈의 혼합 계산
      if (Math.random() > 0.5) {
        answer = randomInt(2, 20); b = randomInt(2, 9); c = randomInt(2, 9); a = (answer * c) / b;
        while (!Number.isInteger(a)) { answer = randomInt(2, 20); b = randomInt(2, 9); c = randomInt(2, 9); a = (answer * c) / b; }
        expression = `${a}×${b}÷${c}`;
      } else {
        answer = randomInt(2, 20); c = randomInt(2, 9); b = randomInt(2, 9); a = (answer / c) * b;
        while (!Number.isInteger(a)) { answer = randomInt(2, 20); c = randomInt(2, 9); b = randomInt(2, 9); a = (answer / c) * b; }
        expression = `${a}÷${b}×${c}`;
      }
      operator = 'mixed'; break;
    case 'G4_U20': // 사칙연산이 섞인 혼합 계산 (괄호 없음)
      if (Math.random() > 0.5) {
        // a + b × c
        b = randomInt(2, 9); c = randomInt(2, 9); a = randomInt(11, 50); answer = a + b * c; expression = `${a}+${b}×${c}`;
      } else {
        // a - b ÷ c
        c = randomInt(2, 9); let divAns = randomInt(2, 9); b = c * divAns; a = randomInt(divAns + 1, 50); answer = a - divAns; expression = `${a}-${b}÷${c}`;
      }
      operator = 'mixed'; break;
    case 'G4_U21': // ( ), { }가 있는 혼합 계산
      if (Math.random() > 0.5) {
        // a × (b + c)
        b = randomInt(11, 30); c = randomInt(11, 30); a = randomInt(2, 9); answer = a * (b + c); expression = `${a}×(${b}+${c})`;
      } else {
        // (a - b) ÷ c
        c = randomInt(2, 9); let divAns = randomInt(2, 9); let sumAns = c * divAns; b = randomInt(11, 50); a = sumAns + b; answer = divAns; expression = `(${a}-${b})÷${c}`;
      }
      operator = 'mixed'; break;

    default:
      // Fallback
      a = randomInt(1, 9); b = randomInt(1, 9); answer = a + b; operator = '+'; expression = `${a}+${b}`; break;
  }

  return {
    expression,
    answer,
    operator,
    tags: unit.tags,
    gradeId: unit.gradeId,
    unitId: unit.unitId,
  };
}

export function sampleProblems(unitId: string, count: number = 5): GeneratedProblem[] {
  const problems: GeneratedProblem[] = [];
  for (let i = 0; i < count; i++) {
    problems.push(generateCurriculumProblem(unitId));
  }
  return problems;
}

// 개발 중에 콘솔에서 바로 테스트해볼 수 있도록 전역 객체에 연결
if (typeof window !== 'undefined') {
  (window as any).sampleProblems = sampleProblems;
}
