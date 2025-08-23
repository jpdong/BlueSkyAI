import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-black to-pink-900/50"></div>
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text font-semibold text-sm mb-4">
            New Era of AI Style Transfer
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">GTA AI</span>
            <br />
            <span className="text-white">Art Generator</span>
          </h1>
          
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-xl text-gray-300 mb-4">Transform your photos into Grand Theft Auto style with AI</p>
            <p className="text-lg text-gray-400 mb-8">Experience the 80s Miami neon aesthetic</p>
            
            <div className="text-sm text-gray-400 leading-relaxed space-y-4">
              <p>
                Discover the power of GTA AI technology that brings your ordinary photos to life with stunning Grand Theft Auto aesthetics. 
                Our advanced artificial intelligence understands the iconic visual language of the GTA universe, from the neon-soaked streets to the vibrant character designs.
              </p>
              <p>
                Create professional-quality GTA Art in seconds with our state-of-the-art neural networks. Whether you're transforming portraits into iconic characters 
                or landscapes into cinematic scenes, GTA AI delivers exceptional results that capture the essence of the beloved game series.
              </p>
            </div>
          </div>
          
          {/* Statistics */}
          <div className="flex justify-center items-center space-x-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">25,000<span className="text-purple-400">+</span></div>
              <div className="text-sm text-gray-400">Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500,000<span className="text-purple-400">+</span></div>
              <div className="text-sm text-gray-400">Images</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">12<span className="text-purple-400">+</span></div>
              <div className="text-sm text-gray-400">AI Models</div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#converter" className="inline-block">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
                Start Converting
              </button>
            </a>
            <a href="#gallery" className="inline-block">
              <button className="border border-gray-600 hover:border-gray-400 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
                Browse Gallery
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;