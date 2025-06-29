import React, { useState } from 'react';
import { UploadCloudIcon, FileTextIcon, XIcon } from 'lucide-react';
const DocumentUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([{
    name: 'SRS-v2.3.pdf',
    size: '4.2 MB'
  }, {
    name: 'API-Documentation.pdf',
    size: '1.8 MB'
  }]);
  const handleDragOver = e => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const handleDrop = e => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop logic here
  };
  const removeFile = index => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };
  return <div className="bg-gray-800 rounded-xl p-6 h-full">
      <h2 className="text-xl font-bold text-white mb-4">Document Upload</h2>
      <div className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors ${isDragging ? 'border-blue-500 bg-blue-900/20' : 'border-gray-700 hover:border-gray-500'}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
        <UploadCloudIcon className="h-10 w-10 text-gray-500 mb-4" />
        <p className="text-sm text-center mb-2">
          <span className="font-medium">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500 text-center mb-4">
          PDF, DOC, DOCX, TXT (max 50MB per file)
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
          Select Files
        </button>
      </div>
      {files.length > 0 && <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-400 mb-2">
            Uploaded Documents
          </h3>
          <div className="space-y-2">
            {files.map((file, index) => <div key={index} className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                <div className="flex items-center">
                  <FileTextIcon className="h-5 w-5 text-blue-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-400">{file.size}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-200" onClick={() => removeFile(index)}>
                  <XIcon className="h-4 w-4" />
                </button>
              </div>)}
          </div>
        </div>}
    </div>;
};
export default DocumentUpload;