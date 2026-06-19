import { useEffect, useState } from 'react';
import { getMathResult, type MathResultRow } from '../../lib/supabase';

const FONT_FAMILY = "'OwnglyphParkDaHyun', sans-serif";

// 로고 SVG (TES EDU 날개 로고)
function TesLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontSize: '24px' }}>🧮</span>
      <div>
        <div style={{ fontSize: '14px', fontWeight: 800, color: '#5D4E37' }}>TES EDU</div>
      </div>
    </div>
  );
}

interface Props {
  reportId: string;
}

export default function SharedMathReport({ reportId }: Props) {
  const [result, setResult] = useState<MathResultRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [showWrongList, setShowWrongList] = useState(true);
  const [showCorrectList, setShowCorrectList] = useState(false);

  useEffect(() => {
    getMathResult(reportId).then(data => {
      setResult(data);
      setLoading(false);
    });
  }, [reportId]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#F8F6F0', fontFamily: FONT_FAMILY,
      }}>
        <div style={{ textAlign: 'center', color: '#999' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
          <p style={{ fontSize: '16px' }}>성적표를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#F8F6F0', fontFamily: FONT_FAMILY,
      }}>
        <div style={{ textAlign: 'center', color: '#999' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>❌</div>
          <p style={{ fontWeight: 'bold', color: '#333', fontSize: '18px' }}>링크를 찾을 수 없습니다</p>
          <p style={{ fontSize: '14px' }}>만료되었거나 잘못된 링크입니다.</p>
        </div>
      </div>
    );
  }

  const correct = result.correct_answers ?? [];
  const wrong = result.incorrect_answers ?? [];
  const total = result.total_questions;
  const accuracy = result.accuracy;
  const createdAt = result.created_at
    ? new Date(result.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  const gradeLabel = result.grade_id === 'G1' ? 'G1: 한 자리 수 / 기초 두 자리' :
                     result.grade_id === 'G2' ? 'G2: 큰 수 / 세 자리 수' :
                     'G3: 곱셈·나눗셈 암산';

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, overflowY: 'auto',
      background: '#F8F6F0', fontFamily: FONT_FAMILY,
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Header */}
      <header style={{
        background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        padding: '0 16px', height: '56px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10,
      }}>
        <TesLogo />
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '12px', color: '#999' }}>TES 영어학원</div>
          <div style={{ fontSize: '14px', color: '#5D4E37', fontWeight: 600 }}>산성비 연산 게임</div>
        </div>
      </header>

      {/* Body */}
      <div style={{ padding: '16px', flex: 1, paddingBottom: '32px' }}>
        <div style={{
          background: '#FFFFFF', padding: '24px', borderRadius: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #F0EDE8',
          maxWidth: '500px', margin: '0 auto',
        }}>
          {/* Title */}
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#333', marginBottom: '4px' }}>
            {result.user_name}의 연산 성적표
          </h2>
          <p style={{ fontSize: '14px', color: '#999', marginBottom: '20px' }}>
            {result.unit_display_name}
          </p>

          {/* Grade Progress */}
          <div style={{
            border: '1px solid #E8E0D5', borderRadius: '16px', padding: '16px',
            marginBottom: '20px',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px' }}>📍</span>
                <span style={{ fontWeight: 'bold', fontSize: '15px', color: '#333' }}>나의 진도표</span>
                <span style={{ fontSize: '13px', color: '#999' }}>{gradeLabel}</span>
              </div>
            </div>

            {/* Grade bars */}
            {(['G1', 'G2', 'G3'] as const).map(gid => {
              const isActive = result.grade_id === gid;
              const label = gid === 'G1' ? 'G1 한 자리/기초' : gid === 'G2' ? 'G2 큰 수/세 자리' : 'G3 곱셈/나눗셈';
              return (
                <div key={gid} style={{ marginBottom: '12px' }}>
                  <div style={{
                    fontSize: '13px', fontWeight: 'bold', marginBottom: '6px',
                    color: isActive ? '#5D4E37' : '#CCC',
                  }}>
                    {label}
                  </div>
                  <div style={{
                    height: '6px', background: '#EDEDED', borderRadius: '3px',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    {isActive && (
                      <div style={{
                        height: '100%', borderRadius: '3px',
                        background: gid === 'G1' ? '#FFB74D' : gid === 'G2' ? '#66BB6A' : '#42A5F5',
                        width: '30%', // placeholder
                      }} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Accuracy Card — 그라데이션 */}
          <div style={{
            background: accuracy >= 70
              ? 'linear-gradient(135deg, #43A047 0%, #66BB6A 100%)'
              : 'linear-gradient(135deg, #E53935 0%, #EF5350 100%)',
            borderRadius: '16px', padding: '24px', marginBottom: '20px',
            color: '#FFFFFF', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', right: '-16px', top: '-16px',
              width: '96px', height: '96px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontSize: '14px', opacity: 0.85, marginBottom: '4px' }}>종합 정답률</p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
                <span style={{ fontSize: '56px', fontWeight: 'bold', lineHeight: 1 }}>{accuracy}</span>
                <span style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>%</span>
              </div>
              <p style={{ fontSize: '14px', opacity: 0.7, marginTop: '8px' }}>
                총 {total}문제 중 {correct.length}문제 정답
              </p>
            </div>
          </div>

          {/* Stats Table */}
          <div style={{
            borderRadius: '16px', border: '1px solid #E0E0E0',
            overflow: 'hidden', marginBottom: '20px',
          }}>
            {/* Table header bar */}
            <div style={{
              background: '#43A047', padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: '8px', color: '#FFFFFF',
            }}>
              <span style={{
                background: 'rgba(255,255,255,0.2)', padding: '2px 8px',
                borderRadius: '4px', fontSize: '12px', fontWeight: 'bold',
              }}>연산</span>
              <span style={{ fontSize: '14px', fontWeight: 500 }}>
                {result.unit_display_name}
              </span>
            </div>

            {/* Table */}
            <div style={{ padding: '16px', background: '#FFFFFF' }}>
              <div style={{
                borderRadius: '8px', border: '1px solid #F0F0F0',
                overflow: 'hidden', fontSize: '14px',
              }}>
                {/* Header row */}
                <div style={{ display: 'flex', background: '#FAFAFA', borderBottom: '1px solid #F0F0F0' }}>
                  <div style={{ flex: 1, padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#888' }}>구분</div>
                  <div style={{ flex: 1, padding: '10px', textAlign: 'center', color: '#888' }}>문제</div>
                  <div style={{ flex: 1, padding: '10px', textAlign: 'center', color: '#888' }}>정답</div>
                  <div style={{ flex: 1, padding: '10px', textAlign: 'center', color: '#888' }}>오답</div>
                </div>
                {/* Data row */}
                <div style={{ display: 'flex', background: '#EEF2FF' }}>
                  <div style={{ flex: 1, padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#5C6BC0' }}>합계</div>
                  <div style={{ flex: 1, padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#5C6BC0' }}>{total}</div>
                  <div style={{ flex: 1, padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#43A047' }}>{correct.length}</div>
                  <div style={{ flex: 1, padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#E53935' }}>{wrong.length}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Extra stats: score, combo */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px',
            marginBottom: '20px',
          }}>
            <div style={{
              background: '#FFF8E1', borderRadius: '12px', padding: '14px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#E8A838' }}>{result.score}</div>
              <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>총 점수</div>
            </div>
            <div style={{
              background: '#FFF3E0', borderRadius: '12px', padding: '14px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF7043' }}>{result.max_combo}</div>
              <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>최고 콤보</div>
            </div>
          </div>

          {/* Wrong answers list */}
          {wrong.length > 0 && (
            <div style={{
              borderRadius: '16px', border: '1px solid #E0E0E0',
              overflow: 'hidden', marginBottom: '16px',
            }}>
              <button
                onClick={() => setShowWrongList(!showWrongList)}
                style={{
                  width: '100%', background: '#FAFAFA', padding: '12px 16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  border: 'none', cursor: 'pointer', fontFamily: FONT_FAMILY,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#E53935' }}>⚠️</span>
                  <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>오답 목록</span>
                  <span style={{ fontSize: '12px', color: '#E53935' }}>{wrong.length}개</span>
                </div>
                <span style={{ color: '#999', fontSize: '18px' }}>{showWrongList ? '▲' : '▼'}</span>
              </button>
              {showWrongList && (
                <div style={{ padding: '12px', background: '#FFFFFF' }}>
                  {wrong.map((w, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      background: '#FFF5F5', padding: '12px', borderRadius: '12px',
                      marginBottom: i < wrong.length - 1 ? '8px' : 0,
                      fontSize: '14px',
                    }}>
                      <span style={{ color: '#E53935', fontSize: '16px' }}>✗</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'bold', color: '#333', fontSize: '16px' }}>
                          {w.expression}
                        </div>
                        <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>
                          {w.result === 'missed' ? '놓친 문제' : `내 답: ${w.userAnswer}`}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                        {w.result !== 'missed' && (
                          <span style={{ color: '#E53935', textDecoration: 'line-through' }}>{w.userAnswer}</span>
                        )}
                        <span style={{ color: '#CCC' }}>→</span>
                        <span style={{ color: '#43A047', fontWeight: 'bold' }}>{w.correctAnswer}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Correct answers list */}
          {correct.length > 0 && (
            <div style={{
              borderRadius: '16px', border: '1px solid #E0E0E0',
              overflow: 'hidden',
            }}>
              <button
                onClick={() => setShowCorrectList(!showCorrectList)}
                style={{
                  width: '100%', background: '#FAFAFA', padding: '12px 16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  border: 'none', cursor: 'pointer', fontFamily: FONT_FAMILY,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#43A047' }}>✅</span>
                  <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>정답 목록</span>
                  <span style={{ fontSize: '12px', color: '#43A047' }}>{correct.length}개</span>
                </div>
                <span style={{ color: '#999', fontSize: '18px' }}>{showCorrectList ? '▲' : '▼'}</span>
              </button>
              {showCorrectList && (
                <div style={{ padding: '12px', background: '#FFFFFF' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {correct.map((c, i) => (
                      <span key={i} style={{
                        fontSize: '13px', background: '#F0FFF4', color: '#2E7D32',
                        padding: '4px 10px', borderRadius: '20px', fontWeight: 600,
                      }}>
                        {c.expression}={c.answer}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Date footer */}
        <p style={{ textAlign: 'center', fontSize: '12px', color: '#BBB', marginTop: '16px' }}>
          {createdAt}
        </p>
      </div>
    </div>
  );
}
