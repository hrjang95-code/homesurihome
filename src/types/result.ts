export interface SummaryItem {
  icon: string;
  label: string;
  value: string;
}

export interface ToolItem {
  icon: string;
  label: string;
}

export interface PartInfo {
  image: string;
  badge: string;
  name: string;
  description: string;
  note: string;
}

export interface StepItem {
  id: string;
  image: string;
  title: string;
  description: string;
}

export interface DiagnosisResult {
  issueTitle: string;
  confidence: number;
  summary: SummaryItem[];
  cautions: string[];
  requiredTools: ToolItem[];
  part: PartInfo;
  steps: StepItem[];
  checklist: string[];
}
