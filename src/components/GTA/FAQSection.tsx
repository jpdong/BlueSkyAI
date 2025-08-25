import React from 'react';
import FAQToggle from './FAQToggle';

const FAQSection = () => {
  const faqs = [
    { id: 1, question: "What AI models are available in GTA AI?", answer: "We offer multiple AI models optimized for different GTA styles including Vice City, San Andreas, and GTA V aesthetics." },
    { id: 2, question: "Can I use the generated images for commercial purposes?", answer: "Commercial use is available for Pro and Ultra plan subscribers. Free and Trial plans are for personal use only." },
    { id: 3, question: "What resolution can I generate images in?", answer: "Output resolution varies by plan - Standard definition for basic plans, HD for Pro, and Ultra HD for Ultra subscribers." },
    { id: 4, question: "How long does it take to generate an image?", answer: "Processing time depends on your plan and current server load, typically ranging from 30 seconds to 3 minutes." },
    { id: 5, question: "Can I customize the artistic style of my images?", answer: "Yes, Pro and Ultra subscribers have access to advanced style customization options and presets." },
    { id: 6, question: "Do you offer API access for developers?", answer: "API access is available for Pro and Ultra subscribers, allowing integration into your own applications." },
    { id: 7, question: "What makes GTA AI different from other art generators?", answer: "Our AI is specifically trained on Grand Theft Auto aesthetics, providing authentic and highly detailed GTA-style transformations." },
    { id: 8, question: "Can I use GTA Art for commercial purposes?", answer: "Commercial licensing is included with Pro and Ultra plans, allowing you to use generated images for business purposes." }
  ];

  return (
    <section className="relative py-20">
      <div className="absolute inset-0 bg-black/15"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-linear-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">FAQ</span>
          </h2>
          <p className="text-xl text-gray-300">Have another question? Contact us on Discord or by email</p>
        </div>
        
        <FAQToggle faqs={faqs} />
      </div>
    </section>
  );
};

export default FAQSection;