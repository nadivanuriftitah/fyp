
import React, { useState, useRef, useCallback } from 'react';
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

  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    system: useRef<HTMLDivElement>(null),
    fiber: useRef<HTMLDivElement>(null),
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
          <p className="mt-4 text-lg md:text-xl text-[#A9B4C2]">
            Using Multi-Point Tapered Polymer Optical Fiber
          </p>
          <p className="mt-2 text-sm text-[#A9B4C2]">
            Nadiva Nuriftitah (20086690)
          </p>
          <div className="flex space-x-4 mt-6">
            <span className="bg-[#1B263B]/80 text-[#93a1b8] text-sm font-medium px-3 py-1.5 rounded-full">Sensor: Tapered POF</span>
            <span className="bg-[#1B263B]/80 text-[#93a1b8] text-sm font-medium px-3 py-1.5 rounded-full">Method: Intensity Drop</span>
          </div>
          <button
            onClick={() => scrollToSection('system')}
            className="shimmer-btn mt-10 bg-[#1EE3CF] text-[#0D1B2A] font-bold py-3 px-8 rounded-full text-lg relative overflow-hidden transform hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#1EE3CF]/20"
          >
            Tap to Explore
          </button>
        </div>

        {/* System Walkthrough Section */}
        <Section id="system" ref={sectionRefs.system} title="Interactive System Walkthrough">
          <SystemWalkthrough onStepClick={handleWalkthroughStepClick} />
        </Section>
        
        {/* 3D Fiber Viewer Section */}
        <Section id="fiber" ref={sectionRefs.fiber} title="3D Tapered Fiber">
          <p className="text-center text-sm text-gray-400 mb-6">Drag to rotate, scroll to zoom.</p>
          <FiberViewer />
        </Section>

        {/* Dry vs Wet Animation Section */}
        <Section title="Dry vs. Wet Simulation">
            <div className="bg-[#1B263B] p-6 rounded-2xl shadow-xl flex flex-col items-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#1EE3CF]/10">
                <div className="flex items-center space-x-4 mb-6">
                    <span className={`font-bold transition-colors ${!isWet ? 'text-[#1EE3CF]' : 'text-gray-400'}`}>DRY</span>
                    <label htmlFor="wet-toggle" className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="wet-toggle" className="sr-only peer" checked={isWet} onChange={() => setIsWet(!isWet)} />
                        <div className="w-14 h-8 bg-gray-600 rounded-full peer peer-checked:bg-[#1EE3CF]"></div>
                        <div className="absolute top-1 left-1 bg-white border-gray-300 border rounded-full h-6 w-6 transition-all peer-checked:translate-x-full"></div>
                    </label>
                    <span className={`font-bold transition-colors ${isWet ? 'text-[#1EE3CF]' : 'text-gray-400'}`}>WET</span>
                </div>
                
                <div className="relative w-full max-w-md h-32 flex flex-col justify-center items-center">
                    {/* Fiber representation */}
                    <div className="w-full h-2 bg-[#415A77] rounded-full relative overflow-hidden">
                       {/* Light path */}
                       <div className={`absolute top-0 left-0 h-full bg-gradient-to-r from-[#1EE3CF] to-yellow-300 transition-all duration-500 ease-in-out ${isWet ? 'w-1/2' : 'w-full'}`}></div>
                    </div>
                    <div className="absolute w-20 h-8 bg-[#1B263B] border-2 border-[#415A77] rounded-lg -mt-1 scale-y-50"></div>
                    <p className="text-xs text-gray-400 mt-2">Taper Region</p>

                    {/* Leaking light animation */}
                    <div className={`absolute transition-opacity duration-500 ease-in-out ${isWet ? 'opacity-100' : 'opacity-0'}`}>
                         <div className="absolute w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{top: '3rem', animationDelay: '0s'}}></div>
                         <div className="absolute w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{top: '3.5rem', left: '-1rem', animationDelay: '0.2s'}}></div>
                         <div className="absolute w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{top: '3.5rem', left: '1rem', animationDelay: '0.4s'}}></div>
                         <p className="absolute top-16 text-sm text-blue-300">Light Leakage</p>
                    </div>
                </div>

                {/* Mini Graph */}
                <div className="w-full max-w-md mt-6">
                    <p className="text-center font-semibold mb-2">Received Intensity</p>
                    <div className="bg-[#0D1B2A] p-4 rounded-lg">
                        <svg viewBox="0 0 100 50" className="w-full h-auto">
                            <line x1="5" y1="45" x2="95" y2="45" stroke="#415A77" strokeWidth="1" />
                            <line x1="5" y1="5" x2="5" y2="45" stroke="#415A77" strokeWidth="1" />
                             {/* Dry line */}
                            <path d="M 10 10 C 30 10, 70 15, 90 12" stroke="#4ade80" fill="none" strokeWidth="2"  className={`transition-opacity duration-500 ${!isWet ? 'opacity-100' : 'opacity-30'}`} />
                            {/* Wet line */}
                            <path d="M 10 30 C 30 32, 70 35, 90 33" stroke="#f87171" fill="none" strokeWidth="2" className={`transition-opacity duration-500 ${isWet ? 'opacity-100' : 'opacity-30'}`} />
                        </svg>
                        <div className="flex justify-center space-x-4 text-xs mt-2">
                            <span className="flex items-center"><div className="w-3 h-3 bg-green-400 rounded-full mr-1.5"></div>Dry</span>
                            <span className="flex items-center"><div className="w-3 h-3 bg-red-400 rounded-full mr-1.5"></div>Wet</span>
                        </div>
                    </div>
                </div>
            </div>
        </Section>


        {/* Choose a Scenario Section */}
        <Section id="scenarios" ref={sectionRefs.scenarios} title="Choose a Scenario">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SCENARIOS_DATA.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario)}
                className={`p-3 rounded-lg text-center transition-all duration-300 transform hover:-translate-y-1 ${selectedScenario.id === scenario.id ? 'bg-[#1EE3CF] text-[#0D1B2A] font-bold shadow-lg shadow-[#1EE3CF]/30' : 'bg-[#1B263B] hover:bg-[#415A77]'}`}
              >
                {scenario.name}
              </button>
            ))}
          </div>
          <div className="mt-6 bg-[#1B263B] p-4 rounded-2xl flex flex-col md:flex-row items-center gap-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#1EE3CF]/10">
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
                    <div key={result.title} className="bg-[#1B263B] p-5 rounded-xl text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-[#1EE3CF]/10">
                        <p className="text-sm text-gray-400">{result.title}</p>
                        <p className="text-3xl font-bold text-[#1EE3CF] my-2">{result.value}</p>
                        <p className="text-xs text-[#A9B4C2]">{result.desc}</p>
                    </div>
                ))}
            </div>
        </Section>

        {/* Liquid Comparison */}
        <Section title="Liquid Comparison">
            <div className="bg-[#1B263B] p-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#1EE3CF]/10">
                 <div className="flex justify-center gap-2 mb-6">
                    {LIQUIDS_DATA.map(liquid => (
                        <button key={liquid.id} onClick={() => setSelectedLiquid(liquid)} className={`px-4 py-2 text-sm rounded-full transition-colors ${selectedLiquid.id === liquid.id ? 'bg-[#1EE3CF] text-[#0D1B2A] font-semibold' : 'bg-[#415A77] text-white'}`}>
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
        <Section title="How to Read the Graph">
            <div className="bg-[#1B263B] p-4 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#1EE3CF]/10">
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
                    <div key={benefit.title} className="bg-[#1B263B] p-5 rounded-xl text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-[#1EE3CF]/10">
                        <div className="flex justify-center mb-3">
                            <Icon name={benefit.icon as any} className="w-8 h-8 text-[#1EE3CF]" />
                        </div>
                        <h3 className="font-bold text-white">{benefit.title}</h3>
                        <p className="text-xs mt-1 text-[#A9B4C2]">{benefit.description}</p>
                    </div>
                ))}
            </div>
            <div className="bg-[#1B263B] p-4 rounded-xl">
                <button onClick={() => setFutureWorkCollapsed(!futureWorkCollapsed)} className="w-full flex justify-between items-center text-left">
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
        <footer className="text-center p-8 border-t border-[#1B263B] text-xs text-[#A9B4C2]">
            <p>
                Nadiva Nuriftitah (ID: 20086690)
            </p>
            <p className="mt-1">
                Supervisor: Professor Angela Amphawan
            </p>
            <p className="mt-2">
                <a href="mailto:your.email@example.com" className="text-[#1EE3CF] hover:underline">
                    Contact for more info
                </a>
            </p>
            <div className="flex justify-center items-center gap-8 mt-6">
                <img src="/assets/sunway_logo.png" alt="Sunway University Logo" className="h-10 opacity-70" />
                <img src="/assets/mimos_logo.png" alt="MIMOS Logo" className="h-8 opacity-70" />
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
