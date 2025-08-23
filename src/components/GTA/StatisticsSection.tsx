import React from 'react';

const StatisticsSection = () => {
  return (
    <section className="relative py-20">
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-purple-900/20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">GTA AI Statistics</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              GTA AI is a powerful AI image conversion platform that transforms your creativity into stunning GTA style artworks
            </p>
            
            <div className="text-sm text-gray-400 leading-relaxed space-y-4 mb-12">
              <p>
                Join millions of creators worldwide who trust GTA AI for their artistic transformations. Our platform has processed over a million images, 
                creating breathtaking GTA Art that captures the essence of the iconic game series. With cutting-edge machine learning technology, 
                we continue to push the boundaries of what's possible in AI-powered style transfer.
              </p>
              <p>Leading the revolution in AI-generated GTA Art with industry-leading accuracy and speed</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            <div className="flex items-center space-x-4 bg-gray-900/50 border border-gray-600 rounded-xl p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <div className="w-8 h-8 bg-white/20 rounded"></div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">0<span className="text-purple-400">+</span></div>
                <h3 className="text-lg font-semibold text-white">Trusted Users</h3>
                <p className="text-gray-400">Creators and Artists</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 bg-gray-900/50 border border-gray-600 rounded-xl p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <div className="w-8 h-8 bg-white/20 rounded"></div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">0<span className="text-purple-400">+</span></div>
                <h3 className="text-lg font-semibold text-white">Generated Images</h3>
                <p className="text-gray-400">GTA Style Artworks</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 bg-gray-900/50 border border-gray-600 rounded-xl p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <div className="w-8 h-8 bg-white/20 rounded"></div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">0<span className="text-purple-400">+</span></div>
                <h3 className="text-lg font-semibold text-white">AI Models</h3>
                <p className="text-gray-400">Support Multiple Styles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;