import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <span className="text-2xl font-bold text-white">GTA AI</span>
          </a>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-300 hover:text-white">
              <div className="w-5 h-5 bg-gray-600 rounded"></div>
              <span className="text-sm">Switch language</span>
            </button>
            <button className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-gray-400 rounded"></div>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;