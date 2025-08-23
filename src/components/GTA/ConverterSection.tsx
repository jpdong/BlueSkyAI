'use client';

import React, { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import StyleSelector from './StyleSelector';

const ConverterSection = () => {
  const [selectedStyle, setSelectedStyle] = useState('original');

  return (
    <section id="converter" className="relative py-20">
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-purple-900/20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Info */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">GTA AI Style Converter</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">Upload your photo, choose a style, and let AI transform it into GTA style</p>
            
            {/* How it works */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6">How GTA AI Works</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <p className="text-gray-300">Upload your photo and watch as GTA AI analyzes every detail</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <p className="text-gray-300">Our advanced algorithms apply authentic GTA Art styling</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <p className="text-gray-300">Download your transformed masterpiece in high resolution</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Converter */}
          <div className="space-y-8">
            {/* Upload Area */}
            <div className="bg-gray-900/50 border-2 border-dashed border-gray-600 rounded-2xl p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
              <button className="mb-4 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white font-medium">
                Choose File
              </button>
              <div className="space-y-2">
                <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto mb-4"></div>
                <p className="text-gray-300">Drag and drop your image here or click to upload</p>
                <p className="text-sm text-gray-500">Supports JPG, PNG, WebP formats, max 10MB</p>
              </div>
              <button className="mt-4 bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-lg text-white">
                Select File
              </button>
            </div>
            
            {/* Style Selection */}
            <StyleSelector 
              selectedStyle={selectedStyle} 
              onStyleChange={setSelectedStyle} 
            />
            
            {/* Advanced Options */}
            <button className="w-full flex items-center justify-between p-4 bg-gray-900/50 border border-gray-600 rounded-lg hover:bg-gray-800/50">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gray-600 rounded"></div>
                <span>Advanced Options</span>
              </div>
              <ChevronRightIcon className="w-5 h-5" />
            </button>
            
            {/* Convert Button */}
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-4 rounded-full font-semibold text-lg">
              Please log in first
            </button>
          </div>
        </div>
        
        {/* Result Area */}
        <div className="mt-16 bg-gray-900/50 border border-gray-600 rounded-2xl p-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-6"></div>
            <h3 className="text-2xl font-bold text-white mb-4">Conversion results will be displayed here</h3>
            <p className="text-gray-400 mb-8">Upload your image, choose your favorite GTA style, then click the convert button. AI will create stunning GTA-style images for you.</p>
            
            {/* Example comparison */}
            <div className="flex justify-center items-center space-x-8">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-700 rounded-lg mb-2"></div>
                <p className="text-sm text-gray-400">Original</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg mb-2"></div>
                <p className="text-sm text-gray-400">GTA Style</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConverterSection;