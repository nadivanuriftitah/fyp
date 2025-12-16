
import type { WalkthroughStep, Scenario, SectionInfo, Result, Liquid, Benefit } from './types';

export const SECTIONS: SectionInfo[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'system', label: 'System', icon: 'system' },
  { id: 'fiber', label: '3D Fiber', icon: 'cube' },
  { id: 'scenarios', label: 'Scenarios', icon: 'scenarios' },
  { id: 'results', label: 'Results', icon: 'results' },
  { id: 'about', label: 'About', icon: 'about' },
];

export const WALKTHROUGH_STEPS: WalkthroughStep[] = [
  {
    id: 1,
    name: 'Light Source',
    icon: 'lightbulb',
    what: 'A stable LED or Laser projects light into the fiber.',
    why: 'Provides the initial light signal that will be measured.'
  },
  {
    id: 2,
    name: 'POF',
    icon: 'fiber',
    what: 'A Polymer Optical Fiber guides the light along its path.',
    why: 'Flexible, low-cost, and easy to handle compared to glass fiber.'
  },
  {
    id: 3,
    name: 'Taper Region',
    icon: 'taper',
    what: 'A section of the fiber is heated and stretched to be thinner.',
    why: 'This makes the fiber sensitive to the surrounding environment.'
  },
  {
    id: 4,
    name: 'Liquid Contact',
    icon: 'liquid',
    what: 'Water or another liquid touches the tapered fiber.',
    why: 'The liquid changes how light is guided, causing some to leak out.'
  },
  {
    id: 5,
    name: 'Detector',
    icon: 'detector',
    what: 'A photodiode or spectrometer measures the light at the fiber\'s end.',
    why: 'It quantifies the drop in light intensity caused by the leak.'
  },
  {
    id: 6,
    name: 'Output Graph',
    icon: 'graph',
    what: 'The measured intensity is plotted over time.',
    why: 'A sudden drop in the graph signals a leak has been detected.'
  }
];

export const SCENARIOS_DATA: Scenario[] = [
    { id: 1, name: 'Baseline', description: 'Standard, untapered POF. Used as a control to measure the effect of modifications.', response: '0.5% Drop' },
    { id: 2, name: 'Unjacketed', description: 'The outer protective jacket is removed, exposing the cladding.', response: '3% Drop' },
    { id: 3, name: 'Unclad', description: 'Both jacket and cladding removed, exposing the core. Highly sensitive.', response: '25% Drop' },
    { id: 4, name: 'Straight Taper', description: 'A simple, linear taper. Balances sensitivity and robustness.', response: '12% Drop' },
    { id: 5, name: 'V-Bend Taper', description: 'Tapered region is bent into a V-shape to increase interaction length.', response: '18% Drop' },
    { id: 6, name: 'U-Bend Taper', description: 'A U-bend geometry further increases sensitivity by maximizing light interaction.', response: '22% Drop' },
    { id: 7, name: 'Multi-Point', description: 'Multiple tapered sections on a single fiber for distributed sensing.', response: 'Detects at multiple locations' },
];

export const RESULTS_DATA: Result[] = [
    { title: 'Max Drop (%)', value: '25%', desc: 'Observed with Unclad fiber in water (demo value).' },
    { title: 'Most Sensitive Liquid', value: 'Water', desc: 'Higher refractive index contrast leads to greater loss (demo value).' },
    { title: 'Most Sensitive Geometry', value: 'U-Bend', desc: 'Provides the longest interaction area with the liquid (demo value).' },
];

export const LIQUIDS_DATA: Liquid[] = [
    { id: 1, name: 'Water', explanation: 'Water has a refractive index that causes significant light leakage.' },
    { id: 2, name: 'Oil', explanation: 'Oil has a different refractive index, leading to a smaller intensity drop.' },
    { id: 3, name: 'Salt Water', explanation: 'Slightly higher refractive index than pure water, increasing the drop.' },
    { id: 4, name: 'Sugar Water', explanation: 'Refractive index changes with concentration, affecting sensor output.' },
];

export const BENEFITS_DATA: Benefit[] = [
    { icon: 'cost', title: 'Low-Cost', description: 'Polymer fibers and simple electronics make the system affordable.' },
    { icon: 'shield', title: 'EMI Immunity', description: 'Optical nature makes it immune to electromagnetic interference.' },
    { icon: 'scalable', title: 'Scalable Multi-Point', description: 'A single fiber can monitor large areas with multiple sensor points.' },
];

export const FUTURE_WORK_DATA: string[] = [
    'Develop machine learning models to classify different liquids.',
    'Integrate with IoT systems for remote monitoring and alerts.',
    'Miniaturize the sensor head for embedding into structures.',
    'Test long-term durability in various environmental conditions.',
];
