import React from 'react';

const GallerySection = () => {
  return (
    <section id="gallery" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">GTA Art Gallery</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">Explore stunning GTA style artworks created by AI, each one is a unique artistic expression</p>
          
          <div className="max-w-4xl mx-auto text-sm text-gray-400 leading-relaxed space-y-4">
            <p>
              Discover the incredible potential of GTA AI through our curated gallery of transformations. Each piece demonstrates the sophisticated understanding 
              our AI has of Grand Theft Auto's distinctive visual style, from character portraits to scenic landscapes.
            </p>
            <p>
              Get inspired by the endless possibilities of GTA Art creation and see how other artists have used our platform to bring their visions to life.
            </p>
          </div>
        </div>
        
        {/* Featured Gallery Item */}
        <div className="relative bg-gray-900/50 border border-gray-600 rounded-2xl overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-pink-600 via-purple-600 to-cyan-600 relative">
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          
          <div className="absolute inset-0 flex items-end">
            <div className="p-8 text-white">
              <h3 className="text-3xl font-bold mb-2">
                <span className="bg-gradient-to-r from-pink-400 to-cyan-400 text-transparent bg-clip-text">Welcome to Vice City</span>
              </h3>
              <h2 className="text-4xl font-bold text-white mb-4">The Neon Paradise</h2>
              <p className="text-gray-200 max-w-2xl mb-6">
                Step into the vibrant world of Vice City, where neon lights illuminate the night and every corner tells a story of ambition, 
                power, and the pursuit of the American Dream in the 1980s.
              </p>
              
              <div className="flex space-x-4 mb-6">
                <button className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30">
                  <div className="w-4 h-4 bg-white/80 rounded"></div>
                  <span>View Gallery</span>
                </button>
                <button className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30">
                  <div className="w-4 h-4 bg-white/80 rounded"></div>
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Gallery Navigation */}
          <div className="absolute right-4 bottom-4 flex items-center space-x-2">
            <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <div className="w-4 h-2 bg-white/80 rounded"></div>
            </button>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <button key={i} className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-white' : 'bg-white/40'}`}></button>
              ))}
            </div>
            <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <div className="w-4 h-2 bg-white/80 rounded"></div>
            </button>
          </div>
          
          {/* Share Button */}
          <button className="absolute top-4 right-4 flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg">
            <div className="w-4 h-4 bg-white/80 rounded"></div>
            <span>Share</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;