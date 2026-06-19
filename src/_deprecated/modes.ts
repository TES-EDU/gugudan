import type { GameMode } from '../game/types';

export const MODES: GameMode[] = [
  {
    id: 'add_sub',
    name: '덧셈·뺄셈',
    description: '자연수 덧셈과 뺄셈',
    icon: '➕',
    color: '#4ECDC4',
    levelIds: ['ADD_01', 'ADD_02', 'ADD_03', 'ADD_04', 'ADD_05', 'ADD_06', 'ADD_07', 'ADD_08',
               'SUB_01', 'SUB_02', 'SUB_03', 'SUB_04', 'SUB_05', 'SUB_06', 'SUB_07', 'SUB_08'],
  },
  {
    id: 'mul_div',
    name: '곱셈·나눗셈',
    description: '자연수 곱셈과 나눗셈',
    icon: '✖️',
    color: '#FF6B6B',
    levelIds: ['MUL_01', 'MUL_02', 'MUL_03', 'MUL_04', 'MUL_05', 'MUL_06',
               'DIV_01', 'DIV_02', 'DIV_03', 'DIV_04', 'DIV_05'],
  },
  {
    id: 'table',
    name: '구구단',
    description: '2~9단 구구단 연습',
    icon: '📐',
    color: '#FFD93D',
    levelIds: ['TABLE_02', 'TABLE_03', 'TABLE_04', 'TABLE_05',
               'TABLE_06', 'TABLE_07', 'TABLE_08', 'TABLE_09', 'TABLE_ALL'],
  },
  {
    id: 'mix',
    name: '섞어서',
    description: '사칙연산 혼합',
    icon: '🔀',
    color: '#6C5CE7',
    levelIds: ['MIX_ADD_SUB_BASIC', 'MIX_ADD_SUB_ADV', 'MIX_MUL_DIV_BASIC', 'MIX_MUL_DIV_ADV', 'MIX_ALL_NATURAL'],
  },
  {
    id: 'order',
    name: '혼합계산',
    description: '연산 순서 혼합계산',
    icon: '🧮',
    color: '#E17055',
    levelIds: ['ORDER_01', 'ORDER_02', 'ORDER_03', 'ORDER_04', 'ORDER_05'],
  },
];
