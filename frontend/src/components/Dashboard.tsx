import React, { useState } from 'react';
import { DownloadIcon, UploadCloudIcon, AlertCircleIcon, CheckCircleIcon, AlertTriangleIcon, XCircleIcon } from 'lucide-react';
import Sidebar from './Sidebar';
import ProjectOverview from './ProjectOverview';
import ComplianceSummary from './ComplianceSummary';
import RiskAnalysis from './RiskAnalysis';
import DocumentUpload from './DocumentUpload';
import ComplianceTab from './tabs/ComplianceTab';
import DocumentsTab from './tabs/DocumentsTab';
import RiskTab from './tabs/RiskTab';
import SettingsTab from './tabs/SettingsTab';
import { ThemeProvider } from './ThemeContext';
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const renderTabContent = () => {
    switch (activeTab) {
      case 'compliance':
        return <ComplianceTab />;
      case 'documents':
        return <DocumentsTab />;
      case 'risk':
        return <RiskTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <>
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-white">
                Compliance Dashboard
              </h1>
              <p className="text-gray-400 mt-2">
                AI-powered regulatory compliance validation
              </p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <ProjectOverview />
              <div className="lg:col-span-2">
                <ComplianceSummary />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <RiskAnalysis />
              </div>
              <DocumentUpload />
            </div>
            <div className="mt-8 flex justify-end">
              <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                <DownloadIcon className="mr-2 h-5 w-5" />
                Export Report
              </button>
            </div>
          </>;
    }
  };
  return <ThemeProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">{renderTabContent()}</div>
        </main>
      </div>
    </ThemeProvider>;
};
export default Dashboard;