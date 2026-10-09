import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-6 pt-4 border-t border-slate-800/80 text-center text-[11px] text-slate-500 space-y-2">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-slate-400">
        <span>Hệ thống kích hoạt Locket Gold tự động</span>
        <span className="hidden sm:inline" aria-hidden="true">·</span>
        <span>Powered by LocketGold & DNS System</span>
      </div>

      <div className="text-[10px] text-slate-600">
        Dành riêng cho thiết bị iOS (iPhone/iPad) • Phiên bản 2026
      </div>
    </footer>
  );
};
