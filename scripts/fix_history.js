import fs from 'fs';
import path from 'path';

const historyPath = path.join(process.cwd(), 'src/components/screens/admin/MathStudentHistoryScreen.tsx');
let historyCode = fs.readFileSync(historyPath, 'utf-8');

// Inject constants
const injections = `
const scoreColor = (score: number) => score >= 80 ? 'text-sb-correct-dark' : score >= 60 ? 'text-sb-orange-dark' : 'text-sb-wrong-dark';
const groupAccent = (unitId: string) => ({ chip: 'bg-sb-primary-pale text-sb-primary-dark' });
`;

historyCode = historyCode.replace(/const formatDuration =/g, injections + '\nconst formatDuration =');

// Also remove unused imports
historyCode = historyCode.replace(/Trophy, X, Search/g, '');

fs.writeFileSync(historyPath, historyCode);
console.log('Fixed scoreColor and groupAccent');
