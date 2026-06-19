import fs from 'fs';
import path from 'path';

const G1_LEVELS = [
  { title: "더하기(+1, +2, +3)", cat: "addition", tags: ["addition", "plus_1_to_3"], ex: ["2+1", "5+3"] },
  { title: "더하기(+4, +5, +6)", cat: "addition", tags: ["addition", "plus_4_to_6"], ex: ["3+4", "8+5"] },
  { title: "더하기(+7, +8, +9)", cat: "addition", tags: ["addition", "plus_7_to_9"], ex: ["4+7", "6+9"] },
  { title: "합이 15 이하인 덧셈", cat: "addition", tags: ["addition", "sum_lte_15"], ex: ["7+5", "8+6"] },
  { title: "합이 20 이하인 덧셈", cat: "addition", tags: ["addition", "sum_lte_20"], ex: ["12+7", "9+8"] },
  { title: "(몇십)+(몇)", cat: "addition", tags: ["addition", "tens_plus_ones"], ex: ["20+5", "40+7"] },
  { title: "(몇십)+(몇십)", cat: "addition", tags: ["addition", "tens_plus_tens"], ex: ["30+40", "50+20"] },
  { title: "(몇십 몇)+(몇)", cat: "addition", tags: ["addition", "tens_ones_plus_ones"], ex: ["23+4", "45+2"] },
  { title: "(몇십 몇)+(몇십)", cat: "addition", tags: ["addition", "tens_ones_plus_tens"], ex: ["23+40", "35+20"] },
  { title: "덧셈 종합(합이 50 이하인 수)", cat: "addition", tags: ["addition", "sum_lte_50"], ex: ["25+14", "30+15"] },
  { title: "빼기(-1, -2, -3, -4, -5)", cat: "subtraction", tags: ["subtraction", "minus_1_to_5"], ex: ["8-2", "12-4"] },
  { title: "빼기(-6, -7, -8, -9, -10)", cat: "subtraction", tags: ["subtraction", "minus_6_to_10"], ex: ["15-7", "20-9"] },
  { title: "(몇십)-(몇십)", cat: "subtraction", tags: ["subtraction", "tens_minus_tens"], ex: ["50-20", "80-30"] },
  { title: "(몇십 몇)-(몇십)", cat: "subtraction", tags: ["subtraction", "tens_ones_minus_tens"], ex: ["45-20", "73-30"] },
  { title: "(몇십)-(몇)", cat: "subtraction", tags: ["subtraction", "tens_minus_ones"], ex: ["40-5", "70-8"] },
  { title: "(몇십 몇)-(몇)", cat: "subtraction", tags: ["subtraction", "tens_ones_minus_ones"], ex: ["45-3", "28-5"] },
  { title: "뺄셈 종합", cat: "subtraction", tags: ["subtraction", "mixed_subtraction"], ex: ["45-12", "30-15"] },
  { title: "세 수의 덧셈", cat: "addition", tags: ["addition", "three_numbers"], ex: ["2+3+4", "5+1+3"] },
  { title: "세 수의 뺄셈", cat: "subtraction", tags: ["subtraction", "three_numbers"], ex: ["10-2-3", "15-5-2"] },
  { title: "세 수의 계산", cat: "mixed", tags: ["mixed", "three_numbers"], ex: ["10+2-3", "8-4+5"] },
];

const G2_LEVELS = [
  { title: "받아올림 없는 (두 자리 수)+(한 자리 수)", cat: "addition", tags: ["addition", "no_carry"], ex: ["23+4", "45+3"] },
  { title: "받아올림 없는 (두 자리 수)+(두 자리 수)", cat: "addition", tags: ["addition", "no_carry"], ex: ["23+14", "45+22"] },
  { title: "받아올림 있는 (두 자리 수)+(한 자리 수)", cat: "addition", tags: ["addition", "carry"], ex: ["28+4", "45+7"] },
  { title: "받아올림 있는 (두 자리 수)+(두 자리 수)", cat: "addition", tags: ["addition", "carry"], ex: ["28+14", "45+27"] },
  { title: "받아올림 없는 (세 자리 수)+(세 자리 수)", cat: "addition", tags: ["addition", "no_carry"], ex: ["123+234", "451+225"] },
  { title: "받아올림 있는 (세 자리 수)+(두 자리 수)", cat: "addition", tags: ["addition", "carry"], ex: ["128+34", "456+57"] },
  { title: "받아올림 있는 (세 자리 수)+(세 자리 수)", cat: "addition", tags: ["addition", "carry"], ex: ["128+234", "456+257"] },
  { title: "받아올림 없는 (네 자리 수)+(네 자리 수)", cat: "addition", tags: ["addition", "no_carry"], ex: ["1234+2345", "4512+2253"] },
  { title: "세 수의 덧셈", cat: "addition", tags: ["addition", "three_numbers"], ex: ["12+23+34", "45+15+20"] },
  { title: "받아내림 없는 (두 자리 수)-(한 자리 수)", cat: "subtraction", tags: ["subtraction", "no_borrow"], ex: ["28-4", "45-3"] },
  { title: "받아내림 없는 (두 자리 수)-(두 자리 수)", cat: "subtraction", tags: ["subtraction", "no_borrow"], ex: ["48-14", "45-22"] },
  { title: "받아내림 있는 (두 자리 수)-(한 자리 수)", cat: "subtraction", tags: ["subtraction", "borrow"], ex: ["23-4", "45-7"] },
  { title: "받아내림 있는 (두 자리 수)-(두 자리 수)", cat: "subtraction", tags: ["subtraction", "borrow"], ex: ["43-15", "52-27"] },
  { title: "받아내림 없는 (세 자리 수)-(세 자리 수)", cat: "subtraction", tags: ["subtraction", "no_borrow"], ex: ["456-123", "789-234"] },
  { title: "받아내림 있는 (세 자리 수)-(두 자리 수)", cat: "subtraction", tags: ["subtraction", "borrow"], ex: ["123-34", "456-67"] },
  { title: "받아내림 없는 (네 자리 수)-(네 자리 수)", cat: "subtraction", tags: ["subtraction", "no_borrow"], ex: ["4567-1234", "7895-2341"] },
  { title: "세 수의 뺄셈", cat: "subtraction", tags: ["subtraction", "three_numbers"], ex: ["45-12-8", "50-15-10"] },
  { title: "세 수의 혼합계산", cat: "mixed", tags: ["mixed", "three_numbers"], ex: ["45+12-8", "50-15+10"] },
];

const G3_LEVELS = [
  { title: "받아올림 있는 (세 자리 수)+(세 자리 수)", cat: "addition", tags: ["addition", "carry"], ex: ["128+234", "456+257"] },
  { title: "받아내림 있는 (세 자리 수)-(세 자리 수)", cat: "subtraction", tags: ["subtraction", "borrow"], ex: ["456-167", "782-294"] },
  { title: "받아올림 있는 (네 자리 수)+(세 자리 수)", cat: "addition", tags: ["addition", "carry"], ex: ["1284+234", "4567+257"] },
  { title: "받아내림 있는 (네 자리 수)-(세 자리 수)", cat: "subtraction", tags: ["subtraction", "borrow"], ex: ["4567-167", "7824-294"] },
  { title: "네 자리 수의 세 수의 계산", cat: "mixed", tags: ["mixed", "three_numbers"], ex: ["1234+2345-1000", "4567-1234+500"] },
  { title: "(몇십)×(한 자리 수)", cat: "multiplication", tags: ["multiplication", "tens_times_ones"], ex: ["20×3", "40×2"] },
  { title: "(두 자리 수)×(한 자리 수)", cat: "multiplication", tags: ["multiplication", "two_digits_times_ones"], ex: ["23×3", "45×2"] },
  { title: "(세 자리 수)×(한 자리 수)", cat: "multiplication", tags: ["multiplication", "three_digits_times_ones"], ex: ["123×3", "456×2"] },
  { title: "(네 자리 수)×(한 자리 수)", cat: "multiplication", tags: ["multiplication", "four_digits_times_ones"], ex: ["1234×3", "2000×4"] },
  { title: "(몇십)×(몇십)", cat: "multiplication", tags: ["multiplication", "tens_times_tens"], ex: ["20×30", "40×20"] },
  { title: "(몇백)×(몇백)", cat: "multiplication", tags: ["multiplication", "hundreds_times_hundreds"], ex: ["200×300", "400×200"] },
  { title: "(두 자리 수)×(두 자리 수)", cat: "multiplication", tags: ["multiplication", "two_digits_times_two_digits"], ex: ["23×12", "45×23"] },
  { title: "(세 자리 수)×(두 자리 수)", cat: "multiplication", tags: ["multiplication", "three_digits_times_two_digits"], ex: ["123×12", "456×23"] },
  { title: "(네 자리 수)×(두 자리 수)", cat: "multiplication", tags: ["multiplication", "four_digits_times_two_digits"], ex: ["1234×12", "2000×23"] },
  { title: "(몇십)÷(몇)", cat: "division", tags: ["division", "tens_div_ones"], ex: ["60÷3", "80÷2"] },
  { title: "(몇백)÷(몇)", cat: "division", tags: ["division", "hundreds_div_ones"], ex: ["600÷3", "800÷2"] },
  { title: "(몇십)÷(몇십)", cat: "division", tags: ["division", "tens_div_tens"], ex: ["60÷30", "80÷20"] },
  { title: "(몇백)÷(몇십)", cat: "division", tags: ["division", "hundreds_div_tens"], ex: ["600÷30", "800÷20"] },
  { title: "(몇백 몇십)÷(몇십)", cat: "division", tags: ["division", "hundreds_tens_div_tens"], ex: ["120÷30", "240÷40"] },
  { title: "(두 자리 수)÷(한 자리 수)", cat: "division", tags: ["division", "two_digits_div_ones"], ex: ["48÷4", "36÷3"] },
  { title: "(세 자리 수)÷(한 자리 수)", cat: "division", tags: ["division", "three_digits_div_ones"], ex: ["124÷4", "456÷3"] },
  { title: "(네 자리 수)÷(한 자리 수)", cat: "division", tags: ["division", "four_digits_div_ones"], ex: ["1236÷3", "2048÷4"] },
  { title: "(두 자리 수)÷(두 자리 수)", cat: "division", tags: ["division", "two_digits_div_two_digits"], ex: ["48÷12", "36÷18"] },
  { title: "(세 자리 수)÷(두 자리 수)", cat: "division", tags: ["division", "three_digits_div_two_digits"], ex: ["120÷15", "456÷12"] },
];

const G4_LEVELS = [
  { title: "네 자리 수의 덧셈과 뺄셈", cat: "mixed", tags: ["mixed", "four_digits"], ex: ["1234+2345", "4567-1234"] },
  { title: "다섯 자리 수의 덧셈과 뺄셈", cat: "mixed", tags: ["mixed", "five_digits"], ex: ["12345+23456", "45678-12345"] },
  { title: "큰 수의 덧셈과 뺄셈", cat: "mixed", tags: ["mixed", "large_numbers"], ex: ["123456+234567", "456789-123456"] },
  { title: "(두 자리 수)×(한 자리 수)", cat: "multiplication", tags: ["multiplication", "two_digits_times_ones"], ex: ["23×3", "45×2"] },
  { title: "(세 자리 수)×(한 자리 수)", cat: "multiplication", tags: ["multiplication", "three_digits_times_ones"], ex: ["123×3", "456×2"] },
  { title: "(네 자리 수)×(한 자리 수)", cat: "multiplication", tags: ["multiplication", "four_digits_times_ones"], ex: ["1234×3", "2000×4"] },
  { title: "(두 자리 수)×(두 자리 수)", cat: "multiplication", tags: ["multiplication", "two_digits_times_two_digits"], ex: ["23×12", "45×23"] },
  { title: "(세 자리 수)×(두 자리 수)", cat: "multiplication", tags: ["multiplication", "three_digits_times_two_digits"], ex: ["123×12", "456×23"] },
  { title: "(네 자리 수)×(두 자리 수)", cat: "multiplication", tags: ["multiplication", "four_digits_times_two_digits"], ex: ["1234×12", "2000×23"] },
  { title: "세 수의 곱셈", cat: "multiplication", tags: ["multiplication", "three_numbers"], ex: ["2×3×4", "5×2×3"] },
  { title: "10배수의 곱셈", cat: "multiplication", tags: ["multiplication", "tens"], ex: ["23×10", "45×100"] },
  { title: "10배수의 나눗셈", cat: "division", tags: ["division", "tens"], ex: ["230÷10", "4500÷100"] },
  { title: "(두 자리 수)÷(한 자리 수)", cat: "division", tags: ["division", "two_digits_div_ones"], ex: ["48÷4", "36÷3"] },
  { title: "(두 자리 수)÷(두 자리 수)", cat: "division", tags: ["division", "two_digits_div_two_digits"], ex: ["48÷12", "36÷18"] },
  { title: "(세 자리 수)÷(두 자리 수)", cat: "division", tags: ["division", "three_digits_div_two_digits"], ex: ["120÷15", "456÷12"] },
  { title: "(네 자리 수)÷(두 자리 수)", cat: "division", tags: ["division", "four_digits_div_two_digits"], ex: ["1200÷15", "4560÷12"] },
  { title: "(네 자리 수)÷(세 자리 수)", cat: "division", tags: ["division", "four_digits_div_three_digits"], ex: ["1200÷150", "4560÷120"] },
  { title: "덧셈과 뺄셈의 혼합 계산", cat: "mixed", tags: ["mixed", "add_sub"], ex: ["45+12-8", "50-15+10"] },
  { title: "곱셈과 나눗셈의 혼합 계산", cat: "mixed", tags: ["mixed", "mul_div"], ex: ["12×4÷3", "48÷4×2"] },
  { title: "사칙연산이 섞인 혼합 계산", cat: "mixed", tags: ["mixed", "four_ops"], ex: ["12+4×3", "48÷4-2"] },
  { title: "( ), { }가 있는 혼합 계산", cat: "mixed", tags: ["mixed", "brackets"], ex: ["12+(4×3)", "(48÷4)-2"] },
];

const GRADES = [
  { id: 'G1', levels: G1_LEVELS },
  { id: 'G2', levels: G2_LEVELS },
  { id: 'G3', levels: G3_LEVELS },
  { id: 'G4', levels: G4_LEVELS },
];

function generateCurriculumFile() {
  let output = `import type { CurriculumGrade, CurriculumUnit, GradeId } from './types';

export const CURRICULUM: CurriculumGrade[] = [\n`;

  GRADES.forEach(g => {
    output += `  {
    id: '${g.id}',
    title: '${g.id} 과정',
    units: [\n`;
    g.levels.forEach((l, i) => {
      const unitId = `${g.id}_U${String(i+1).padStart(2, '0')}`;
      let fallSpeed = 26;
      let spawnInterval = 4000;
      let maxActive = 3;
      
      if (g.id === 'G1') {
        fallSpeed = 22 + Math.floor(i / 4);
        spawnInterval = 4500 - (i * 50);
        maxActive = 3;
      } else if (g.id === 'G2') {
        fallSpeed = 26 + Math.floor(i / 4);
        spawnInterval = 4000 - (i * 50);
        maxActive = 3;
      } else if (g.id === 'G3') {
        fallSpeed = 30 + Math.floor(i / 4);
        spawnInterval = 3500 - (i * 50);
        maxActive = 4;
      } else {
        fallSpeed = 34 + Math.floor(i / 4);
        spawnInterval = 3000 - (i * 40);
        maxActive = 4;
      }

      output += `      {
        id: '${unitId}',
        gradeId: '${g.id}',
        unitId: '${unitId}',
        title: '${l.title}',
        category: '${l.cat}',
        order: ${i+1},
        tags: ${JSON.stringify(l.tags)},
        examples: ${JSON.stringify(l.ex)},
        fallSpeed: ${fallSpeed},
        spawnInterval: ${spawnInterval},
        maxActiveProblems: ${maxActive},
        generatorKey: '${unitId}',
      },\n`;
    });
    output += `    ]\n  },\n`;
  });

  output += `];

export function getUnitById(unitId: string): CurriculumUnit | undefined {
  for (const grade of CURRICULUM) {
    for (const unit of grade.units) {
      if (unit.id === unitId) return unit;
    }
  }
  return undefined;
}

export function getAllUnits(): CurriculumUnit[] {
  return CURRICULUM.flatMap((g) => g.units);
}
`;

  fs.writeFileSync(path.join(process.cwd(), 'src/data/curriculum.ts'), output);
  console.log('src/data/curriculum.ts generated');
}

generateCurriculumFile();
