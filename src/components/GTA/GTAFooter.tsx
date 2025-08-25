import React from 'react';

const GTAFooter = () => {
  return (
    <footer className="bg-black/50 border-t border-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="text-2xl font-bold text-white">GTA AI</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Transform your ideas into stunning GTA art with cutting-edge AI technology. Create professional-quality images in seconds.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="https://twitter.com/gtaai_official" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700">
                <div className="w-5 h-5 bg-gray-400 rounded"></div>
              </a>
              <a href="https://instagram.com/gtaai_official" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700">
                <div className="w-5 h-5 bg-gray-400 rounded"></div>
              </a>
              <a href="https://github.com/gtaai" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700">
                <div className="w-5 h-5 bg-gray-400 rounded"></div>
              </a>
              <a href="mailto:support@gtaai.net" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700">
                <div className="w-5 h-5 bg-gray-400 rounded"></div>
              </a>
            </div>
          </div>
          
          {/* Product Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="/#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="/gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</a></li>
              <li><a href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="/api" className="text-gray-400 hover:text-white transition-colors">API</a></li>
            </ul>
          </div>
          
          {/* Resources Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/docs" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="/docs/styles" className="text-gray-400 hover:text-white transition-colors">Style Guide</a></li>
              <li><a href="/docs/tutorials" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
              <li><a href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          
          {/* Community Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://discord.gg/gtaai" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <span>Discord</span>
                  <div className="w-3 h-3 bg-gray-400 rounded"></div>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/gtaai_official" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <span>Twitter</span>
                  <div className="w-3 h-3 bg-gray-400 rounded"></div>
                </a>
              </li>
              <li>
                <a href="https://github.com/gtaai" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <span>GitHub</span>
                  <div className="w-3 h-3 bg-gray-400 rounded"></div>
                </a>
              </li>
              <li>
                <a href="mailto:support@gtaai.net" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <span>Support</span>
                  <div className="w-3 h-3 bg-gray-400 rounded"></div>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-500 text-center mb-4">
            Inspired by the iconic Grand Theft Auto series. This is a fan project and not affiliated with Rockstar Games or Take-Two Interactive.
          </p>
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-gray-400">© 2025 GTA AI. All rights reserved.</span>
              <a href="https://ravensaas.io" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <span className="text-sm">Built with RavenSaaS</span>
                <div className="w-4 h-4 bg-gray-400 rounded"></div>
              </a>
            </div>
            
            <div className="flex space-x-6">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
              <a href="/gdpr" className="text-gray-400 hover:text-white transition-colors">GDPR</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GTAFooter;