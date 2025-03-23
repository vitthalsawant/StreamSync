import React, { useEffect } from 'react';
import { VideoPlayer } from './components/VideoPlayer';
import { StreamMetrics } from './components/StreamMetrics';
import { Navbar } from './components/Navbar';
import { useStreamStore } from './store/useStreamStore';
import { Clock, Users, TrendingUp, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';

function App() {
  const { updateMetrics } = useStreamStore();

  useEffect(() => {
    // Simulate metrics updates
    const metricsInterval = setInterval(() => {
      updateMetrics({
        viewers: Math.floor(1000000 + Math.random() * 500000),
        avgLatency: Math.floor(50 + Math.random() * 30),
        bufferHealth: Math.floor(85 + Math.random() * 15),
        networkQuality: Math.floor(90 + Math.random() * 10)
      });
    }, 2000);

    return () => clearInterval(metricsInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-white">Live Stream</h2>
            <span className="px-2 py-1 bg-red-600 text-white text-sm font-medium rounded-full">LIVE</span>
          </div>
          
          <div className="flex items-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{format(new Date(), 'HH:mm:ss')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>1.2M Viewers</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <span>#1 Trending</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <VideoPlayer />
            
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white">Global Synchronized Stream</h2>
                  <p className="text-gray-400 mt-2">
                    Experience perfectly synchronized streaming with millions of viewers worldwide.
                    Our advanced technology ensures you're always in sync with the global timeline,
                    no matter when you join.
                  </p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  <MessageCircle className="w-5 h-5" />
                  <span>Join Chat</span>
                </button>
              </div>
              
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">
                  Follow
                </button>
                <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">
                  Share
                </button>
                <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">
                  Report
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <StreamMetrics />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;