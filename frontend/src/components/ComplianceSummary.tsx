import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
const ComplianceSummary = () => {
  const severityData = [{
    name: 'Critical',
    value: 0,
    color: '#EF4444'
  }, {
    name: 'High',
    value: 2,
    color: '#F59E0B'
  }, {
    name: 'Medium',
    value: 4,
    color: '#3B82F6'
  }, {
    name: 'Low',
    value: 7,
    color: '#10B981'
  }];
  return <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Compliance Summary</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-700 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-400">Rules Checked</p>
          <p className="text-2xl font-bold mt-1">124</p>
        </div>
        <div className="bg-gray-700 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-400">Passed</p>
          <p className="text-2xl font-bold mt-1 text-green-400">118</p>
        </div>
        <div className="bg-gray-700 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-400">Warnings</p>
          <p className="text-2xl font-bold mt-1 text-yellow-400">6</p>
        </div>
        <div className="bg-gray-700 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-400">Failures</p>
          <p className="text-2xl font-bold mt-1 text-red-400">0</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-medium text-white mb-3">
          Severity Breakdown
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={severityData} margin={{
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
              <Bar dataKey="value" fill="#3B82F6">
                {severityData.map((entry, index) => <Bar key={`cell-${index}`} dataKey="value" fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>;
};
export default ComplianceSummary;