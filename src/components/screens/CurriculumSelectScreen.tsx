import React, { useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { CURRICULUM } from '../../data/curriculum';
import type { GradeId, CurriculumUnit } from '../../game/types';

const FONT_FAMILY = "'OwnglyphParkDaHyun', sans-serif";

// ── Grade tab labels ──
const GRADE_TABS: { id: GradeId; label: string; sub: string }[] = [
  { id: 'G1', label: 'G1', sub: '기초' },
  { id: 'G2', label: 'G2', sub: '두·세 자리' },
  { id: 'G3', label: 'G3', sub: '곱셈·나눗셈' },
  { id: 'G4', label: 'G4', sub: '큰 수·혼합' },
];

const GRADE_COLORS: Record<GradeId, { bg: string; active: string; text: string; light: string }> = {
  G1: { bg: '#FFF3E0', active: '#FFB74D', text: '#E65100', light: '#FFF8E1' },
  G2: { bg: '#E8F5E9', active: '#66BB6A', text: '#1B5E20', light: '#F1F8E9' },
  G3: { bg: '#E3F2FD', active: '#42A5F5', text: '#0D47A1', light: '#E8F0FE' },
  G4: { bg: '#FCE4EC', active: '#F06292', text: '#880E4F', light: '#FFF0F5' },
};



// ── Explicit section definitions per grade ──
const GRADE_SECTIONS: Record<GradeId, { icon: string; label: string; unitIds: string[] }[]> = {
  G1: [
    { icon: '➕', label: '덧셈', unitIds: ['G1_U01','G1_U02','G1_U03','G1_U04','G1_U05','G1_U06','G1_U07','G1_U08','G1_U09','G1_U10'] },
    { icon: '➖', label: '뺄셈', unitIds: ['G1_U11','G1_U12','G1_U13','G1_U14','G1_U15','G1_U16','G1_U17'] },
    { icon: '🔢', label: '세 수 계산', unitIds: ['G1_U18','G1_U19','G1_U20'] },
  ],
  G2: [
    { icon: '➕', label: '덧셈', unitIds: ['G2_U01','G2_U02','G2_U03','G2_U04','G2_U05','G2_U06','G2_U07','G2_U08','G2_U09'] },
    { icon: '➖', label: '뺄셈', unitIds: ['G2_U10','G2_U11','G2_U12','G2_U13','G2_U14','G2_U15','G2_U16','G2_U17'] },
    { icon: '🔀', label: '혼합 계산', unitIds: ['G2_U18'] },
  ],
  G3: [
    { icon: '🔢', label: '덧셈·뺄셈', unitIds: ['G3_U01','G3_U02','G3_U03','G3_U04','G3_U05'] },
    { icon: '✖️', label: '곱셈', unitIds: ['G3_U06','G3_U07','G3_U08','G3_U09','G3_U10','G3_U11','G3_U12','G3_U13','G3_U14'] },
    { icon: '➗', label: '나눗셈', unitIds: ['G3_U15','G3_U16','G3_U17','G3_U18','G3_U19','G3_U20','G3_U21','G3_U22','G3_U23','G3_U24'] },
  ],
  G4: [
    { icon: '🔢', label: '큰 수 덧셈·뺄셈', unitIds: ['G4_U01','G4_U02','G4_U03'] },
    { icon: '✖️', label: '곱셈', unitIds: ['G4_U04','G4_U05','G4_U06','G4_U07','G4_U08','G4_U09','G4_U10','G4_U11'] },
    { icon: '➗', label: '나눗셈', unitIds: ['G4_U12','G4_U13','G4_U14','G4_U15','G4_U16','G4_U17'] },
    { icon: '🔀', label: '혼합 계산', unitIds: ['G4_U18','G4_U19','G4_U20','G4_U21'] },
  ],
};

interface SectionGroup {
  icon: string;
  label: string;
  units: CurriculumUnit[];
}

function buildSections(gradeId: GradeId, units: CurriculumUnit[]): SectionGroup[] {
  const unitMap = new Map(units.map(u => [u.id, u]));
  const sections = GRADE_SECTIONS[gradeId];
  return sections.map(sec => ({
    icon: sec.icon,
    label: sec.label,
    units: sec.unitIds.map(id => unitMap.get(id)).filter((u): u is CurriculumUnit => !!u),
  })).filter(s => s.units.length > 0);
}

const CurriculumSelectScreen: React.FC = () => {
  const setScreen = useGameStore((s) => s.setScreen);
  const selectLevel = useGameStore((s) => s.selectLevel);
  const startGame = useGameStore((s) => s.startGame);

  const [selectedGradeId, setSelectedGradeId] = useState<GradeId>('G1');
  const [openGroupKeys, setOpenGroupKeys] = useState<Set<string>>(new Set());
  const [initialized, setInitialized] = useState(false);

  const currentGrade = CURRICULUM.find((g) => g.id === selectedGradeId);
  const units = currentGrade?.units ?? [];
  const groups = buildSections(selectedGradeId, units);
  const gc = GRADE_COLORS[selectedGradeId];

  // Build groupKeys for current grade
  const groupKeys = groups.map((g, gi) => `${selectedGradeId}_${gi}_${g.label}`);

  // Open first group on initial render or grade change
  React.useEffect(() => {
    if (groupKeys.length > 0) {
      setOpenGroupKeys(new Set([groupKeys[0]]));
    }
    setInitialized(true);
  }, [selectedGradeId]);

  const handleGradeChange = (gradeId: GradeId) => {
    setSelectedGradeId(gradeId);
  };

  const toggleGroup = (key: string) => {
    setOpenGroupKeys(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleUnitSelect = (unit: CurriculumUnit) => {
    selectLevel(unit.id);
    startGame();
  };

  // Build global unit index for this grade
  const unitIndexMap = new Map<string, number>();
  units.forEach((u, i) => unitIndexMap.set(u.id, i + 1));

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden"
      style={{
        fontFamily: FONT_FAMILY,
        background: `linear-gradient(180deg, ${gc.bg} 0%, #FFFFFF 100%)`,
      }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-sm shadow-sm"
        style={{ borderBottom: `2px solid ${gc.active}22` }}
      >
        <button
          onClick={() => setScreen('start')}
          className="text-2xl px-3 py-1 rounded-xl hover:bg-gray-100 active:scale-95 transition-all"
          style={{ color: '#5D4E37' }}
        >
          ←
        </button>
        <h1 className="text-3xl font-bold" style={{ color: '#5D4E37' }}>
          📚 레벨 선택
        </h1>
        <button
          onClick={() => setScreen('settings')}
          className="text-2xl px-3 py-1 rounded-xl hover:bg-gray-100 active:scale-95 transition-all"
          style={{ color: '#5D4E37' }}
        >
          ⚙️
        </button>
      </div>

      {/* Grade Tabs */}
      <div className="flex gap-1.5 px-3 py-2.5">
        {GRADE_TABS.map((tab) => {
          const tabGc = GRADE_COLORS[tab.id];
          const isActive = tab.id === selectedGradeId;
          return (
            <button
              key={tab.id}
              onClick={() => handleGradeChange(tab.id)}
              className="flex-1 flex flex-col items-center py-3 rounded-2xl transition-all duration-200 active:scale-95"
              style={{
                backgroundColor: isActive ? tabGc.active : '#FFFFFF',
                color: isActive ? '#FFFFFF' : tabGc.text,
                border: `2px solid ${isActive ? tabGc.active : '#E0E0E0'}`,
                boxShadow: isActive ? `0 4px 14px ${tabGc.active}44` : 'none',
              }}
            >
              <span className="text-xl font-bold leading-tight">{tab.label}</span>
              <span className="text-sm font-medium leading-tight mt-0.5" style={{ opacity: isActive ? 0.9 : 0.7 }}>
                {tab.sub}
              </span>
            </button>
          );
        })}
      </div>

      {/* Category Accordion List */}
      <div className="flex-1 overflow-y-auto px-3 pb-6">
        {groups.map((group, gi) => {
          const groupKey = `${selectedGradeId}_${gi}_${group.label}`;
          const isOpen = openGroupKeys.has(groupKey);

          return (
            <div key={groupKey} className="mb-2">
              {/* Category Header */}
              <button
                onClick={() => toggleGroup(groupKey)}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 hover:shadow-md active:scale-[0.98]"
                style={{
                  backgroundColor: isOpen ? gc.active : '#FFFFFF',
                  color: isOpen ? '#FFFFFF' : '#5D4E37',
                  border: `2px solid ${isOpen ? gc.active : '#E8E0D5'}`,
                }}
              >
                <span className="text-lg transition-transform duration-200"
                  style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                >
                  ▶
                </span>
                <span className="text-2xl">{group.icon}</span>
                <span className="text-2xl font-bold flex-1 text-left">{group.label}</span>
                <span className="text-sm font-bold px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: isOpen ? 'rgba(255,255,255,0.25)' : gc.bg,
                    color: isOpen ? '#FFFFFF' : gc.text,
                  }}
                >
                  {group.units.length}개
                </span>
              </button>

              {/* Unit List */}
              {isOpen && (
                <div className="mt-2 ml-2 space-y-1.5 animate-[fadeSlideIn_0.2s_ease-out]">
                  {group.units.map((unit) => {
                    const globalIdx = unitIndexMap.get(unit.id) ?? 0;
                    const unitNum = String(globalIdx).padStart(2, '0');
                    return (
                      <button
                        key={unit.id}
                        onClick={() => handleUnitSelect(unit)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white border transition-all duration-150 hover:shadow-md hover:-translate-y-px active:scale-[0.98] text-left"
                        style={{ borderColor: '#E8E0D5' }}
                      >
                        {/* Unit number badge */}
                        <span
                          className="text-sm font-bold px-2.5 py-1.5 rounded-lg text-white shrink-0 min-w-[58px] text-center"
                          style={{ backgroundColor: gc.active }}
                        >
                          {selectedGradeId}-{unitNum}
                        </span>

                        {/* Title & examples */}
                        <div className="flex-1 min-w-0">
                          <div className="text-lg font-bold truncate" style={{ color: '#5D4E37' }}>
                            {unit.title}
                          </div>
                          <div className="flex gap-1.5 mt-1">
                            {unit.examples.slice(0, 2).map((ex, i) => (
                              <span
                                key={i}
                                className="text-xs px-2 py-0.5 rounded"
                                style={{ backgroundColor: gc.light, color: gc.text }}
                              >
                                {ex}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Arrow */}
                        <span className="text-gray-300 text-lg shrink-0">▶</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default CurriculumSelectScreen;
