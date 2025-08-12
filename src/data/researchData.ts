import { DiagnosticResult } from '../types';

export interface ResearchCheck extends DiagnosticResult {
  analysisType?: string;
  dataPoints?: string;
  insights?: string;
}

// Helper functions for realistic data generation
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomStatus = (): 'passed' | 'warning' | 'failed' => {
  const rand = Math.random();
  if (rand < 0.65) return 'passed';
  if (rand < 0.85) return 'warning';
  return 'failed';
};

const getCurrentTimestamp = (): string => {
  const now = new Date();
  const minutes = getRandomInt(0, 120);
  now.setMinutes(now.getMinutes() - minutes);
  return now.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};


const generateVideoSegments = (): string => `${getRandomInt(50, 500)} video segments`;
const generateObjectCount = (): string => `${getRandomInt(1000, 50000)} objects`;
const generateTimeRange = (): string => {
  const hours = getRandomInt(1, 48);
  return `${hours}h ${getRandomInt(0, 59)}m`;
};

export const generateResearchData = (): ResearchCheck[] => {
  return [
    {
      id: 'video-analytics-processing',
      check: 'Video Analytics Processing',
      purpose: 'Monitor large-scale video analytics and object detection performance',
      status: getRandomStatus(),
      source: 'Analytics Engine',
      output: `Processed ${generateVideoSegments()} in ${generateTimeRange()}`,
      recommendation: 'Optimize processing pipeline for large datasets',
      lastChecked: getCurrentTimestamp(),
      analysisType: 'Batch Processing',
      dataPoints: `${generateObjectCount()} detected`,
      insights: `Processing rate: ${getRandomInt(50, 200)} segments/hour`
    },
    {
      id: 'pattern-recognition-analysis',
      check: 'Pattern Recognition Analysis',
      purpose: 'Analyze behavioral patterns and anomaly detection across timeframes',
      status: getRandomStatus(),
      source: 'ML Pipeline',
      output: `${getRandomInt(5, 25)} patterns identified across ${getRandomInt(10, 100)} locations`,
      recommendation: 'Review pattern confidence thresholds',
      lastChecked: getCurrentTimestamp(),
      analysisType: 'Machine Learning',
      dataPoints: `${getRandomInt(500, 5000)} behavioral events`,
      insights: `Anomaly detection accuracy: ${getRandomInt(85, 98)}%`
    },
    {
      id: 'forensic-search-performance',
      check: 'Forensic Search Performance',
      purpose: 'Evaluate search query performance across large video archives',
      status: getRandomStatus(),
      source: 'Search Engine',
      output: `Query completed in ${getRandomInt(5, 45)}s across ${getRandomInt(100, 1000)}GB archive`,
      recommendation: 'Consider index optimization for faster searches',
      lastChecked: getCurrentTimestamp(),
      analysisType: 'Forensic Analysis',
      dataPoints: `${getRandomInt(50000, 500000)} indexed objects`,
      insights: `Search efficiency: ${getRandomInt(70, 95)}%`
    },
    {
      id: 'data-correlation-engine',
      check: 'Data Correlation Engine',
      purpose: 'Cross-reference multiple data sources for comprehensive analysis',
      status: getRandomStatus(),
      source: 'Correlation Service',
      output: `${getRandomInt(100, 1000)} cross-references found in ${getRandomInt(50, 500)} cases`,
      recommendation: 'Expand correlation algorithms for better accuracy',
      lastChecked: getCurrentTimestamp(),
      analysisType: 'Data Mining',
      dataPoints: `${getRandomInt(10, 100)} data sources`,
      insights: `Correlation success rate: ${getRandomInt(75, 90)}%`
    },
    {
      id: 'timeline-reconstruction',
      check: 'Timeline Reconstruction',
      purpose: 'Build comprehensive timelines from multiple video sources',
      status: getRandomStatus(),
      source: 'Timeline Engine',
      output: `Reconstructed ${generateTimeRange()} timeline from ${getRandomInt(5, 50)} cameras`,
      recommendation: 'Improve timestamp synchronization accuracy',
      lastChecked: getCurrentTimestamp(),
      analysisType: 'Temporal Analysis',
      dataPoints: `${getRandomInt(1000, 10000)} events`,
      insights: `Timeline accuracy: ${getRandomInt(80, 95)}%`
    },
    {
      id: 'facial-recognition-research',
      check: 'Facial Recognition Research',
      purpose: 'Advanced facial analysis for research and investigation',
      status: getRandomStatus(),
      source: 'Face Analytics',
      output: `${getRandomInt(100, 5000)} faces analyzed, ${getRandomInt(10, 100)} matches found`,
      recommendation: 'Update facial recognition models for better accuracy',
      lastChecked: getCurrentTimestamp(),
      analysisType: 'Biometric Analysis',
      dataPoints: `${getRandomInt(10000, 100000)} face embeddings`,
      insights: `Recognition confidence: ${getRandomInt(85, 98)}%`
    },
    {
      id: 'vehicle-tracking-analysis',
      check: 'Vehicle Tracking Analysis',
      purpose: 'Track vehicle movements across multiple camera zones',
      status: getRandomStatus(),
      source: 'Vehicle Analytics',
      output: `Tracked ${getRandomInt(500, 5000)} vehicles across ${getRandomInt(10, 100)} zones`,
      recommendation: 'Calibrate vehicle detection models for night conditions',
      lastChecked: getCurrentTimestamp(),
      analysisType: 'Object Tracking',
      dataPoints: `${getRandomInt(50, 500)} tracking paths`,
      insights: `Tracking accuracy: ${getRandomInt(78, 94)}%`
    },
    {
      id: 'behavioral-analytics',
      check: 'Behavioral Analytics',
      purpose: 'Analyze crowd behavior and individual movement patterns',
      status: getRandomStatus(),
      source: 'Behavior Engine',
      output: `${getRandomInt(50, 500)} behavioral events detected in ${generateTimeRange()}`,
      recommendation: 'Fine-tune behavioral classification algorithms',
      lastChecked: getCurrentTimestamp(),
      analysisType: 'Behavioral Science',
      dataPoints: `${getRandomInt(1000, 10000)} movement patterns`,
      insights: `Behavior classification: ${getRandomInt(70, 88)}%`
    },
    {
      id: 'metadata-mining',
      check: 'Metadata Mining',
      purpose: 'Extract and analyze metadata from video and sensor data',
      status: getRandomStatus(),
      source: 'Metadata Processor',
      output: `Extracted ${getRandomInt(10000, 100000)} metadata entries`,
      recommendation: 'Enhance metadata extraction for audio analysis',
      lastChecked: getCurrentTimestamp(),
      analysisType: 'Data Extraction',
      dataPoints: `${getRandomInt(100, 1000)} metadata fields`,
      insights: `Extraction completeness: ${getRandomInt(85, 97)}%`
    },
    {
      id: 'spatial-analysis',
      check: 'Spatial Analysis',
      purpose: 'Analyze spatial relationships and zone-based activities',
      status: getRandomStatus(),
      source: 'Spatial Engine',
      output: `Analyzed ${getRandomInt(20, 200)} zones with ${getRandomInt(1000, 10000)} events`,
      recommendation: 'Optimize spatial clustering algorithms',
      lastChecked: getCurrentTimestamp(),
      analysisType: 'Geospatial',
      dataPoints: `${getRandomInt(50, 500)} spatial clusters`,
      insights: `Spatial accuracy: ${getRandomInt(82, 96)}%`
    },
    {
      id: 'export-generation',
      check: 'Export Generation',
      purpose: 'Generate comprehensive research reports and data exports',
      status: getRandomStatus(),
      source: 'Export Service',
      output: `Generated ${getRandomInt(5, 50)} reports (${getRandomInt(100, 2000)}MB total)`,
      recommendation: 'Optimize export formats for large datasets',
      lastChecked: getCurrentTimestamp(),
      analysisType: 'Report Generation',
      dataPoints: `${getRandomInt(10, 100)} export formats`,
      insights: `Export success rate: ${getRandomInt(90, 99)}%`
    },
    {
      id: 'archive-indexing',
      check: 'Archive Indexing',
      purpose: 'Index historical video data for research access',
      status: getRandomStatus(),
      source: 'Indexing Service',
      output: `Indexed ${getRandomInt(500, 5000)}GB across ${getRandomInt(30, 365)} days`,
      recommendation: 'Increase indexing frequency for recent data',
      lastChecked: getCurrentTimestamp(),
      analysisType: 'Data Indexing',
      dataPoints: `${getRandomInt(1000000, 10000000)} indexed frames`,
      insights: `Indexing speed: ${getRandomInt(50, 200)}GB/hour`
    },
    {
      id: 'statistical-analysis',
      check: 'Statistical Analysis',
      purpose: 'Generate statistical insights from video analytics data',
      status: getRandomStatus(),
      source: 'Statistics Engine',
      output: `Computed ${getRandomInt(20, 100)} statistical models from ${generateObjectCount()}`,
      recommendation: 'Expand statistical model coverage',
      lastChecked: getCurrentTimestamp(),
      analysisType: 'Statistical Modeling',
      dataPoints: `${getRandomInt(50, 500)} statistical parameters`,
      insights: `Model confidence: ${getRandomInt(75, 92)}%`
    },
    {
      id: 'machine-learning-training',
      check: 'Machine Learning Training',
      purpose: 'Train and update ML models with new research data',
      status: getRandomStatus(),
      source: 'ML Training Pipeline',
      output: `Trained ${getRandomInt(3, 15)} models with ${getRandomInt(10000, 100000)} samples`,
      recommendation: 'Schedule regular model retraining cycles',
      lastChecked: getCurrentTimestamp(),
      analysisType: 'Model Training',
      dataPoints: `${getRandomInt(100000, 1000000)} training samples`,
      insights: `Training accuracy: ${getRandomInt(88, 96)}%`
    },
    {
      id: 'research-data-validation',
      check: 'Research Data Validation',
      purpose: 'Validate research data quality and consistency',
      status: getRandomStatus(),
      source: 'Data Validator',
      output: `Validated ${getRandomInt(1000, 10000)} data points, ${getRandomInt(0, 50)} anomalies found`,
      recommendation: 'Implement automated data quality checks',
      lastChecked: getCurrentTimestamp(),
      analysisType: 'Quality Assurance',
      dataPoints: `${getRandomInt(10000, 100000)} validation rules`,
      insights: `Data quality score: ${getRandomInt(85, 99)}%`
    }
  ];
};
