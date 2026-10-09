import React, { useState } from 'react';
import { Download, CheckCircle2, Heart, Shield } from 'lucide-react';

interface DownloadSectionProps {
  dnsUrl: string;
  onOpenDonate: () => void;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({
  dnsUrl,
  onOpenDonate,
}) => {
  const [downloadTriggered, setDownloadTriggered] = useState(false);

  const handleDownloadClick = () => {
    setDownloadTriggered(true);
    setTimeout(() => {
      setDownloadTriggered(false);
    }, 6000);
  };

  return (
    <div className="my-5">
      {/* Primary Download Button */}
      <a
        href={dnsUrl}
        download="LocketGold.mobileconfig"
        onClick={handleDownloadClick}
        className="group relative flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-extrabold text-base sm:text-lg shadow-[0_10px_28px_-6px_rgba(245,158,11,0.55)] hover:shadow-[0_14px_34px_-6px_rgba(245,158,11,0.7)] transition-all duration-200 active:scale-[0.98] select-none text-center border border-amber-300/40"
      >
        <span className="p-1 rounded-xl bg-slate-950/10 text-slate-950 group-hover:scale-110 transition-transform">
          <Download className="w-5 h-5" strokeWidth={2.5} />
        </span>
        <span className="tracking-wide">Tải Cấu Hình Locket Gold</span>
        <span className="absolute right-4 text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-950/15 text-slate-950 hidden sm:inline-block">
          iOS Only
        </span>
      </a>

      {/* Post-click Helper Message */}
      {downloadTriggered && (
        <div className="mt-3 p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            Thông báo hiện ra trên màn hình iPhone? Hãy bấm chọn <b>"Cho phép" (Allow)</b> rồi tiếp tục sang Bước 2 nhé!
          </span>
        </div>
      )}

      {/* Auxiliary Actions Strip */}
      <div className="flex items-center justify-between gap-2 mt-3 pt-1 text-xs text-slate-400">
        <button
          onClick={onOpenDonate}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 hover:text-white text-[11px] font-bold transition-all cursor-pointer active:scale-95 shadow-sm"
        >
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>Donate</span>
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>Hồ sơ CA gốc</span>
        </div>
      </div>
    </div>
  );
};
