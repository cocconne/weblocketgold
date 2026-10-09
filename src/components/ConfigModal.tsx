import React, { useState } from 'react';
import { X, Settings2, RotateCcw, Save, Check } from 'lucide-react';
import { AppConfig } from '../types';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AppConfig;
  onSave: (newConfig: AppConfig) => void;
  onReset: () => void;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<AppConfig>(config);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  const handleReset = () => {
    onReset();
    setFormData({
      videoUrl: '/guide.mp4',
      videoTitle: 'Video Hướng Dẫn Cài Đặt Chi Tiết',
      dnsUrl: '/LocketGold.mobileconfig',
      serverStatus: 'online',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Settings2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">Cấu Hình Máy Chủ & Tùy Chọn</h3>
            <p className="text-xs text-slate-400">Tùy biến liên kết tệp DNS và video hướng dẫn</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Đường dẫn tệp cấu hình DNS (.mobileconfig):
            </label>
            <input
              type="text"
              value={formData.dnsUrl}
              onChange={(e) => setFormData({ ...formData, dnsUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              placeholder="/LocketGold.mobileconfig hoặc URL tùy chỉnh"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Mặc định: /LocketGold.mobileconfig
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Đường dẫn Video hướng dẫn:
            </label>
            <input
              type="text"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-amber-400 mb-2"
              placeholder="/guide.mp4 hoặc YouTube URL"
            />
            {/* Owner file upload to server */}
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/80 mb-2">
              <span className="text-[11px] font-semibold text-amber-300 block mb-1">
                Ghi đè vĩnh viễn tệp video máy chủ (/public/guide.mp4):
              </span>
              <input
                type="file"
                accept="video/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    const res = await fetch('/api/upload-video', {
                      method: 'POST',
                      headers: { 'Content-Type': file.type || 'video/mp4' },
                      body: file,
                    });
                    if (res.ok) {
                      const data = await res.json();
                      setFormData({ ...formData, videoUrl: data.url });
                      alert('Đã tải và ghi đè video gốc lên máy chủ thành công!');
                    }
                  } catch (err: any) {
                    alert('Lỗi tải video: ' + err.message);
                  }
                }}
                className="text-xs text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-500/20 file:text-amber-300 hover:file:bg-amber-500/30 cursor-pointer"
              />
            </div>

            {/* Owner donate image upload to server */}
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/80">
              <span className="text-[11px] font-semibold text-rose-300 block mb-1">
                Ghi đè vĩnh viễn ảnh Donate máy chủ (/public/donate.webp):
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    const res = await fetch('/api/upload-donate', {
                      method: 'POST',
                      headers: { 'Content-Type': file.type || 'image/webp' },
                      body: file,
                    });
                    if (res.ok) {
                      alert('Đã tải và ghi đè ảnh Donate lên máy chủ thành công!');
                    }
                  } catch (err: any) {
                    alert('Lỗi tải ảnh Donate: ' + err.message);
                  }
                }}
                className="text-xs text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-rose-500/20 file:text-rose-300 hover:file:bg-rose-500/30 cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Tiêu đề khung video:
            </label>
            <input
              type="text"
              value={formData.videoTitle}
              onChange={(e) => setFormData({ ...formData, videoTitle: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Khôi phục mặc định</span>
            </button>

            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer shadow-md shadow-amber-500/20"
            >
              {saved ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Đã lưu!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Lưu thay đổi</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
