-- Supabase SQL Editor에서 실행할 것
-- 기존 VOCATEST 프로젝트에 math_results 테이블 추가

CREATE TABLE IF NOT EXISTS math_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_name TEXT NOT NULL,
  book_title TEXT NOT NULL DEFAULT '산성비 연산 게임',
  unit_title TEXT NOT NULL,
  unit_display_name TEXT NOT NULL DEFAULT '',
  grade_id TEXT NOT NULL DEFAULT 'G1',
  total_questions INTEGER NOT NULL DEFAULT 0,
  correct_count INTEGER NOT NULL DEFAULT 0,
  wrong_count INTEGER NOT NULL DEFAULT 0,
  missed_count INTEGER NOT NULL DEFAULT 0,
  score INTEGER NOT NULL DEFAULT 0,
  accuracy INTEGER NOT NULL DEFAULT 0,
  max_combo INTEGER NOT NULL DEFAULT 0,
  time_seconds INTEGER NOT NULL DEFAULT 180,
  correct_answers JSONB NOT NULL DEFAULT '[]'::jsonb,
  incorrect_answers JSONB NOT NULL DEFAULT '[]'::jsonb,
  student_id UUID REFERENCES students(id),
  academy_id UUID REFERENCES academies(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS (Row Level Security) 설정
ALTER TABLE math_results ENABLE ROW LEVEL SECURITY;

-- 누구나 읽기 가능 (공유 링크용)
CREATE POLICY "Anyone can read math results"
  ON math_results FOR SELECT
  USING (true);

-- 누구나 삽입 가능 (로그인 없이 저장)
CREATE POLICY "Anyone can insert math results"
  ON math_results FOR INSERT
  WITH CHECK (true);
