import { DiagnosticResult } from '../types';

export const generateSampleResults = (): DiagnosticResult[] => {
  const getCurrentTimestamp = () => new Date().toLocaleString();

  return [
    {
      status: 'passed',
      component: 'Case Request Handling',
      purpose: 'Verify case was created in DB within timeframe',
      results: '2 cases found: CASE-2025-001, CASE-2025-002',
      suggestion: 'N/A',
      source: 'BriefCam Cases DB',
      criteria: 'At least one case exists in the timeframe',
      logGuidance: 'Query `Cases` table in the BriefCam DB for entries where `CreationTime` is within the selected range.',
      lastChecked: getCurrentTimestamp()
    },
    {
      status: 'failed',
      component: 'Fetching Service Logs',
      purpose: 'Analyze fetching service for success/failure patterns',
      results: '2/10 failed tasks. Camera 1: System.FormatException. Camera 2: Network issues.',
      suggestion: 'Check camera stream format and VMS configuration for Camera 1. Investigate network to Camera 2.',
      source: 'FetchingService.log',
      criteria: 'Less than 1% of fetch tasks fail',
      logGuidance: 'Filter FetchingService.log for "ERROR" and "Exception". Group by Camera ID and exception type.',
      lastChecked: getCurrentTimestamp()
    },
    {
      status: 'warning',
      component: 'FetchTasks DB Analysis',
      purpose: 'Detect stuck, failed, or slow tasks',
      results: '8 tasks stuck (6.5%), Max duration: 47 min',
      suggestion: 'Monitor stuck tasks and consider restarting FetchingService if they do not clear.',
      source: 'FetchTasks DB Table',
      criteria: 'Less than 5% of tasks are stuck',
      logGuidance: 'Query `FetchTasks` table for tasks with status "InProgress" for more than 30 minutes.',
      lastChecked: getCurrentTimestamp()
    },
    {
      status: 'warning',
      component: 'Processing Decoder Errors',
      purpose: 'Detect decoder errors and unexpected restart loops',
      results: '3 decoder restarts, 2 gap events >5000ms detected',
      suggestion: 'Review decoder configuration and video stream quality for the affected cameras.',
      source: 'ProcessingServer.log',
      criteria: 'No decoding issues or restart loops',
      logGuidance: 'Search ProcessingServer.log for "decode error", "malformed frame", "decoder restart", and "gap > 5000ms".',
      lastChecked: getCurrentTimestamp()
    },
    {
      status: 'failed',
      component: 'Log Timeout Analysis',
      purpose: 'Detect clusters of timeout failures in logs',
      results: '8 timeout errors clustered on Camera 5 within 10 minutes.',
      suggestion: 'Investigate VMS connectivity and network reliability for Camera 5.',
      source: 'FetchingService.log',
      criteria: 'Fewer than 5 clustered timeouts per hour',
      logGuidance: 'Search FetchingService.log for "TimeoutException" or "MIPS abort". Group by camera and timestamp.',
      lastChecked: getCurrentTimestamp()
    },
    {
      status: 'passed',
      component: 'Hostname Resolution (DNS)',
      purpose: 'Validate DNS resolution for VMS and external services',
      results: 'All required hostnames (VMS_HOST_A, VMS_HOST_B) resolved successfully.',
      suggestion: 'N/A',
      source: 'DNS Check Utility',
      criteria: 'All critical hostnames resolve successfully',
      logGuidance: 'Run `nslookup <hostname>` from the BriefCam server for all configured VMS hosts.',
      lastChecked: getCurrentTimestamp()
    },
    {
      status: 'warning',
      component: 'Retry Frequency Monitor',
      purpose: 'Monitor retry frequency for internal tasks',
      results: 'Task 12347 (Camera 3) retried 4 times.',
      suggestion: 'Investigate the underlying cause for retries on Task 12347.',
      source: 'All Service Logs',
      criteria: 'Fewer than 3 retries per task',
      logGuidance: 'Grep all logs for "Retrying operation..." and correlate by task or camera ID.',
      lastChecked: getCurrentTimestamp()
    },
    {
      status: 'passed',
      component: 'Fetching via VIT Comparison',
      purpose: 'Compare fetching results between Fetching Service and VIT',
      results: 'No discrepancies found. Both VIT and FetchingService succeeded for all tested cameras.',
      suggestion: 'N/A',
      source: 'VIT Logs, FetchingService.log',
      criteria: 'VIT and FetchingService results match',
      logGuidance: 'Run VIT for a problematic camera and compare its log output with the corresponding entries in FetchingService.log.',
      lastChecked: getCurrentTimestamp()
    },
    {
      status: 'passed',
      component: 'Fetching Service Load',
      purpose: 'Monitor queued tasks vs. workers',
      results: 'Queue: 12, Workers: 8. Ratio: 1.5. Within normal limits.',
      suggestion: 'N/A',
      source: 'Fetching Service Metrics',
      criteria: 'Queue-to-worker ratio is less than 4',
      logGuidance: 'Check internal performance counters or logs for "Queue length" and "Active workers".',
      lastChecked: getCurrentTimestamp()
    },
    {
      status: 'warning',
      component: 'Fetch File Size Check',
      purpose: 'Check fetched video file sizes for abnormalities',
      results: 'File for task 12350 is 0.2 MB.',
      suggestion: 'The small file size may indicate a corrupted or incomplete fetch. Review the source video.',
      source: 'File System',
      criteria: 'Fetched files are > 1MB',
      logGuidance: 'Check the size of fetched video files in the temporary storage location.',
      lastChecked: getCurrentTimestamp()
    },
    {
      status: 'failed',
      component: 'Camera Codec Validation',
      purpose: 'Validate VMS codec compatibility with BriefCam',
      results: 'Camera 8 is sending video in an unsupported "MPEG-2" codec.',
      suggestion: 'Reconfigure Camera 8 on the VMS to use a supported codec like H.264 or H.265.',
      source: 'VMS Metadata, Plugin Logs',
      criteria: 'All camera codecs are supported by installed plugins',
      logGuidance: 'Check VMS for camera codec settings. Cross-reference with BriefCam documentation and check PluginService.log for codec detection messages.',
      lastChecked: getCurrentTimestamp()
    },
    {
      status: 'passed',
      component: 'Processing Service Load',
      purpose: 'Check if processing is waiting for fetching',
      results: 'Processing queues are healthy. No significant wait times detected.',
      suggestion: 'N/A',
      source: 'ProcessingServer.log',
      criteria: 'No "waiting for fetching" messages',
      logGuidance: 'Search ProcessingServer.log for "waiting for fetching" or "input queue empty".',
      lastChecked: getCurrentTimestamp()
    },
    {
      status: 'passed',
      component: 'Processing Retry Frequency',
      purpose: 'Track retry counts for processing tasks',
      results: 'No excessive retries found for processing tasks.',
      suggestion: 'N/A',
      source: 'ProcessingTasks DB',
      criteria: 'Fewer than 3 retries per processing task',
      logGuidance: 'Analyze processing task history in the database to count attempts per task.',
      lastChecked: getCurrentTimestamp()
    },
    {
      status: 'warning',
      component: 'Processing Task Correctness',
      purpose: 'Validate processing task duration and latency',
      results: 'Average latency is high (0.8s).',
      suggestion: 'Investigate potential I/O bottlenecks on the storage where metadata is written.',
      source: 'ProcessingTasks DB',
      criteria: 'Latency from task completion to result availability is < 0.2s',
      logGuidance: 'Compare `EndTime` and `ResultAvailableTime` in the ProcessingTasks table.',
      lastChecked: getCurrentTimestamp()
    },
    {
      status: 'warning',
      component: 'Processing Error Patterns',
      purpose: 'Identify recurring error/warning patterns',
      results: '15 instances of "Could not acquire license" warning.',
      suggestion: 'Check license server connectivity and availability.',
      source: 'ProcessingServer.log',
      criteria: 'No high-frequency critical errors',
      logGuidance: 'Group and count unique ERROR and WARNING messages in ProcessingServer.log.',
      lastChecked: getCurrentTimestamp()
    },
    {
      status: 'passed',
      component: 'Metadata (Visual Artifacts)',
      purpose: 'Detect log entries indicating visual artifacts or I/O errors',
      results: 'No errors found during metadata generation.',
      suggestion: 'N/A',
      source: 'ProcessingServer.log',
      criteria: 'No "failed to write stream" or "corrupted metadata" errors',
      logGuidance: 'Search logs for errors related to writing metadata or visual artifacts.',
      lastChecked: getCurrentTimestamp()
    },
    {
      status: 'passed',
      component: 'Rendering Service Health',
      purpose: 'Confirm rendering service health (no crashes, low latency)',
      results: 'Service is stable. Average render time: 2.1s/clip.',
      suggestion: 'N/A',
      source: 'RenderingService.log',
      criteria: 'Service is stable and average render time is < 4s/clip',
      logGuidance: 'Check RenderingService.log for crash reports and analyze performance metrics for render duration.',
      lastChecked: getCurrentTimestamp()
    },
    {
      status: 'warning',
      component: 'Rendering Health (Clip Size)',
      purpose: 'Check rendered clip file sizes for abnormalities',
      results: 'Clip for case CASE-2025-001 is only 0.5 MB.',
      suggestion: 'Review the source video and rendering logs for this case, as the clip may be corrupt.',
      source: 'File System',
      criteria: 'Rendered clips are > 1MB',
      logGuidance: 'Check the file size of rendered clips in the output directory.',
      lastChecked: getCurrentTimestamp()
    },
    {
      status: 'passed',
      component: 'Frame Integrity',
      purpose: 'Detect skipped/duplicated frames or decode gaps',
      results: 'Frame timeline is smooth. No significant gaps or skips detected.',
      suggestion: 'N/A',
      source: 'ProcessingServer.log',
      criteria: 'No "discarded frame" or "duplicate timestamp" messages',
      logGuidance: 'Search logs for "discarded frame", "duplicate timestamp", "frame skip", etc.',
      lastChecked: getCurrentTimestamp()
    },
    {
      status: 'failed',
      component: 'Storage Permissions Check',
      purpose: 'Verify read/write permissions to critical storage',
      results: 'Access denied to output directory: `C:\\BriefCam\\output\\`',
      suggestion: 'Grant "Modify" NTFS permissions for the BriefCam service account to the output directory.',
      source: 'Permission Check Utility',
      criteria: 'Service has R/W access to all critical directories',
      logGuidance: 'Attempt to create a test file in each critical directory as the BriefCam service user. Check NTFS permissions.',
      lastChecked: getCurrentTimestamp()
    }
  ];
};
