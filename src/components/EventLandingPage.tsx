import React from 'react';

const EventLandingPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden" style={{
        background: `radial-gradient(ellipse 65.63% 111.88% at -0.86% 7.87%, #09173D 0%, rgba(9, 23, 61, 0) 100%), radial-gradient(ellipse 40.02% 32.20% at 92.16% 41.91%, #6F113E 0%, rgba(111, 17, 62, 0) 100%), radial-gradient(ellipse 31.81% 33.78% at 29.74% 45.35%, #6F113E 0%, rgba(111, 17, 62, 0) 100%), #070707`,
    }}>
      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 lg:px-12 py-6">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span className="text-xl font-bold">livent</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Services</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Projects</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Portfolio</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Support</a>
        </div>
        
        <button className="bg-linear-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
          Register
        </button>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 py-12 lg:py-24">
        {/* Left Content */}
        <div className="lg:w-1/2 space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              Year's end is neither
              <br />
              an end nor a beginning
              <br />
              but a going on.
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-300 max-w-2xl leading-relaxed">
              For last year's words belong to last year's language. And next 
              year's words await another voice. Join us to celebrate the last 
              night of the year across the country.
            </p>
          </div>

          <div className="space-y-6">
            <button className="bg-linear-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-lg text-white font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
              REGISTER NOW
            </button>
            
            {/* User Avatars and Count */}
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-linear-to-r from-purple-400 to-pink-400 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-400 to-cyan-400 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-linear-to-r from-orange-400 to-red-400 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-linear-to-r from-green-400 to-teal-400 border-2 border-white"></div>
              </div>
              <span className="text-sm text-gray-400">+23547 registrations</span>
            </div>
          </div>
        </div>

        {/* Right Side - Diagonal Grid Layout */}
        <div className="lg:w-1/2 relative mt-12 lg:mt-0">
          {/* Large "LIVE" text in background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[20rem] lg:text-[25rem] font-black text-gray-800/10 select-none transform rotate-45">
              LIVE
            </span>
          </div>
          
          {/* Diagonal Grid Image Layout */}
          <div className="relative z-10 h-[600px] overflow-hidden">
            {/* Image Grid Container with 45-degree rotation */}
            <div className="absolute inset-0 transform rotate-45 origin-center">
              {/* Grid of Images */}
              <div className="grid grid-cols-3 gap-4 h-full w-full p-8">
                {/* Row 1 */}
                <div className="relative transform hover:scale-105 transition-all duration-300">
                  <div className="w-32 h-24 bg-linear-to-br from-purple-500 to-blue-600 rounded-lg shadow-xl overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-black/20">
                      <div className="text-center transform -rotate-45">
                        <div className="text-2xl">test1</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative transform hover:scale-105 transition-all duration-300 mt-6">
                  <div className="w-36 h-28 bg-linear-to-br from-pink-500 to-purple-600 rounded-lg shadow-xl overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-black/20">
                      <div className="text-center transform -rotate-45">
                        <div className="text-2xl">test2</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative transform hover:scale-105 transition-all duration-300 mt-12">
                  <div className="w-32 h-24 bg-linear-to-br from-orange-500 to-red-600 rounded-lg shadow-xl overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-black/20">
                      <div className="text-center transform -rotate-45">
                        <div className="text-2xl">test3</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Row 2 */}
                <div className="relative transform hover:scale-105 transition-all duration-300 mt-8">
                  <div className="w-40 h-80 bg-linear-to-br from-cyan-500 to-blue-600 rounded-lg shadow-xl overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-black/20">
                      <div className="text-center transform -rotate-45">
                        <div className="text-2xl">test4</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative transform hover:scale-105 transition-all duration-300 mt-14">
                  <div className="w-44 h-32 bg-linear-to-br from-indigo-500 to-purple-600 rounded-lg shadow-xl overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-black/20">
                      <div className="text-center transform -rotate-45">
                        <div className="text-2xl">🎭</div>
                      </div>
                    </div>
                  </div>
                  {/* Purple Label */}
                  <div className="absolute -bottom-1 -right-2 bg-purple-600 text-white px-3 py-1 rounded text-xs font-bold transform -rotate-45">
                    LATE NIGHTS EARLY MORNINGS
                  </div>
                </div>
                
                <div className="relative transform hover:scale-105 transition-all duration-300 mt-20">
                  <div className="w-36 h-28 bg-linear-to-br from-emerald-500 to-teal-600 rounded-lg shadow-xl overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-black/20">
                      <div className="text-center transform -rotate-45">
                        <div className="text-2xl">🎸</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Row 3 */}
                <div className="relative transform hover:scale-105 transition-all duration-300 mt-16">
                  <div className="w-32 h-24 bg-linear-to-br from-rose-500 to-pink-600 rounded-lg shadow-xl overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-black/20">
                      <div className="text-center transform -rotate-45">
                        <div className="text-2xl">🎉</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative transform hover:scale-105 transition-all duration-300 mt-22">
                  <div className="w-38 h-30 bg-linear-to-br from-amber-500 to-orange-600 rounded-lg shadow-xl overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-black/20">
                      <div className="text-center transform -rotate-45">
                        <div className="text-2xl">🌟</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative transform hover:scale-105 transition-all duration-300 mt-28">
                  <div className="w-32 h-24 bg-linear-to-br from-violet-500 to-purple-600 rounded-lg shadow-xl overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-black/20">
                      <div className="text-center transform -rotate-45">
                        <div className="text-2xl">🎪</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="text-center">
          <div className="text-sm text-gray-400 mb-2">Scroll to explore</div>
          <div className="w-0.5 h-8 bg-linear-to-b from-purple-500 to-transparent mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default EventLandingPage;