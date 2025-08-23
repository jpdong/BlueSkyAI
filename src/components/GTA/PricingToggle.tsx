'use client';

import React from 'react';

interface PricingToggleProps {
  isAnnualPlan: boolean;
  onToggle: (isAnnual: boolean) => void;
}

const PricingToggle: React.FC<PricingToggleProps> = ({ isAnnualPlan, onToggle }) => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-12">
      <span className={`text-lg ${!isAnnualPlan ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
      <button 
        onClick={() => onToggle(!isAnnualPlan)}
        className={`relative w-14 h-7 rounded-full transition-colors ${isAnnualPlan ? 'bg-purple-600' : 'bg-gray-600'}`}
      >
        <div className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform ${isAnnualPlan ? 'translate-x-8' : 'translate-x-1'}`}></div>
      </button>
      <span className={`text-lg ${isAnnualPlan ? 'text-white' : 'text-gray-400'}`}>Annually</span>
      <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">Save 20%</span>
    </div>
  );
};

export default PricingToggle;