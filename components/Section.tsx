
import React, { forwardRef, useRef, useState, useEffect } from 'react';

const useIntersectionObserver = (options: IntersectionObserverInit) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);

    return [ref, isVisible] as const;
};


interface SectionProps {
  id?: string;
  title: string;
  children: React.ReactNode;
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(({ id, title, children }, ref) => {
  const [innerRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id={id} ref={ref} className="min-h-screen/2 py-16 px-4 max-w-3xl mx-auto">
      <div ref={innerRef} className={`reveal ${isVisible ? 'visible' : ''}`}>
        <h2 className="text-3xl font-bold text-center mb-8 text-white relative inline-block mx-auto left-1/2 -translate-x-1/2">
          {title}
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-[#1EE3CF] rounded-full"></span>
        </h2>
        {children}
      </div>
    </section>
  );
});

Section.displayName = 'Section';