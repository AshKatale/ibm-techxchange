import React, { useState } from 'react';
import { AlertCircleIcon, AlertTriangleIcon, InfoIcon } from 'lucide-react';
const RiskAnalysis = () => {
  const [selectedRisk, setSelectedRisk] = useState(null);
  const risks = [{
    id: 1,
    title: 'API Authentication Mechanism',
    description: 'Current authentication method requires additional security layers to meet HIPAA compliance standards.',
    severity: 'high',
    regulation: 'HIPAA § 164.312(d)',
    recommendation: 'Implement multi-factor authentication and IP-based access restrictions for all API endpoints that handle PHI data.'
  }, {
    id: 2,
    title: 'Data Retention Policy',
    description: 'User data retention period exceeds the GDPR recommended timeline for non-essential information.',
    severity: 'high',
    regulation: 'GDPR Article 5(1)(e)',
    recommendation: 'Reduce default data retention period to 90 days with optional extended storage requiring explicit user consent.'
  }, {
    id: 3,
    title: 'Audit Trail Documentation',
    description: 'System logging does not capture all required user activities for complete audit trails.',
    severity: 'medium',
    regulation: 'ISO 27001 A.12.4',
    recommendation: 'Extend logging functionality to include all user access events and administrative actions with appropriate timestamps.'
  }, {
    id: 4,
    title: 'Privacy Policy Language',
    description: 'Privacy policy contains technical language that may not be easily understood by average users.',
    severity: 'medium',
    regulation: 'GDPR Article 12',
    recommendation: 'Revise privacy policy with plain language explanations and visual aids to improve comprehension.'
  }, {
    id: 5,
    title: 'Access Control Documentation',
    description: 'Role-based access control system is implemented but lacks detailed documentation.',
    severity: 'medium',
    regulation: 'ISO 27001 A.9.2',
    recommendation: 'Create comprehensive documentation of all user roles, permission levels, and access control procedures.'
  }];
  const getSeverityIcon = severity => {
    switch (severity) {
      case 'critical':
        return <AlertCircleIcon className="h-5 w-5 text-red-500" />;
      case 'high':
        return <AlertTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'medium':
        return <AlertTriangleIcon className="h-5 w-5 text-blue-500" />;
      default:
        return <InfoIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  const getSeverityClass = severity => {
    switch (severity) {
      case 'critical':
        return 'bg-red-900/20 text-red-400 border-red-800';
      case 'high':
        return 'bg-yellow-900/20 text-yellow-400 border-yellow-800';
      case 'medium':
        return 'bg-blue-900/20 text-blue-400 border-blue-800';
      default:
        return 'bg-gray-700/50 text-gray-400 border-gray-600';
    }
  };
  return <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Risk Analysis</h2>
        <div className="text-sm text-gray-400">
          <span className="font-medium text-white">13</span> total issues
        </div>
      </div>
      <div className="space-y-3">
        {risks.map(risk => <div key={risk.id} className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedRisk === risk.id ? getSeverityClass(risk.severity) : 'border-gray-700 hover:border-gray-600'}`} onClick={() => setSelectedRisk(selectedRisk === risk.id ? null : risk.id)}>
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">
                {getSeverityIcon(risk.severity)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{risk.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full uppercase font-bold ${risk.severity === 'critical' ? 'bg-red-900/50 text-red-400' : risk.severity === 'high' ? 'bg-yellow-900/50 text-yellow-400' : 'bg-blue-900/50 text-blue-400'}`}>
                    {risk.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-1">{risk.description}</p>
                {selectedRisk === risk.id && <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="mb-3">
                      <span className="text-xs text-gray-400 block">
                        Regulation Reference
                      </span>
                      <span className="text-sm">{risk.regulation}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block">
                        Recommendation
                      </span>
                      <span className="text-sm">{risk.recommendation}</span>
                    </div>
                  </div>}
              </div>
            </div>
          </div>)}
      </div>
    </div>;
};
export default RiskAnalysis;