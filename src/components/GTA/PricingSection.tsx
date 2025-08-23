'use client';

import React, { useState } from 'react';
import PricingToggle from './PricingToggle';

const PricingSection = () => {
  const [isAnnualPlan, setIsAnnualPlan] = useState(true);

  return (
    <section className="relative py-20">
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-purple-900/20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">Choose Your Plan</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Choose the perfect credit package for your GTA style conversion needs and unlock unlimited creative possibilities
          </p>
          
          <PricingToggle 
            isAnnualPlan={isAnnualPlan} 
            onToggle={setIsAnnualPlan} 
          />
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Free Plan */}
          <div className="bg-gray-900/50 border border-gray-600 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
            <p className="text-gray-400 mb-6">Start your GTA creation journey</p>
            <div className="mb-6">
              <div className="text-4xl font-bold text-white">$0</div>
              <div className="text-gray-400">Forever</div>
            </div>
            <button className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold mb-6">
              Use Now
            </button>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-300">10 credits per month (expires after 30 days)</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-300">Access to basic AI models</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-300">Standard definition output</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-300">Limited style options</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-300">Watermarked downloads</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-300">Community support</span>
              </div>
            </div>
            
            <div className="mt-6 space-y-2 text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>No commercial use</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Watermarked images</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Limited resolution</span>
              </div>
            </div>
          </div>

          {/* Trial Plan */}
          <div className="bg-gray-900/50 border border-gray-600 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-2">Trial</h3>
            <p className="text-gray-400 mb-6">Perfect starter pack for new users</p>
            <div className="mb-6">
              <div className="flex items-baseline space-x-2">
                <div className="text-2xl font-bold text-gray-400 line-through">${isAnnualPlan ? '47.88' : '3.99'}</div>
                <div className="text-4xl font-bold text-white">${isAnnualPlan ? '38.3' : '3.19'}</div>
              </div>
              <div className="text-gray-400">{isAnnualPlan ? '/year' : '/month'}</div>
            </div>
            <button className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold mb-6">
              Buy Now
            </button>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-300">100 credits per month (expires after 30 days)</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-300">Access to basic AI models</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-300">Standard definition output</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-300">Email support</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-300">No watermark images</span>
              </div>
            </div>
            
            <div className="mt-6 space-y-2 text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>No commercial use</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Credits expire after 30 days</span>
              </div>
            </div>
          </div>

          {/* Pro Plan - Popular */}
          <div className="relative bg-gray-900/50 border-2 border-purple-500 rounded-2xl p-6">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Popular
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
            <p className="text-gray-400 mb-6">Ideal for content creators and small businesses</p>
            <div className="mb-6">
              <div className="flex items-baseline space-x-2">
                <div className="text-2xl font-bold text-gray-400 line-through">${isAnnualPlan ? '131.88' : '10.99'}</div>
                <div className="text-4xl font-bold text-white">${isAnnualPlan ? '105.5' : '8.79'}</div>
              </div>
              <div className="text-gray-400">{isAnnualPlan ? '/year' : '/month'}</div>
            </div>
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 rounded-lg font-semibold mb-6">
              Buy Now
            </button>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-300">500 credits per month (expires after 30 days)</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-300">Priority processing queue</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-300">Batch image generation</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-300">Advanced style presets</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-300">Cloud image storage</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-300">API access</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-300">Priority customer support</span>
              </div>
            </div>
          </div>

          {/* Ultra Plan */}
          <div className="bg-gray-900/50 border border-gray-600 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-2">Ultra</h3>
            <p className="text-gray-400 mb-6">Perfect for agencies and large teams</p>
            <div className="mb-6">
              <div className="flex items-baseline space-x-2">
                <div className="text-2xl font-bold text-gray-400 line-through">${isAnnualPlan ? '418.8' : '34.9'}</div>
                <div className="text-4xl font-bold text-white">${isAnnualPlan ? '335.04' : '27.92'}</div>
              </div>
              <div className="text-gray-400">{isAnnualPlan ? '/year' : '/month'}</div>
            </div>
            <button className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold mb-6">
              Buy Now
            </button>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-300">2000 credits per month (expires after 30 days)</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-300">Priority processing queue</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-300">Custom style training</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-300">High definition output</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-300">Commercial licensing</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-300">Priority customer support</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-300">Advanced style presets</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;