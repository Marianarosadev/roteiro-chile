import React from 'react';
import { Plane, Settings, Compass, Wallet, MapPin, Calendar, User } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export type CalendarViewMode = 'day' | 'week' | 'month';

interface NavbarProps {
  tripTitle?: string;
  totalBRL: number;
  totalCLP: number;
  onOpenSettings?: () => void;
  isCalendarVisible?: boolean;
  onToggleCalendar?: () => void;
  calendarViewMode?: CalendarViewMode;
  onChangeCalendarViewMode?: (mode: CalendarViewMode) => void;
  currentUser?: string;
  onChangeCurrentUser?: (user: string) => void;
}

export const Navbar: React.FC<NavbarProps> = React.memo(({
  tripTitle = 'Roteiro Santiago 2026',
  totalBRL,
  totalCLP,
  onOpenSettings,
  isCalendarVisible = true,
  onToggleCalendar,
  calendarViewMode = 'month',
  onChangeCalendarViewMode,
  currentUser = 'Todos',
  onChangeCurrentUser,
}) => {
  return (
    <header className="w-full bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-sm">
      <div className="max-w-full px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Branding & Trip Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 shrink-0">
            <Plane className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-base sm:text-lg tracking-tight text-slate-50 leading-none">
                {tripTitle}
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium bg-sky-950 text-sky-300 border border-sky-800 px-2 py-0.5 rounded-full">
                <MapPin className="w-3 h-3" /> Chile
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden xs:block mt-0.5">
              Visualização de Timeline & Calendário
            </p>
          </div>
        </div>

        {/* Center/Right: Trip Stats & Settings */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Trip Total Budget Badge */}
          <div className="hidden md:flex items-center gap-3 bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-slate-400 font-medium">
              <Wallet className="w-4 h-4 text-emerald-400" />
              <span>Total Viagem:</span>
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <span className="text-emerald-400">{formatCurrency(totalBRL, 'BRL')}</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300">{formatCurrency(totalCLP, 'CLP')}</span>
            </div>
          </div>

          {/* User Selector Dropdown */}
          {onChangeCurrentUser && (
            <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 rounded-lg px-2 sm:px-3 py-1.5 text-xs select-none shrink-0">
              <User className="w-3.5 h-3.5 text-sky-400" />
              <label htmlFor="user-select" className="text-slate-400 hidden xs:inline font-medium">Usuário:</label>
              <select
                id="user-select"
                value={currentUser}
                onChange={(e) => onChangeCurrentUser(e.target.value)}
                className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer pr-1"
              >
                <option value="Todos" className="bg-slate-800 text-white font-medium">Todos</option>
                <option value="Mariana" className="bg-slate-800 text-white font-medium">Mariana</option>
                <option value="Lara" className="bg-slate-800 text-white font-medium">Lara</option>
                <option value="Weverton" className="bg-slate-800 text-white font-medium">Weverton</option>
                <option value="Neto" className="bg-slate-800 text-white font-medium">Neto</option>
              </select>
            </div>
          )}

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            {isCalendarVisible && onChangeCalendarViewMode && (
              <div className="flex items-center bg-slate-800 border border-slate-750 rounded-lg p-0.5 text-xs mr-1 shrink-0">
                {(['day', 'week', 'month'] as CalendarViewMode[]).map((mode) => {
                  const labels = {
                    day: 'Dia',
                    week: 'Semana',
                    month: 'Mês',
                  };
                  const active = calendarViewMode === mode;
                  return (
                    <button
                      key={mode}
                      onClick={() => onChangeCalendarViewMode(mode)}
                      className={`px-2.5 py-1 rounded-md transition-all duration-200 font-medium cursor-pointer ${
                        active
                          ? 'bg-sky-600 text-white shadow-sm font-semibold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                      }`}
                    >
                      {labels[mode]}
                    </button>
                  );
                })}
              </div>
            )}
            {onToggleCalendar && (
              <button
                onClick={onToggleCalendar}
                className={`p-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer ${
                  isCalendarVisible
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700'
                    : 'bg-sky-600 hover:bg-sky-500 text-white border-sky-600 shadow-md shadow-sky-600/20'
                }`}
                title={isCalendarVisible ? "Ocultar Calendário" : "Mostrar Calendário"}
                aria-label={isCalendarVisible ? "Ocultar Calendário" : "Mostrar Calendário"}
              >
                <Calendar className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
              title="Configurações e Legenda"
              aria-label="Configurações"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
});

Navbar.displayName = 'Navbar';
