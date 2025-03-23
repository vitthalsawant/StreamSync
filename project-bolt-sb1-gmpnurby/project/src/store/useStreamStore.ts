import { create } from 'zustand';
import { Video, StreamState, StreamMetrics, VideoChunk } from '../types';

interface StreamStore {
  currentVideo: Video | null;
  streamState: StreamState;
  metrics: StreamMetrics;
  setCurrentVideo: (video: Video | null) => void;
  updateStreamState: (state: Partial<StreamState>) => void;
  updateMetrics: (metrics: Partial<StreamMetrics>) => void;
  syncWithGlobalTime: () => void;
  preloadNextChunk: (chunk: VideoChunk) => void;
}

export const useStreamStore = create<StreamStore>((set, get) => ({
  currentVideo: null,
  streamState: {
    currentTime: 0,
    globalTime: 0,
    isPlaying: false,
    volume: 1,
    quality: 'auto',
    buffering: false,
    networkSpeed: 0,
    nextChunk: null
  },
  metrics: {
    viewers: 0,
    avgLatency: 0,
    bufferHealth: 100,
    networkQuality: 100
  },
  setCurrentVideo: (video) => set({ currentVideo: video }),
  updateStreamState: (state) =>
    set((prev) => ({
      streamState: { ...prev.streamState, ...state },
    })),
  updateMetrics: (metrics) =>
    set((prev) => ({
      metrics: { ...prev.metrics, ...metrics },
    })),
  syncWithGlobalTime: () => {
    const { currentVideo, streamState } = get();
    if (!currentVideo) return;

    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const elapsedSeconds = Math.floor((now.getTime() - startOfDay.getTime()) / 1000);
    
    // Find the correct chunk based on global time
    const currentChunk = currentVideo.chunks.find(chunk => 
      chunk.startTime <= elapsedSeconds && 
      chunk.startTime + chunk.duration > elapsedSeconds
    );

    if (currentChunk && currentChunk.id !== streamState.nextChunk?.id) {
      set((prev) => ({
        streamState: {
          ...prev.streamState,
          nextChunk: currentChunk,
          globalTime: elapsedSeconds
        }
      }));
    }
  },
  preloadNextChunk: (chunk) => {
    // Preload the next chunk in the sequence
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = chunk.url;
    document.head.appendChild(link);
  }
}));