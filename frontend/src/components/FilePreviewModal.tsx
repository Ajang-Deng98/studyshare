import React, { useState, useEffect } from 'react';
import { XMarkIcon, ArrowDownTrayIcon, EyeIcon } from '@heroicons/react/24/outline';

interface FilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
  fileName: string;
  title: string;
  resourceId?: number;
  onDownload: () => void;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  isOpen,
  onClose,
  fileUrl,
  fileName,
  title,
  resourceId,
  onDownload
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setError(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getFileExtension = (filename: string): string => {
    return filename.split('.').pop()?.toLowerCase() || '';
  };

  const getFileType = (filename: string): string => {
    const ext = getFileExtension(filename);
    
    if (['pdf'].includes(ext)) return 'pdf';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return 'image';
    if (['mp4', 'avi', 'mov', 'wmv', 'webm', 'mkv'].includes(ext)) return 'video';
    if (['mp3', 'wav', 'ogg', 'aac', 'm4a'].includes(ext)) return 'audio';
    if (['txt', 'md', 'rtf'].includes(ext)) return 'text';
    
    return 'unknown';
  };

  const fileType = getFileType(fileName);
  const fullUrl = resourceId 
    ? `http://localhost:8000/api/resources/${resourceId}/serve/`
    : (fileUrl.startsWith('http') ? fileUrl : `http://localhost:8000${fileUrl}`);

  const renderContent = () => {
    switch (fileType) {
      case 'pdf':
        return (
          <div className="flex flex-col items-center justify-center h-full p-8">
            <div className="w-24 h-24 bg-red-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-center">PDF files are best viewed by downloading or opening in a new tab</p>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  window.open(fullUrl, '_blank');
                  setLoading(false);
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <EyeIcon className="h-5 w-5" />
                <span>Open in New Tab</span>
              </button>
              <button
                onClick={() => {
                  onDownload();
                  setLoading(false);
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div className="flex items-center justify-center h-full p-4">
            <img
              src={fullUrl}
              alt={title}
              className="max-w-full max-h-full object-contain"
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setError(true);
              }}
            />
          </div>
        );
      
      case 'video':
        return (
          <div className="flex items-center justify-center h-full p-4 bg-black">
            <video
              controls
              preload="metadata"
              className="max-w-full max-h-full"
              onLoadedMetadata={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setError(true);
              }}
            >
              <source src={fullUrl} type="video/mp4" />
              <source src={fullUrl} type="video/webm" />
              <source src={fullUrl} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      
      case 'audio':
        return (
          <div className="flex flex-col items-center justify-center h-full p-8">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-8">
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12c0-1.594-.471-3.078-1.343-4.243a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 12a5.984 5.984 0 01-.757 2.829 1 1 0 11-1.415-1.414A3.987 3.987 0 0013 12a3.988 3.988 0 00-.172-1.171 1 1 0 010-1.415z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{title}</h3>
            <audio
              controls
              preload="metadata"
              className="w-full max-w-md"
              onLoadedMetadata={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setError(true);
              }}
            >
              <source src={fullUrl} type="audio/mpeg" />
              <source src={fullUrl} type="audio/wav" />
              <source src={fullUrl} type="audio/ogg" />
              Your browser does not support the audio tag.
            </audio>
          </div>
        );
      
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full p-8">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{fileName}</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Preview not available for this file type</p>
            <button
              onClick={onDownload}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
              <span>Download File</span>
            </button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full h-full max-w-6xl max-h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center space-x-3">
            <EyeIcon className="h-5 w-5 text-gray-500" />
            <div>
              <h2 className="font-semibold text-gray-800 dark:text-white">{title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{fileName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onDownload}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <ArrowDownTrayIcon className="h-4 w-4" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading preview...</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XMarkIcon className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Preview Error</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">Unable to load file preview</p>
                <button
                  onClick={onDownload}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Download File Instead
                </button>
              </div>
            </div>
          )}
          
          {!error && renderContent()}
        </div>
      </div>
    </div>
  );
};

export default FilePreviewModal;