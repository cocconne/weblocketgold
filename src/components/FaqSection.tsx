import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FaqItem } from '../types';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: 'Tải về rồi nhưng vào Cài đặt không thấy hồ sơ ở đâu?',
      answer:
        'Bạn hãy mở Cài đặt (Settings) trên iPhone ➜ chọn "Cài đặt chung" (General) ➜ kéo xuống chọn "VPN & Quản lý thiết bị" (VPN & Device Management). Bạn sẽ thấy tệp cấu hình Locket Gold nằm trong mục "Hồ sơ đã tải về". Nhấn vào đó rồi bấm Cài đặt ở góc trên bên phải.',
    },
    {
      question: 'Đã cài xong nhưng vào Locket vẫn chưa hiện tính năng Gold?',
      answer:
        'Nguyên nhân 99% là do bạn chưa hoàn thành Bước 3: Hãy vào Cài đặt ➜ Cài đặt chung ➜ Giới thiệu ➜ kéo xuống dưới cùng chọn "Cài đặt tin cậy chứng chỉ" ➜ gạt BẬT cho LocketGold CA. Sau đó, đừng quên vuốt tắt hẳn app Locket ở màn hình đa nhiệm rồi mở lại.',
    },
    {
      question: 'Cấu hình DNS này có an toàn cho iPhone và Apple ID không?',
      answer:
        'Hoàn toàn an toàn. Tệp cấu hình .mobileconfig này chỉ chứa DNS và chứng chỉ cục bộ phục vụ việc phản hồi gói Gold cho Locket. Nó không có quyền truy cập vào danh bạ, tin nhắn, ảnh riêng tư hay tài khoản Apple ID/iCloud của bạn.',
    },
    {
      question: 'Làm thế nào để gỡ bỏ cấu hình khi không muốn dùng nữa?',
      answer:
        'Rất đơn giản: Vào Cài đặt ➜ Cài đặt chung ➜ VPN & Quản lý thiết bị ➜ Chọn vào hồ sơ Locket Gold ➜ Nhấn nút đỏ "Xoá hồ sơ cấu hình" và nhập mật mã máy xác nhận. Máy sẽ trở về trạng thái ban đầu ngay lập tức.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span>Câu Hỏi Thường Gặp & Xử Lý Sự Cố</span>
        </div>
      </div>

      <div className="space-y-2">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-xl bg-slate-900/60 border border-slate-800/80 overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-3.5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-slate-200 hover:text-amber-300 transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-3.5 pb-3.5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-2.5">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
