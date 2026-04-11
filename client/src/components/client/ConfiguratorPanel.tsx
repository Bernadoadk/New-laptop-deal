import React from 'react';
import { ComponentCategory } from '../../types';
import { Select } from '../ui/Select';
import { Badge } from '../ui/Badge';

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
    <div className="space-y-8">
      {categories.map((cat) => (
        <div key={cat.id} className="relative group">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{cat.emoji}</span>
            <h3 className="text-sm font-bold tracking-[0.2em] text-accent flex-grow">{cat.label}</h3>
            {selections[cat.key] && (
              <Badge variant="cyan" size="sm">SÉLECTIONNÉ</Badge>
            )}
          </div>
          <Select
            options={cat.options.map((opt) => ({
              value: opt.id,
              label: `${opt.name} (+${new Intl.NumberFormat('fr-BJ').format(opt.price)} F)`,
            }))}
            value={selections[cat.key] || ''}
            onChange={(e) => onSelect(cat.key, parseInt(e.target.value))}
            className="group-hover:border-accent/40"
          />
        </div>
      ))}
    </div>
  );
};
