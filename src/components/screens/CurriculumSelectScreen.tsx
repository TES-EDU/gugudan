import React, { useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { CURRICULUM } from '../../data/curriculum';
import type { GradeId, CurriculumUnit } from '../../game/types';

const FONT_FAMILY = "'OwnglyphParkDaHyun', sans-serif";

const GRADE_COLORS: Record<GradeId, { bg: string; active: string; text: string }> = {
  G1: { bg: '#FFF3E0', active: '#FFB74D', text: '#E65100' },
  G2: { bg: '#E8F5E9', active: '#66BB6A', text: '#1B5E20' },
  G3: { bg: '#E3F2FD', active: '#42A5F5', text: '#0D47A1' },
  G4: { bg: '#FCE4EC', active: '#F06292', text: '#880E4F' },
};

const CurriculumSelectScreen: React.FC = () => {
  const setScreen = useGameStore((s) => s.setScreen);
  const selectLevel = useGameStore((s) => s.selectLevel);
  const startGame = useGameStore((s) => s.startGame);

  const [selectedGradeId, setSelectedGradeId] = useState<GradeId>('G1');

  const currentGrade = CURRICULUM.find((g) => g.id === selectedGradeId);
  const units = currentGrade?.units ?? [];
  const gradeColor = GRADE_COLORS[selectedGradeId];

  const handleUnitSelect = (unit: CurriculumUnit) => {
    selectLevel(unit.id);
    startGame();
  };

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden"
      style={{
        fontFamily: FONT_FAMILY,
        background: `linear-gradient(135deg, ${gradeColor.bg} 0%, #FFFFFF 100%)`,
      }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-sm shadow-sm">
        <button
          onClick={() => setScreen('start')}
          className="text-2xl px-3 py-1 rounded-xl hover:bg-gray-100 active:scale-95 transition-all"
          style={{ color: '#5D4E37' }}
        >
          ←
        </button>
        <h1 className="text-2xl font-bold" style={{ color: '#5D4E37' }}>
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
      <div className="flex gap-2 px-4 py-3">
        {CURRICULUM.map((grade) => {
          const gc = GRADE_COLORS[grade.id];
          const isActive = grade.id === selectedGradeId;
          return (
            <button
              key={grade.id}
              onClick={() => setSelectedGradeId(grade.id)}
              className="flex-1 py-3 rounded-2xl text-xl font-bold transition-all duration-200 active:scale-95"
              style={{
                backgroundColor: isActive ? gc.active : '#FFFFFF',
                color: isActive ? '#FFFFFF' : gc.text,
                border: `2px solid ${isActive ? gc.active : '#E0E0E0'}`,
                boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
              }}
            >
              {grade.id}
            </button>
          );
        })}
      </div>

      {/* Flat Unit List */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <div className="grid grid-cols-2 gap-3 pb-8">
          {units.map((unit, idx) => (
            <UnitCard
              key={unit.id}
              unit={unit}
              unitIndex={idx + 1}
              gradeColor={gradeColor}
              onSelect={() => handleUnitSelect(unit)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ========== Unit Card ==========

interface UnitCardProps {
  unit: CurriculumUnit;
  unitIndex: number;
  gradeColor: { bg: string; active: string; text: string };
  onSelect: () => void;
}

const UnitCard: React.FC<UnitCardProps> = ({ unit, unitIndex, gradeColor, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className="flex flex-col p-3 rounded-xl bg-white border-2 transition-all duration-150 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 text-left h-full justify-between"
      style={{ borderColor: '#E8E0D5' }}
    >
      <div>
        {/* Unit number + title */}
        <div className="flex items-start gap-2 mb-2">
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full text-white shrink-0 mt-0.5"
            style={{ backgroundColor: gradeColor.active }}
          >
            L{unitIndex}
          </span>
          <span className="text-sm font-bold leading-tight" style={{ color: '#5D4E37' }}>
            {unit.title}
          </span>
        </div>
      </div>

      {/* Example expressions */}
      <div className="flex flex-wrap gap-1 mt-2">
        {unit.examples.slice(0, 2).map((ex, i) => (
          <span
            key={i}
            className="text-xs px-1.5 py-0.5 rounded-md"
            style={{ backgroundColor: gradeColor.bg, color: gradeColor.text }}
          >
            {ex}
          </span>
        ))}
      </div>
    </button>
  );
};

export default CurriculumSelectScreen;
