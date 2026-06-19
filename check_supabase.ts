import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pujiailalhhytbxvsrxj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1amlhaWxhbGhoeXRieHZzcnhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5NzQ0MDcsImV4cCI6MjA4NDU1MDQwN30.Xvg5hXg_dINFkps4yoSJ0LEIxDLXMhDPSOVheIPpgHk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  const result = {
    user_name: 'test',
    book_title: 'test',
    unit_title: 'test',
    unit_display_name: 'test',
    grade_id: 'G1',
    total_questions: 1,
    correct_count: 1,
    wrong_count: 0,
    missed_count: 0,
    score: 100,
    accuracy: 100,
    max_combo: 1,
    time_seconds: 180,
    correct_answers: [],
    incorrect_answers: []
  };
  const { data, error } = await supabase.from('math_results').insert([result]).select('id').single();
  console.log('Insert Error:', error);
  console.log('Insert Data:', data);
}

check();
