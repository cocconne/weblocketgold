import React, { useState } from 'react';
import { X, Heart, ShieldCheck, Sparkles, Copy, Check } from 'lucide-react';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm bg-slate-900 border border-amber-500/35 rounded-3xl p-5 sm:p-6 text-center shadow-2xl overflow-hidden">
        {/* Glow edge */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500 shadow-[0_0_12px_#f43f5e]" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-11 h-11 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-2">
          <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
        </div>

        <h3 className="text-lg font-extrabold text-slate-100 mb-0.5">Ủng Hộ / Donate</h3>
        <p className="text-xs text-amber-300 font-semibold mb-3.5">
          Cảm ơn bạn rất nhiều! ❤️
        </p>

        {/* QR Card Container */}
        <div className="relative bg-slate-950/80 rounded-2xl p-3 border border-slate-800 shadow-inner mb-3 overflow-hidden text-left">
          {/* Actual VietQR Card Container */}
          <div className="p-3.5 rounded-2xl bg-[#0b101b] border-2 border-transparent bg-clip-padding relative shadow-lg">
            {/* Neon Border Effect */}
            <div className="absolute -inset-[1.5px] bg-gradient-to-r from-cyan-500 via-indigo-500 to-rose-500 rounded-2xl -z-10 opacity-80" />

            <div className="flex items-center justify-between text-[10px] font-extrabold tracking-widest text-slate-300 uppercase mb-2 px-1">
              <span className="text-cyan-400 font-mono">SCAN TO PAY</span>
              <span className="text-rose-400 flex items-center gap-1 font-sans">
                <Heart className="w-2.5 h-2.5 fill-rose-400" /> Donate
              </span>
            </div>

            {/* QR Code Graphic with VietQR styling */}
            <div className="p-3 bg-white rounded-xl shadow-md mx-auto my-1 flex items-center justify-center">
              <img
                src="/donate.webp"
                alt="Mã QR Donate"
                onError={(e) => {
                  // Fallback to QR code image if local file isn't uploaded yet
                  const target = e.currentTarget;
                  if (!target.src.includes('api.qrserver.com')) {
                    target.src = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=https://dshinee37.vercel.app&color=0b101b&bgcolor=ffffff&margin=10`;
                  }
                }}
                className="w-48 h-48 sm:w-52 sm:h-52 object-contain mx-auto rounded block"
              />
            </div>

            {/* VietQR and Napas 247 Footer Bar */}
            <div className="flex items-center justify-between mt-2.5 pt-1.5 border-t border-slate-800 text-[10px] font-bold text-slate-400 px-1">
              <div className="flex items-center gap-1">
                <span className="text-blue-400 font-extrabold font-mono">Viet</span>
                <span className="text-rose-500 font-extrabold font-mono">QR</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-mono">
                <span>napas</span>
                <span className="text-amber-400 font-bold">247</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed">
          Mở ứng dụng ngân hàng hoặc MoMo để quét mã QR và gửi chút lộ phí ủng hộ admin nhé! Cảm ơn bạn rất nhiều! 🙏
        </p>
      </div>
    </div>
  );
};
