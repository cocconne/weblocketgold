import React from 'react';
import { Crown, Video, Film, Lock, Sparkles } from 'lucide-react';

export const FeaturesShowcase: React.FC = () => {
  const features = [
    {
      icon: Video,
      title: 'Quay video dài hơn',
      desc: 'quay video dài tối đa 30 giây, có âm thanh',
    },
    {
      icon: Film,
      title: 'Up video từ thư viện',
      desc: 'cho phép đăng video từ thư viện lên locket có âm thanh',
    },
    {
      icon: Lock,
      title: 'Đăng ảnh/video riêng tư',
      desc: 'có thể đăng riêng tư để lưu giữ lại những khoảnh khắc riêng tư của bạn (hoặc đăng bừa để giữ chuỗi :v )',
    },
    {
      icon: Sparkles,
      title: 'Ghi chú, nhãn caption đặc sắc',
      desc: 'vô vàn nhãn thú vị để bạn up locket',
    },
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
          <Crown className="w-4 h-4 text-amber-400" />
          <span>Đặc Quyền Sau Khi Cài Đặt Locket Gold</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-400/30 transition-colors shadow-sm flex items-start gap-3"
            >
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0 mt-0.5">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xs sm:text-sm text-slate-100 mb-1">
                  {feat.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
