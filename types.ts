
export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  caseStudy: string;
}

export interface Insight {
  topic: string;
  value: string;
  strategy: string;
}

export interface ChatMessage {
  role: 'user' | 'agent';
  content: string;
}
