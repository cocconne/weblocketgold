import React, { useState } from 'react';
import { ListChecks, ChevronDown, ChevronUp } from 'lucide-react';

export const StepGuide: React.FC = () => {
  // Step 1 is expanded by default, or null if all closed
  const [openStep, setOpenStep] = useState<number | null>(1);

  const toggleStep = (id: number) => {
    setOpenStep(openStep === id ? null : id);
  };

  const steps = [
    {
      id: 1,
      title: 'Tải cấu hình',
      content: (
        <>
          Nhấn nút <b className="text-amber-300">Tải Cấu Hình Locket Gold</b> ở trên và bấm chọn{' '}
          <span className="inline-block px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-200 font-bold border border-sky-400/30">
            Cho phép (Allow)
          </span>{' '}
          khi hộp thoại thông báo Safari hiện ra ➜ Bấm <b>Đóng</b> khi hiện thông báo <i>"Đã tải về hồ sơ"</i>.
        </>
      ),
      tip: 'Nếu Safari hỏi "Trang web này đang cố tải về một hồ sơ cấu hình", hãy chọn Cho phép.',
    },
    {
      id: 2,
      title: 'Cài đặt hồ sơ LocketGold Premium',
      content: (
        <>
          Mở <b className="text-white">Cài đặt (Settings)</b> trên iPhone ➜ chạm ngay vào dòng{' '}
          <b className="text-amber-300">Đã tải về hồ sơ</b> ở đầu trang ➜ nhấn{' '}
          <span className="inline-block px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-200 font-bold border border-amber-400/30">
            Cài đặt (Install)
          </span>{' '}
          ở góc phải ➜ Nhập mật mã iPhone ➜ Bấm <b>Cài đặt</b> xác nhận ➜ Bấm <b>Xong</b>.
        </>
      ),
      tip: 'Hồ sơ mang tên "LocketGold Premium" do LocketGold CA phát hành.',
    },
    {
      id: 3,
      title: 'Bật tin cậy chứng nhận LocketGold Root CA',
      isCritical: true,
      content: (
        <>
          Vào <b className="text-white">Cài đặt</b> ➜ <b className="text-white">Cài đặt chung</b> ➜{' '}
          <b className="text-white">Giới thiệu</b> ➜ kéo xuống dưới cùng chọn{' '}
          <b className="text-amber-300">Cài đặt tin cậy chứng nhận</b> ➜ gạt{' '}
          <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/30">
            BẬT (Xanh lá)
          </span>{' '}
          cho mục <b>LocketGold Root CA</b> ➜ Bấm <b>Tiếp tục (Continue)</b>.
        </>
      ),
      tip: 'Bắt buộc hoàn thành bước này để kích hoạt đầy đủ tính năng Gold.',
    },
    {
      id: 4,
      title: 'Khởi động lại Locket và tận hưởng',
      content: (
        <>
          Vuốt từ đáy màn hình lên để mở đa nhiệm iPhone ➜ <b className="text-amber-300">Vuốt tắt hẳn ứng dụng Locket</b> rồi mở lại Locket. Các tính năng Locket Gold sẽ được kích hoạt ngay lập tức!
        </>
      ),
      tip: 'Thưởng thức tính năng đăng video dài hơn, có âm thanh, đăng riêng tư...',
    },
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
          <ListChecks className="w-4 h-4 text-amber-400" />
          <span>Hướng Dẫn Cài Đặt Trên iPhone</span>
        </div>
      </div>

      <div className="space-y-2">
        {steps.map((step) => {
          const isOpen = openStep === step.id;
          return (
            <div
              key={step.id}
              className={`rounded-xl border overflow-hidden transition-colors ${
                isOpen
                  ? step.isCritical
                    ? 'bg-amber-950/20 border-amber-500/35'
                    : 'bg-slate-900/80 border-slate-700/80'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700/60'
              }`}
            >
              <button
                onClick={() => toggleStep(step.id)}
                className="w-full p-3.5 text-left flex items-center justify-between gap-3 cursor-pointer group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      step.isCritical
                        ? 'bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 shadow-[0_0_8px_#f59e0b]'
                        : 'bg-gradient-to-tr from-sky-500 to-sky-400 text-white'
                    }`}
                  >
                    {step.id}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-amber-300 transition-colors">
                    Bước {step.id}: {step.title}
                  </span>
                  {step.isCritical && (
                    <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                      Bắt buộc
                    </span>
                  )}
                </div>

                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 group-hover:text-amber-400 transition-colors" />
                )}
              </button>

              {isOpen && (
                <div className="px-3.5 pb-3.5 text-[13px] leading-relaxed text-slate-300 border-t border-slate-800/60 pt-3 space-y-2">
                  <div>{step.content}</div>

                  {step.tip && (
                    <div className="text-xs text-slate-400/90 italic flex items-center gap-1 pt-1">
                      <span>💡 {step.tip}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
