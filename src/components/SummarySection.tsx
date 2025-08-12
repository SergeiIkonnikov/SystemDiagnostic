import React, { useState } from 'react';
import { SummaryData } from '../types';

interface SummarySectionProps {
  summary: SummaryData | null;
  results?: any[];
}

const SummarySection: React.FC<SummarySectionProps> = ({ summary, results = [] }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  if (!summary) return null;

  // Determine overall RAG status color for the main indicator
  const getRagStatusColor = (ragStatus?: string) => {
    if (!ragStatus) return 'border-blue-500 bg-blue-500/10';
    if (ragStatus.includes('🔴')) return 'border-red-500 bg-red-500/10';
    if (ragStatus.includes('🟠')) return 'border-orange-500 bg-orange-500/10';
    if (ragStatus.includes('🟡')) return 'border-yellow-500 bg-yellow-500/10';
    if (ragStatus.includes('🟢')) return 'border-green-500 bg-green-500/10';
    return 'border-blue-500 bg-blue-500/10';
  };

  const getRiskScoreColor = (score?: number) => {
    if (!score) return 'text-green-400';
    if (score >= 70) return 'text-red-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getOptimalTooltip = () => {
    const passedResults = results.filter(r => r.status === 'passed');
    const categories = Array.from(new Set(passedResults.map(r => r.category?.replace(/^.+?\d+\.\s*/, '') || 'System')));
    const topCategories = categories.slice(0, 3);
    
    return `✅ ${summary.passed} systems operating normally\n\n🔹 Key healthy areas:\n${topCategories.map(cat => `• ${cat}`).join('\n')}\n\n💡 These systems are performing within expected parameters and require no immediate attention.`;
  };

  const getMonitoringTooltip = () => {
    const warningResults = results.filter(r => r.status === 'warning');
    const topIssues = warningResults.slice(0, 3).map(r => r.check || r.component).filter(Boolean);
    
    return `⚠️ ${summary.warning} systems require monitoring\n\n🔹 Areas needing attention:\n${topIssues.map(issue => `• ${issue}`).join('\n')}\n\n💡 These issues should be addressed during the next maintenance window to prevent escalation.`;
  };

  const getCriticalTooltip = () => {
    if (summary.failed === 0) {
      return `✅ No critical issues detected\n\n🔹 All systems are operational\n💡 Continue routine monitoring and maintenance.`;
    }
    
    const failedResults = results.filter(r => r.status === 'failed');
    const criticalIssues = failedResults.slice(0, 3).map(r => r.check || r.component).filter(Boolean);
    
    return `❌ ${summary.failed} critical system failure(s)\n\n🔹 Immediate action required:\n${criticalIssues.map(issue => `• ${issue}`).join('\n')}\n\n⚡ These issues may impact service availability and require urgent resolution.`;
  };





  return (
    <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-xl border-2 border-blue-500/30 relative" style={{zIndex: 500}}>
      
      <h2 className="text-2xl font-semibold mb-6 flex items-center space-x-3 text-white">
        <span className="text-2xl">📊</span>
        <span>Diagnostic Summary</span>
      </h2>
      
      {/* Main Summary Text - Above RAG blocks */}
      <div className={`${getRagStatusColor(summary.ragStatus)} backdrop-blur-sm p-6 rounded-xl border-l-4 mb-8 shadow-lg`}>
        <div className="text-base leading-relaxed text-white font-semibold">{summary.summaryText}</div>
      </div>
      
      {/* Simplified Status Header - Only show if critical */}
      {summary.ragStatus && summary.ragStatus.includes('🔴') && (
        <div className="bg-gray-700/30 backdrop-blur-sm rounded-xl p-4 mb-6 border-l-4 border-red-500/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-white mb-1">System Status: {summary.ragStatus}</h3>
              <p className="text-sm text-gray-300">
                {summary.actionPriority}
              </p>
            </div>
            <div className="text-right">
              <div className={`text-xl font-medium ${getRiskScoreColor(summary.riskScore)}`}>
                {summary.riskScore || 0}
              </div>
              <div className="text-xs text-gray-400">Risk Score</div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative" style={{zIndex: 1000}}>
        <div 
          className="bg-green-500/15 backdrop-blur-sm rounded-xl p-6 text-center border-2 border-green-500/30 shadow-lg hover:shadow-xl transition-all cursor-pointer relative"
          onMouseEnter={() => setHoveredCard('optimal')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="text-3xl font-medium text-white mb-2">{summary.passed}</div>
          <div className="text-sm font-semibold text-green-400 mb-1">✅ Optimal</div>
          <div className="text-xs text-gray-300">Systems Normal</div>
          
          {/* Custom Tooltip */}
          {hoveredCard === 'optimal' && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 bg-gray-900 border border-gray-600 rounded-lg p-4 shadow-2xl backdrop-blur-sm w-80" style={{zIndex: 99999}}>
              <div className="text-sm text-gray-200 whitespace-pre-line">
                {getOptimalTooltip()}
              </div>
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 border-l border-t border-gray-600 rotate-45"></div>
            </div>
          )}
        </div>
        
        <div 
          className="bg-orange-500/15 backdrop-blur-sm rounded-xl p-6 text-center border-2 border-orange-500/30 shadow-lg hover:shadow-xl transition-all cursor-pointer relative"
          onMouseEnter={() => setHoveredCard('monitoring')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="text-3xl font-medium text-white mb-2">{summary.warning}</div>
          <div className="text-sm font-semibold text-orange-400 mb-1">⚠️ Monitoring</div>
          <div className="text-xs text-gray-300">Attention Needed</div>
          
          {/* Custom Tooltip */}
          {hoveredCard === 'monitoring' && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 bg-gray-900 border border-gray-600 rounded-lg p-4 shadow-2xl backdrop-blur-sm w-80" style={{zIndex: 99999}}>
              <div className="text-sm text-gray-200 whitespace-pre-line">
                {getMonitoringTooltip()}
              </div>
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 border-l border-t border-gray-600 rotate-45"></div>
            </div>
          )}
        </div>
        
        <div 
          className="bg-red-500/15 backdrop-blur-sm rounded-xl p-6 text-center border-2 border-red-500/30 shadow-lg hover:shadow-xl transition-all cursor-pointer relative"
          onMouseEnter={() => setHoveredCard('critical')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="text-3xl font-medium text-white mb-2">{summary.failed}</div>
          <div className="text-sm font-semibold text-red-400 mb-1">❌ Critical</div>
          <div className="text-xs text-gray-300">Action Required</div>
          
          {/* Custom Tooltip */}
          {hoveredCard === 'critical' && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 bg-gray-900 border border-gray-600 rounded-lg p-4 shadow-2xl backdrop-blur-sm w-80" style={{zIndex: 99999}}>
              <div className="text-sm text-gray-200 whitespace-pre-line">
                {getCriticalTooltip()}
              </div>
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 border-l border-t border-gray-600 rotate-45"></div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default SummarySection;
