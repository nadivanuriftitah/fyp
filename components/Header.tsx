
import React from 'react';
import { Icon } from './Icon';
import { SECTIONS } from '../constants';

interface HeaderProps {
  onNavClick: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#0D1B2A]/80 backdrop-blur-sm z-50">
      <nav className="flex justify-around p-3 max-w-lg mx-auto">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => onNavClick(section.id)}
            className="flex flex-col items-center text-[#A9B4C2] hover:text-[#1EE3CF] transition-colors"
            aria-label={`Go to ${section.label} section`}
          >
            <Icon name={section.icon as any} className="w-6 h-6" />
            <span className="text-xs mt-1">{section.label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
};
