import fs from 'fs';
import path from 'path';

// 1. MathStudentHistoryScreen.tsx
const historyPath = path.join(process.cwd(), 'src/components/screens/admin/MathStudentHistoryScreen.tsx');
let historyCode = fs.readFileSync(historyPath, 'utf-8');
historyCode = historyCode.replace(/import \{ scoreColor, groupAccent \} from '\.\.\/lib\/sunbeam';\r?\n?/g, '');
historyCode = historyCode.replace(/m\.word/g, 'm.expression');
historyCode = historyCode.replace(/m\.meaning/g, 'm.correctAnswer');
fs.writeFileSync(historyPath, historyCode);

// 2. src/data/curriculum.ts
const currPath = path.join(process.cwd(), 'src/data/curriculum.ts');
let currCode = fs.readFileSync(currPath, 'utf-8');
currCode = currCode.replace(/import type \{ CurriculumGrade, CurriculumUnit, GradeId \} from '\.\/types';/g, "import type { CurriculumGrade, CurriculumUnit } from '../game/types';");
fs.writeFileSync(currPath, currCode);

// 3. src/game/curriculumProblemGenerator.ts
const genPath = path.join(process.cwd(), 'src/game/curriculumProblemGenerator.ts');
let genCode = fs.readFileSync(genPath, 'utf-8');
genCode = genCode.replace(/import \{ ProblemTag, ProblemCategory, Operator, GradeId \} from '\.\/types';/g, "import type { ProblemTag, Operator, GradeId } from './types';");
genCode = genCode.replace(/let tries = 0;\r?\n?/g, '');
fs.writeFileSync(genPath, genCode);

// 4. src/game/types.ts
const typesPath = path.join(process.cwd(), 'src/game/types.ts');
let typesCode = fs.readFileSync(typesPath, 'utf-8');
typesCode = typesCode.replace(/export type Operator = '\+' \| '-' \| '×' \| '÷';/g, "export type Operator = '+' | '-' | '×' | '÷' | 'mixed';");
fs.writeFileSync(typesPath, typesCode);

console.log('Fixes applied');
