import React from 'react';

interface HeaderProps {
  isProcessing?: boolean;
  onBackToDashboard?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isProcessing = false, onBackToDashboard }) => {
  return (
    <div className="header bg-gray-700 text-gray-100 p-8 text-left relative overflow-hidden">
      {/* Back to Dashboard Button - Top Right */}
      {!isProcessing && onBackToDashboard && (
        <div className="absolute top-8 right-8 z-20">
          <button
            onClick={onBackToDashboard}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600/60 backdrop-blur-sm hover:bg-gray-500/60 text-blue-400 font-medium rounded-lg text-sm transition-all border border-gray-500/30"
          >
            <span>←</span>
            <span>Back to Dashboard</span>
          </button>
        </div>
      )}
      
      {!isProcessing && (
        <>
          <h1 className="text-4xl mb-2 relative z-10">Full diagnostic report</h1>
          <p className="text-lg opacity-90 relative z-10">
            Comprehensive system analysis and troubleshooting tool for BriefCam environments
          </p>
        </>
      )}
    </div>
  );
};

export default Header;
