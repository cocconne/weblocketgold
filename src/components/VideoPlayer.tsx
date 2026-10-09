import React, { useRef, useState } from 'react';
import { PlayCircle, Clock, ShieldCheck } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  videoTitle: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  videoTitle,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Timestamps matching the exact 39s iPhone guide video
  const chapters = [
    { label: '0:00 Tải cấu hình', time: 0 },
    { label: '0:06 Mở Cài đặt', time: 6 },
    { label: '0:11 Cài hồ sơ', time: 11 },
    { label: '0:30 Bật Root CA', time: 30 },
  ];

  const seekTo = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|live\/|watch\?.+&v=))([\w-]{11})/i
    );
    return match && match[1]
      ? `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1`
      : null;
  };

  const ytEmbed = getYouTubeEmbedUrl(videoUrl);

  return (
    <div className="bg-slate-900/80 rounded-2xl p-4 mb-6 border border-amber-500/25 shadow-xl shadow-black/40 backdrop-blur-md">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
          <PlayCircle className="w-4 h-4 text-amber-400" />
          <span>{videoTitle || 'Video Hướng Dẫn Cài Đặt Chi Tiết'}</span>
        </div>
        
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
          <ShieldCheck className="w-3 h-3 text-amber-400" />
          <span>Chính thức</span>
        </span>
      </div>

      <div className="relative w-full rounded-xl overflow-hidden bg-black shadow-inner border border-slate-800">
        {ytEmbed ? (
          <iframe
            src={ytEmbed}
            title={videoTitle || 'Video Hướng Dẫn'}
            className="w-full aspect-[9/16] sm:aspect-[16/10] max-h-[440px] border-0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <video
            ref={videoRef}
            controls
            playsInline
            preload="auto"
            className="w-full max-h-[440px] aspect-[9/16] sm:aspect-[16/10] object-contain mx-auto bg-black"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={videoUrl} type="video/mp4" />
            Trình duyệt không hỗ trợ phát video HTML5.
          </video>
        )}
      </div>

      {/* Chapters navigation */}
      <div className="mt-3 pt-2.5 border-t border-slate-800/80">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-2">
          <Clock className="w-3 h-3 text-slate-400" />
          <span>Chuyển nhanh đến phân đoạn:</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {chapters.map((ch, idx) => (
            <button
              key={idx}
              onClick={() => seekTo(ch.time)}
              className="px-2 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 text-[11px] text-slate-200 border border-slate-700/50 hover:border-amber-400/40 transition-colors text-center font-medium cursor-pointer active:scale-95"
            >
              {ch.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
