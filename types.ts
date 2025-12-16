
export interface WalkthroughStep {
  id: number;
  name: string;
  icon: string;
  what: string;
  why: string;
}

export interface Scenario {
  id: number;
  name:string;
  description: string;
  response: string;
}

export interface Liquid {
  id: number;
  name: string;
  explanation: string;
}

export interface SectionInfo {
  id: string;
  label: string;
  icon: string;
}

export interface Result {
    title: string;
    value: string;
    desc: string;
}

export interface Benefit {
    icon: string;
    title: string;
    description: string;
}
