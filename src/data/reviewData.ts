import { DiagnosticResult } from '../types';

export interface ReviewCheck extends DiagnosticResult {
  errorCode?: string;
  source: string;
  successMessage?: string;
  failureCriteria?: string;
  functionality?: string;
}

export const generateReviewData = (): ReviewCheck[] => {
  return [
    {
      id: 'case-request-handling',
      check: 'Case Request Handling',
      purpose: 'Confirms review flow even started. No case = nothing else will work.',
      status: 'passed',
      errorCode: '2 - Success, 12 - UnexpectedError (if failed)',
      source: 'DB',
      output: 'X cases were successfully created in BriefCam between 14:00 - 16:00',
      recommendation: 'Review API call trace if failures persist',
      lastChecked: '02/07/2025 10:36',
      functionality: 'Select all cases in timeframe and select all request related to all found cases. Check bc_processingrequest table if it contains all required requests. Exclude cases with schedules',
      successMessage: 'Cases created successfully',
      failureCriteria: 'No case created in timeframe'
    },
    {
      id: 'fetching-service-checks',
      check: 'Fetching Service Checks',
      purpose: 'Monitor fetching task completion and performance',
      status: 'passed',
      errorCode: '5 - FailedFetch, 12 - UnexpectedError',
      source: 'Fetching logs',
      output: 'Fetching successful: 8/10 tasks (avg 5m)',
      recommendation: 'None',
      lastChecked: '02/07/2025 10:35',
      successMessage: 'All fetch tasks completed successfully',
      failureCriteria: '2 failed fetch tasks detected'
    },
    {
      id: 'fetchtasks-db-analysis',
      check: 'FetchTasks DB Analysis',
      purpose: 'Identify stuck or failed tasks at DB level',
      status: 'passed',
      errorCode: '5 - FailedFetch, 6 - NoFrameProcessed, 13 - Cancelled',
      source: 'DB: FetchTasks table',
      output: 'All fetch tasks completed successfully',
      recommendation: 'Investigate stuck fetch threads, bad status transitions. Optimize timeout handling.',
      lastChecked: '02/07/2025 10:35',
      functionality: 'Get from bc_fetching_tasks all rows where created within timeframe selected in "Test my system". Filter by status error, return all error tasks and calculate average and max time for all fetching times',
      successMessage: 'All fetch tasks completed successfully',
      failureCriteria: '>10% stuck tasks, missing final status, abnormal duration (slow fetching)'
    },
    {
      id: 'fetching-permissions',
      check: 'Fetching - Permissions',
      purpose: 'Ensure service has access to Storage',
      status: 'failed',
      errorCode: '12 - UnexpectedError, 4 - FailedProcess',
      source: 'OS Permissions',
      output: 'Access denied',
      recommendation: 'Grant NTFS/SMB rights',
      lastChecked: '02/07/2025 10:34',
      functionality: 'On server where fetching is running, get VSservice user, get VIDEO_FILES_DIR path from bc_system, then as that user try to write and delete test.txt file',
      successMessage: 'Write access validated',
      failureCriteria: 'Access denied'
    },
    {
      id: 'fetching-timeout-analysis',
      check: 'Fetching - Log Timeout Analysis',
      purpose: 'Detect timeout patterns and "no progress" signals',
      status: 'passed',
      errorCode: '5 - FailedFetch, 12 - UnexpectedError',
      source: 'Fetch logs',
      output: 'No TimeoutException entries in log',
      recommendation: 'Inspect video exporter, VMS health, and improve retry logic',
      lastChecked: '02/07/2025 10:35',
      successMessage: 'No TimeoutException entries in log',
      failureCriteria: 'More than 3 timeout instances per request/camera'
    },
    {
      id: 'fetching-hostname-resolution',
      check: 'Fetching - Hostname Resolution',
      purpose: 'Ensure DNS resolution between BriefCam and VMS',
      status: 'passed',
      errorCode: '5 - FailedFetch (DNS issues), 12',
      source: 'Fetching + VSserver logs',
      output: 'Hostname resolves correctly',
      recommendation: 'None',
      lastChecked: '02/07/2025 10:35',
      functionality: 'Get all values from address column in bc_directories. Validate if this is IP or hostname. Remove http(s) and / if it contains. run nslookup on all values other than IP',
      successMessage: 'Hostname resolves correctly',
      failureCriteria: 'Cannot resolve hostname'
    },
    {
      id: 'fetching-retry-frequency',
      check: 'Fetching - Retry Frequency Monitor',
      purpose: 'Track retry attempts per task',
      status: 'passed',
      errorCode: '5 - FailedFetch, 12 - UnexpectedError',
      source: 'DB: bc_fetching_tasks',
      output: 'Retries <3 per task',
      recommendation: 'Improve error classification to prevent false retry triggers',
      lastChecked: '02/07/2025 10:34',
      functionality: 'Group rows of bc_fetching_tasks by the combination of cameraid, starttime, and endtime. Filter to only those groups where the count is greater than 1',
      successMessage: 'Retries <3 per task',
      failureCriteria: '>3 retries on same task'
    },
    {
      id: 'processing-decoder',
      check: 'Processing - Decoder',
      purpose: 'Decoder stability; detect decode errors or restart loops',
      status: 'passed',
      errorCode: '3 - FailedDecode, 10 - AboveMaximumResolution, 9 - BelowMinimumFps, 7 - FailedResolutionChanged',
      source: 'Processing log - decode failure patterns',
      output: 'Decoding Successful',
      recommendation: 'Enable logs, classify common issues',
      lastChecked: '02/07/2025 10:34',
      successMessage: 'Decoding Successful',
      failureCriteria: '10 decode errors, 5 warnings, 1 restart Error in /VideoDecodeServer/OpenDecodingSession - bad streams'
    },
    {
      id: 'processing-camera-codec',
      check: 'Processing - Camera Codec Validation',
      purpose: 'Detect incompatible codecs between VMS and BriefCam',
      status: 'passed',
      errorCode: '3 - FailedDecode, 10, 7, 14 - WarmingUp',
      source: 'Plugin logs',
      output: 'All camera codecs compatible',
      recommendation: 'Reconfigure camera codec to supported format (e.g. H.264); validate plugin version',
      lastChecked: '02/07/2025 10:33',
      successMessage: 'Camera codecs validated successfully',
      failureCriteria: 'Codec mismatch logged, e.g. "stream unsupported"'
    },
    {
      id: 'processing-task-correctness',
      check: 'Processing Task Correctness',
      purpose: 'Validate task exists and matches Review. Links DB → logs; spots broken tasks or bad durations.',
      status: 'passed',
      errorCode: '6 - NoFrameProcessed, 8 - ObjectLimitReached',
      source: 'DB vs Logs',
      output: 'Query ProcessingTasks table; correlate with Cases; validate task duration & RabbitMQ latency',
      recommendation: 'Validate task timings and cross-check DB–Log mapping',
      lastChecked: '02/07/2025 10:36',
      successMessage: 'All processing tasks valid',
      failureCriteria: 'Task duration mismatch or latency > 0.2s'
    },
    {
      id: 'processing-server',
      check: 'Processing Server',
      purpose: 'Check for patterns and recurring failures.',
      status: 'warning',
      errorCode: '12 - UnexpectedError, 11 - GracefulShutdown',
      source: 'Processing Server logs',
      output: '4 tasks failed to process (Error: 4, Warning: 3)',
      recommendation: 'Open processing logs, consider restarting engine',
      lastChecked: '02/07/2025 10:35',
      successMessage: 'Core engine running',
      failureCriteria: 'Multiple processing failures detected'
    },
    {
      id: 'processing-metadata',
      check: 'Processing - Metadata (Visual Artifacts)',
      purpose: 'Check for errors in processing logs - specify I/O error or write to stream exceptions',
      status: 'passed',
      errorCode: '4 - FailedProcess, 6 - NoFrameProcessed',
      source: 'Processing logs',
      output: 'Artifacts saved',
      recommendation: 'Investigate ingestion engine delays',
      lastChecked: '02/07/2025 10:33',
      successMessage: 'Artifacts saved successfully',
      failureCriteria: 'No artifact records'
    },
    {
      id: 'processing-rendering-service',
      check: 'Processing - Rendering Service',
      purpose: 'Confirm output clips render properly',
      status: 'passed',
      errorCode: 'Rendering errors',
      source: 'Rendering logs / DB',
      output: 'Clips and previews rendered',
      recommendation: 'Investigate large-object crashes',
      lastChecked: '02/07/2025 10:32',
      successMessage: 'Clips and previews rendered',
      failureCriteria: 'Latency > 4s or render failed'
    },
    {
      id: 'processing-decoder-rendering-flow',
      check: 'Processing - Decoder / Rendering Flow',
      purpose: 'Detect decoding issues and time jumps in exported videos; investigate render playback problems.',
      status: 'warning',
      errorCode: 'Decoding/Rendering issues',
      source: 'RenderingService.log',
      output: 'Detected gaps between frames > 5s',
      recommendation: 'Check codec compatibility (e.g., H.264 vs H.265), update decoder plugin, increase max_gap_between_frames_ms if needed',
      lastChecked: '02/07/2025 10:31',
      successMessage: 'Video decoding completed without frame gaps or artifacts',
      failureCriteria: 'Detected gaps between frames > 5s or Discarded frames due to decoding errors'
    }
  ];
};
