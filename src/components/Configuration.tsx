import React, { useState, useEffect } from 'react';
import { ConfigurationState } from '../types';
import Breadcrumb from './Breadcrumb';

interface ConfigurationProps {
  onNext: (config: ConfigurationState) => void;
  onBack?: () => void;
}

const Configuration: React.FC<ConfigurationProps> = ({ onNext, onBack }) => {
  const [config, setConfig] = useState<ConfigurationState>({
    productType: 'review',
    logDuration: 'one_hour',
    fromDate: '',
    toDate: '',
    savePath: 'C:\\Users\\administrator.BC\\Desktop'
  });

  const [errors, setErrors] = useState({
    startTime: false,
    endTime: false
  });

  useEffect(() => {
    // Set default date range
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
    const formatDateTime = (date: Date) => {
      const pad = (num: number) => num.toString().padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };

    setConfig(prev => ({
      ...prev,
      fromDate: formatDateTime(oneHourAgo),
      toDate: formatDateTime(now)
    }));
  }, []);

  const validateConfiguration = (): boolean => {
    const newErrors = { startTime: false, endTime: false };
    let isValid = true;

    if (config.logDuration === 'custom') {
      if (!config.fromDate) {
        newErrors.startTime = true;
        isValid = false;
      }
      if (!config.toDate) {
        newErrors.endTime = true;
        isValid = false;
      }

      if (isValid && config.fromDate && config.toDate) {
        const fromDate = new Date(config.fromDate);
        const toDate = new Date(config.toDate);
        
        if (fromDate >= toDate) {
          alert('Start time must be earlier than the end time.');
          isValid = false;
        }
        
        if (toDate > new Date()) {
          alert('End date cannot be in the future.');
          isValid = false;
        }

        const diffDays = (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24);
        if (diffDays > 30) {
          if (!window.confirm('Selecting a timeframe greater than 30 days may result in a very long report generation time. Are you sure you want to continue?')) {
            isValid = false;
          }
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateConfiguration()) {
      onNext(config);
    }
  };

  return (
    <div id="step1">
      <Breadcrumb currentStep="Configuration" onBack={onBack} />

      {/* Product Type Selection */}
      <div className="config-section bg-gray-800 rounded-lg p-6 mb-6 shadow-lg border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2 text-gray-100">
          ⚙️ Briefcam product name to analyze
        </h2>
        <div className="flex justify-around mb-6">
          {[
            { value: 'review', label: 'Review' },
            { value: 'response', label: 'Response' },
            { value: 'research', label: 'Research' },
            { value: 'all', label: 'All' }
          ].map((option) => (
            <label key={option.value} className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-500 rounded-full focus:ring-blue-500"
                name="productType"
                value={option.value}
                checked={config.productType === option.value}
                onChange={(e) => setConfig(prev => ({ ...prev, productType: e.target.value as any }))}
              />
              <span className="ml-2 text-gray-300">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Log Duration Section */}
      <div className="config-section bg-gray-800 rounded-lg p-6 mb-6 shadow-lg border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2 text-gray-100">
          ⏰ Log Duration for Diagnostic
        </h2>
        <div className="help-text text-sm text-gray-400 mt-4 p-3 bg-gray-700 rounded-md border-l-4 border-blue-500 mb-4">
          📍 To help us pinpoint the issue more effectively, please try to provide an exact time or your best estimate of when this occurred. A smaller timeframe will lead to a more accurate diagnostic analysis.
        </div>
        <div className="ml-6 pl-4 border-l border-gray-700">
          <div className="flex flex-wrap gap-4 mb-4">
            {[
              { value: 'one_hour', label: 'One Hour' },
              { value: 'one_day', label: 'One Day' },
              { value: 'one_week', label: 'One Week' },
              { value: 'custom', label: 'Custom' }
            ].map((option) => (
              <label key={option.value} className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-500 rounded-full focus:ring-blue-500"
                  name="logDuration"
                  value={option.value}
                  checked={config.logDuration === option.value}
                  onChange={(e) => setConfig(prev => ({ ...prev, logDuration: e.target.value as any }))}
                />
                <span className="ml-2 text-gray-300">{option.label}</span>
              </label>
            ))}
          </div>
          
          {config.logDuration === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fromDate" className="block text-gray-400 text-sm font-medium mb-2">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  id="fromDate"
                  value={config.fromDate}
                  onChange={(e) => setConfig(prev => ({ ...prev, fromDate: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.startTime && (
                  <p className="text-red-400 text-xs mt-1">Start time is required.</p>
                )}
              </div>
              <div>
                <label htmlFor="toDate" className="block text-gray-400 text-sm font-medium mb-2">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  id="toDate"
                  value={config.toDate}
                  onChange={(e) => setConfig(prev => ({ ...prev, toDate: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.endTime && (
                  <p className="text-red-400 text-xs mt-1">End time is required.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Directory */}
      <div className="config-section bg-gray-800 rounded-lg p-6 mb-6 shadow-lg border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2 text-gray-100">
          💾 Save Report To
        </h2>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={config.savePath}
            onChange={(e) => setConfig(prev => ({ ...prev, savePath: e.target.value }))}
            placeholder="C:\\Users\\administrator.BC\\Desktop"
            className="flex-grow bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
            Browse
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="run-button bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 text-lg font-bold rounded-lg cursor-pointer transition-all duration-300 shadow-lg transform hover:scale-105"
        >
          Run Diagnostic Report ➔
        </button>
      </div>
    </div>
  );
};

export default Configuration;
