
import React, { forwardRef } from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(({ id, title, children }, ref) => {
  return (
    <section id={id} ref={ref} className="min-h-screen/2 py-16 px-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-white relative inline-block mx-auto left-1/2 -translate-x-1/2">
        {title}
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-[#1EE3CF] rounded-full"></span>
      </h2>
      {children}
    </section>
  );
});

Section.displayName = 'Section';
