import React from 'react';
import { useStreamStore } from '../store/useStreamStore';
import { Activity, Signal, Database, Wifi } from 'lucide-react';

export const StreamMetrics: React.FC = () => {
  const { metrics, streamState } = useStreamStore();

  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-6">
      <h3 className="text-lg font-semibold text-white mb-4">Stream Analytics</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            <span className="text-gray-300">Buffer Health</span>
          </div>
          <div className="w-32 bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${metrics.bufferHealth}%` }} 
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Signal className="w-5 h-5 text-green-400" />
            <span className="text-gray-300">Network Quality</span>
          </div>
          <div className="w-32 bg-gray-700 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${metrics.networkQuality}%` }} 
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-400" />
            <span className="text-gray-300">Latency</span>
          </div>
          <span className="text-white font-medium">{metrics.avgLatency}ms</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wifi className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-300">Speed</span>
          </div>
          <span className="text-white font-medium">
            {(streamState.networkSpeed / 1024 / 1024).toFixed(1)} Mbps
          </span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Current Quality</span>
          <span className="text-white font-medium">{streamState.quality}</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-gray-400">Global Offset</span>
          <span className="text-white font-medium">
            {(streamState.globalTime - streamState.currentTime).toFixed(2)}s
          </span>
        </div>
      </div>
    </div>
  );
};