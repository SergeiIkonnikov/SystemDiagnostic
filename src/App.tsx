import React, { useState } from 'react';
import { ConfigurationState, DiagnosticResult, ProgressState, SummaryData } from './types';

import { generateRealDiagnosticData } from './data/realDiagnosticData';
import { generateReviewData } from './data/reviewData';
import { generateRespondData } from './data/respondData';
import { generateResearchData } from './data/researchData';
import { generateHealthCheckData, generateDashboardMetrics } from './data/healthCheckData';
import Header from './components/Header';
import Configuration from './components/Configuration';
import HealthCheckDashboard from './components/HealthCheckDashboard';
import ProgressSection from './components/ProgressSection';
import SummarySection from './components/SummarySection';
import ResultsTable from './components/ResultsTable';
import Modal from './components/Modal';

type AppStep = 'dashboard' | 'configuration' | 'report';

function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>('dashboard');
  const [progress, setProgress] = useState<ProgressState>({
    isRunning: false,
    currentStep: '',
    progress: 0
  });
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [summary, setSummary] = useState<SummaryData | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [lastHealthCheckUpdate, setLastHealthCheckUpdate] = useState<string>(
    new Date().toLocaleString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [healthChecks, setHealthChecks] = useState(() => generateHealthCheckData());
  const [dashboardMetrics, setDashboardMetrics] = useState(() => generateDashboardMetrics());
  const [activeReportTab, setActiveReportTab] = useState<'health-check' | 'review' | 'respond' | 'research'>('health-check');

  const diagnosticSteps = [
    'US15: Verifying case requests...',
    'US16: Analyzing fetching service logs...',
    'US17: Checking FetchTasks database...',
    'US18: Scanning for decoder errors...',
    'US19: Analyzing log timeouts...',
    'US20: Validating hostname resolution...',
    'US21: Monitoring retry frequencies...',
    'US22: Comparing fetching with VIT...',
    'US23: Checking fetching service load...',
    'US24: Validating fetch file sizes...',
    'US25: Verifying camera codecs...',
    'US26: Checking processing service load...',
    'US27: Monitoring processing retries...',
    'US28: Validating processing task correctness...',
    'US29: Analyzing processing error patterns...',
    'US30: Checking for metadata artifacts...',
    'US31: Verifying rendering service health...',
    'US32: Checking rendered clip sizes...',
    'US33: Analyzing frame integrity...',
    'US34: Validating storage permissions...',
    'Generating comprehensive report...'
  ];

  const calculateSummary = (diagnosticResults: DiagnosticResult[]): SummaryData => {
    const passed = diagnosticResults.filter(r => r.status === 'passed').length;
    const warning = diagnosticResults.filter(r => r.status === 'warning').length;
    const failed = diagnosticResults.filter(r => r.status === 'failed').length;

    // Enhanced RAG Assessment with Business Impact
    const criticalSystems = ['CPU / RAM of Key Processes', 'Storage - Disk space', 'Network Socket Check', 'Camera GUID Validation'];
    const criticalFailures = diagnosticResults.filter(r => 
      r.status === 'failed' && criticalSystems.includes(r.component || r.check || '')
    );
    
    const riskScore = calculateRiskScore(diagnosticResults);
    const businessImpact = assessBusinessImpact(failed, warning, criticalFailures.length);
    
    let summaryText = '';
    let ragStatus = '';
    let actionPriority = '';
    
    if (failed > 0) {
      ragStatus = criticalFailures.length > 0 ? '🔴 Critical Issues' : '🟠 Issues Detected';
      actionPriority = criticalFailures.length > 0 ? 'Action needed' : 'Review recommended';
      
      if (criticalFailures.length > 0) {
        const criticalItems = criticalFailures.map(r => r.component || r.check || 'Unknown Component').filter(item => item !== 'Unknown Component').join(', ');
        summaryText = `${criticalFailures.length} critical system issue(s) detected: ${criticalItems || 'Critical systems'}. Service may be affected. Risk Score: ${riskScore}/100`;
      } else {
        const failedItems = diagnosticResults.filter(r => r.status === 'failed').map(r => r.component || r.check || 'Unknown Component').filter(item => item !== 'Unknown Component').slice(0, 3).join(', ');
        const additionalFailed = failed > 3 ? ` and ${failed - 3} more` : '';
        summaryText = `${failed} system issue(s) require attention: ${failedItems || 'Multiple systems'}${additionalFailed}. ${warning > 0 ? `${warning} additional warning(s) also noted. ` : ''}Risk Score: ${riskScore}/100`;
      }
    } else if (warning > 0) {
      ragStatus = warning >= 3 ? '🟡 Multiple Warnings' : '🟡 Minor Issues';
      actionPriority = warning >= 3 ? 'Review recommended' : 'Monitor closely';
      
      const warningItems = diagnosticResults.filter(r => r.status === 'warning').map(r => r.component || r.check || 'Unknown Component').filter(item => item !== 'Unknown Component').slice(0, 3).join(', ');
      summaryText = `${warning} system warning(s) identified: ${warningItems || 'Multiple systems'}${warning > 3 ? ` and ${warning - 3} more` : ''}. ${actionPriority} to prevent issues. Risk Score: ${riskScore}/100`;
    } else {
      ragStatus = '🟢 All Systems Normal';
      actionPriority = 'No action needed';
      summaryText = `All ${passed} system checks passed successfully. Infrastructure operating normally. Continue routine monitoring. Risk Score: ${riskScore}/100`;
    }

    return { 
      passed, 
      warning, 
      failed, 
      summaryText, 
      ragStatus, 
      riskScore, 
      businessImpact, 
      actionPriority,
      criticalFailures: criticalFailures.length 
    };
  };

  const calculateRiskScore = (diagnosticResults: DiagnosticResult[]): number => {
    let score = 0;
    
    diagnosticResults.forEach(result => {
      const component = result.component || result.check || '';
      
      // Critical system weights
      const isCritical = ['CPU / RAM of Key Processes', 'Storage - Disk space', 'Network Socket Check', 'Camera GUID Validation'].includes(component);
      const isInfrastructure = component.toLowerCase().includes('cpu') || component.toLowerCase().includes('storage') || component.toLowerCase().includes('network');
      
      if (result.status === 'failed') {
        score += isCritical ? 25 : isInfrastructure ? 15 : 10;
      } else if (result.status === 'warning') {
        score += isCritical ? 10 : isInfrastructure ? 6 : 3;
      }
    });
    
    return Math.min(score, 100); // Cap at 100
  };

  const assessBusinessImpact = (failed: number, warning: number, criticalFailures: number): string => {
    if (criticalFailures > 0) {
      return 'HIGH - Service interruption likely, immediate business impact expected';
    } else if (failed > 2) {
      return 'MEDIUM - Potential service degradation, business operations may be affected';
    } else if (failed > 0 || warning > 4) {
      return 'LOW-MEDIUM - Reduced performance possible, monitor closely';
    } else if (warning > 0) {
      return 'LOW - Minimal impact, preventive maintenance recommended';
    } else {
      return 'MINIMAL - Normal operations, no immediate concerns';
    }
  };

  const runDiagnostic = async (configuration: ConfigurationState) => {
    setCurrentStep('report');
    setProgress({ isRunning: true, currentStep: 'Initializing diagnostic checks...', progress: 0 });
    setResults([]);
    setSummary(null);

    // Simulate progress through diagnostic steps
    for (let i = 0; i < diagnosticSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 150));
      setProgress({
        isRunning: true,
        currentStep: diagnosticSteps[i],
        progress: ((i + 1) / diagnosticSteps.length) * 100
      });
    }

    // Generate results after progress completes
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate real diagnostic data
    const realCategories = generateRealDiagnosticData();
    
    // Flatten all checks for results table
    const allChecks = realCategories.flatMap(category => category.checks);
    const summaryData = calculateSummary(allChecks);
    
    setProgress({ isRunning: false, currentStep: '', progress: 100 });
    setResults(allChecks);
    setSummary(summaryData);
  };



  const handleBackToDashboard = () => {
    setCurrentStep('dashboard');
    setProgress({ isRunning: false, currentStep: '', progress: 0 });
    setResults([]);
    setSummary(null);
  };

  const handleStartDiagnostic = () => {
    // Create default configuration
    const defaultConfig: ConfigurationState = {
      productType: 'all',
      logDuration: 'one_hour',
      fromDate: '',
      toDate: '',
      savePath: 'C:\\Users\\administrator.BC\\Desktop'
    };
    
    // Start diagnostic immediately with default config
    runDiagnostic(defaultConfig);
  };

  const handleRefreshHealthCheck = async () => {
    if (isRefreshing) return; // Prevent multiple simultaneous refreshes
    
    setIsRefreshing(true);
    
    try {
      // Simulate checking different components with delays
      await new Promise(resolve => setTimeout(resolve, 800)); // CPU/RAM check
      await new Promise(resolve => setTimeout(resolve, 600)); // Storage check  
      await new Promise(resolve => setTimeout(resolve, 500)); // Windows updates
      await new Promise(resolve => setTimeout(resolve, 400)); // Antivirus check
      await new Promise(resolve => setTimeout(resolve, 300)); // Network check
      
      // Generate fresh data for all components
      const newHealthChecks = generateHealthCheckData();
      const newDashboardMetrics = generateDashboardMetrics();
      
      // Update all state with fresh data
      setHealthChecks(newHealthChecks);
      setDashboardMetrics(newDashboardMetrics);
      setLastHealthCheckUpdate(newDashboardMetrics.timestamp);
      
      console.log('Full dashboard refreshed at:', new Date().toISOString());
      console.log('New metrics:', newDashboardMetrics);
    } catch (error) {
      console.error('Health check refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleViewGuidance = (guidance: string) => {
    setModalContent(guidance);
    setModalOpen(true);
  };

  const handleRefreshCheck = async (checkId: string) => {
    // Simulate refresh by briefly showing loading state
    // In a real app, this would make an API call to refresh the specific check
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, we could update the specific check's lastChecked time
    console.log(`Refreshing check: ${checkId}`);
    
    // In a real implementation, you might:
    // 1. Make API call to refresh the specific check
    // 2. Update the results state with new data
    // 3. Recalculate summary if needed
  };

  const handleExportSummary = (format: string) => {
    // Enhanced export functionality with more detailed messaging
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const filename = `diagnostic-summary-${timestamp}.${format === 'zip' ? 'zip' : format}`;
    
    let message = `Diagnostic Summary export as ${format.toUpperCase()} has been initiated.\n\nFile: ${filename}\n`;
    
    if (format === 'zip') {
      message += '\n📦 ZIP Package includes:\n• Complete diagnostic summary\n• Detailed results table\n• System logs and metadata\n• Guidance documentation';
    } else if (format === 'json') {
      message += '\n📄 JSON export includes structured data for programmatic analysis.';
    } else if (format === 'csv') {
      message += '\n📊 CSV export includes tabular data suitable for spreadsheet analysis.';
    }
    
    alert(message);
    console.log(`Export initiated: ${format.toUpperCase()} - ${filename}`);
  };

  const handleGenerateShareableLink = () => {
    // Generate a unique report ID based on timestamp and summary data
    const reportId = `DR-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const shareableUrl = `https://reports.briefcam.com/diagnostic/${reportId}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareableUrl).then(() => {
      alert(`📋 Shareable report link generated and copied to clipboard!\n\nLink: ${shareableUrl}\n\n🔗 This link provides read-only access to the diagnostic report.\n📧 Share with colleagues for collaborative review.\n⏰ Link expires in 30 days.`);
    }).catch(() => {
      // Fallback if clipboard access fails
      alert(`📋 Shareable report link generated!\n\nLink: ${shareableUrl}\n\n🔗 This link provides read-only access to the diagnostic report.\n📧 Share with colleagues for collaborative review.\n⏰ Link expires in 30 days.\n\nPlease copy the link manually.`);
    });
    
    console.log(`Generated shareable report link: ${shareableUrl}`);
  };

  return (
    <>
      {currentStep === 'dashboard' ? (
        <HealthCheckDashboard 
          healthChecks={healthChecks}
          dashboardMetrics={dashboardMetrics}
          userName="Ann"
          onRunDiagnostic={handleStartDiagnostic}
          onRefreshHealthCheck={handleRefreshHealthCheck}
          lastCheckTime={lastHealthCheckUpdate}
          isRefreshing={isRefreshing}
        />
      ) : (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 min-h-screen flex flex-col items-center justify-center p-6">
          <div className="container max-w-7xl mx-auto bg-gray-800/40 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-700/30">
            <Header isProcessing={progress.isRunning} onBackToDashboard={handleBackToDashboard} />
            
            <div className="main-content p-6">
              {currentStep === 'configuration' ? (
                <Configuration onNext={runDiagnostic} onBack={handleBackToDashboard} />
              ) : (
                <>
                  <ProgressSection progress={progress} />
                  
                  {/* Export Actions Section - Above Summary */}
                  {!progress.isRunning && summary && (
                    <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-xl border-2 border-blue-500/30">
                      <div className="flex items-center space-x-4">
                        {/* Report Link */}
                        <button
                          onClick={handleGenerateShareableLink}
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium underline decoration-blue-400/50 hover:decoration-blue-300 transition-colors bg-transparent border-0 cursor-pointer"
                        >
                          Generate Shareable Report Link →
                        </button>
                        
                        {/* Export Buttons */}
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400 text-sm">Export:</span>
                          <button 
                            onClick={() => handleExportSummary('csv')}
                            className="px-3 py-1.5 text-xs font-medium bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg border border-gray-600/30 hover:border-gray-500/50 transition-all"
                          >
                            CSV
                          </button>
                          <button 
                            onClick={() => handleExportSummary('json')}
                            className="px-3 py-1.5 text-xs font-medium bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg border border-gray-600/30 hover:border-gray-500/50 transition-all"
                          >
                            JSON
                          </button>
                          <button 
                            onClick={() => handleExportSummary('zip')}
                            className="px-3 py-1.5 text-xs font-medium bg-green-700/50 hover:bg-green-600/50 text-green-300 hover:text-green-200 rounded-lg border border-green-600/30 hover:border-green-500/50 transition-all"
                          >
                            ZIP
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <SummarySection summary={summary} results={results} />
                  
                  {/* Report Tabs - Only show when processing is complete */}
                  {!progress.isRunning && results.length > 0 && (
                  <div id="detailed-results" className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-600/30 mb-6">
                    <div className="flex space-x-1 bg-gray-700/40 backdrop-blur-sm p-1 rounded-xl mb-6">
                      {[
                        { id: 'health-check', label: 'Health Check' },
                        { id: 'review', label: 'Review' },
                        { id: 'respond', label: 'Respond' },
                        { id: 'research', label: 'Research' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveReportTab(tab.id as any)}
                          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            activeReportTab === tab.id
                              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-600/40'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {activeReportTab === 'health-check' && (
                      <ResultsTable 
                        results={results}
                        onViewGuidance={handleViewGuidance}
                        onRefreshCheck={handleRefreshCheck}
                      />
                    )}

                    {activeReportTab === 'review' && (
                      <ResultsTable 
                        results={generateReviewData()}
                        onViewGuidance={handleViewGuidance}
                        onRefreshCheck={handleRefreshCheck}
                      />
                    )}

                    {activeReportTab === 'respond' && (
                      <ResultsTable 
                        results={generateRespondData()}
                        onViewGuidance={handleViewGuidance}
                        onRefreshCheck={handleRefreshCheck}
                      />
                    )}

                    {activeReportTab === 'research' && (
                      <ResultsTable 
                        results={generateResearchData()}
                        onViewGuidance={handleViewGuidance}
                        onRefreshCheck={handleRefreshCheck}
                      />
                    )}
                  </div>
                  )}
                </>
              )}
            </div>
          </div>

          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Log File Guidance"
          >
            <p>{modalContent}</p>
          </Modal>
        </div>
      )}
    </>
  );
}

export default App;