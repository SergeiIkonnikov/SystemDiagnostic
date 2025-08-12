export interface DiagnosticResult {
  id?: string;
  category?: string;
  status: 'passed' | 'warning' | 'failed';
  component?: string;
  check?: string;
  purpose: string;
  results?: string;
  output?: string;
  suggestion?: string;
  recommendation?: string;
  source?: string;
  criteria?: string;
  logGuidance?: string;
  guidance?: string;
  lastChecked: string;
}

export interface ConfigurationState {
  productType: 'review' | 'response' | 'research' | 'all';
  logDuration: 'one_hour' | 'one_day' | 'one_week' | 'custom';
  fromDate: string;
  toDate: string;
  savePath: string;
}

export interface ProgressState {
  isRunning: boolean;
  currentStep: string;
  progress: number;
}

export interface SummaryData {
  passed: number;
  warning: number;
  failed: number;
  summaryText: string;
  ragStatus?: string;
  riskScore?: number;
  businessImpact?: string;
  actionPriority?: string;
  criticalFailures?: number;
}

export interface HealthCheck {
  id: string;
  component: string;
  purpose: string;
  status: 'good' | 'warning' | 'critical';
  value: string;
  suggestion: string;
  lastChecked: string;
}
