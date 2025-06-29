import React, { useState } from 'react';
import { AlertTriangleIcon, AlertCircleIcon, InfoIcon, XCircleIcon, ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from 'recharts';
const RiskTab = () => {
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const risks = [{
    id: 1,
    title: 'Insufficient Data Encryption',
    description: 'Customer data stored in the database is not encrypted according to GDPR Article 32 requirements.',
    severity: 'critical',
    priority: 'high',
    regulation: 'GDPR',
    section: 'Article 32',
    impact: 'Potential data breach vulnerability and regulatory non-compliance',
    suggestion: 'Implement AES-256 encryption for all PII data fields in the database. Update the data access layer to handle encryption/decryption transparently. Perform security testing to verify implementation.'
  }, {
    id: 2,
    title: 'Missing Authentication Controls',
    description: 'API endpoints lack proper authentication mechanisms required by PCI DSS.',
    severity: 'critical',
    priority: 'high',
    regulation: 'PCI DSS',
    section: 'Requirement 8.2',
    impact: 'Unauthorized access to payment processing systems',
    suggestion: 'Implement OAuth 2.0 with MFA for all payment-related API endpoints. Add rate limiting to prevent brute force attacks. Conduct penetration testing after implementation.'
  }, {
    id: 3,
    title: 'Inadequate Audit Logging',
    description: "System activity logs don't capture user actions as required by SOC 2 controls.",
    severity: 'high',
    priority: 'medium',
    regulation: 'SOC 2',
    section: 'Common Criteria 7.2',
    impact: 'Inability to track security incidents and prove compliance',
    suggestion: 'Enhance logging to include all user actions with appropriate detail level. Implement secure log storage with tamper-evident mechanisms. Consider a SIEM solution for log analysis.'
  }, {
    id: 4,
    title: 'Insecure Password Storage',
    description: "Password hashing algorithm (MD5) doesn't meet current security standards.",
    severity: 'high',
    priority: 'high',
    regulation: 'NIST',
    section: '800-63B',
    impact: 'Vulnerability to password cracking attacks',
    suggestion: 'Migrate to Argon2id for password hashing with appropriate work factors. Plan a phased migration that updates hashes during user login. Notify users of security improvements.'
  }, {
    id: 5,
    title: 'Lack of Input Validation',
    description: "Form inputs aren't properly validated against injection attacks.",
    severity: 'medium',
    priority: 'medium',
    regulation: 'OWASP',
    section: 'Top 10 - A1',
    impact: 'SQL injection and XSS vulnerabilities',
    suggestion: 'Implement comprehensive input validation and sanitization. Use parameterized queries for all database operations. Add content security policy headers to prevent XSS.'
  }, {
    id: 6,
    title: 'Outdated SSL/TLS Protocols',
    description: 'System supports TLS 1.0 and 1.1 which are deprecated.',
    severity: 'medium',
    priority: 'low',
    regulation: 'PCI DSS',
    section: 'Requirement 4.1',
    impact: 'Vulnerability to known cryptographic attacks',
    suggestion: 'Disable TLS 1.0 and 1.1 on all servers. Configure servers to only use TLS 1.2 or higher. Test with various clients to ensure compatibility.'
  }, {
    id: 7,
    title: 'Excessive User Permissions',
    description: 'User roles have more permissions than necessary for their functions.',
    severity: 'medium',
    priority: 'medium',
    regulation: 'ISO 27001',
    section: 'A.9.2.2',
    impact: 'Increased attack surface and potential for privilege escalation',
    suggestion: 'Review and implement least privilege principles across all user roles. Create more granular permission sets. Implement regular access reviews.'
  }];
  const risksByCategory = {
    critical: risks.filter(risk => risk.severity === 'critical').length,
    high: risks.filter(risk => risk.severity === 'high').length,
    medium: risks.filter(risk => risk.severity === 'medium').length,
    low: risks.filter(risk => risk.severity === 'low').length
  };
  const chartData = [{
    name: 'Critical',
    value: risksByCategory.critical,
    color: '#EF4444'
  }, {
    name: 'High',
    value: risksByCategory.high,
    color: '#F59E0B'
  }, {
    name: 'Medium',
    value: risksByCategory.medium,
    color: '#3B82F6'
  }, {
    name: 'Low',
    value: risksByCategory.low,
    color: '#10B981'
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
        return <InfoIcon className="h-5 w-5 text-green-500" />;
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
        return 'bg-green-900/20 text-green-400 border-green-800';
    }
  };
  const getPriorityIcon = priority => {
    switch (priority) {
      case 'high':
        return <ArrowUpIcon className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <ArrowUpIcon className="h-4 w-4 rotate-45 text-yellow-500" />;
      default:
        return <ArrowDownIcon className="h-4 w-4 text-blue-500" />;
    }
  };
  const viewRiskDetails = risk => {
    setSelectedRisk(risk);
    setShowModal(true);
  };
  return <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <AlertTriangleIcon className="mr-3 h-8 w-8 text-yellow-500" />
          Risk Analysis
        </h1>
        <p className="text-gray-400 mt-2">
          Identified risks and AI-generated mitigation suggestions
        </p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Risk Distribution
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{
                backgroundColor: '#1F2937',
                borderColor: '#4B5563',
                borderRadius: '0.375rem'
              }} labelStyle={{
                color: '#F9FAFB'
              }} />
                <Bar dataKey="value">
                  {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Risk Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-red-900/20 border border-red-800 rounded-lg">
              <div className="flex items-center">
                <AlertCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                <span>Critical</span>
              </div>
              <span className="text-xl font-bold">
                {risksByCategory.critical}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
              <div className="flex items-center">
                <AlertTriangleIcon className="h-5 w-5 text-yellow-500 mr-2" />
                <span>High</span>
              </div>
              <span className="text-xl font-bold">{risksByCategory.high}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
              <div className="flex items-center">
                <AlertTriangleIcon className="h-5 w-5 text-blue-500 mr-2" />
                <span>Medium</span>
              </div>
              <span className="text-xl font-bold">
                {risksByCategory.medium}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-900/20 border border-green-800 rounded-lg">
              <div className="flex items-center">
                <InfoIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>Low</span>
              </div>
              <span className="text-xl font-bold">{risksByCategory.low}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Severity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Priority
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Risk
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {risks.map(risk => <tr key={risk.id} className="hover:bg-gray-700/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityClass(risk.severity)}`}>
                    {getSeverityIcon(risk.severity)}
                    <span className="ml-1 capitalize">{risk.severity}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center">
                    {getPriorityIcon(risk.priority)}
                    <span className="ml-1 capitalize text-sm">
                      {risk.priority}
                    </span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium">{risk.title}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-400 line-clamp-1">
                    {risk.description}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button className="text-blue-400 hover:text-blue-300" onClick={() => viewRiskDetails(risk)}>
                    View Details
                  </button>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
      {showModal && selectedRisk && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">
                {selectedRisk.title}
              </h3>
              <button className="text-gray-400 hover:text-white" onClick={() => setShowModal(false)}>
                <XCircleIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-400">Severity</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getSeverityClass(selectedRisk.severity)}`}>
                  {getSeverityIcon(selectedRisk.severity)}
                  <span className="ml-1 capitalize">
                    {selectedRisk.severity}
                  </span>
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-400">Priority</p>
                <span className="inline-flex items-center mt-1">
                  {getPriorityIcon(selectedRisk.priority)}
                  <span className="ml-1 capitalize">
                    {selectedRisk.priority}
                  </span>
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-400">Regulation</p>
                <p className="font-medium">
                  {selectedRisk.regulation} {selectedRisk.section}
                </p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">Description</p>
              <p className="text-white">{selectedRisk.description}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">Potential Impact</p>
              <p className="text-white">{selectedRisk.impact}</p>
            </div>
            <div className="mb-4 border-t border-gray-700 pt-4">
              <p className="text-sm text-gray-400 mb-1">
                AI-Generated Mitigation Suggestion
              </p>
              <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 text-white">
                {selectedRisk.suggestion}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mr-2" onClick={() => setShowModal(false)}>
                Close
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Add to Report
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export default RiskTab;