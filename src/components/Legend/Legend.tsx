import React from 'react';
import { CATEGORY_MAP } from '../../constants/categories';
import * as Icons from 'lucide-react';

interface LegendProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export const Legend: React.FC<LegendProps> = React.memo(({ selectedCategory, onSelectCategory }) => {
  const categories = Object.values(CATEGORY_MAP);

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors shrink-0 border ${
          selectedCategory === null
            ? 'bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100 font-semibold'
            : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700'
        }`}
      >
        Todas Categorias
      </button>

      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.name;
        const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[cat.iconName] || Icons.Tag;

        return (
          <button
            key={cat.key}
            onClick={() => onSelectCategory(isSelected ? null : cat.name)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all shrink-0 border ${
              isSelected
                ? `${cat.badgeClass} ring-2 ring-offset-1 ring-sky-500 font-semibold`
                : `${cat.bgClass} ${cat.textClass} ${cat.borderClass} opacity-80 hover:opacity-100`
            }`}
          >
            <IconComponent className="w-3 h-3 shrink-0" />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
});

Legend.displayName = 'Legend';
