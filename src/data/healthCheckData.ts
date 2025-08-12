import { HealthCheck } from '../types';

// Helper function to generate random values
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};



const getCurrentTimestamp = (): string => {
  return new Date().toLocaleString('en-US', { 
    month: '2-digit', 
    day: '2-digit', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

export const generateDashboardMetrics = () => {
  return {
    cpu: getRandomInt(35, 85),
    ram: getRandomInt(45, 80),
    gpu: getRandomInt(20, 75),
    networkUpload: getRandomInt(400, 950),
    networkDownload: getRandomInt(800, 1200),
    latency: getRandomInt(8, 25),
    activeCases: getRandomInt(15, 35),
    runningRules: getRandomInt(8, 15),
    storageUsed: getRandomInt(65, 95),
    timestamp: getCurrentTimestamp()
  };
};

export const generateHealthCheckData = (): HealthCheck[] => {
  const cpuUsage = getRandomInt(15, 85);
  const ramUsage = getRandomInt(25, 75);
  const diskUsage = getRandomInt(40, 95);
  const timestamp = getCurrentTimestamp();

  const cpuStatus: 'good' | 'warning' | 'critical' = cpuUsage < 70 ? 'good' : cpuUsage < 85 ? 'warning' : 'critical';
  const diskStatus: 'good' | 'warning' | 'critical' = diskUsage < 80 ? 'good' : diskUsage < 90 ? 'warning' : 'critical';
  
  const windowsUpdateStatuses = ['Up to date', 'Update available', '2 updates pending', 'Restart required'];
  const windowsStatus = windowsUpdateStatuses[getRandomInt(0, windowsUpdateStatuses.length - 1)];
  
  const antivirusStatuses = ['Active and up to date', 'Update available', 'Scan in progress', 'Definitions outdated'];
  const antivirusStatus = antivirusStatuses[getRandomInt(0, antivirusStatuses.length - 1)];

  return [
    {
      id: 'cpu-ram-processes',
      component: 'CPU / RAM of Key Processes',
      purpose: 'Detect overload or memory leaks',
      status: cpuStatus,
      value: `Services: ${cpuUsage}% CPU / ${ramUsage}% RAM`,
      suggestion: cpuStatus === 'good' ? 'None' : 'Consider optimizing high-usage processes',
      lastChecked: timestamp
    },
    {
      id: 'storage-disk-space',
      component: 'Storage - Disk space',
      purpose: 'Prevent failures from insufficient disk space',
      status: diskStatus,
      value: `${diskUsage}% full (${getRandomInt(100, 800)}GB free)`,
      suggestion: diskStatus === 'good' ? 'None' : 'Free up space or expand disk',
      lastChecked: timestamp
    },
    {
      id: 'windows-updates',
      component: 'Windows updates',
      purpose: 'Ensure OS is up to date',
      status: windowsStatus === 'Up to date' ? 'good' : 'warning',
      value: windowsStatus,
      suggestion: windowsStatus === 'Up to date' ? 'None' : 'Install pending updates',
      lastChecked: timestamp
    },
    {
      id: 'anti-virus',
      component: 'Anti Virus',
      purpose: 'Verify AV status and updates',
      status: antivirusStatus === 'Active and up to date' ? 'good' : 'warning',
      value: antivirusStatus,
      suggestion: antivirusStatus === 'Active and up to date' ? 'None' : 'Update antivirus definitions',
      lastChecked: timestamp
    }
  ];
};
