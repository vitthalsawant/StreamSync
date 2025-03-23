import React, { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import { Play, Pause, Volume2, Settings, RefreshCw, Maximize, MinusCircle, PlusCircle } from 'lucide-react';
import { useStreamStore } from '../store/useStreamStore';

export const VideoPlayer: React.FC = () => {
  const [player, setPlayer] = useState<any>(null);
  const { streamState, updateStreamState, syncWithGlobalTime } = useStreamStore();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onReady = (event: any) => {
    setPlayer(event.target);
    updateStreamState({ isPlaying: true });
    event.target.playVideo();
  };

  const togglePlay = () => {
    if (!player) return;
    
    if (streamState.isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
    updateStreamState({ isPlaying: !streamState.isPlaying });
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (player) {
      player.setVolume(newVolume * 100);
      updateStreamState({ volume: newVolume });
    }
  };

  const handleQualityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (player) {
      const quality = e.target.value;
      player.setPlaybackQuality(quality);
      updateStreamState({ quality: quality as any });
    }
  };

  const toggleFullscreen = () => {
    const container = document.querySelector('.video-container');
    if (!container) return;

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="video-container relative w-full bg-black rounded-lg overflow-hidden">
      <YouTube
        videoId="6KL2QZ91kAM" // Updated video ID
        opts={{
          height: '100%',
          width: '100%',
          playerVars: {
            autoplay: 1,
            modestbranding: 1,
            controls: 0,
            enablejsapi: 1,
            origin: window.location.origin,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            start: Math.floor((Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000)
          },
        }}
        onReady={onReady}
        onStateChange={(event) => {
          updateStreamState({ 
            isPlaying: event.data === 1,
            buffering: event.data === 3
          });
        }}
        onError={(error) => {
          console.error('YouTube Player Error:', error);
        }}
        className="w-full aspect-video"
        style={{ pointerEvents: 'none' }}
      />
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            {streamState.isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white" />
            )}
          </button>
          
          <div className="flex items-center gap-2 group relative">
            <Volume2 className="w-5 h-5 text-white" />
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleVolumeChange({ target: { value: '0' } } as any)}
                className="text-white hover:text-gray-300"
              >
                <MinusCircle className="w-4 h-4" />
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={streamState.volume}
                onChange={handleVolumeChange}
                className="w-24"
              />
              <button 
                onClick={() => handleVolumeChange({ target: { value: '1' } } as any)}
                className="text-white hover:text-gray-300"
              >
                <PlusCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            onClick={syncWithGlobalTime}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            title="Sync with global timeline"
          >
            <RefreshCw className="w-5 h-5 text-white" />
          </button>

          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-white" />
              <select
                value={streamState.quality}
                onChange={handleQualityChange}
                className="bg-transparent text-white border border-white/20 rounded px-2 py-1"
              >
                <option value="auto">Auto</option>
                <option value="hd1080">1080p</option>
                <option value="hd720">720p</option>
                <option value="large">480p</option>
              </select>
            </div>

            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <Maximize className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {streamState.buffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};