export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  source?: 'gemini-3.8-flash' | 'knowledge-fallback';
}

export interface SuggestedTopic {
  title: string;
  prompt: string;
  category: 'General' | 'Enrollment' | 'Certificates' | 'Benefits' | 'Camps' | 'Ranks';
  icon: string;
}

export interface NCCCamp {
  name: string;
  shortName: string;
  description: string;
  wing: 'All' | 'Army' | 'Navy' | 'Air';
  location: string;
}

export interface NCCCertificate {
  level: 'Certificate A' | 'Certificate B' | 'Certificate C';
  division: string;
  duration: string;
  prerequisites: string;
  defenceBenefit: string;
}
