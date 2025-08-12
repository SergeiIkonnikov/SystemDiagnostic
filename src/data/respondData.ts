import { DiagnosticResult } from '../types';

export interface RespondCheck extends DiagnosticResult {
  kpis?: string;
  errorWarning?: string;
}

export const generateRespondData = (): RespondCheck[] => {
  return [
    {
      id: 'rule-creation',
      check: 'Rule Creation',
      purpose: 'Validate rule creation and application in Pro Web API',
      status: 'passed',
      source: 'Pro Web API',
      output: 'Rule ID: 53987 – Direction: Westbound – Time: 07:00–09:00',
      recommendation: 'Review VSServer/VMSAgent logs to see if we have trouble getting live streams',
      lastChecked: '02/07/2025 10:35',
      kpis: 'Rule applied: Yes',
      errorWarning: 'None'
    },
    {
      id: 'vs-server-task-management',
      check: 'VS Server – Task Management',
      purpose: 'Monitor VS Server task initialization and management',
      status: 'passed',
      source: 'VS Server Logs',
      output: 'Task ID: RS21476',
      recommendation: 'Review logs and restart failed tasks',
      lastChecked: '02/07/2025 10:35',
      kpis: 'Task initialized',
      errorWarning: '4,338 errors, 44 warnings – Last stopped: 2025-06-17 20:15'
    },
    {
      id: 'aps-task-queue',
      check: 'APS Task Queue',
      purpose: 'Monitor task queue status and worker assignments',
      status: 'passed',
      source: 'APS Queue Monitor',
      output: '10 Rules in status queue',
      recommendation: 'Monitor for delays if queue grows',
      lastChecked: '02/07/2025 10:34',
      kpis: 'Queue depth: 10',
      errorWarning: 'Check if all rules in status 1 in the db are assigned a processid meaning that all gpu workers are working'
    },
    {
      id: 'alert-processing-server',
      check: 'Alert Processing Server (OX5)',
      purpose: 'Monitor real-time alert processing performance',
      status: 'passed',
      source: 'Engine Logs',
      output: 'Connected to VMS, processing live stream',
      recommendation: 'Allocate more memory / reduce stream load',
      lastChecked: '02/07/2025 10:34',
      kpis: 'Processing latency: ↑',
      errorWarning: '1,984 errors, 270 warnings – Insufficient memory - crashes, time jumps, decode failures'
    },
    {
      id: 'vms-streaming',
      check: 'VMS Streaming',
      purpose: 'Validate live stream reception and quality',
      status: 'passed',
      source: 'VMS Integration',
      output: 'Live stream received – Milestone 2025 R1 – 25 FPS (TCP)',
      recommendation: 'Review APS logs for time jumps detected and create summary report',
      lastChecked: '02/07/2025 10:33',
      kpis: 'Frame rate: 25 FPS',
      errorWarning: 'Review APS logs for time jumps detected and analyze frequency, timeframes, cameras correlation'
    },
    {
      id: 'tcp-protocol',
      check: 'TCP Protocol',
      purpose: 'Verify network communication protocol health',
      status: 'passed',
      source: 'Network Test',
      output: 'TCP communication verified',
      recommendation: 'None',
      lastChecked: '02/07/2025 10:33',
      kpis: 'Status: Healthy',
      errorWarning: 'None'
    },
    {
      id: 'decoder-integration',
      check: 'Decoder Integration',
      purpose: 'Monitor decoder service stability and uptime',
      status: 'passed',
      source: 'Decoder Service',
      output: 'FFmpeg + SDK: Healthy',
      recommendation: 'None',
      lastChecked: '02/07/2025 10:33',
      kpis: 'Decoder uptime: 100%',
      errorWarning: 'None'
    },
    {
      id: 'rule-matching-load',
      check: 'Rule Matching Load',
      purpose: 'Monitor processing load and performance thresholds',
      status: 'warning',
      source: 'Performance Monitor',
      output: 'Moderate processing load',
      recommendation: 'Monitor closely; consider task balancing',
      lastChecked: '02/07/2025 10:32',
      kpis: 'Load approaching threshold',
      errorWarning: 'CPU: 71%, GPU: 62% - check vpg log for errors, check iis items per second and queue latency, check APS failure to comm with VPG'
    },
    {
      id: 'face-recognition-matching',
      check: 'Face Recognition Matching',
      purpose: 'Monitor face matching performance on large watchlists',
      status: 'passed',
      source: 'Face Engine Logs',
      output: 'Matching on large watchlists – Running',
      recommendation: 'None',
      lastChecked: '02/07/2025 10:31',
      kpis: 'Match latency: 720ms avg',
      errorWarning: 'Latency <800ms'
    },
    {
      id: 'face-matching-service',
      check: 'Face Matching Service',
      purpose: 'Monitor face matching service responsiveness',
      status: 'passed',
      source: 'Face Match Monitor',
      output: 'Service responsive, matching running',
      recommendation: 'Restart service + log cleanup',
      lastChecked: '02/07/2025 10:31',
      kpis: 'Error ratio ↑',
      errorWarning: '2,000 errors, 5,008 warnings – System not restarted recently'
    },
    {
      id: 'lpr-matching-service',
      check: 'LPR Matching Service',
      purpose: 'Monitor License Plate Recognition service status',
      status: 'passed',
      source: 'LPR Engine',
      output: 'Active, responding to queries',
      recommendation: 'None',
      lastChecked: '02/07/2025 10:31',
      kpis: 'Plate list size: 129',
      errorWarning: 'None'
    },
    {
      id: 'metadata-object-storage',
      check: 'Metadata Object Storage',
      purpose: 'Monitor object creation and alert triggering',
      status: 'passed',
      source: 'Metadata DB',
      output: '326 objects created, 12 alerts triggered',
      recommendation: 'None',
      lastChecked: '02/07/2025 10:30',
      kpis: 'Object ingestion OK',
      errorWarning: 'None'
    },
    {
      id: 'notification-service',
      check: 'Notification Service',
      purpose: 'Verify real-time alert delivery to UI',
      status: 'passed',
      source: 'WebSocket Logs',
      output: 'Real-time alerts pushed to UI',
      recommendation: 'None',
      lastChecked: '02/07/2025 10:30',
      kpis: 'Delivery confirmed',
      errorWarning: 'None'
    },
    {
      id: 'outbound-api-alerts',
      check: 'Outbound API Alerts',
      purpose: 'Validate external API integration for alerts',
      status: 'passed',
      source: 'External API Gateway',
      output: 'Alerts pushed to Milestone, Genetec verified',
      recommendation: 'None',
      lastChecked: '02/07/2025 10:30',
      kpis: 'API OK',
      errorWarning: 'None'
    },
    {
      id: 'rendering-service',
      check: 'Rendering Service',
      purpose: 'Monitor clip and preview rendering performance',
      status: 'passed',
      source: 'Clip Generator',
      output: 'Clips & previews rendered',
      recommendation: 'None',
      lastChecked: '02/07/2025 10:29',
      kpis: 'Clipping latency: 3.2s',
      errorWarning: 'None'
    },
    {
      id: 'video-streaming-gateway',
      check: 'Video Streaming Gateway',
      purpose: 'Monitor live feed delivery to Respond engine',
      status: 'passed',
      source: 'Streaming Engine Logs',
      output: 'Provides live feeds to Respond engine',
      recommendation: 'None',
      lastChecked: '02/07/2025 10:29',
      kpis: 'Streaming link stable',
      errorWarning: 'None'
    },
    {
      id: 'vms-streaming-connection',
      check: 'VMS Streaming Connection',
      purpose: 'Check live stream availability & metadata',
      status: 'passed',
      source: 'Plugin logs',
      output: 'Stream received – Milestone R1, H.265',
      recommendation: 'Check camera firmware & stream config',
      lastChecked: '02/07/2025 10:34',
      kpis: 'Can live stream start and deliver expected codec/res?',
      errorWarning: 'Resolution change or codec errors'
    }
  ];
};