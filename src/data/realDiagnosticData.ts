import { DiagnosticResult } from '../types';

export interface DiagnosticCategory {
  id: string;
  name: string;
  checks: DiagnosticResult[];
}

export const generateRealDiagnosticData = (): DiagnosticCategory[] => {
  return [
    {
      id: 'infrastructure-system',
      name: '🔧 1. Infrastructure & System Resources',
      checks: [
        {
          id: 'cpu-ram-processes',
          category: '🔧 1. Infrastructure & System Resources',
          check: 'CPU / RAM of Key Processes',
          purpose: 'Detect overload or memory leaks',
          status: 'passed',
          output: 'All services <70% CPU / <60% RAM',
          recommendation: 'None',
          lastChecked: '11/08/2025 2:10',
          guidance: 'System processes are running within normal parameters. CPU usage below 70% and RAM usage below 60% indicate healthy system performance.'
        },
        {
          id: 'storage-disk-space',
          category: '🔧 1. Infrastructure & System Resources',
          check: 'Storage - Disk space',
          purpose: 'Prevent failures from insufficient disk space',
          status: 'warning',
          output: '85% full',
          recommendation: 'Free up space or expand disk',
          lastChecked: '11/08/2025 2:10',
          guidance: 'Disk usage at 85% is approaching critical levels. Consider cleaning up old files, archiving data, or expanding storage capacity to prevent system failures.'
        },
        {
          id: 'windows-updates',
          category: '🔧 1. Infrastructure & System Resources',
          check: 'Windows updates',
          purpose: 'Ensure OS is up to date',
          status: 'passed',
          output: 'Up to date',
          recommendation: 'None',
          lastChecked: '11/08/2025 2:10',
          guidance: 'Operating system is current with all security updates installed. Regular updates help maintain system security and stability.'
        },
        {
          id: 'anti-virus',
          category: '🔧 1. Infrastructure & System Resources',
          check: 'Anti Virus',
          purpose: 'Verify AV status and updates',
          status: 'passed',
          output: 'Active and up to date',
          recommendation: 'None',
          lastChecked: '11/08/2025 2:10',
          guidance: 'Antivirus protection is active with current definitions. Real-time scanning is protecting the system from malware threats.'
        },
        {
          id: 'hardware-utilization',
          category: '🔧 1. Infrastructure & System Resources',
          check: 'Hardware Utilization',
          purpose: 'Confirm system-wide performance',
          status: 'passed',
          output: 'Healthy (<65% across all components)',
          recommendation: '—',
          lastChecked: '—',
          guidance: 'All hardware components are operating within normal utilization ranges, ensuring optimal system performance.'
        },
        {
          id: 'system-uptime',
          category: '🔧 1. Infrastructure & System Resources',
          check: 'System Uptime',
          purpose: 'Detect unexpected reboots',
          status: 'passed',
          output: 'Uptime > 99.9%',
          recommendation: '—',
          lastChecked: '—',
          guidance: 'System stability is excellent with minimal downtime. High uptime indicates reliable hardware and software operation.'
        },
        {
          id: 'disk-io-errors',
          category: '🔧 1. Infrastructure & System Resources',
          check: 'Disk / I/O Errors',
          purpose: 'Catch write failures during exports',
          status: 'warning',
          output: 'Occasional write delays',
          recommendation: 'Monitor disk performance, consider optimization',
          lastChecked: '—',
          guidance: 'Some disk write delays detected. Monitor disk performance and consider optimization or maintenance during next maintenance window.'
        },
        {
          id: 'storage-health-check',
          category: '🔧 1. Infrastructure & System Resources',
          check: 'Storage Health Check (NEW)',
          purpose: 'Verify I/O latency and disk queue',
          status: 'passed',
          output: '25ms latency, depth = 5',
          recommendation: 'Defrag, check RAID, replace if needed',
          lastChecked: '11/07/2025 4:00',
          guidance: 'Storage performance is within acceptable parameters. Regular monitoring recommended.'
        },
        {
          id: 'video-archive-storage',
          category: '🔧 1. Infrastructure & System Resources',
          check: 'Video Archive Storage',
          purpose: 'Prevent export/archive failure due to space',
          status: 'warning',
          output: '75% full',
          recommendation: 'Consider cleanup or expansion',
          lastChecked: '02/07/2025 10:33',
          guidance: 'Video archive storage usage is elevated but manageable. Plan for cleanup or expansion in the coming weeks.'
        }
      ]
    },
    {
      id: 'network-connectivity',
      name: '🌐 2. Network & Connectivity',
      checks: [
        {
          id: 'network-socket-check',
          category: '🌐 2. Network & Connectivity',
          check: 'Network Socket Check',
          purpose: 'Catch unreachable VMS / endpoints',
          status: 'warning',
          output: 'Some timeout issues detected',
          recommendation: 'Review network stability during peak hours',
          lastChecked: '—',
          guidance: 'Minor network connectivity issues detected during peak usage. Monitor network performance and consider load balancing.'
        },
        {
          id: 'hostname-change-detection',
          category: '🌐 2. Network & Connectivity',
          check: 'Hostname Change Detection',
          purpose: 'Detect host renaming impact',
          status: 'warning',
          output: 'Change detected',
          recommendation: 'Reverify VMS binding and certificates',
          lastChecked: '—',
          guidance: 'Hostname change detected which may affect VMS connectivity and SSL certificates. Verify all bindings and update certificates as needed.'
        },
        {
          id: 'rabbitmq-queue-backlog',
          category: '🌐 2. Network & Connectivity',
          check: 'RabbitMQ Queue Backlog',
          purpose: 'Ensure real-time message delivery',
          status: 'passed',
          output: '5 unacked messages',
          recommendation: 'OK',
          lastChecked: '—',
          guidance: 'Message queue is processing normally with minimal backlog. Real-time communication is functioning properly.'
        }
      ]
    },
    {
      id: 'logs-events-storage',
      name: '🗃️ 3. Logs, Events, and Storage',
      checks: [
        {
          id: 'windows-event-viewer',
          category: '🗃️ 3. Logs, Events, and Storage',
          check: 'Windows Event Viewer Logs',
          purpose: 'OS-level diagnostics',
          status: 'passed',
          output: 'No critical errors',
          recommendation: '—',
          lastChecked: '—',
          guidance: 'System event logs show no critical errors. Operating system is functioning normally without significant issues.'
        },
        {
          id: 'postgresql-logs',
          category: '🗃️ 3. Logs, Events, and Storage',
          check: 'PostgreSQL Logs',
          purpose: 'DB diagnostics',
          status: 'passed',
          output: 'No issues',
          recommendation: '—',
          lastChecked: '—',
          guidance: 'Database logs indicate normal operation with no errors or performance issues detected.'
        },
        {
          id: 'orphaned-task-check',
          category: '🗃️ 3. Logs, Events, and Storage',
          check: 'Orphaned Task Check',
          purpose: 'Detect stuck tasks',
          status: 'passed',
          output: '3 orphaned tasks',
          recommendation: 'Investigate task lifecycle',
          lastChecked: '—',
          guidance: 'Some orphaned tasks detected but within normal range. Monitor task lifecycle processes.'
        }
      ]
    },
    {
      id: 'camera-metadata',
      name: '📷 4. Camera Metadata Validation',
      checks: [
        {
          id: 'camera-name-validation',
          category: '📷 4. Camera Metadata Validation',
          check: 'Camera Name Validation',
          purpose: 'UTF and format compliance',
          status: 'warning',
          output: 'Minor format inconsistencies',
          recommendation: 'Standardize naming convention',
          lastChecked: '—',
          guidance: 'Some camera names have minor format inconsistencies. Consider standardizing naming convention for better organization.'
        },
        {
          id: 'camera-name-format',
          category: '📷 4. Camera Metadata Validation',
          check: 'Camera Name Format Check',
          purpose: 'Special characters or mismatch',
          status: 'warning',
          output: 'Format mismatch',
          recommendation: 'Align format with VMS spec',
          lastChecked: '—',
          guidance: 'Camera name format does not match VMS specifications. Standardize naming convention for consistency.'
        },
        {
          id: 'camera-guid-validation',
          category: '📷 4. Camera Metadata Validation',
          check: 'Camera GUID Validation',
          purpose: 'Validate external camera ID format',
          status: 'passed',
          output: 'All GUIDs valid',
          recommendation: '—',
          lastChecked: '—',
          guidance: 'All camera GUIDs are properly formatted and valid. System is functioning correctly.'
        }
      ]
    },
    {
      id: 'briefcam-services',
      name: '📡 5. BriefCam Services Health',
      checks: [
        {
          id: 'notification-service',
          category: '📡 5. BriefCam Services Health',
          check: 'Notification Service Health',
          purpose: 'Ensure push notification reliability',
          status: 'passed',
          output: 'OK (no delay >1s)',
          recommendation: '—',
          lastChecked: '—',
          guidance: 'Notification service is operating within performance parameters with minimal delay.'
        },
        {
          id: 'license-check',
          category: '📡 5. BriefCam Services Health',
          check: 'License Check',
          purpose: 'Ensure valid Sentinal license',
          status: 'passed',
          output: 'Valid – 14d remaining',
          recommendation: 'Renew before expiration',
          lastChecked: '—',
          guidance: 'License is valid but expires in 14 days. Plan renewal to avoid service interruption.'
        },
        {
          id: 'vms-version',
          category: '📡 5. BriefCam Services Health',
          check: 'VMS Version',
          purpose: 'Identify connected system type/version',
          status: 'passed',
          output: 'Genetec 5.11.3.15',
          recommendation: '—',
          lastChecked: '—',
          guidance: 'VMS system identified and compatible. Monitor for version updates and compatibility requirements.'
        }
      ]
    },
    {
      id: 'application-case-metrics',
      name: '📊 6. Application & Case Metrics',
      checks: [
        {
          id: 'rules-by-status',
          category: '📊 6. Application & Case Metrics',
          check: 'Number of Rules by Status',
          purpose: 'Overview of automation logic',
          status: 'passed',
          output: '36 active rules',
          recommendation: '—',
          lastChecked: '—',
          guidance: 'Rule automation is active with 36 configured rules. Monitor rule performance and effectiveness.'
        },
        {
          id: 'open-cases',
          category: '📊 6. Application & Case Metrics',
          check: 'Number of Open Cases',
          purpose: 'Operational backlog overview',
          status: 'passed',
          output: '110 open cases',
          recommendation: '—',
          lastChecked: '—',
          guidance: 'Current case backlog is within normal operational range. Continue monitoring case resolution rate.'
        },
        {
          id: 'engine-type-summary',
          category: '📊 6. Application & Case Metrics',
          check: 'Engine Type Summary',
          purpose: 'Display current deployment architecture',
          status: 'passed',
          output: '4 CV Engines, 2 VPGs',
          recommendation: '—',
          lastChecked: '—',
          guidance: 'System architecture is properly configured with computer vision engines and video processing groups.'
        }
      ]
    },
    {
      id: 'grafana-monitoring',
      name: '📈 7. Grafana / Monitoring System',
      checks: [
        {
          id: 'cpu-utilization',
          category: '📈 7. Grafana / Monitoring System',
          check: 'CPU Utilization',
          purpose: 'Detect over-utilization per engine',
          status: 'passed',
          output: '<65%',
          recommendation: 'OK',
          lastChecked: '—',
          guidance: 'CPU utilization is within acceptable limits across all engines.'
        },
        {
          id: 'fps-processing-rate',
          category: '📈 7. Grafana / Monitoring System',
          check: 'FPS Processing Rate',
          purpose: 'Ensure expected performance',
          status: 'passed',
          output: '≥ target FPS per stream',
          recommendation: 'OK',
          lastChecked: '—',
          guidance: 'Video processing is meeting target frame rate requirements for all streams.'
        },
        {
          id: 'task-volume',
          category: '📈 7. Grafana / Monitoring System',
          check: 'Task Volume',
          purpose: 'Ensure throughput per engine',
          status: 'passed',
          output: 'Tracks/minute within normal',
          recommendation: 'OK',
          lastChecked: '—',
          guidance: 'Task processing throughput is operating within normal parameters.'
        },
        {
          id: 'tracks-to-backend',
          category: '📈 7. Grafana / Monitoring System',
          check: 'Number of Tracks to Backend',
          purpose: 'Confirm engine-to-core communication',
          status: 'passed',
          output: 'Normal',
          recommendation: '—',
          lastChecked: '—',
          guidance: 'Communication between engines and backend core is functioning normally.'
        }
      ]
    }
  ];
};
