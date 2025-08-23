'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQToggleProps {
  faqs: FAQItem[];
}

const FAQToggle: React.FC<FAQToggleProps> = ({ faqs }) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div key={faq.id} className="bg-gray-900/50 border border-gray-600 rounded-xl overflow-hidden">
          <button
            onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
            className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/50"
          >
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {faq.id}
              </div>
              <span className="text-lg font-semibold text-white">{faq.question}</span>
            </div>
            <ChevronDownIcon 
              className={`w-6 h-6 text-gray-400 transition-transform ${
                expandedFaq === faq.id ? 'rotate-180' : ''
              }`} 
            />
          </button>
          {expandedFaq === faq.id && (
            <div className="px-6 pb-6">
              <p className="text-gray-300 ml-12">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQToggle;