import React from 'react';
import { X, Smartphone, Copy, Check } from 'lucide-react';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export const QrModal: React.FC<QrModalProps> = ({ isOpen, onClose, url }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const currentUrl = url || window.location.href;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    currentUrl
  )}&color=090d16&bgcolor=ffffff&margin=10`;

  const copyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm bg-slate-900 border border-slate-700/80 rounded-3xl p-6 text-center shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
          <Smartphone className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-slate-100 mb-1">Quét Bằng Camera iPhone</h3>
        <p className="text-xs text-slate-400 mb-4">
          Dùng camera iPhone quét mã để mở trực tiếp trong <b>Safari</b> và cài đặt cấu hình Locket Gold.
        </p>

        <div className="p-3 bg-white rounded-2xl inline-block shadow-lg mb-4">
          <img
            src={qrImageUrl}
            alt="QR Code"
            className="w-48 h-48 block mx-auto rounded-lg"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyUrl}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Đã sao chép link</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Sao chép liên kết</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
