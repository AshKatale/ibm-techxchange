import React from 'react';
import { FileTextIcon, SearchIcon, FilterIcon, CheckCircleIcon, XCircleIcon, AlertTriangleIcon } from 'lucide-react';
const DocumentsTab = () => {
  const documents = [{
    id: 1,
    name: 'System_Requirements_Specification_v2.1.pdf',
    uploadDate: '2023-10-12T14:30:00',
    size: '4.8 MB',
    status: 'processed',
    issues: 0
  }, {
    id: 2,
    name: 'API_Documentation_2023.docx',
    uploadDate: '2023-10-12T14:32:00',
    size: '2.3 MB',
    status: 'processed',
    issues: 2
  }, {
    id: 3,
    name: 'Security_Policy_Framework.pdf',
    uploadDate: '2023-10-11T09:15:00',
    size: '1.7 MB',
    status: 'processed',
    issues: 0
  }, {
    id: 4,
    name: 'Data_Processing_Agreement.pdf',
    uploadDate: '2023-10-10T16:45:00',
    size: '3.2 MB',
    status: 'processed',
    issues: 4
  }, {
    id: 5,
    name: 'User_Data_Flow_Diagram.pdf',
    uploadDate: '2023-10-09T11:20:00',
    size: '1.1 MB',
    status: 'processed',
    issues: 1
  }, {
    id: 6,
    name: 'Privacy_Policy_v3.docx',
    uploadDate: '2023-10-08T14:10:00',
    size: '0.9 MB',
    status: 'processing',
    issues: null
  }, {
    id: 7,
    name: 'Infrastructure_Architecture.pdf',
    uploadDate: '2023-10-07T10:05:00',
    size: '5.6 MB',
    status: 'failed',
    issues: null
  }];
  const formatDate = dateString => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  const getStatusIcon = (status, issues) => {
    if (status === 'processing') {
      return <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-blue-900/30 text-blue-400 border border-blue-800">
          Processing
        </span>;
    } else if (status === 'failed') {
      return <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-red-900/30 text-red-400 border border-red-800">
          <XCircleIcon className="h-3 w-3 mr-1" />
          Failed
        </span>;
    } else if (issues > 0) {
      return <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-yellow-900/30 text-yellow-400 border border-yellow-800">
          <AlertTriangleIcon className="h-3 w-3 mr-1" />
          {issues} issues
        </span>;
    } else {
      return <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-green-900/30 text-green-400 border border-green-800">
          <CheckCircleIcon className="h-3 w-3 mr-1" />
          Compliant
        </span>;
    }
  };
  return <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <FileTextIcon className="mr-3 h-8 w-8 text-blue-400" />
          Documents
        </h1>
        <p className="text-gray-400 mt-2">
          Upload history and document scan results
        </p>
      </header>
      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-64">
          <input type="text" placeholder="Search documents..." className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm">
            <FilterIcon className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">
            Upload New
          </button>
        </div>
      </div>
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Document
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Upload Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Size
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {documents.map(doc => <tr key={doc.id} className="hover:bg-gray-700/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileTextIcon className="h-5 w-5 mr-3 text-blue-400" />
                    <span className="text-sm font-medium">{doc.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {formatDate(doc.uploadDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {doc.size}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusIcon(doc.status, doc.issues)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button className="text-blue-400 hover:text-blue-300 mr-3">
                    View
                  </button>
                  <button className="text-gray-400 hover:text-gray-300">
                    Delete
                  </button>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
};
export default DocumentsTab;