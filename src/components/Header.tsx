import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenConfig?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConfig }) => {
  return (
    <header className="text-center mb-6 pt-1">
      <div className="flex items-center justify-center gap-1.5 mb-2">
        <span className="text-[11px] font-extrabold tracking-[1.5px] uppercase text-amber-400 flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          LOCKET GOLD SYSTEM
        </span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-amber-100 to-amber-400 bg-clip-text text-transparent mb-2.5 drop-shadow-sm">
        ✨ LOCKET GOLD
      </h1>

      <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto mb-3.5">
        Cấu hình DNS kích hoạt Locket Gold miễn phí & an toàn cho thiết bị iOS
      </p>

      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse-subtle" />
        <span className="tabular-nums">Máy chủ cấu hình đang hoạt động</span>
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400/80 ml-0.5" />
      </div>
    </header>
  );
};
