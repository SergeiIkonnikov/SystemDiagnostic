import React, { useState } from 'react';
import { HealthCheck } from '../types';

interface DashboardMetrics {
  cpu: number;
  ram: number;
  gpu: number;
  networkUpload: number;
  networkDownload: number;
  latency: number;
  activeCases: number;
  runningRules: number;
  storageUsed: number;
  timestamp: string;
}

interface HealthCheckDashboardProps {
  healthChecks: HealthCheck[];
  dashboardMetrics?: DashboardMetrics;
  userName?: string;
  onRunDiagnostic?: () => void;
  onRefreshHealthCheck?: () => void;
  lastCheckTime?: string;
  isRefreshing?: boolean;
}

type TabType = 'overview' | 'analytics' | 'monitoring';

const HealthCheckDashboard: React.FC<HealthCheckDashboardProps> = ({ 
  healthChecks, 
  dashboardMetrics,
  userName = "Ann",
  onRunDiagnostic,
  onRefreshHealthCheck,
  lastCheckTime = "8/11/2025 2:10",
  isRefreshing = false
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [showSettings, setShowSettings] = useState(false);
  const [hoveredHealthItem, setHoveredHealthItem] = useState<string | null>(null);
  const [hoveredCpuPillar, setHoveredCpuPillar] = useState<number | null>(null);
  const [diagnosticSettings, setDiagnosticSettings] = useState({
    timeFrame: 'last_hour',
    modules: 'all'
  });
  
  // Default metrics if not provided
  const metrics = dashboardMetrics || {
    cpu: 64,
    ram: 55,
    gpu: 72,
    networkUpload: 850,
    networkDownload: 1200,
    latency: 12,
    activeCases: 25,
    runningRules: 12,
    storageUsed: 85,
    timestamp: lastCheckTime
  };
  
  const getStatusInfo = (checks: HealthCheck[]) => {
    const warningCount = checks.filter(check => check.status === 'warning').length;
    const criticalCount = checks.filter(check => check.status === 'critical').length;
    
    if (criticalCount > 0) {
      return {
        systemStatus: 'critical',
        alertsText: `${criticalCount + warningCount} alerts to take care of`,
        alertsCount: criticalCount + warningCount,
        statusText: 'requires attention'
      };
    } else if (warningCount > 0) {
      return {
        systemStatus: 'warning',
        alertsText: `${warningCount} alerts to take care of`,
        alertsCount: warningCount,
        statusText: 'operates with warnings'
      };
    } else {
      return {
        systemStatus: 'good',
        alertsText: 'no alerts',
        alertsCount: 0,
        statusText: 'operates as usual'
      };
    }
  };

  const statusInfo = getStatusInfo(healthChecks);

  /*
  const generateHealthSentence = (check: HealthCheck): string => {
    const statusEmoji = check.status === 'good' ? '✅' : check.status === 'warning' ? '⚠️' : '❌';
    
    if (check.id === 'cpu-ram-processes') {
      return `${statusEmoji} System processes are optimal: 65% CPU (12-core Intel Xeon), 55% RAM (44GB/80GB), 239 active processes.`;
    } else if (check.id === 'storage-disk-space') {
      return `⚠️ Storage approaching capacity: 850GB used of 1TB total (85% full) - consider cleanup or expansion.`;
    } else if (check.id === 'windows-updates') {
      return `✅ Windows security is current: All critical updates installed, automatic updates enabled, last check today at 2:10.`;
    } else if (check.id === 'anti-virus') {
      return `✅ Antivirus protection active: Real-time scanning enabled, definitions updated hourly, no threats detected in 30 days.`;
    } else {
      // Fallback for any other checks
      if (check.status === 'good' && check.suggestion === 'None') {
        return `${statusEmoji} ${check.component} is operating normally - ${check.value.toLowerCase()}.`;
      } else if (check.status === 'warning') {
        return `⚠️ ${check.component} shows ${check.value.toLowerCase()} - ${check.suggestion.toLowerCase()}.`;
      } else {
        return `❌ ${check.component} has critical issues: ${check.value.toLowerCase()} - ${check.suggestion.toLowerCase()}.`;
      }
    }
  };
  */



  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen p-6 relative">
      {/* Loading Overlay */}
      {isRefreshing && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-600/30 text-center">
            <div className="flex items-center space-x-3 mb-4">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
              <span className="text-xl font-medium text-white">Refreshing System Data</span>
            </div>
            <p className="text-gray-400 text-sm">
              Checking CPU, memory, storage, network, and security status...
            </p>
            <div className="mt-4 w-64 bg-gray-700/50 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full animate-pulse transition-all duration-1000" style={{width: '70%'}}>
                <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className={`container max-w-7xl mx-auto transition-all duration-300 ${isRefreshing ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-white">BriefCam System</h1>
                <span className="text-sm text-gray-400">ID: 449836</span>
              </div>
              <h2 className="text-4xl font-light text-white mb-2">
                <span className="text-gray-400">Good morning, </span>
                <span className="text-white font-normal">{userName}!</span>
              </h2>
            </div>
            
            {/* Navigation Tabs */}
            <div className="flex bg-gray-800/60 backdrop-blur-sm rounded-xl p-1 shadow-lg">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                  activeTab === 'overview' 
                    ? 'text-white bg-gray-700/80' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                  activeTab === 'analytics' 
                    ? 'text-white bg-gray-700/80' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                Analytics
              </button>
              <button 
                onClick={() => setActiveTab('monitoring')}
                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                  activeTab === 'monitoring' 
                    ? 'text-white bg-gray-700/80' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                Monitoring
              </button>
            </div>
            
            {/* Settings and Diagnostic Button */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowSettings(true)}
                className="p-3 bg-gray-800/60 backdrop-blur-sm text-white rounded-xl hover:bg-gray-700/60 transition-all shadow-lg border border-gray-600/30 hover:border-blue-500/50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button 
                onClick={onRunDiagnostic}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 text-sm font-medium rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                🔍 Run Diagnostic
              </button>
            </div>
          </div>

          {/* Status Banner */}
          <div className={`bg-gray-800/40 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-700/50 mb-6 ${isRefreshing ? 'opacity-75' : ''} transition-opacity`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="text-sm text-gray-300 flex items-center">
                  System Status: <span className={`font-medium ${statusInfo.alertsCount > 0 ? 'text-orange-400' : 'text-green-400'} ml-2 flex items-center`}>
                    {statusInfo.alertsCount > 0 ? '⚠️ Attention' : '✅ Operational'}
                    {isRefreshing && (
                      <span className="ml-2 text-xs text-blue-400 flex items-center space-x-1">
                        <div className="animate-spin h-3 w-3 border border-blue-400 border-t-transparent rounded-full"></div>
                        <span className="animate-pulse">(Checking...)</span>
                      </span>
                    )}
                  </span>
                </div>
                <div className="text-sm text-gray-300">
                  Cases: <span className="font-medium text-white">{metrics.activeCases} active</span>
                </div>
                <div className="text-sm text-gray-300">
                  Rules: <span className="font-medium text-white">{metrics.runningRules} running</span>
                </div>
                <div className="text-sm text-gray-300">
                  GPU: <span className="font-medium text-white">{metrics.gpu}%</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-400">
                  Last check: {lastCheckTime}
                </div>
                <button
                  onClick={onRefreshHealthCheck}
                  disabled={isRefreshing}
                  className={`flex items-center space-x-1 px-3 py-1 backdrop-blur-sm rounded-lg transition-all border text-sm ${
                    isRefreshing 
                      ? 'bg-gray-700/60 text-gray-400 border-gray-600/50 cursor-not-allowed' 
                      : 'bg-gray-700/40 text-blue-400 hover:text-blue-300 hover:bg-gray-600/40 border-gray-600/30'
                  }`}
                >
                  <span className={`text-xs ${isRefreshing ? 'animate-spin' : ''}`}>
                    {isRefreshing ? '⟳' : '🔄'}
                  </span>
                  <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            {/* Main Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* CPU Usage */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700/30 relative" style={{zIndex: 1000}}>
            {isRefreshing && (
              <div className="absolute inset-0 bg-gray-800/60 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <div className="animate-spin h-6 w-6 border-2 border-green-500 border-t-transparent rounded-full"></div>
              </div>
            )}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-300">Current CPU</h3>
              <span className="text-xs text-gray-400">%</span>
            </div>
            <div className="text-4xl font-light text-white mb-6">{metrics.cpu}</div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className={`${metrics.cpu < 70 ? 'text-green-400' : metrics.cpu < 85 ? 'text-orange-400' : 'text-red-400'}`}>● Intel Xeon</span>
                <span className="text-gray-300">12-core</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">● Load</span>
                <span className={`${metrics.cpu < 70 ? 'text-green-400' : metrics.cpu < 85 ? 'text-orange-400' : 'text-red-400'}`}>
                  {metrics.cpu < 70 ? 'Normal' : metrics.cpu < 85 ? 'High' : 'Critical'}
                </span>
              </div>
            </div>
            <div className="h-16 relative" style={{zIndex: 2000}}>
              <div className="flex items-end space-x-1 h-full">
                {(() => {
                  const cpuValues = [39, 54, 29, 64, 44, 69, 64];
                  
                  return cpuValues.map((height, i) => (
                    <div
                      key={i}
                      className={`bg-gradient-to-t rounded-t flex-1 cursor-pointer transition-all hover:opacity-80 relative ${
                        height < 70 
                          ? 'from-green-500 to-green-400' 
                          : height < 85 
                          ? 'from-orange-500 to-orange-400' 
                          : 'from-red-500 to-red-400'
                      }`}
                      style={{ height: `${height}%` }}
                      onMouseEnter={() => setHoveredCpuPillar(i)}
                      onMouseLeave={() => setHoveredCpuPillar(null)}
                    >

                    </div>
                  ));
                })()}
              </div>
            </div>

            {/* CPU Tooltip */}
            {hoveredCpuPillar !== null && (() => {
              const timeLabels = ['6h ago', '5h ago', '4h ago', '3h ago', '2h ago', '1h ago', 'Now'];
              const cpuValues = [39, 54, 29, 64, 44, 69, 64];
              const processLabels = ['Video Analytics', 'Database Ops', 'Maintenance', 'Peak Load', 'Background Tasks', 'Live Processing', 'Current State'];
              const height = cpuValues[hoveredCpuPillar];
              
              // Calculate tooltip position based on pillar index
              // Each pillar takes up 1/7 of the chart width (7 pillars total)
              // Start from the left edge and calculate the center of each pillar
              const pillarWidth = 100 / 7; // percentage
              const pillarCenterOffset = pillarWidth * hoveredCpuPillar + (pillarWidth / 2);
              
              return (
                <div 
                  className="absolute bottom-16 bg-gray-900 border border-gray-600 rounded-lg p-3 shadow-2xl backdrop-blur-sm w-48 transform -translate-x-1/2" 
                  style={{
                    zIndex: 999999,
                    left: `${pillarCenterOffset}%`
                  }}
                >
                  <div className="text-sm text-gray-200">
                    <div className="font-semibold text-white mb-2">{timeLabels[hoveredCpuPillar]}</div>
                    <div className="space-y-1 text-xs">
                      <div>CPU Usage: <span className="font-medium text-white">{height}%</span></div>
                      <div>Primary Load: <span className="text-gray-300">{processLabels[hoveredCpuPillar]}</span></div>
                      <div>Status: <span className={`${height < 70 ? 'text-green-400' : height < 85 ? 'text-orange-400' : 'text-red-400'}`}>
                        {height < 70 ? 'Normal' : height < 85 ? 'High' : 'Critical'}
                      </span></div>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 border-b border-r border-gray-600 rotate-45"></div>
                </div>
              );
            })()}
          </div>

          {/* Storage Usage */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700/30 relative">
            {isRefreshing && (
              <div className="absolute inset-0 bg-gray-800/60 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <div className="animate-spin h-6 w-6 border-2 border-orange-500 border-t-transparent rounded-full"></div>
              </div>
            )}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-300">Storage</h3>
              <span className="text-xs text-gray-400">GB</span>
            </div>
            <div className="text-4xl font-light text-white mb-6">850</div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-orange-400">● Used</span>
                <span className="text-gray-300">850 GB</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">● Total</span>
                <span className="text-gray-300">1 TB</span>
              </div>
            </div>
            <div className="relative mb-2">
              <div className="w-full bg-gray-700/50 rounded-full h-3">
                <div className="bg-gradient-to-r from-orange-500 to-orange-400 h-3 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">0</span>
              <span className="text-orange-400 font-medium">85%</span>
              <span className="text-gray-500">1TB</span>
            </div>
          </div>

          {/* Memory Usage */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700/30 relative">
            {isRefreshing && (
              <div className="absolute inset-0 bg-gray-800/60 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <div className="animate-spin h-6 w-6 border-2 border-green-500 border-t-transparent rounded-full"></div>
              </div>
            )}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-300">Memory</h3>
              <span className="text-xs text-gray-400">GB</span>
            </div>
            <div className="text-4xl font-light text-white mb-6">44</div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-400">● Used</span>
                <span className="text-gray-300">44 GB</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">● Available</span>
                <span className="text-gray-300">36 GB</span>
              </div>
            </div>
            <div className="relative mb-2">
              <div className="w-full bg-gray-700/50 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full" style={{width: '55%'}}></div>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">0</span>
              <span className="text-green-400 font-medium">55%</span>
              <span className="text-gray-500">80GB</span>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700/30 relative" style={{zIndex: 1000}}>
            {isRefreshing && (
              <div className="absolute inset-0 bg-gray-800/60 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <div className="animate-spin h-6 w-6 border-2 border-green-500 border-t-transparent rounded-full"></div>
              </div>
            )}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-300">System Health</h3>
              <span className="text-xs text-gray-400">Status</span>
            </div>
            <div className="text-4xl font-light text-white mb-6">239</div>
            <div className="space-y-3 mb-4">
              <div 
                className="flex items-center justify-between text-sm cursor-pointer hover:bg-gray-700/20 rounded-lg p-2 transition-all relative"
                onMouseEnter={() => setHoveredHealthItem('running')}
                onMouseLeave={() => setHoveredHealthItem(null)}
              >
                <span className="text-green-400">● Running</span>
                <span className="text-gray-300">239</span>
                
                {/* Tooltip for Running */}
                {hoveredHealthItem === 'running' && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 border border-gray-600 rounded-lg p-3 shadow-2xl backdrop-blur-sm w-72" style={{zIndex: 99999}}>
                    <div className="text-sm text-gray-200">
                      <div className="font-semibold text-green-400 mb-2">Running Processes</div>
                      <div className="space-y-1 text-xs">
                        <div>• Video processing services: 45 active</div>
                        <div>• Analytics engines: 12 active</div>
                        <div>• Database connections: 28 active</div>
                        <div>• System services: 154 active</div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-700 text-xs text-gray-400">
                        All processes operating within normal parameters
                      </div>
                    </div>
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 border-l border-t border-gray-600 rotate-45"></div>
                  </div>
                )}
              </div>
              
              <div 
                className="flex items-center justify-between text-sm cursor-pointer hover:bg-gray-700/20 rounded-lg p-2 transition-all relative"
                onMouseEnter={() => setHoveredHealthItem('warnings')}
                onMouseLeave={() => setHoveredHealthItem(null)}
              >
                <span className="text-orange-400">● Warnings</span>
                <span className="text-gray-300">8</span>
                
                {/* Tooltip for Warnings */}
                {hoveredHealthItem === 'warnings' && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 border border-gray-600 rounded-lg p-3 shadow-2xl backdrop-blur-sm w-72" style={{zIndex: 99999}}>
                    <div className="text-sm text-gray-200">
                      <div className="font-semibold text-orange-400 mb-2">Active Warnings</div>
                      <div className="space-y-1 text-xs">
                        <div>• Storage capacity above 80%</div>
                        <div>• 3 cameras with connectivity issues</div>
                        <div>• Analytics queue processing slowly</div>
                        <div>• Scheduled maintenance due in 2 days</div>
                        <div>• 2 minor configuration inconsistencies</div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-700 text-xs text-gray-400">
                        Monitor closely - action may be required soon
                      </div>
                    </div>
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 border-l border-t border-gray-600 rotate-45"></div>
                  </div>
                )}
              </div>
              
              <div 
                className="flex items-center justify-between text-sm cursor-pointer hover:bg-gray-700/20 rounded-lg p-2 transition-all relative"
                onMouseEnter={() => setHoveredHealthItem('errors')}
                onMouseLeave={() => setHoveredHealthItem(null)}
              >
                <span className="text-red-400">● Errors</span>
                <span className="text-gray-300">1</span>
                
                {/* Tooltip for Errors */}
                {hoveredHealthItem === 'errors' && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 border border-gray-600 rounded-lg p-3 shadow-2xl backdrop-blur-sm w-72" style={{zIndex: 99999}}>
                    <div className="text-sm text-gray-200">
                      <div className="font-semibold text-red-400 mb-2">Critical Error</div>
                      <div className="space-y-1 text-xs">
                        <div>• Camera ID: CAM-458 - Connection lost</div>
                        <div className="text-gray-400">Last seen: 2 hours ago</div>
                        <div className="text-gray-400">Location: Building A, Floor 2</div>
                        <div className="text-gray-400">Impact: 1 blind spot in coverage</div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-700 text-xs text-red-300">
                        ⚠️ Immediate attention required
                      </div>
                    </div>
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 border-l border-t border-gray-600 rotate-45"></div>
                  </div>
                )}
              </div>
            </div>
          </div>


        </div>

        {/* Health Check Grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 ${isRefreshing ? 'opacity-80' : ''} transition-opacity`}>
          {/* Security Status */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700/30 relative">
            {isRefreshing && (
              <div className="absolute inset-0 bg-gray-800/60 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <div className="animate-spin h-6 w-6 border-2 border-green-500 border-t-transparent rounded-full"></div>
              </div>
            )}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-300">Security Status</h3>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">🔒 PROTECTED</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">Windows Updates</div>
                  <div className="text-xs text-gray-400 mt-1">
                    <div>Latest: KB5037849 • Aug 13, 2024</div>
                    <div className="text-green-400">Auto-updates enabled • 3 patches this month</div>
                  </div>
                </div>
                <div className="text-green-400 text-lg">✅</div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">Antivirus Protection</div>
                  <div className="text-xs text-gray-400 mt-1">
                    <div>Windows Defender • Definitions: Aug 11, 2024</div>
                    <div className="text-green-400">Real-time active • Last scan: 2 hours ago</div>
                  </div>
                </div>
                <div className="text-green-400 text-lg">✅</div>
              </div>
            </div>
            
            <div className="mt-4 text-xs text-gray-500">
              Automatic security monitoring active • Next scheduled scan: Tomorrow at 2:00 AM
            </div>
          </div>

          {/* System Performance */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-300">System Performance</h3>
              <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">⚠️ MONITOR</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-xl border border-gray-600/30">
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">CPU & Memory</div>
                  <div className="text-xs text-gray-400 mt-1">
                    <div>CPU: 64% • Memory: 44GB/80GB (55%)</div>
                    <div className="text-green-400">Performance optimal • Load balanced</div>
                  </div>
                </div>
                <div className="text-green-400 text-lg">✅</div>
              </div>
              
              <div className={`flex items-center justify-between p-3 rounded-xl border ${
                85 > 80 
                  ? 'bg-orange-500/10 border-orange-500/20' 
                  : 'bg-green-500/10 border-green-500/20'
              }`}>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">Storage Space</div>
                  <div className="text-xs text-gray-400 mt-1">
                    <div>850GB/1TB used (85%) • 174GB free</div>
                    <div className="text-orange-400">Approaching capacity limit</div>
                  </div>
                </div>
                <div className={`text-lg ${85 > 80 ? 'text-orange-400' : 'text-green-400'}`}>
                  {85 > 80 ? '⚠️' : '✅'}
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-xs text-gray-500">
              Real-time monitoring active • Performance metrics updated every 30 seconds
            </div>
          </div>
        </div>


          </>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Performance Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700/30">
                <h3 className="text-lg font-medium text-white mb-4">Performance Trends</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300">CPU Usage (7 days)</span>
                      <span className="text-sm font-medium text-white">Avg: 62%</span>
                    </div>
                    <div className="h-20 bg-gray-700/30 rounded-xl flex items-end space-x-1 p-2">
                      {[45, 52, 48, 65, 70, 58, 65].map((height, i) => (
                        <div key={i} className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t flex-1" style={{height: `${height}%`}} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300">Memory Usage (7 days)</span>
                      <span className="text-sm font-medium text-white">Avg: {metrics.ram}%</span>
                    </div>
                    <div className="h-20 bg-gray-700/30 rounded-xl flex items-end space-x-1 p-2">
                      {[Math.max(30, metrics.ram - 22), Math.max(30, metrics.ram - 17), Math.max(30, metrics.ram - 20), Math.max(30, metrics.ram - 12), Math.max(30, metrics.ram - 7), Math.max(30, metrics.ram - 14), metrics.ram].map((height, i) => (
                        <div key={i} className="bg-gradient-to-t from-green-500 to-green-400 rounded-t flex-1" style={{height: `${height}%`}} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700/30">
                <h3 className="text-lg font-medium text-white mb-4">System Usage Analytics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <div>
                      <div className="text-sm font-medium text-white">Peak Usage Hours</div>
                      <div className="text-xs text-gray-400">9:00 AM - 5:00 PM</div>
                    </div>
                    <div className="text-blue-400 text-2xl">📊</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                    <div>
                      <div className="text-sm font-medium text-white">Efficiency Score</div>
                      <div className="text-xs text-gray-400">Above average (94%)</div>
                    </div>
                    <div className="text-green-400 text-2xl">⚡</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                    <div>
                      <div className="text-sm font-medium text-white">Storage Growth</div>
                      <div className="text-xs text-gray-400">12GB per week</div>
                    </div>
                    <div className="text-orange-400 text-2xl">📈</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cases Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700/30">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Cases Processed</h3>
                <div className="text-3xl font-light text-white mb-2">1,247</div>
                <div className="text-xs text-green-400">↗ +18% this month</div>
              </div>
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700/30">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Detection Accuracy</h3>
                <div className="text-3xl font-light text-white mb-2">97.8%</div>
                <div className="text-xs text-green-400">↗ +2.1% this month</div>
              </div>
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700/30">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Response Time</h3>
                <div className="text-3xl font-light text-white mb-2">2.4s</div>
                <div className="text-xs text-orange-400">↗ +0.3s this month</div>
              </div>
            </div>
          </div>
        )}

        {/* Monitoring Tab */}
        {activeTab === 'monitoring' && (
          <div className="space-y-6">
            {/* Real-time Monitoring */}
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">Real-time System Monitor</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400">Live</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-700/30 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">64%</div>
                  <div className="text-xs text-gray-400">CPU Load</div>
                  <div className="w-full bg-gray-600/50 rounded-full h-1 mt-2">
                    <div className="bg-green-500 h-1 rounded-full" style={{width: '64%'}}></div>
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-700/30 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">55%</div>
                  <div className="text-xs text-gray-400">Memory</div>
                  <div className="w-full bg-gray-600/50 rounded-full h-1 mt-2">
                    <div className="bg-green-500 h-1 rounded-full" style={{width: '55%'}}></div>
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-700/30 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">85%</div>
                  <div className="text-xs text-gray-400">Storage</div>
                  <div className="w-full bg-gray-600/50 rounded-full h-1 mt-2">
                    <div className="bg-orange-500 h-1 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-700/30 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-xs text-gray-400">Network</div>
                  <div className="w-full bg-gray-600/50 rounded-full h-1 mt-2">
                    <div className="bg-purple-500 h-1 rounded-full" style={{width: '98%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Monitoring Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700/30">
                <h3 className="text-lg font-medium text-white mb-4">Active Alerts</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                    <div>
                      <div className="text-sm font-medium text-white">Storage Warning</div>
                      <div className="text-xs text-gray-400">Disk usage above 80%</div>
                    </div>
                    <div className="text-orange-400">⚠️</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <div>
                      <div className="text-sm font-medium text-white">Scheduled Maintenance</div>
                      <div className="text-xs text-gray-400">System restart in 2 hours</div>
                    </div>
                    <div className="text-blue-400">ℹ️</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <div>
                      <div className="text-sm font-medium text-white">Backup Complete</div>
                      <div className="text-xs text-gray-400">Daily backup finished successfully</div>
                    </div>
                    <div className="text-green-400">✅</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700/30">
                <h3 className="text-lg font-medium text-white mb-4">Service Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Video Processing</span>
                    <span className="text-green-400 text-sm">● Online</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Database Service</span>
                    <span className="text-green-400 text-sm">● Online</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Analytics Engine</span>
                    <span className="text-green-400 text-sm">● Online</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Web Interface</span>
                    <span className="text-green-400 text-sm">● Online</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Backup Service</span>
                    <span className="text-orange-400 text-sm">● Maintenance</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Alerts */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700/30 relative">
                {isRefreshing && (
                  <div className="absolute inset-0 bg-gray-800/60 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <div className="animate-spin h-6 w-6 border-2 border-red-500 border-t-transparent rounded-full"></div>
                  </div>
                )}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-300">Alerts</h3>
                  <span className="text-xs text-gray-400">Total</span>
                </div>
                <div className="text-3xl font-light text-white mb-4">8</div>
                <div className="space-y-2">
                  <div className="text-xs text-gray-400">
                    <span className="text-orange-400">● Warnings:</span> Storage capacity
                  </div>
                  <div className="text-xs text-gray-400">
                    <span className="text-yellow-400">● Info:</span> System maintenance
                  </div>
                </div>
              </div>

              {/* Network Status */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700/30 relative">
                {isRefreshing && (
                  <div className="absolute inset-0 bg-gray-800/60 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                  </div>
                )}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-300">Network Status</h3>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">● Online</span>
                </div>
                <div className="text-3xl font-light text-white mb-4">{(metrics.networkDownload / 1000).toFixed(1)} Gbps</div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Upload Speed</span>
                      <span>{metrics.networkUpload} Mbps</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Download Speed</span>
                      <span>{(metrics.networkDownload / 1000).toFixed(1)} Gbps</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-500">
                  Latency: {metrics.latency}ms • Packet Loss: 0%
                </div>
              </div>

              {/* Uptime */}
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700/30 relative">
                {isRefreshing && (
                  <div className="absolute inset-0 bg-gray-800/60 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <div className="animate-spin h-6 w-6 border-2 border-green-500 border-t-transparent rounded-full"></div>
                  </div>
                )}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-300">Uptime</h3>
                  <span className="text-xs text-gray-400">Days</span>
                </div>
                <div className="text-3xl font-light text-white mb-4">127</div>
                <div className="space-y-2">
                  <div className="text-xs text-gray-400">
                    <span className="text-green-400">● Current:</span> 127 days
                  </div>
                  <div className="text-xs text-gray-400">
                    <span className="text-gray-400">● Last restart:</span> Apr 15
                  </div>
                </div>
                <div className="mt-4 h-8">
                  <div className="flex items-end space-x-1 h-full">
                    {[80, 95, 90, 100, 85, 90, 95].map((height, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-t from-green-500 to-green-400 rounded-t flex-1"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" style={{zIndex: 10000}}>
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-600/30 max-w-md w-full" style={{zIndex: 10001}}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Diagnostic Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Time Frame */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Time Frame</label>
                <div className="space-y-2">
                  {[
                    { value: 'last_hour', label: 'Last Hour' },
                    { value: 'last_day', label: 'Last 24 Hours' },
                    { value: 'last_week', label: 'Last Week' },
                    { value: 'custom', label: 'Custom Range' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="timeFrame"
                        value={option.value}
                        checked={diagnosticSettings.timeFrame === option.value}
                        onChange={(e) => setDiagnosticSettings(prev => ({ ...prev, timeFrame: e.target.value }))}
                        className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-300">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Modules */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Modules</label>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Modules' },
                    { value: 'review', label: 'Review' },
                    { value: 'respond', label: 'Respond' },
                    { value: 'research', label: 'Research' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="modules"
                        value={option.value}
                        checked={diagnosticSettings.modules === option.value}
                        onChange={(e) => setDiagnosticSettings(prev => ({ ...prev, modules: e.target.value }))}
                        className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-300">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 mt-8">
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowSettings(false);
                  if (onRunDiagnostic) {
                    console.log('Running diagnostic with settings:', diagnosticSettings);
                    onRunDiagnostic();
                  }
                }}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all"
              >
                Run Diagnostic
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthCheckDashboard;
