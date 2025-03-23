import React from 'react';
import { Search, Bell, Settings, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-white">StreamSync</h1>
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-300 hover:text-white transition">Live</a>
              <a href="#" className="text-gray-300 hover:text-white transition">Trending</a>
              <a href="#" className="text-gray-300 hover:text-white transition">Following</a>
              <a href="#" className="text-gray-300 hover:text-white transition">Browse</a>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search streams..."
                className="bg-gray-800 text-white px-4 py-2 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            <button className="text-gray-400 hover:text-white transition">
              <Bell className="w-6 h-6" />
            </button>
            <button className="text-gray-400 hover:text-white transition">
              <Settings className="w-6 h-6" />
            </button>
            <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};