import React, { useState } from 'react';
import { X, Heart } from 'lucide-react';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose }) => {
  const [imageSrc, setImageSrc] = useState('/donate.webp');
  const [hasError, setHasError] = useState(false);

  if (!isOpen) return null;

  const handleImageError = () => {
    if (imageSrc === '/donate.webp') {
      setImageSrc('/donate.png');
    } else if (imageSrc === '/donate.png') {
      setImageSrc('/donate.jpg');
    } else if (imageSrc === '/donate.jpg') {
      setImageSrc('/donate.jpeg');
    } else {
      setHasError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm bg-slate-900 border border-amber-500/35 rounded-3xl p-5 text-center shadow-2xl overflow-hidden">
        {/* Glow edge */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500 shadow-[0_0_12px_#f43f5e]" />

        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-2 rounded-full bg-slate-800/90 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-10 h-10 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-2 mt-1">
          <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
        </div>

        <h3 className="text-lg font-extrabold text-slate-100 mb-0.5">Ủng Hộ / Donate</h3>
        <p className="text-xs text-amber-300 font-semibold mb-3.5">
          Cảm ơn bạn rất nhiều! ❤️
        </p>

        {/* 1:1 Square Container - Fits image tightly with zero white margins */}
        <div className="relative w-full aspect-square max-w-[320px] mx-auto rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-black mb-3.5">
          {!hasError ? (
            <img
              src={imageSrc}
              alt="Mã QR Donate"
              onError={handleImageError}
              className="w-full h-full object-cover rounded-2xl block"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
              <p className="text-xs text-slate-300 font-medium mb-1">
                Chưa tìm thấy tệp ảnh trong thư mục <code className="text-amber-300">public/</code>
              </p>
              <p className="text-[11px] text-slate-500">
                Hãy đặt tệp ảnh vào <code className="text-slate-400">public/donate.png</code> hoặc <code className="text-slate-400">public/donate.webp</code>
              </p>
            </div>
          )}
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed">
          Quét mã QR bằng ứng dụng ngân hàng hoặc MoMo để ủng hộ admin nhé! 🙏
        </p>
      </div>
    </div>
  );
};
