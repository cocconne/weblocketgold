import React from 'react';
import { AlertTriangle, Compass, KeyRound, Sparkles } from 'lucide-react';

export const WarningNotice: React.FC = () => {
  return (
    <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-4 sm:p-4.5 mb-6 text-xs text-amber-200/90 leading-relaxed shadow-lg shadow-amber-950/20 backdrop-blur-sm">
      <div className="flex items-center gap-2 font-bold text-amber-300 text-sm mb-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
        <span>Lưu ý quan trọng:</span>
      </div>

      <ul className="space-y-2 text-[12.5px] text-amber-100/90 pl-1">
        <li className="flex items-start gap-2">
          <span className="text-amber-400 font-bold shrink-0">•</span>
          <span>
            Mở trang web này bằng <b className="text-white underline underline-offset-2">trình duyệt Safari</b> (không tải qua trình duyệt in-app Zalo, Facebook, TikTok hoặc Google Chrome để tránh bị chặn tải file profile).
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-amber-400 font-bold shrink-0">•</span>
          <span>
            Bắt buộc phải làm đầy đủ <b className="text-amber-300">Bước 3 (Bật tin cậy chứng chỉ trong Cài đặt chung Giới thiệu)</b> thì ứng dụng Locket trên iPhone mới nhận diện được gói Gold.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-amber-400 font-bold shrink-0">•</span>
          <span>
            Sau khi bật tin cậy xong, hãy <b className="text-white">vuốt tắt ứng dụng Locket trong đa nhiệm</b> rồi mở lại để tải dữ liệu mới.
          </span>
        </li>
      </ul>
    </div>
  );
};
