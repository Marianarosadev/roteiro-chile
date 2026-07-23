import React from 'react';
import { X, Sliders, Info, ShieldCheck, Wallet, MapPin } from 'lucide-react';
import { CATEGORY_MAP } from '../../constants/categories';
import { formatCurrency } from '../../utils/formatters';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalBRL: number;
  totalCLP: number;
}

export const SettingsModal: React.FC<SettingsModalProps> = React.memo(({
  isOpen,
  onClose,
  totalBRL,
  totalCLP,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 leading-none">
                Configurações & Informações
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Roteiro de Viagem - Santiago 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Budget Overview */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            <Wallet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Resumo Orçamentário da Viagem</span>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[11px] text-slate-500 font-medium block">Total BRL</span>
              <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(totalBRL, 'BRL')}
              </span>
            </div>
            <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[11px] text-slate-500 font-medium block">Total CLP</span>
              <span className="text-base font-extrabold text-slate-800 dark:text-slate-200">
                {formatCurrency(totalCLP, 'CLP')}
              </span>
            </div>
          </div>
        </div>

        {/* Category Color Palette Reference */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Legenda de Cores por Categoria
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.values(CATEGORY_MAP).map((cat) => (
              <div
                key={cat.key}
                className={`flex items-center gap-2 p-2 rounded-lg border ${cat.bgClass} ${cat.textClass} ${cat.borderClass}`}
              >
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: cat.dotColor }}
                />
                <span className="font-semibold">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tips / Important info */}
        <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Guarde sempre os comprovantes da PDI na imigração para isenção de 19% de IVA nos hotéis e Airbnb no Chile.
          </p>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-semibold rounded-xl text-xs hover:opacity-90 transition-opacity"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
});

SettingsModal.displayName = 'SettingsModal';
