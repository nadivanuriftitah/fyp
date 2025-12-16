
import React, { useState } from 'react';
import { Icon } from './Icon';
import { WALKTHROUGH_STEPS } from '../constants';
import type { WalkthroughStep } from '../types';

interface SystemWalkthroughProps {
  onStepClick: (step: WalkthroughStep) => void;
}

const StepButton: React.FC<{ step: WalkthroughStep, onClick: () => void, isActive: boolean }> = ({ step, onClick, isActive }) => (
    <div className="flex flex-col items-center flex-shrink-0 w-24">
        <button
            onClick={onClick}
            className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isActive ? 'bg-[#1EE3CF] border-[#1EE3CF] shadow-lg shadow-[#1EE3CF]/30' : 'bg-[#1B263B] border-[#415A77] hover:border-[#1EE3CF]'}`}
        >
            <Icon name={step.icon} className={`w-8 h-8 ${isActive ? 'text-[#0D1B2A]' : 'text-[#A9B4C2]'}`} />
        </button>
        <p className={`mt-2 text-xs text-center font-semibold transition-colors ${isActive ? 'text-[#1EE3CF]' : 'text-[#A9B4C2]'}`}>{step.name}</p>
    </div>
);

const Connector: React.FC = () => (
    <div className="flex-grow flex items-center">
        <div className="w-full h-0.5 bg-[#415A77]"></div>
    </div>
);

export const SystemWalkthrough: React.FC<SystemWalkthroughProps> = ({ onStepClick }) => {
  const [activeStepId, setActiveStepId] = useState<number | null>(null);

  const handleStepClick = (step: WalkthroughStep) => {
    setActiveStepId(step.id);
    onStepClick(step);
  };
    
  return (
    <div className="w-full">
        <p className="text-center text-sm text-gray-400 mb-6">Tap each step to learn more.</p>
        <div className="flex items-start overflow-x-auto pb-4 -mx-4 px-4">
            {WALKTHROUGH_STEPS.map((step, index) => (
                <React.Fragment key={step.id}>
                    <StepButton 
                        step={step} 
                        onClick={() => handleStepClick(step)} 
                        isActive={activeStepId === step.id}
                    />
                    {index < WALKTHROUGH_STEPS.length - 1 && <Connector />}
                </React.Fragment>
            ))}
        </div>
    </div>
  );
};
