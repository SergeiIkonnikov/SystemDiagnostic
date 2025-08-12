import React from 'react';

interface BreadcrumbProps {
  currentStep: 'Configuration' | 'Report';
  onBack?: () => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentStep, onBack }) => {
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm border-b border-gray-700/30 text-gray-400 text-sm mb-6 px-6 py-4 rounded-t-2xl flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <button className="text-blue-400 hover:text-blue-300 transition-colors">Dashboard</button>
        <span className="text-gray-600">›</span>
        <button className="text-blue-400 hover:text-blue-300 transition-colors">Support Tools</button>
        <span className="text-gray-600">›</span>
        <span className="text-white font-medium">
          Step {currentStep === 'Configuration' ? '1' : '2'}: {currentStep}
        </span>
      </div>
      {onBack && (
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-700/40 backdrop-blur-sm text-blue-400 hover:text-blue-300 hover:bg-gray-600/40 rounded-lg transition-all border border-gray-600/30"
        >
          <span>←</span>
          <span>Back to Dashboard</span>
        </button>
      )}
    </div>
  );
};

export default Breadcrumb;
