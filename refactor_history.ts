import fs from 'fs';
import path from 'path';

const historyPath = path.join(process.cwd(), 'src/components/screens/admin/MathStudentHistoryScreen.tsx');
let historyCode = fs.readFileSync(historyPath, 'utf-8');

// Fix frequent mistakes mapping (word -> expression, meaning -> correctAnswer)
historyCode = historyCode.replace(
  /\{ word: string; meaning: string; wrongCount: number; totalSeen: number \}/g,
  '{ expression: string; correctAnswer: number | string; wrongCount: number; totalSeen: number }'
);
historyCode = historyCode.replace(/const k = w\.word;/g, 'const k = w.expression;');
historyCode = historyCode.replace(/const e = map\.get\(k\) \?\? \{ word: w\.word, meaning: w\.meaning, wrongCount: 0, totalSeen: 0 \};/g, 'const e = map.get(k) ?? { expression: w.expression, correctAnswer: w.correctAnswer, wrongCount: 0, totalSeen: 0 };');
historyCode = historyCode.replace(/const k = c\.word;/g, 'const k = c.expression;');

// In frequent mistakes render (lines 180+)
historyCode = historyCode.replace(/m\.word/g, 'm.expression');
historyCode = historyCode.replace(/m\.meaning/g, 'm.correctAnswer');

// Fix time_taken to time_seconds
historyCode = historyCode.replace(/time_taken/g, 'time_seconds');

// Fix scoreColor
historyCode = historyCode.replace(/scoreColor\(h\.score\)/g, '"text-sb-primary-dark"');
historyCode = historyCode.replace(/import \{ scoreColor, groupAccent \} from '\.\.\/\.\.\/\.\.\/lib\/sunbeam';/g, '');

// Save changes
fs.writeFileSync(historyPath, historyCode);
console.log('Fixed history screen.');
