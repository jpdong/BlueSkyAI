'use client';

import React, { useState } from 'react';

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleChange: (style: string) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onStyleChange }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">Choose Your GTA Style</h3>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onStyleChange('original')}
          className={`p-4 rounded-xl border-2 transition-all ${
            selectedStyle === 'original'
              ? 'border-purple-500 bg-purple-500/20'
              : 'border-gray-600 bg-gray-900/50 hover:border-gray-500'
          }`}
        >
          <div className="w-full h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg mb-3"></div>
          <h4 className="font-semibold text-white mb-1">Original Art</h4>
          <p className="text-sm text-gray-400 mb-3">Classic GTA original art style</p>
          <div className="flex space-x-1">
            <span className="px-2 py-1 bg-gray-800 rounded text-xs">Character</span>
            <span className="px-2 py-1 bg-gray-800 rounded text-xs">Vehicle</span>
            <span className="px-2 py-1 bg-gray-800 rounded text-xs">Scene</span>
          </div>
        </button>
        
        <button
          onClick={() => onStyleChange('neon')}
          className={`p-4 rounded-xl border-2 transition-all ${
            selectedStyle === 'neon'
              ? 'border-purple-500 bg-purple-500/20'
              : 'border-gray-600 bg-gray-900/50 hover:border-gray-500'
          }`}
        >
          <div className="w-full h-24 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg mb-3"></div>
          <h4 className="font-semibold text-white mb-1">Neon Style</h4>
          <p className="text-sm text-gray-400 mb-3">Vibrant neon-lit Miami aesthetic</p>
          <div className="flex space-x-1">
            <span className="px-2 py-1 bg-gray-800 rounded text-xs">Neon Lights</span>
            <span className="px-2 py-1 bg-gray-800 rounded text-xs">Cyberpunk</span>
            <span className="px-2 py-1 bg-gray-800 rounded text-xs">Night City</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default StyleSelector;