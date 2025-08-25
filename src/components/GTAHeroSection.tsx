import React from 'react';
import {AuroraText} from "~/components/magicui/aurora-text";
import {GTAHeader} from "~/components/GTAHeader";

const GTAHeroSection = () => {
    return (
        <div
            className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden"
            style={{
                background: `radial-gradient(ellipse 65.63% 111.88% at -0.86% 7.87%, #09173D 0%, rgba(9, 23, 61, 0) 100%), radial-gradient(ellipse 40.02% 32.20% at 92.16% 41.91%, #6F113E 0%, rgba(111, 17, 62, 0) 100%), radial-gradient(ellipse 31.81% 33.78% at 29.74% 45.35%, #6F113E 0%, rgba(111, 17, 62, 0) 100%), #070707`,
            }}>
            <GTAHeader/>
            {/* Main Content */}
            <div
                className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-0 lg:pl-48 py-6 lg:py-6">
                {/* Left Content */}
                <div className="lg:w-1/2 space-y-8">
                    <div className="space-y-6">
                        <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                            <AuroraText>GTA AI</AuroraText>
                            <br/>
                            <AuroraText>Art Image Generator</AuroraText>
                            <br/>

                        </h1>

                        <p className="text-lg lg:text-xl text-gray-300 max-w-2xl leading-relaxed">
                            Transform your photos into Grand Theft Auto style with AI
                            <br/>
                            Experience the 80s Miami neon aesthetic
                            <br/>
                        </p>
                    </div>

                    <div className="space-y-6">
                        <button
                            className="bg-linear-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-lg text-white font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                            START NOW
                        </button>

                        {/* User Avatars and Count */}
                        <div className="flex items-center space-x-4">
                            <div className="flex -space-x-2">
                                <div
                                    className="w-8 h-8 rounded-full bg-linear-to-r from-purple-400 to-pink-400 border-2 border-white"></div>
                                <div
                                    className="w-8 h-8 rounded-full bg-linear-to-r from-blue-400 to-cyan-400 border-2 border-white"></div>
                                <div
                                    className="w-8 h-8 rounded-full bg-linear-to-r from-orange-400 to-red-400 border-2 border-white"></div>
                                <div
                                    className="w-8 h-8 rounded-full bg-linear-to-r from-green-400 to-teal-400 border-2 border-white"></div>
                            </div>
                            <span className="text-sm text-gray-400">+3547 registrations</span>
                        </div>
                    </div>
                </div>
                {/* Right Side - Hero Image */}
                <div className="lg:w-1/2 relative mt-12 lg:mt-0 flex items-center justify-center">
                    <div className="relative max-w-full max-h-[80vh] overflow-hidden rounded-2xl">
                        <img 
                            className="w-full h-auto max-h-[80vh] object-contain" 
                            src="/Hero.webp"
                            alt="GTA AI Art Generator Preview"
                        />
                        {/* Optional: Add a subtle overlay for better text visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default GTAHeroSection;