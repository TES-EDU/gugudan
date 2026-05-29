// 레벨 정보 (난이도 변수 포함)
export interface LevelInfo {
  id: string;
  name: string;
  modeId: string;
  fallSpeed: number;       // px per second
  spawnInterval: number;   // ms
  maxActiveProblems: number;
}

export const LEVELS: LevelInfo[] = [
  // ===== 덧셈·뺄셈 =====
  { id: 'ADD_01', name: '한 자리 덧셈',       modeId: 'add_sub', fallSpeed: 30, spawnInterval: 4000, maxActiveProblems: 3 },
  { id: 'ADD_02', name: '20 이하 덧셈',       modeId: 'add_sub', fallSpeed: 32, spawnInterval: 3800, maxActiveProblems: 3 },
  { id: 'ADD_03', name: '50 이하 덧셈',       modeId: 'add_sub', fallSpeed: 34, spawnInterval: 3600, maxActiveProblems: 4 },
  { id: 'ADD_04', name: '100 이하 덧셈',      modeId: 'add_sub', fallSpeed: 36, spawnInterval: 3400, maxActiveProblems: 4 },
  { id: 'ADD_05', name: '두 자리+한 자리',     modeId: 'add_sub', fallSpeed: 34, spawnInterval: 3600, maxActiveProblems: 4 },
  { id: 'ADD_06', name: '두 자리+두 자리',     modeId: 'add_sub', fallSpeed: 36, spawnInterval: 3400, maxActiveProblems: 4 },
  { id: 'ADD_07', name: '받아올림 덧셈',       modeId: 'add_sub', fallSpeed: 34, spawnInterval: 3600, maxActiveProblems: 3 },
  { id: 'ADD_08', name: '세 자리 덧셈',       modeId: 'add_sub', fallSpeed: 30, spawnInterval: 4000, maxActiveProblems: 3 },

  { id: 'SUB_01', name: '한 자리 뺄셈',       modeId: 'add_sub', fallSpeed: 30, spawnInterval: 4000, maxActiveProblems: 3 },
  { id: 'SUB_02', name: '20 이하 뺄셈',       modeId: 'add_sub', fallSpeed: 32, spawnInterval: 3800, maxActiveProblems: 3 },
  { id: 'SUB_03', name: '50 이하 뺄셈',       modeId: 'add_sub', fallSpeed: 34, spawnInterval: 3600, maxActiveProblems: 4 },
  { id: 'SUB_04', name: '100 이하 뺄셈',      modeId: 'add_sub', fallSpeed: 36, spawnInterval: 3400, maxActiveProblems: 4 },
  { id: 'SUB_05', name: '두 자리-한 자리',     modeId: 'add_sub', fallSpeed: 34, spawnInterval: 3600, maxActiveProblems: 4 },
  { id: 'SUB_06', name: '두 자리-두 자리',     modeId: 'add_sub', fallSpeed: 36, spawnInterval: 3400, maxActiveProblems: 4 },
  { id: 'SUB_07', name: '받아내림 뺄셈',       modeId: 'add_sub', fallSpeed: 34, spawnInterval: 3600, maxActiveProblems: 3 },
  { id: 'SUB_08', name: '세 자리 뺄셈',       modeId: 'add_sub', fallSpeed: 30, spawnInterval: 4000, maxActiveProblems: 3 },

  // ===== 구구단 =====
  { id: 'TABLE_02', name: '2단',    modeId: 'table', fallSpeed: 35, spawnInterval: 3500, maxActiveProblems: 4 },
  { id: 'TABLE_03', name: '3단',    modeId: 'table', fallSpeed: 35, spawnInterval: 3500, maxActiveProblems: 4 },
  { id: 'TABLE_04', name: '4단',    modeId: 'table', fallSpeed: 35, spawnInterval: 3500, maxActiveProblems: 4 },
  { id: 'TABLE_05', name: '5단',    modeId: 'table', fallSpeed: 35, spawnInterval: 3500, maxActiveProblems: 4 },
  { id: 'TABLE_06', name: '6단',    modeId: 'table', fallSpeed: 35, spawnInterval: 3500, maxActiveProblems: 4 },
  { id: 'TABLE_07', name: '7단',    modeId: 'table', fallSpeed: 35, spawnInterval: 3500, maxActiveProblems: 4 },
  { id: 'TABLE_08', name: '8단',    modeId: 'table', fallSpeed: 35, spawnInterval: 3500, maxActiveProblems: 4 },
  { id: 'TABLE_09', name: '9단',    modeId: 'table', fallSpeed: 35, spawnInterval: 3500, maxActiveProblems: 4 },
  { id: 'TABLE_ALL', name: '구구단 전체', modeId: 'table', fallSpeed: 38, spawnInterval: 3200, maxActiveProblems: 5 },

  // ===== 곱셈·나눗셈 =====
  { id: 'MUL_01', name: '한 자리×한 자리',  modeId: 'mul_div', fallSpeed: 34, spawnInterval: 3500, maxActiveProblems: 4 },
  { id: 'MUL_02', name: '두 자리×한 자리',  modeId: 'mul_div', fallSpeed: 32, spawnInterval: 3800, maxActiveProblems: 3 },
  { id: 'MUL_03', name: '세 자리×한 자리',  modeId: 'mul_div', fallSpeed: 28, spawnInterval: 4200, maxActiveProblems: 3 },
  { id: 'MUL_04', name: '몇십×한 자리',     modeId: 'mul_div', fallSpeed: 34, spawnInterval: 3500, maxActiveProblems: 4 },
  { id: 'MUL_05', name: '몇십×몇십',        modeId: 'mul_div', fallSpeed: 30, spawnInterval: 4000, maxActiveProblems: 3 },
  { id: 'MUL_06', name: '두 자리×두 자리',  modeId: 'mul_div', fallSpeed: 26, spawnInterval: 4500, maxActiveProblems: 3 },
  { id: 'DIV_01', name: '구구단 나눗셈',    modeId: 'mul_div', fallSpeed: 34, spawnInterval: 3500, maxActiveProblems: 4 },
  { id: 'DIV_02', name: '두 자리÷한 자리',  modeId: 'mul_div', fallSpeed: 32, spawnInterval: 3800, maxActiveProblems: 3 },
  { id: 'DIV_03', name: '세 자리÷한 자리',  modeId: 'mul_div', fallSpeed: 28, spawnInterval: 4200, maxActiveProblems: 3 },
  { id: 'DIV_04', name: '두 자리÷두 자리',  modeId: 'mul_div', fallSpeed: 30, spawnInterval: 4000, maxActiveProblems: 3 },
  { id: 'DIV_05', name: '세 자리÷두 자리',  modeId: 'mul_div', fallSpeed: 26, spawnInterval: 4500, maxActiveProblems: 3 },

  // ===== 섞어서 =====
  { id: 'MIX_ADD_SUB_BASIC', name: '덧셈·뺄셈 기초', modeId: 'mix', fallSpeed: 32, spawnInterval: 3800, maxActiveProblems: 4 },
  { id: 'MIX_ADD_SUB_ADV',   name: '덧셈·뺄셈 심화', modeId: 'mix', fallSpeed: 34, spawnInterval: 3500, maxActiveProblems: 4 },
  { id: 'MIX_MUL_DIV_BASIC', name: '곱셈·나눗셈 기초', modeId: 'mix', fallSpeed: 34, spawnInterval: 3500, maxActiveProblems: 4 },
  { id: 'MIX_MUL_DIV_ADV',   name: '곱셈·나눗셈 심화', modeId: 'mix', fallSpeed: 30, spawnInterval: 4000, maxActiveProblems: 3 },
  { id: 'MIX_ALL_NATURAL',   name: '자연수 사칙연산 전체', modeId: 'mix', fallSpeed: 32, spawnInterval: 3500, maxActiveProblems: 4 },

  // ===== 혼합계산 =====
  { id: 'ORDER_01', name: '두 수 사칙연산',     modeId: 'order', fallSpeed: 32, spawnInterval: 3800, maxActiveProblems: 3 },
  { id: 'ORDER_02', name: '세 수 덧셈·뺄셈',   modeId: 'order', fallSpeed: 28, spawnInterval: 4200, maxActiveProblems: 3 },
  { id: 'ORDER_03', name: '곱셈 포함 혼합',     modeId: 'order', fallSpeed: 26, spawnInterval: 4500, maxActiveProblems: 3 },
  { id: 'ORDER_04', name: '괄호 포함 혼합',     modeId: 'order', fallSpeed: 24, spawnInterval: 5000, maxActiveProblems: 3 },
  { id: 'ORDER_05', name: '나눗셈 포함 혼합',   modeId: 'order', fallSpeed: 24, spawnInterval: 5000, maxActiveProblems: 3 },
];

export function getLevelById(id: string): LevelInfo | undefined {
  return LEVELS.find(l => l.id === id);
}

export function getLevelsByMode(modeId: string): LevelInfo[] {
  return LEVELS.filter(l => l.modeId === modeId);
}
