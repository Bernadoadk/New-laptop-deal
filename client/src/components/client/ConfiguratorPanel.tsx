import React from 'react';
import { ComponentCategory } from '../../types';
import { Select } from '../ui/Select';
import { Badge } from '../ui/Badge';
import { Layers } from 'lucide-react';

interface ConfiguratorPanelProps {
  categories: ComponentCategory[];
  selections: Record<string, number>; // key -> optionId
  onSelect: (categoryKey: string, optionId: number) => void;
}

export const ConfiguratorPanel: React.FC<ConfiguratorPanelProps> = ({
  categories,
  selections,
  onSelect,
}) => {
  return (
    <div className="space-y-10">
      {categories.map((cat) => (
        <div key={cat.id} className="relative group">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl shadow-sm border border-white/5">
              {cat.emoji}
            </div>
            <div className="flex-grow">
              <h3 className="text-sm font-bold tracking-[0.1em] text-white/90 uppercase">{cat.label}</h3>
              <div className="h-0.5 w-12 bg-accent/30 rounded-full mt-1 group-focus-within:w-20 transition-all duration-500" />
            </div>
            {selections[cat.key] && (
              <Badge variant="primary" size="sm">SÉLECTIONNÉ</Badge>
            )}
          </div>
          <Select
            options={cat.options.map((opt) => ({
              value: opt.id,
              label: `${opt.name} (+${new Intl.NumberFormat('fr-BJ').format(opt.price)} F)`,
            }))}
            value={selections[cat.key] || ''}
            onChange={(e) => onSelect(cat.key, parseInt(e.target.value))}
            className="rounded-2xl bg-white/5 border-white/10 focus:border-accent/40 focus:ring-accent/20 transition-all"
          />
        </div>
      ))}
    </div>
  );
};
