import fs from 'fs';
import path from 'path';

const adminPath = path.join(process.cwd(), 'src/components/screens/admin/MathAdminPage.tsx');
const historyPath = path.join(process.cwd(), 'src/components/screens/admin/MathStudentHistoryScreen.tsx');

let adminCode = fs.readFileSync(adminPath, 'utf-8');
let historyCode = fs.readFileSync(historyPath, 'utf-8');

// 1. Imports and Supabase functions
adminCode = adminCode.replace(/getAllTestResults/g, 'getAllMathResults');
adminCode = adminCode.replace(/TestResultRow/g, 'MathResultRow');
adminCode = adminCode.replace(/TeacherLogin/g, 'MathTeacherLogin');
adminCode = adminCode.replace(/import { scoreColor, groupAccent } from '\.\.\/lib\/sunbeam';/g, '');

historyCode = historyCode.replace(/getStudentResults/g, 'getStudentMathResults');
historyCode = historyCode.replace(/deleteStudentResults/g, 'deleteStudentMathResults');
historyCode = historyCode.replace(/TestResultRow/g, 'MathResultRow');

// Fix Supabase import path from '../lib/supabase' to '../../../lib/supabase'
adminCode = adminCode.replace(/\.\.\/lib\/supabase/g, '../../../lib/supabase');
historyCode = historyCode.replace(/\.\.\/lib\/supabase/g, '../../../lib/supabase');

// Fix TeacherLogin import
adminCode = adminCode.replace(/\.\/TeacherLogin/g, './MathTeacherLogin');

// Fix lucide-react imports (if any issues, though it should be fine)

// 2. Filters
adminCode = adminCode.replace(/'all' \| '1-2' \| '3-4' \| '5-6'/g, "'all' | 'G1' | 'G2' | 'G3'");
adminCode = adminCode.replace(/\{ all: '전체', '1-2': 'LV 1-2', '3-4': 'LV 3-4', '5-6': 'LV 5-6' \}/g, "{ all: '전체', 'G1': 'G1', 'G2': 'G2', 'G3': 'G3' }");
adminCode = adminCode.replace(/r\.unit_title === levelFilter/g, 'r.grade_id === levelFilter');
adminCode = adminCode.replace(/\(r\.unit_title \?\? '1-2'\) as '1-2' \| '3-4' \| '5-6'/g, "r.grade_id");
adminCode = adminCode.replace(/const accent = groupAccent[^;]+;/g, 'const accent = { chip: "bg-sb-primary-pale text-sb-primary-dark" };');

historyCode = historyCode.replace(/const accent = groupAccent[^;]+;/g, 'const accent = { chip: "bg-sb-primary-pale text-sb-primary-dark" };');

// 3. Text replacements
adminCode = adminCode.replace(/TES VOCA/g, 'TES MATH');
historyCode = historyCode.replace(/TES VOCA/g, 'TES MATH');

// 4. Score Color
adminCode = adminCode.replace(/\{scoreColor\(r\.score\)\}/g, 'text-sb-primary-dark');

// 5. Accuracy instead of score for large display
// In Voca, score was out of 100. In Math, score is points, accuracy is out of 100.
adminCode = adminCode.replace(/r\.score/g, 'r.accuracy');
historyCode = historyCode.replace(/r\.score/g, 'r.accuracy');
// Wait, if I replace all `r.score`, `r.accuracy` will be used for sorting/averaging, which is correct!
// But wait, what about the display: '{r.score}<span' -> '{r.accuracy}<span'

fs.writeFileSync(adminPath, adminCode);
fs.writeFileSync(historyPath, historyCode);

console.log('Refactoring complete.');
