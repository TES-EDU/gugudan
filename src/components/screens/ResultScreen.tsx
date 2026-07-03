import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { analyzeWeakTags } from '../../game/scoring';
import { getUnitById } from '../../data/curriculum';
import { getStudentName } from '../../utils/storage';
import { getCurrentStudent } from '../../utils/storage';
import { saveMathResult } from '../../lib/supabase';
import type { MathCorrectAnswer, MathIncorrectAnswer } from '../../lib/supabase';
import type { GradeId } from '../../game/types';

const FONT_FAMILY = "'OwnglyphParkDaHyun', sans-serif";

const TAG_LABELS: Record<string, string> = {
  addition: '덧셈', subtraction: '뺄셈', multiplication: '곱셈', division: '나눗셈',
  mixed: '혼합', carry: '받아올림', borrow: '받아내림', no_remainder: '나머지 없음',
  order_of_operations: '연산 순서', plus_one: '+1 릴레이', minus_one: '-1 릴레이',
  zero: '0 연산', complement_10: '10의 보수', from_10: '10에서 빼기',
  three_term: '3수 연산', add_sub: '덧뺄셈 혼합', doubles: '같은 수 더하기',
  blank: '빈칸 문제', tens_mul: '몇십 곱셈', special: '특수 암산',
  two_digit: '두 자리', three_digit: '세 자리',
};

const ResultScreen: React.FC = () => {
  const score = useGameStore((s) => s.score);
  const correctCount = useGameStore((s) => s.correctCount);
  const wrongCount = useGameStore((s) => s.wrongCount);
  const missedCount = useGameStore((s) => s.missedCount);
  const maxCombo = useGameStore((s) => s.maxCombo);
  const answeredProblems = useGameStore((s) => s.answeredProblems);
  const missedProblems = useGameStore((s) => s.missedProblems);
  const levelId = useGameStore((s) => s.levelId);
  const resetGame = useGameStore((s) => s.resetGame);
  const startGame = useGameStore((s) => s.startGame);
  const setScreen = useGameStore((s) => s.setScreen);

  const [showWrongList, setShowWrongList] = useState(true);
  const [showCorrectList, setShowCorrectList] = useState(false);
  const savedRef = useRef(false);

  const unit = getUnitById(levelId);
  const gradeId: GradeId = (unit?.gradeId ?? 'G1') as GradeId;
  const unitDisplayName = unit ? unit.title : levelId;
  const chapterTitle = gradeId;

  const totalAll = correctCount + wrongCount + missedCount;
  const accuracy = totalAll > 0 ? Math.round((correctCount / totalAll) * 100) : 0;

  const weakTags = analyzeWeakTags(answeredProblems);
  const semanticWeakTags = weakTags
    .filter((t) => !t.tag.startsWith('grade:') && !t.tag.startsWith('chapter:') && !t.tag.startsWith('unit:'))
    .filter((t) => t.rate > 0 && t.total >= 2).slice(0, 5);

  const wrongItems = [
    ...answeredProblems.filter(p => p.result === 'wrong')
      .map(p => ({ problemId: p.problemId, expression: p.expression, correctAnswer: p.correctAnswer, userAnswer: p.userAnswer, kind: 'wrong' as const })),
    ...missedProblems.map(p => ({ problemId: p.id, expression: p.expression, correctAnswer: p.answer, userAnswer: null, kind: 'missed' as const })),
  ];

  const correctItems = answeredProblems.filter(p => p.result === 'correct')
    .map(p => ({ expression: p.expression, answer: p.correctAnswer }));

  // Supabase 자동 저장
  useEffect(() => {
    if (savedRef.current) return;
    savedRef.current = true;
    const ca: MathCorrectAnswer[] = correctItems.map(p => ({ expression: p.expression, answer: p.answer, unitId: levelId }));
    const ia: MathIncorrectAnswer[] = [
      ...answeredProblems.filter(p => p.result === 'wrong')
        .map(p => ({ expression: p.expression, correctAnswer: p.correctAnswer, userAnswer: p.userAnswer, result: 'wrong' as const, unitId: levelId })),
      ...missedProblems.map(p => ({ expression: p.expression, correctAnswer: p.answer, userAnswer: null, result: 'missed' as const, unitId: levelId })),
    ];
    const studentName = getStudentName() || '학생';
    const session = getCurrentStudent();
    saveMathResult({
      user_name: studentName, book_title: 'TES 연산 학습', unit_title: levelId,
      unit_display_name: `${chapterTitle} — ${unitDisplayName}`, grade_id: gradeId,
      total_questions: totalAll, correct_count: correctCount, wrong_count: wrongCount,
      missed_count: missedCount, score, accuracy, max_combo: maxCombo, time_seconds: 180,
      correct_answers: ca, incorrect_answers: ia,
      student_id: session?.id ?? null,
      academy_id: session?.academy_id ?? null,
    });
  }, []);

  const createdAt = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="fixed inset-0 overflow-y-auto flex flex-col" style={{ fontFamily: FONT_FAMILY, background: '#F1F5F9' }}>
      {/* ===== VOCATEST 동일: 상단 헤더 ===== */}
      <header className="bg-white shadow-sm px-4 h-14 flex items-center shrink-0 sticky top-0 z-10">
        <h1 className="font-bold text-slate-800 truncate">성적표</h1>
      </header>

      <div className="p-4 flex-1 pb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6 max-w-lg mx-auto">

          {/* ===== 헤더: 로고 + 타이틀 (VOCATEST 동일) ===== */}
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
            <div>
              <p className="text-lg font-extrabold text-indigo-600">TES EDU</p>
              <p className="text-xs text-slate-400">산성비 연산 게임</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">TES 영어·수학학원</p>
              <p className="text-sm text-slate-700">{chapterTitle}</p>
            </div>
          </div>

          {/* ===== 학생 이름 + 단원 ===== */}
          <h2 className="text-lg font-bold text-slate-800 mb-1">
            {getStudentName() || '학생'}의 연산 성적표
          </h2>
          <p className="text-sm text-slate-400 mb-4">{unitDisplayName} · {totalAll}문제</p>

          {/* ===== 나의 진도표 (VOCATEST 동일 레이아웃) ===== */}
          <div className="border border-slate-200 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm">📍</span>
                <span className="font-bold text-sm text-slate-700">나의 진도표</span>
                <span className="text-xs text-slate-400">{gradeId} / {unitDisplayName}</span>
              </div>
            </div>

            {/* G1 */}
            <div className="mb-3">
              <p className="text-xs font-bold text-slate-500 mb-1.5">G1 <span className="text-slate-400 font-normal">한 자리 / 기초 두 자리</span></p>
              <div className="relative h-1.5 bg-slate-100 rounded-full">
                {gradeId === 'G1' && <div className="absolute left-0 top-0 h-full rounded-full bg-amber-400" style={{ width: '30%' }} />}
                {(gradeId === 'G2' || gradeId === 'G3') && <div className="absolute left-0 top-0 h-full rounded-full bg-emerald-400 w-full" />}
              </div>
            </div>
            {/* G2 */}
            <div className="mb-3">
              <p className="text-xs font-bold text-slate-500 mb-1.5">G2 <span className="text-slate-400 font-normal">큰 수 / 세 자리 수</span></p>
              <div className="relative h-1.5 bg-slate-100 rounded-full">
                {gradeId === 'G2' && <div className="absolute left-0 top-0 h-full rounded-full bg-green-400" style={{ width: '30%' }} />}
                {gradeId === 'G3' && <div className="absolute left-0 top-0 h-full rounded-full bg-emerald-400 w-full" />}
              </div>
            </div>
            {/* G3 */}
            <div>
              <p className="text-xs font-bold text-slate-500 mb-1.5">G3 <span className="text-slate-400 font-normal">곱셈 · 나눗셈 암산</span></p>
              <div className="relative h-1.5 bg-slate-100 rounded-full">
                {gradeId === 'G3' && <div className="absolute left-0 top-0 h-full rounded-full bg-blue-400" style={{ width: '30%' }} />}
              </div>
            </div>
          </div>

          {/* ===== 종합 정답률 카드 (VOCATEST 동일: 보라 그라데이션) ===== */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-5 mb-4 text-white relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="relative z-10">
              <p className="text-indigo-100 text-sm font-medium mb-1">종합 정답률</p>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold">{accuracy}</span>
                <span className="text-2xl font-bold mb-1">%</span>
              </div>
              <p className="text-indigo-200 text-sm mt-2">
                총 {totalAll}문제 중 {correctCount}문제 정답
              </p>
            </div>
          </div>

          {/* ===== 구분/문제/정답/오답 테이블 (VOCATEST 동일) ===== */}
          <div className="rounded-xl border border-slate-200 overflow-hidden mb-4">
            <div className="bg-emerald-500 p-3 flex items-center gap-2 text-white">
              <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold">연산</span>
              <span className="text-sm font-medium">{unitDisplayName}</span>
            </div>
            <div className="p-4 bg-white">
              <div className="rounded-lg border border-slate-100 overflow-hidden text-sm">
                <div className="flex bg-slate-50 border-b border-slate-100">
                  <div className="w-1/4 p-2.5 text-slate-500 font-bold text-center">구분</div>
                  <div className="w-1/4 p-2.5 text-slate-500 font-medium text-center">문제</div>
                  <div className="w-1/4 p-2.5 text-slate-500 font-medium text-center">정답</div>
                  <div className="w-1/4 p-2.5 text-slate-500 font-medium text-center">오답</div>
                </div>
                <div className="flex bg-indigo-50">
                  <div className="w-1/4 p-2.5 text-indigo-700 font-bold text-center">합계</div>
                  <div className="w-1/4 p-2.5 text-center font-bold text-indigo-600">{totalAll}</div>
                  <div className="w-1/4 p-2.5 text-center font-bold text-emerald-600">{correctCount}</div>
                  <div className="w-1/4 p-2.5 text-center font-bold text-red-500">{wrongItems.length}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== 점수 / 콤보 (추가) ===== */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-amber-50 rounded-xl p-3 text-center border border-amber-100">
              <div className="text-2xl font-extrabold text-amber-500">{score}</div>
              <div className="text-xs text-slate-400 mt-1">총 점수</div>
            </div>
            <div className="bg-orange-50 rounded-xl p-3 text-center border border-orange-100">
              <div className="text-2xl font-extrabold text-orange-500">{maxCombo}</div>
              <div className="text-xs text-slate-400 mt-1">🔥 최고 콤보</div>
            </div>
          </div>

          {/* ===== 취약 유형 태그 ===== */}
          {semanticWeakTags.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-bold text-slate-700 mb-2">📌 취약 유형</p>
              <div className="flex flex-wrap gap-1.5">
                {semanticWeakTags.map((t) => (
                  <span key={t.tag} className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                    style={{ background: t.rate > 0.5 ? '#EF4444' : t.rate > 0.3 ? '#F59E0B' : '#FCD34D' }}>
                    {TAG_LABELS[t.tag] ?? t.tag} ({(t.rate * 100).toFixed(0)}%)
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ===== 오답 목록 (VOCATEST 동일: 접이식) ===== */}
          {wrongItems.length > 0 && (
            <div className="rounded-xl border border-slate-200 overflow-hidden mb-4">
              <button
                onClick={() => setShowWrongList(!showWrongList)}
                className="w-full bg-slate-50 p-3 flex items-center justify-between hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-red-500">⚠️</span>
                  <span className="font-bold text-slate-700 text-sm">오답 목록</span>
                  <span className="text-xs text-red-500">{wrongItems.length}개</span>
                </div>
                <span className="text-slate-400 text-sm">{showWrongList ? '▲' : '▼'}</span>
              </button>
              {showWrongList && (
                <div className="p-4 bg-white space-y-2">
                  {wrongItems.map((w, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm bg-red-50 p-3 rounded-lg">
                      <span className="text-red-400 shrink-0">✗</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-700 truncate text-base">
                          {w.problemId === 'wrong_input' ? '잘못된 입력값' : w.expression}
                        </div>
                        <div className="text-xs text-slate-400">
                          {w.kind === 'missed' ? '놓친 문제' : `내 답: ${w.userAnswer}`}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs shrink-0">
                        {w.kind !== 'missed' && w.userAnswer !== null && (
                          <span className="text-red-400 line-through">{w.userAnswer}</span>
                        )}
                        {w.correctAnswer !== -1 && (
                          <>
                            <span className="text-slate-300">→</span>
                            <span className="text-emerald-600 font-bold text-sm">{w.correctAnswer}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ===== 정답 목록 (VOCATEST 동일: 접이식) ===== */}
          {correctItems.length > 0 && (
            <div className="rounded-xl border border-slate-200 overflow-hidden mb-4">
              <button
                onClick={() => setShowCorrectList(!showCorrectList)}
                className="w-full bg-slate-50 p-3 flex items-center justify-between hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">✅</span>
                  <span className="font-bold text-slate-700 text-sm">정답 목록</span>
                  <span className="text-xs text-emerald-500">{correctItems.length}개</span>
                </div>
                <span className="text-slate-400 text-sm">{showCorrectList ? '▲' : '▼'}</span>
              </button>
              {showCorrectList && (
                <div className="p-4 bg-white">
                  <div className="flex flex-wrap gap-2">
                    {correctItems.map((c, i) => (
                      <span key={i} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-medium">
                        {c.expression}={c.answer}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 태블릿 용도: 공유 버튼 제거 */}

          {/* 다시하기 */}
          <button
            onClick={() => { resetGame(); startGame(); }}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-extrabold flex items-center justify-center gap-2 shadow-[0_6px_16px_rgba(99,102,241,0.25)] mb-2"
          >
            🔄 다시하기
          </button>

          {/* 홈으로 */}
          <button
            onClick={() => { resetGame(); setScreen('start'); }}
            className="w-full bg-white border border-slate-200 text-slate-600 py-4 rounded-2xl font-extrabold flex items-center justify-center gap-2 hover:bg-slate-50"
          >
            🏠 처음으로 돌아가기
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">{createdAt}</p>
      </div>
    </div>
  );
};

export default ResultScreen;
