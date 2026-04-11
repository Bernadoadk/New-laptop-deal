import React, { useState } from 'react';
import { SetupPreset, ComponentCategory } from '../../types';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

interface PresetEditorProps {
  preset: SetupPreset;
  categories: ComponentCategory[];
  onSave: (optionIds: number[]) => void;
  isLoading: boolean;
}

export const PresetEditor: React.FC<PresetEditorProps> = ({ preset, categories, onSave, isLoading }) => {
  const [selections, setSelections] = useState<Record<number, number>>(() => {
    // Map of CategoryID -> OptionID
    const initial: Record<number, number> = {};
    preset.items.forEach(item => {
      initial[item.option.categoryId] = item.option.id;
    });
    return initial;
  });

  const handleChange = (categoryId: number, optionId: number) => {
    setSelections(prev => ({ ...prev, [categoryId]: optionId }));
  };

  const handleSave = () => {
    onSave(Object.values(selections));
  };

  const currentTotal = categories.reduce((sum, cat) => {
    const optId = selections[cat.id];
    const opt = cat.options.find(o => o.id === optId);
    return sum + (opt?.price || 0);
  }, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-BJ', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div key={cat.id}>
            <Select
              label={cat.label}
              options={cat.options.map(opt => ({ value: opt.id, label: `${opt.name} (${formatPrice(opt.price)})` }))}
              value={selections[cat.id] || ''}
              onChange={(e) => handleChange(cat.id, parseInt(e.target.value))}
            />
          </div>
        ))}
      </div>

      <div className="bg-bg-3 p-6 rounded-xl border border-border flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <p className="text-[10px] font-black uppercase text-nld-muted tracking-widest mb-1">Total Calculé pour ce Preset</p>
          <p className="text-3xl font-black text-white">{formatPrice(currentTotal + 25000)} <span className="text-xs text-nld-muted text-light">(+25K Montage)</span></p>
        </div>
        <Button size="lg" onClick={handleSave} isLoading={isLoading} className="px-12">
          ENREGISTRER LE PRESET
        </Button>
      </div>
    </div>
  );
};
