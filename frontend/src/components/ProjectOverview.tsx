import React from 'react';
import { CheckCircleIcon } from 'lucide-react';
const ProjectOverview = () => {
  return <div className="bg-gray-800 rounded-xl p-6 h-full">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center">
        Project Overview
        <CheckCircleIcon className="ml-2 h-5 w-5 text-green-400" />
      </h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-400">Project Name & ID</p>
          <p className="font-medium">HealthTech API Platform (HT-2023-104)</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Date of Analysis</p>
          <p className="font-medium">October 12, 2023</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Scanned By</p>
          <p className="font-medium">ComplianceAI Agent #C-4321</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Documents Evaluated</p>
          <p className="font-medium">
            SRS, SDD, API Documentation, Code Samples
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Compliance Status</p>
          <div className="flex items-center mt-1">
            <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
            <span className="font-medium text-green-400">Compliant</span>
          </div>
        </div>
        <div className="pt-2">
          <p className="text-sm text-gray-400">Key Regulations</p>
          <div className="flex flex-wrap gap-2 mt-1">
            <span className="px-2 py-1 bg-gray-700 rounded-md text-xs">
              HIPAA
            </span>
            <span className="px-2 py-1 bg-gray-700 rounded-md text-xs">
              GDPR
            </span>
            <span className="px-2 py-1 bg-gray-700 rounded-md text-xs">
              ISO 27001
            </span>
          </div>
        </div>
      </div>
    </div>;
};
export default ProjectOverview;