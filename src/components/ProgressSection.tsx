import React from 'react';
import { ProgressState } from '../types';

interface ProgressSectionProps {
  progress: ProgressState;
}

const ProgressSection: React.FC<ProgressSectionProps> = ({ progress }) => {
  if (!progress.isRunning) return null;

  return (
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg border border-gray-700/30">
      <h2 className="text-xl font-medium mb-4 flex items-center space-x-2 text-white">
        🔍 Testing the system...
      </h2>
      <div className="w-full h-3 bg-gray-700/50 rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 rounded-full"
          style={{ width: `${progress.progress}%` }}
        />
      </div>
      <div className="flex items-center space-x-3 text-blue-400">
        <div className="w-5 h-5 border-2 border-gray-600/50 border-t-2 border-blue-500 rounded-full animate-spin" />
        <span className="text-sm text-gray-300">{progress.currentStep}</span>
      </div>
      <div className="mt-3 text-xs text-gray-500">
        Progress: {Math.round(progress.progress)}% • Analyzing system components...
      </div>
    </div>
  );
};

export default ProgressSection;
