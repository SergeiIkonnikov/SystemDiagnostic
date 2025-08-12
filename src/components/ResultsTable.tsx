import React, { useState, useMemo } from 'react';
import { DiagnosticResult } from '../types';

interface ResultsTableProps {
  results: DiagnosticResult[];
  onViewGuidance: (guidance: string) => void;
  onRefreshCheck?: (checkId: string) => void;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results, onViewGuidance, onRefreshCheck }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const [refreshingChecks, setRefreshingChecks] = useState<Set<string>>(new Set());

  const filteredResults = useMemo(() => {
    return results.filter(result => {
      const matchesSearch = searchTerm === '' || 
        Object.values(result).some(value => 
          value.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      const matchesStatus = statusFilter === '' || result.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [results, searchTerm, statusFilter]);

  // Group results by category
  const groupedResults = useMemo(() => {
    const grouped: { [key: string]: DiagnosticResult[] } = {};
    filteredResults.forEach(result => {
      const category = result.category || 'Other';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(result);
    });
    return grouped;
  }, [filteredResults]);

  // Check if we should show grouped display (only if there are meaningful categories)
  const shouldShowGrouped = useMemo(() => {
    const categories = Object.keys(groupedResults);
    return categories.length > 1 || (categories.length === 1 && categories[0] !== 'Other');
  }, [groupedResults]);

  const toggleSection = (category: string) => {
    setCollapsedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category); // Remove from set to collapse
      } else {
        newSet.add(category); // Add to set to expand
      }
      return newSet;
    });
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'passed': return '✅';
      case 'warning': return '⚠️';
      case 'failed': return '❌';
      default: return '';
    }
  };

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'passed': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return '';
    }
  };

  const handleExport = (format: string) => {
    alert(`Report export as ${format.toUpperCase()} has been initiated.${format === 'zip' ? ' This package includes the full report and consolidated logs for deep-dive analysis.' : ''}`);
  };

  const handleRefreshCheck = async (checkId: string) => {
    if (!onRefreshCheck) return;
    
    setRefreshingChecks(prev => new Set(Array.from(prev).concat(checkId)));
    
    try {
      await onRefreshCheck(checkId);
    } finally {
      // Remove from refreshing state after a short delay to show feedback
      setTimeout(() => {
        setRefreshingChecks(prev => {
          const newSet = new Set(prev);
          newSet.delete(checkId);
          return newSet;
        });
      }, 1000);
    }
  };

  if (results.length === 0) return null;

  return (
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700/30">
      <h2 className="text-xl font-medium mb-6 flex items-center space-x-2 text-white">
        🔍 Detailed Diagnostic Results
      </h2>
      
      <div className="controls flex flex-wrap gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search results..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-3 border border-gray-600/30 rounded-xl bg-gray-700/30 backdrop-blur-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-3 border border-gray-600/30 rounded-xl bg-gray-700/30 backdrop-blur-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
        >
          <option value="">All Statuses</option>
          <option value="passed">Passed</option>
          <option value="warning">Warning</option>
          <option value="failed">Failed</option>
        </select>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400 text-sm">Export:</span>
          <button 
            onClick={() => handleExport('csv')}
            className="px-3 py-1.5 text-xs font-medium bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg border border-gray-600/30 hover:border-gray-500/50 transition-all"
          >
            CSV
          </button>
          <button 
            onClick={() => handleExport('json')}
            className="px-3 py-1.5 text-xs font-medium bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg border border-gray-600/30 hover:border-gray-500/50 transition-all"
          >
            JSON
          </button>
          <button 
            onClick={() => handleExport('zip')}
            className="px-3 py-1.5 text-xs font-medium bg-green-700/50 hover:bg-green-600/50 text-green-300 hover:text-green-200 rounded-lg border border-green-600/30 hover:border-green-500/50 transition-all"
          >
            ZIP
          </button>
        </div>
      </div>

      <div className="table-container max-h-[600px] overflow-y-auto border border-gray-700/30 rounded-xl bg-gray-900/30 backdrop-blur-sm">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 bg-gray-800/60 backdrop-blur-sm">
            <tr>
              <th className="p-4 text-left font-medium border-b border-gray-600/30 text-gray-300">Status</th>
              <th className="p-4 text-left font-medium border-b border-gray-600/30 text-gray-300">Component</th>
              <th className="p-4 text-left font-medium border-b border-gray-600/30 text-gray-300">Purpose</th>
              <th className="p-4 text-left font-medium border-b border-gray-600/30 text-gray-300">Results</th>
              <th className="p-4 text-left font-medium border-b border-gray-600/30 text-gray-300">Suggestion</th>
              <th className="p-4 text-left font-medium border-b border-gray-600/30 text-gray-300">Source</th>
              <th className="p-4 text-left font-medium border-b border-gray-600/30 text-gray-300">Success Criteria</th>
              <th className="p-4 text-left font-medium border-b border-gray-600/30 text-gray-300">Last Checked</th>
              <th className="p-4 text-left font-medium border-b border-gray-600/30 text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shouldShowGrouped ? (
              // Grouped display for Health Check tab
              Object.entries(groupedResults).map(([category, categoryResults]) => {
                const isCollapsed = !collapsedSections.has(category); // Inverted logic - not in set means collapsed
                const passedCount = categoryResults.filter(r => r.status === 'passed').length;
                const warningCount = categoryResults.filter(r => r.status === 'warning').length;
                const failedCount = categoryResults.filter(r => r.status === 'failed').length;
                
                return (
                  <React.Fragment key={category}>
                    {/* Category Header */}
                    <tr className="bg-gray-700/40 backdrop-blur-sm cursor-pointer hover:bg-gray-600/40 transition-colors">
                      <td 
                        colSpan={9} 
                        className="p-4 border-b border-gray-600/30"
                        onClick={() => toggleSection(category)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <svg 
                              className={`w-4 h-4 text-blue-400 transition-transform duration-200 ${isCollapsed ? '' : 'rotate-90'}`}
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="font-semibold text-blue-400 text-lg">
                              {category.replace(/^.+?\d+\.\s*/, '')}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="text-green-400">✅ {passedCount}</span>
                            <span className="text-yellow-400">⚠️ {warningCount}</span>
                            <span className="text-red-400">❌ {failedCount}</span>
                            <span className="text-gray-400">Total: {categoryResults.length}</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                    {/* Category Results */}
                    {!isCollapsed && categoryResults.map((result, index) => {
                      const rowId = result.id || `${category}-${index}`;
                      const isRefreshing = refreshingChecks.has(rowId);
                      
                      return (
                    <tr key={`${category}-${index}`} className={`border-b border-gray-700/30 transition-all duration-300 ${isRefreshing ? 'opacity-50 bg-gray-800/40' : 'hover:bg-gray-700/20'}`}>
                      <td className={`p-4 font-medium ${isRefreshing ? 'text-gray-500' : getStatusClass(result.status)}`}>
                        {isRefreshing ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gray-600 rounded animate-pulse"></div>
                            <div className="w-16 h-4 bg-gray-600 rounded animate-pulse"></div>
                          </div>
                        ) : (
                          <>
                            {getStatusIcon(result.status)} {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                          </>
                        )}
                      </td>
                      <td className={`p-4 font-medium ${isRefreshing ? 'text-gray-500' : 'text-white'}`}>
                        {isRefreshing ? (
                          <div className="w-32 h-4 bg-gray-600 rounded animate-pulse"></div>
                        ) : (
                          result.check || result.component
                        )}
                      </td>
                      <td className={`p-4 ${isRefreshing ? 'text-gray-500' : 'text-gray-300'}`}>
                        {isRefreshing ? (
                          <div className="w-40 h-4 bg-gray-600 rounded animate-pulse"></div>
                        ) : (
                          result.purpose
                        )}
                      </td>
                      <td className={`p-4 ${isRefreshing ? 'text-gray-500' : 'text-gray-300'}`}>
                        {isRefreshing ? (
                          <div className="w-36 h-4 bg-gray-600 rounded animate-pulse"></div>
                        ) : (
                          result.output || result.results
                        )}
                      </td>
                      <td className={`p-4 ${isRefreshing ? 'text-gray-500' : 'text-gray-300'}`}>
                        {isRefreshing ? (
                          <div className="w-28 h-4 bg-gray-600 rounded animate-pulse"></div>
                        ) : (
                          result.recommendation || result.suggestion
                        )}
                      </td>
                      <td className={`p-4 ${isRefreshing ? 'text-gray-500' : 'text-gray-300'}`}>
                        {isRefreshing ? (
                          <div className="w-16 h-4 bg-gray-600 rounded animate-pulse"></div>
                        ) : (
                          result.source || '—'
                        )}
                      </td>
                      <td className={`p-4 ${isRefreshing ? 'text-gray-500' : 'text-gray-300'}`}>
                        {isRefreshing ? (
                          <div className="w-16 h-4 bg-gray-600 rounded animate-pulse"></div>
                        ) : (
                          result.criteria || '—'
                        )}
                      </td>
                      <td className={`p-4 ${isRefreshing ? 'text-gray-500' : 'text-gray-300'}`}>
                        {isRefreshing ? (
                          <div className="w-20 h-4 bg-gray-600 rounded animate-pulse"></div>
                        ) : (
                          result.lastChecked
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onViewGuidance(result.guidance || result.logGuidance || 'No guidance available for this check.')}
                            disabled={isRefreshing}
                            className={`bg-gray-600/60 backdrop-blur-sm hover:bg-gray-500/60 text-white font-medium py-2 px-4 rounded-lg text-sm transition-all border border-gray-500/30 ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            Guidance
                          </button>
                          {onRefreshCheck && (
                            <button
                              onClick={() => handleRefreshCheck(rowId)}
                              disabled={isRefreshing}
                              className="p-2 border border-blue-500/30 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 hover:border-blue-500/50 transition-all backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Check again"
                            >
                              {isRefreshing ? (
                                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                              )}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                      );
                    })}
                  </React.Fragment>
                );
              })
            ) : (
              // Flat display for Review, Respond, Research tabs
              filteredResults.map((result, index) => {
                const rowId = result.id || `flat-${index}`;
                const isRefreshing = refreshingChecks.has(rowId);
                
                return (
                <tr key={index} className={`border-b border-gray-700/30 transition-all duration-300 ${isRefreshing ? 'opacity-50 bg-gray-800/40' : 'hover:bg-gray-700/20'}`}>
                  <td className={`p-4 font-medium ${isRefreshing ? 'text-gray-500' : getStatusClass(result.status)}`}>
                    {isRefreshing ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-600 rounded animate-pulse"></div>
                        <div className="w-16 h-4 bg-gray-600 rounded animate-pulse"></div>
                      </div>
                    ) : (
                      <>
                        {getStatusIcon(result.status)} {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                      </>
                    )}
                  </td>
                  <td className={`p-4 font-medium ${isRefreshing ? 'text-gray-500' : 'text-white'}`}>
                    {isRefreshing ? (
                      <div className="w-32 h-4 bg-gray-600 rounded animate-pulse"></div>
                    ) : (
                      result.check || result.component
                    )}
                  </td>
                  <td className={`p-4 ${isRefreshing ? 'text-gray-500' : 'text-gray-300'}`}>
                    {isRefreshing ? (
                      <div className="w-40 h-4 bg-gray-600 rounded animate-pulse"></div>
                    ) : (
                      result.purpose
                    )}
                  </td>
                  <td className={`p-4 ${isRefreshing ? 'text-gray-500' : 'text-gray-300'}`}>
                    {isRefreshing ? (
                      <div className="w-36 h-4 bg-gray-600 rounded animate-pulse"></div>
                    ) : (
                      result.output || result.results
                    )}
                  </td>
                  <td className={`p-4 ${isRefreshing ? 'text-gray-500' : 'text-gray-300'}`}>
                    {isRefreshing ? (
                      <div className="w-28 h-4 bg-gray-600 rounded animate-pulse"></div>
                    ) : (
                      result.recommendation || result.suggestion
                    )}
                  </td>
                  <td className={`p-4 ${isRefreshing ? 'text-gray-500' : 'text-gray-300'}`}>
                    {isRefreshing ? (
                      <div className="w-16 h-4 bg-gray-600 rounded animate-pulse"></div>
                    ) : (
                      result.source || '—'
                    )}
                  </td>
                  <td className={`p-4 ${isRefreshing ? 'text-gray-500' : 'text-gray-300'}`}>
                    {isRefreshing ? (
                      <div className="w-16 h-4 bg-gray-600 rounded animate-pulse"></div>
                    ) : (
                      result.criteria || '—'
                    )}
                  </td>
                  <td className={`p-4 ${isRefreshing ? 'text-gray-500' : 'text-gray-300'}`}>
                    {isRefreshing ? (
                      <div className="w-20 h-4 bg-gray-600 rounded animate-pulse"></div>
                    ) : (
                      result.lastChecked
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onViewGuidance(result.guidance || result.logGuidance || 'No guidance available for this check.')}
                        disabled={isRefreshing}
                        className={`bg-gray-600/60 backdrop-blur-sm hover:bg-gray-500/60 text-white font-medium py-2 px-4 rounded-lg text-sm transition-all border border-gray-500/30 ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        Guidance
                      </button>
                      {onRefreshCheck && (
                        <button
                          onClick={() => handleRefreshCheck(rowId)}
                          disabled={isRefreshing}
                          className="p-2 border border-blue-500/30 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 hover:border-blue-500/50 transition-all backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Check again"
                        >
                          {isRefreshing ? (
                            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          )}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
