import React, { useState } from 'react';
import { ShieldCheckIcon, AlertCircleIcon, AlertTriangleIcon, InfoIcon, CheckCircleIcon } from 'lucide-react';
const ComplianceTab = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const complianceIssues = [{
    id: 1,
    title: 'GDPR Article 13 - Information Provision',
    status: 'warning',
    description: 'Privacy policy needs to be more transparent about data processing activities.',
    suggestion: 'Update privacy policy to clearly state all data processing purposes and legal basis for each activity. Include explicit language about user rights to access, rectify, and erase data.',
    regulation: 'GDPR',
    section: 'Article 13'
  }, {
    id: 2,
    title: 'HIPAA Security Rule - Access Controls',
    status: 'success',
    description: 'Appropriate authentication mechanisms are in place.',
    suggestion: 'Current implementation meets requirements. Consider adding multi-factor authentication for enhanced security.',
    regulation: 'HIPAA',
    section: 'Security Rule § 164.312(a)'
  }, {
    id: 3,
    title: 'ISO 27001 - Backup Policy',
    status: 'error',
    description: 'No documented backup testing procedures found.',
    suggestion: 'Implement and document regular backup testing procedures. Schedule tests at least quarterly and maintain logs of all test results and remediation actions.',
    regulation: 'ISO 27001',
    section: 'A.12.3'
  }, {
    id: 4,
    title: 'PCI DSS - Encryption Requirements',
    status: 'warning',
    description: 'Encryption standards are outdated.',
    suggestion: 'Update encryption protocols to current industry standards. Replace SHA-1 with SHA-256 or better. Implement TLS 1.3 for all data transmissions.',
    regulation: 'PCI DSS',
    section: 'Requirement 4.1'
  }, {
    id: 5,
    title: 'SOC 2 - Change Management',
    status: 'success',
    description: 'Change management procedures properly documented.',
    suggestion: 'Current implementation meets requirements. Consider automating the change approval workflow for increased efficiency.',
    regulation: 'SOC 2',
    section: 'Common Criteria 7.1'
  }, {
    id: 6,
    title: 'NIST 800-53 - Incident Response',
    status: 'error',
    description: 'Incident response plan lacks detailed recovery procedures.',
    suggestion: 'Enhance incident response documentation with specific recovery procedures for each type of security incident. Include step-by-step instructions and responsible parties.',
    regulation: 'NIST',
    section: '800-53 IR-4'
  }];
  const getStatusIcon = status => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <InfoIcon className="h-5 w-5 text-blue-500" />;
    }
  };
  const getStatusClass = status => {
    switch (status) {
      case 'success':
        return 'border-green-800 bg-green-900/20';
      case 'warning':
        return 'border-yellow-800 bg-yellow-900/20';
      case 'error':
        return 'border-red-800 bg-red-900/20';
      default:
        return 'border-gray-700 bg-gray-800';
    }
  };
  return <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <ShieldCheckIcon className="mr-3 h-8 w-8 text-blue-400" />
          Compliance
        </h1>
        <p className="text-gray-400 mt-2">
          Regulatory compliance issues and AI-generated suggestions
        </p>
      </header>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-xl p-4 flex items-center">
          <div className="rounded-full bg-blue-900/30 p-3 mr-4">
            <ShieldCheckIcon className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Requirements</p>
            <p className="text-2xl font-bold">124</p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 flex items-center">
          <div className="rounded-full bg-green-900/30 p-3 mr-4">
            <CheckCircleIcon className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Compliant</p>
            <p className="text-2xl font-bold text-green-400">118</p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 flex items-center">
          <div className="rounded-full bg-red-900/30 p-3 mr-4">
            <AlertCircleIcon className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Non-Compliant</p>
            <p className="text-2xl font-bold text-red-400">6</p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {complianceIssues.map(issue => <div key={issue.id} className={`border rounded-lg p-4 relative ${getStatusClass(issue.status)}`} onMouseEnter={() => setHoveredItem(issue.id)} onMouseLeave={() => setHoveredItem(null)}>
            <div className="flex items-start">
              <div className="mr-3">{getStatusIcon(issue.status)}</div>
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium text-white">{issue.title}</h3>
                  <span className="ml-3 px-2 py-0.5 text-xs rounded-full bg-gray-700 text-gray-300">
                    {issue.regulation} {issue.section}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-1">
                  {issue.description}
                </p>
              </div>
            </div>
            {/* Tooltip */}
            {hoveredItem === issue.id && <div className="absolute z-10 w-80 bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg -mt-2 right-0 top-full">
                <h4 className="font-medium text-white mb-2">AI Suggestion</h4>
                <p className="text-sm text-gray-300">{issue.suggestion}</p>
              </div>}
          </div>)}
      </div>
    </div>;
};
export default ComplianceTab;