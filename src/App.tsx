import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SafariNotice } from './components/SafariNotice';
import { DownloadSection } from './components/DownloadSection';
import { VideoPlayer } from './components/VideoPlayer';
import { StepGuide } from './components/StepGuide';
import { WarningNotice } from './components/WarningNotice';
import { FeaturesShowcase } from './components/FeaturesShowcase';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { DonateModal } from './components/DonateModal';
import { ConfigModal } from './components/ConfigModal';
import { AppConfig } from './types';
import { CheckCircle2 } from 'lucide-react';

const DEFAULT_CONFIG: AppConfig = {
  videoUrl: '/guide.mp4',
  videoTitle: 'Video Hướng Dẫn Cài Đặt Chi Tiết',
  dnsUrl: '/LocketGold.mobileconfig',
  serverStatus: 'online',
};

export default function App() {
  const [config, setConfig] = useState<AppConfig>(() => {
    try {
      const saved = localStorage.getItem('locket_gold_config');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_CONFIG;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (window.location.search.includes('admin=true')) {
      setIsAdmin(true);
      setIsConfigOpen(true);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleSaveConfig = (newConfig: AppConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('locket_gold_config', JSON.stringify(newConfig));
    } catch {}
    showToast('Đã lưu cấu hình mới!');
  };

  const handleResetConfig = () => {
    setConfig(DEFAULT_CONFIG);
    try {
      localStorage.removeItem('locket_gold_config');
    } catch {}
    showToast('Đã khôi phục cài đặt mặc định!');
  };

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 flex items-center justify-center font-sans antialiased text-slate-100">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/95 border border-amber-400/40 text-amber-300 text-xs font-semibold shadow-2xl backdrop-blur-md animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Card Container */}
      <main className="w-full max-w-[480px] mx-auto">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-b from-slate-900/95 via-slate-900/95 to-slate-950/95 border border-white/10 p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
          {/* Glowing Top Amber Edge */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 shadow-[0_0_12px_#fbbf24]" />

          {/* In-app Safari Warning */}
          <SafariNotice />

          {/* Header & Title */}
          <Header />

          {/* Download Button Section */}
          <DownloadSection
            dnsUrl={config.dnsUrl}
            onOpenDonate={() => setIsDonateOpen(true)}
          />

          {/* Video Guide */}
          <VideoPlayer
            videoUrl={config.videoUrl}
            videoTitle={config.videoTitle}
          />

          {/* Detailed Steps */}
          <StepGuide />

          {/* Important Warning Box */}
          <WarningNotice />

          {/* Locket Gold Features Showcase */}
          <FeaturesShowcase />

          {/* Frequently Asked Questions */}
          <FaqSection />

          {/* Footer */}
          <Footer />
        </div>
      </main>

      {/* Donate Modal */}
      <DonateModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
      />

      {/* Settings Modal */}
      <ConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        config={config}
        onSave={handleSaveConfig}
        onReset={handleResetConfig}
      />
    </div>
  );
}
