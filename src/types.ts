export interface StepItem {
  id: number;
  title: string;
  description: string;
  highlight?: string;
  tip?: string;
  icon?: string;
  timeOffset?: number; // seconds in video
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface AppConfig {
  videoUrl: string;
  videoTitle: string;
  dnsUrl: string;
  serverStatus: 'online' | 'maintenance';
}
