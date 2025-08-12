import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50" onClick={handleOverlayClick}>
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl border border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-white">{title}</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>
        <div className="text-gray-200 bg-gray-900/30 backdrop-blur-sm p-4 rounded-xl overflow-auto max-h-[60vh] text-sm leading-relaxed border border-gray-700/30">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
