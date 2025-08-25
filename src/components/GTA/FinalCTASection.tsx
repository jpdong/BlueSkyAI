import React from 'react';

const FinalCTASection = () => {
  return (
    <section className="relative py-20">
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-linear-to-br from-black/80 to-purple-900/50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          <div className="inline-flex items-center space-x-2 mb-4">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
            ))}
          </div>
          <div>
            <span className="bg-linear-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">Start Creating Amazing</span>
            <br />
            <span className="text-white">GTA Art</span>
          </div>
        </h2>
        
        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-xl text-gray-300 mb-4">Join thousands of artists and creators using GTA AI</p>
          <p className="text-lg text-gray-400">Transform your creativity into 80s Miami style artworks</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="#converter" className="inline-block">
            <button className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-full font-semibold text-lg">
              Start Creating Now
            </button>
          </a>
          <a href="#gallery" className="inline-block">
            <button className="border border-gray-600 hover:border-gray-400 px-8 py-4 rounded-full font-semibold text-lg">
              Browse Gallery
            </button>
          </a>
        </div>
        
        {/* Example images row */}
        <div className="flex justify-center items-center space-x-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-16 h-16 bg-linear-to-br from-purple-600 to-pink-600 rounded-lg opacity-80"></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;