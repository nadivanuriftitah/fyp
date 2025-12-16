
import React from 'react';
import { Icon } from './Icon';
import type { WalkthroughStep } from '../types';

interface InfoModalProps {
  step: WalkthroughStep;
  onClose: () => void;
  onNav: (direction: 'next' | 'prev') => void;
  isFirst: boolean;
  isLast: boolean;
}

export const InfoModal: React.FC<InfoModalProps> = ({ step, onClose, onNav, isFirst, isLast }) => {
  return (
    <div 
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-[#1B263B] rounded-2xl p-6 w-full max-w-sm text-white shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">&times;</button>
        <div className="flex items-center mb-4">
          <div className="bg-[#415A77] p-2 rounded-lg mr-4">
            <Icon name={step.icon} className="w-8 h-8 text-[#1EE3CF]" />
          </div>
          <h3 className="text-2xl font-bold">{step.name}</h3>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-[#1EE3CF] uppercase tracking-wider">What it is</h4>
          <p className="mt-1 text-[#A9B4C2]">{step.what}</p>
          <h4 className="mt-4 font-semibold text-sm text-[#1EE3CF] uppercase tracking-wider">Why it matters</h4>
          <p className="mt-1 text-[#A9B4C2]">{step.why}</p>
        </div>
        <div className="flex justify-between mt-6">
            <button 
                onClick={() => onNav('prev')} 
                disabled={isFirst}
                className="px-4 py-2 bg-[#415A77] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed btn-shimmer hover:brightness-110 active:brightness-95 transition-all"
            >
                Back
            </button>
            <button 
                onClick={() => onNav('next')} 
                disabled={isLast}
                className="px-4 py-2 bg-[#1EE3CF] text-[#0D1B2A] font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed btn-shimmer hover:brightness-110 active:brightness-95 transition-all"
            >
                Next
            </button>
        </div>
      </div>
    </div>
  );
};
