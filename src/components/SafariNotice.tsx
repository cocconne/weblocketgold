import React from 'react';
import { Compass } from 'lucide-react';

export const SafariNotice: React.FC = () => {
  return (
    <div className="bg-sky-950/40 border border-sky-500/30 rounded-2xl p-3.5 mb-5 text-xs text-sky-200 shadow-lg shadow-sky-950/20 backdrop-blur-sm">
      <div className="flex items-start gap-2.5">
        <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-300 shrink-0 mt-0.5">
          <Compass className="w-4 h-4" />
        </div>
        <div className="flex-1 leading-relaxed">
          <p className="font-medium text-slate-100">
            <b className="text-sky-300 font-bold">Lưu ý quan trọng:</b> Để tải và cài đặt cấu hình không bị lỗi, hãy mở trang web này bằng trình duyệt <b className="text-amber-300 underline underline-offset-2">Safari</b> trên iPhone.
          </p>
        </div>
      </div>
    </div>
  );
};

