export interface Video {
  id: string;
  title: string;
  duration: number;
  url: string;
  thumbnail: string;
  chunks: VideoChunk[];
}

export interface VideoChunk {
  id: string;
  startTime: number;
  duration: number;
  url: string;
  quality: VideoQuality[];
}

export interface VideoQuality {
  resolution: string;
  bitrate: number;
  url: string;
}

export interface StreamSequence {
  id: string;
  userId: string;
  videos: Video[];
  startTime: string;
  currentIndex: number;
}

export interface StreamState {
  currentTime: number;
  globalTime: number;
  isPlaying: boolean;
  volume: number;
  quality: 'auto' | '1080p' | '720p' | '480p';
  buffering: boolean;
  networkSpeed: number;
  nextChunk: VideoChunk | null;
}

export interface StreamMetrics {
  viewers: number;
  avgLatency: number;
  bufferHealth: number;
  networkQuality: number;
}