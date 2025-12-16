
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { Section } from './components/Section';
import { InfoModal } from './components/InfoModal';
import { SystemWalkthrough } from './components/SystemWalkthrough';
import { Icon } from './components/Icon';
import { FiberViewer } from './components/FiberViewer';
import { SECTIONS, WALKTHROUGH_STEPS, SCENARIOS_DATA, RESULTS_DATA, LIQUIDS_DATA, BENEFITS_DATA, FUTURE_WORK_DATA } from './constants';
import type { WalkthroughStep, Scenario, Liquid } from './types';

const App: React.FC = () => {
  const [modalStep, setModalStep] = useState<WalkthroughStep | null>(null);
  const [isWet, setIsWet] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS_DATA[3]);
  const [selectedLiquid, setSelectedLiquid] = useState<Liquid>(LIQUIDS_DATA[0]);
  const [futureWorkCollapsed, setFutureWorkCollapsed] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setReduceMotion(mediaQuery.matches);
    handleChange(); // Set initial state
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);


  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    system: useRef<HTMLDivElement>(null),
    'fiber-viewer': useRef<HTMLDivElement>(null),
    scenarios: useRef<HTMLDivElement>(null),
    results: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (id: string) => {
    const key = id as keyof typeof sectionRefs;
    sectionRefs[key].current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleWalkthroughStepClick = useCallback((step: WalkthroughStep) => {
    setModalStep(step);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalStep(null);
  }, []);

  const handleModalNav = useCallback((direction: 'next' | 'prev') => {
    if (!modalStep) return;
    const currentIndex = WALKTHROUGH_STEPS.findIndex(s => s.id === modalStep.id);
    const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < WALKTHROUGH_STEPS.length) {
      setModalStep(WALKTHROUGH_STEPS[nextIndex]);
    }
  }, [modalStep]);


  return (
    <div className="bg-[#0D1B2A] text-[#E0E1DD] min-h-screen font-sans">
      <Header onNavClick={scrollToSection} />

      <main className="pt-20">
        {/* Landing Section */}
        <div ref={sectionRefs.home} className="min-h-screen flex flex-col items-center justify-center text-center p-4 -mt-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Light Intensity Modulated <br/>Water Leakage Detection
          </h1>
          <p className="text-4xl md:text-xl text-[#A9B4C2]">
            Using Multi-Point Tapered Polymer Optical Fiber
          </p>
          <p className="mt-4 text-lg text-white">
            Nadiva Nuriftitah
          </p>
          <p className="mt-1 text-sm text-[#A9B4C2]">
            Supervisor: Professor Angela Amphawan
          </p>
          <div className="flex space-x-4 mt-6">
            <span className="bg-[#1B263B]/80 text-[#93a1b8] text-sm font-medium px-3 py-1.5 rounded-full">Sensor: Tapered POF</span>
            <span className="bg-[#1B263B]/80 text-[#93a1b8] text-sm font-medium px-3 py-1.5 rounded-full">Method: Intensity Drop</span>
          </div>
          <button
            onClick={() => scrollToSection('system')}
            className="mt-10 bg-[#1EE3CF] text-[#0D1B2A] font-bold py-3 px-8 rounded-full text-lg transform hover:scale-105 transition-all duration-300 shadow-lg shadow-[#1EE3CF]/20 hover:shadow-xl hover:shadow-[#1EE3CF]/40 active:brightness-95"
          >
            Tap to Explore
          </button>
        </div>

        {/* System Walkthrough Section */}
        <Section id="system" ref={sectionRefs.system} title="Interactive System Walkthrough">
          <SystemWalkthrough onStepClick={handleWalkthroughStepClick} />
        </Section>

        {/* Dry vs Wet Animation Section */}
        <Section id="simulation" ref={sectionRefs['home']} title="Dry vs. Wet Simulation">
            <div className="bg-[#1B263B] p-6 rounded-2xl shadow-xl flex flex-col items-center">
                <div className="flex items-center space-x-4 mb-6">
                    <span className={`font-bold transition-colors ${!isWet ? 'text-[#1EE3CF]' : 'text-gray-400'}`}>DRY</span>
                    <label htmlFor="wet-toggle" className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="wet-toggle" className="sr-only peer" checked={isWet} onChange={() => setIsWet(!isWet)} />
                        <div className="w-14 h-8 bg-gray-600 rounded-full peer peer-checked:bg-[#1EE3CF]"></div>
                        <div className="absolute top-1 left-1 bg-white border-gray-300 border rounded-full h-6 w-6 transition-all peer-checked:translate-x-full"></div>
                    </label>
                    <span className={`font-bold transition-colors ${isWet ? 'text-[#1EE3CF]' : 'text-gray-400'}`}>WET</span>
                </div>
                
                <div className="w-full max-w-2xl my-4">
                <svg viewBox="0 0 900 320" className="w-full h-auto" aria-labelledby="schematic-title">
                        <title id="schematic-title">Schematic of a tapered optical fiber showing light leakage when wet.</title>
                        <defs>
                            <marker id="arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="#FFD700" />
                            </marker>
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Fiber Body */}
                        <path d="M 50 140 L 300 140 C 350 140, 380 155, 450 155 C 520 155, 550 140, 600 140 L 850 140 L 850 180 L 600 180 C 550 180, 520 165, 450 165 C 380 165, 350 180, 300 180 L 50 180 Z" fill="#778DA9" />
                        <path d="M 50 142 C 150 142, 250 142, 300 142 C 350 142, 380 157, 450 157 C 520 157, 550 142, 600 142 L 850 142" stroke="white" strokeWidth="1" fill="none" opacity="0.1" />
                        <path d="M 50 178 C 150 178, 250 178, 300 178 C 350 178, 380 163, 450 163 C 520 163, 550 178, 600 178 L 850 178" stroke="black" strokeWidth="1.5" fill="none" opacity="0.1" />
                        
                        {/* Internal Light Path */}
                        <line x1="50" y1="160" x2="850" y2="160" stroke="#FFD700" strokeWidth="4" filter={reduceMotion ? 'none' : 'url(#glow)'}>
                            {!reduceMotion && <animate attributeName="stroke-opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" />}
                        </line>

                        {/* Water Puddle (Wet only) */}
                        <path 
                            d="M 320 180 C 350 170, 550 170, 580 180 C 600 190, 550 210, 450 210 C 350 210, 300 190, 320 180 Z"
                            fill="#3b82f6" 
                            className={`transition-opacity duration-500 ${isWet ? 'opacity-30' : 'opacity-0'}`}
                        />
                        
                        {/* Leakage Rays */}
                        <g stroke="#1EE3CF" strokeWidth="2" strokeLinecap="round" className={`transition-opacity duration-500 ${isWet ? 'opacity-100' : 'opacity-20'}`}>
                            <line x1="450" y1="155" x2="450" y2="120" />
                            <line x1="420" y1="155" x2="390" y2="130" />
                            <line x1="480" y1="155" x2="510" y2="130" />
                        </g>
                        
                        {/* Labels */}
                        <g fill="#A9B4C2" fontSize="18" textAnchor="middle">
                            <line x1="450" y1="155" x2="450" y2="80" stroke="#A9B4C2" strokeWidth="1" strokeDasharray="3,3" />
                            <circle cx="450" cy="155" r="3" fill="#A9B4C2" />
                            <text x="450" y="70">Taper waist</text>

                            <line x1="100" y1="190" x2="150" y2="220" stroke="#A9B4C2" strokeWidth="1" />
                            <circle cx="100" cy="190" r="3" fill="#A9B4C2" />
                            <text x="160" y="235">Light</text>

                             <line x1="390" y1="130" x2="340" y2="100" stroke="#A9B4C2" strokeWidth="1" />
                            <circle cx="390" cy="130" r="3" fill="#A9B4C2" />
                            <text x="330" y="90">Leakage</text>
                        </g>
                        
                        {/* Light Propagation Arrow */}
                        <line x1="80" y1="190" x2="180" y2="190" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrowhead)" />
                        
                        {/* Received Intensity Meter */}
                        <g transform="translate(700, 230)">
                           <rect x="0" y="0" width="30" height="80" fill="#1B263B" stroke="#415A77" strokeWidth="2" />
                            <rect
                                x="4"
                                width="22"
                                height={isWet ? "32" : "72"}
                                y={isWet ? "44" : "4"}
                                fill={isWet ? "#F97316" : "#4ade80"}
                                className="transition-all duration-500 ease-in-out"
                            />
                            <text x="80" y="20" fill={isWet ? "#F97316" : "#4ade80"} fontSize="20" className="transition-all duration-500 ease-in-out font-bold" textAnchor="start">
                                {isWet ? 'Low' : 'High'}
                            </text>
                             <text x="80" y="50" fill="#A9B4C2" fontSize="18" textAnchor="start">Received</text>
                             <text x="80" y="75" fill="#A9B4C2" fontSize="18" textAnchor="start">Intensity</text>
                        </g>
                    </svg>
                    <p className="text-center text-sm text-[#A9B4C2] mt-4">
                        Wet condition increases leakage at taper → lower received intensity.
                    </p>
                </div>
            </div>
        </Section>

        {/* 3D Fiber Viewer Section */}
        <Section id="fiber-viewer" ref={sectionRefs['fiber-viewer']} title="3D Tapered Fiber Viewer">
          <div className="bg-[#1B263B] p-4 rounded-2xl shadow-xl">
            <FiberViewer />
          </div>
        </Section>

        {/* Choose a Scenario Section */}
        <Section id="scenarios" ref={sectionRefs.scenarios} title="Choose a Scenario">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SCENARIOS_DATA.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario)}
                className={`p-3 rounded-lg text-center transition-all duration-300 btn-shimmer ${selectedScenario.id === scenario.id ? 'bg-[#1EE3CF] text-[#0D1B2A] font-bold' : 'bg-[#1B263B] hover:bg-[#415A77]'}`}
              >
                {scenario.name}
              </button>
            ))}
          </div>
          <div className="mt-6 bg-[#1B263B] p-4 rounded-2xl flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:w-1/3 h-48 bg-[#0D1B2A] rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-sm"> {/* REPLACE-WITH-IMAGE: ${selectedScenario.name} */} Placeholder Image </span>
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="text-xl font-bold text-white">{selectedScenario.name}</h3>
              <p className="mt-2 text-[#A9B4C2]">{selectedScenario.description}</p>
              <div className="mt-4 bg-[#0D1B2A] p-3 rounded-lg">
                <p className="text-sm text-gray-400">Typical Response</p>
                <p className="text-2xl font-bold text-[#1EE3CF]">{selectedScenario.response}</p>
                 <p className="text-xs text-gray-500">(Demo Value)</p>
              </div>
            </div>
          </div>
        </Section>
        
        {/* Results Summary Section */}
        <Section id="results" ref={sectionRefs.results} title="Results Summary">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {RESULTS_DATA.map(result => (
                    <div key={result.title} className="bg-[#1B263B] p-5 rounded-xl text-center">
                        <p className="text-sm text-gray-400">{result.title}</p>
                        <p className="text-3xl font-bold text-[#1EE3CF] my-2">{result.value}</p>
                        <p className="text-xs text-[#A9B4C2]">{result.desc}</p>
                    </div>
                ))}
            </div>
        </Section>

        {/* Liquid Comparison */}
        <Section id="liquid-comparison" ref={sectionRefs['home']} title="Liquid Comparison">
            <div className="bg-[#1B263B] p-6 rounded-2xl">
                 <div className="flex justify-center gap-2 mb-6">
                    {LIQUIDS_DATA.map(liquid => (
                        <button key={liquid.id} onClick={() => setSelectedLiquid(liquid)} className={`px-4 py-2 text-sm rounded-full transition-colors btn-shimmer ${selectedLiquid.id === liquid.id ? 'bg-[#1EE3CF] text-[#0D1B2A] font-semibold' : 'bg-[#415A77] text-white hover:bg-[#5A7492]'}`}>
                            {liquid.name}
                        </button>
                    ))}
                </div>
                <div className="text-center">
                    <p className="text-sm text-[#A9B4C2] mb-2">{selectedLiquid.explanation}</p>
                    <div className="h-40 bg-[#0D1B2A] rounded-lg flex items-center justify-center text-gray-500">
                         {/* REPLACE-WITH-CHART: Bar chart for ${selectedLiquid.name} */}
                         Mini-Chart Placeholder
                    </div>
                </div>
            </div>
        </Section>

        {/* How to Read the Graph Section */}
        <Section id="graph-guide" ref={sectionRefs['home']} title="How to Read the Graph">
            <div className="bg-[#1B263B] p-4 rounded-2xl">
                <div className="w-full h-64 bg-[#0D1B2A] rounded-lg flex items-center justify-center mb-4">
                     <span className="text-gray-500 text-sm"> {/* REPLACE-WITH-IMAGE: Annotated Sample Graph */} Placeholder Graph </span>
                </div>
                 <ul className="space-y-3 text-[#A9B4C2]">
                    <li className="flex items-start"><Icon name="check" className="w-5 h-5 text-[#1EE3CF] mr-2 shrink-0" /><div><span className="font-bold text-white">Dry Line:</span> Represents the baseline light intensity with no liquid contact.</div></li>
                    <li className="flex items-start"><Icon name="check" className="w-5 h-5 text-[#1EE3CF] mr-2 shrink-0" /><div><span className="font-bold text-white">Wet Line:</span> Shows the drop in intensity when the sensor detects a liquid.</div></li>
                    <li className="flex items-start"><Icon name="check" className="w-5 h-5 text-[#1EE3CF] mr-2 shrink-0" /><div><span className="font-bold text-white">The Drop:</span> The larger the gap between the lines, the greater the sensor's response.</div></li>
                </ul>
            </div>
        </Section>

        {/* Why It Matters & Future Work Section */}
        <Section id="about" ref={sectionRefs.about} title="Why It Matters & Future Work">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {BENEFITS_DATA.map(benefit => (
                    <div key={benefit.title} className="bg-[#1B263B] p-5 rounded-xl text-center">
                        <div className="flex justify-center mb-3">
                            <Icon name={benefit.icon as any} className="w-8 h-8 text-[#1EE3CF]" />
                        </div>
                        <h3 className="font-bold text-white">{benefit.title}</h3>
                        <p className="text-xs mt-1 text-[#A9B4C2]">{benefit.description}</p>
                    </div>
                ))}
            </div>
            <div className="bg-[#1B263B] p-4 rounded-xl">
                <button onClick={() => setFutureWorkCollapsed(!futureWorkCollapsed)} className="w-full flex justify-between items-center text-left btn-shimmer">
                    <h3 className="text-lg font-bold text-white">Future Work</h3>
                    <Icon name={futureWorkCollapsed ? 'chevronDown' : 'chevronUp'} className="w-6 h-6 text-[#1EE3CF]" />
                </button>
                {!futureWorkCollapsed && (
                    <ul className="mt-4 space-y-2 pl-2 text-[#A9B4C2]">
                        {FUTURE_WORK_DATA.map((item, index) => (
                             <li key={index} className="flex items-start"><Icon name="arrowRight" className="w-4 h-4 text-[#1EE3CF] mr-2 mt-1 shrink-0" />{item}</li>
                        ))}
                    </ul>
                )}
            </div>
        </Section>

        {/* Footer */}
        <footer className="p-8 border-t border-[#1B263B] text-xs text-[#A9B4C2]">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logos Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="text-center">
                <div className="w-28 h-12 bg-[#415A77] rounded flex items-center justify-center text-gray-400 text-[10px] p-2">
                  Sunway University Logo
                </div>
                <p className="mt-2 text-xs">Sunway University</p>
              </div>
              <div className="text-center">
                <div className="w-28 h-12 bg-[#415A77] rounded flex items-center justify-center text-gray-400 text-[10px] p-2">
                  MIMOS Logo
                </div>
                <p className="mt-2 text-xs">MIMOS Berhad</p>
              </div>
            </div>
            
            {/* Contact Info Section */}
            <div className="text-center md:text-right">
              <p className="font-bold text-white">Nadiva Nuriftitah (20086690)</p>
              <p className="mt-1">Supervisor: Prof. Angela Amphawan</p>
              <p className="mt-2">
                <a href="mailto:20086690@sunway.edu.my" className="text-[#1EE3CF] hover:underline">
                  20086690@sunway.edu.my
                </a>
              </p>
            </div>
          </div>
        </footer>
      </main>

      {modalStep && (
          <InfoModal 
            step={modalStep} 
            onClose={handleModalClose} 
            onNav={handleModalNav}
            isFirst={WALKTHROUGH_STEPS[0].id === modalStep.id}
            isLast={WALKTHROUGH_STEPS[WALKTHROUGH_STEPS.length - 1].id === modalStep.id}
          />
      )}
    </div>
  );
};

export default App;
