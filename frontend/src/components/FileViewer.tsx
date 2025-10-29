import React from 'react';
import { DocumentIcon, PhotoIcon, PlayIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';

interface FileViewerProps {
  fileUrl: string;
  fileName: string;
  resourceId?: number;
  className?: string;
}

const FileViewer: React.FC<FileViewerProps> = ({ fileUrl, fileName, resourceId, className = '' }) => {
  const getFileExtension = (filename: string): string => {
    return filename.split('.').pop()?.toLowerCase() || '';
  };

  const getFileType = (filename: string): string => {
    const ext = getFileExtension(filename);
    
    if (['pdf'].includes(ext)) return 'pdf';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return 'image';
    if (['mp4', 'avi', 'mov', 'wmv', 'webm', 'mkv'].includes(ext)) return 'video';
    if (['mp3', 'wav', 'ogg', 'aac', 'm4a'].includes(ext)) return 'audio';
    if (['doc', 'docx'].includes(ext)) return 'document';
    if (['txt', 'md', 'rtf'].includes(ext)) return 'text';
    if (['ppt', 'pptx'].includes(ext)) return 'presentation';
    if (['xls', 'xlsx'].includes(ext)) return 'spreadsheet';
    
    return 'unknown';
  };

  const fileType = getFileType(fileName);
  const fullUrl = resourceId 
    ? `http://localhost:8000/api/resources/${resourceId}/serve/`
    : (fileUrl.startsWith('http') ? fileUrl : `http://localhost:8000${fileUrl}`);

  const renderThumbnail = () => {
    switch (fileType) {
      case 'pdf':
        return (
          <div className="w-full h-full bg-red-50 flex items-center justify-center">
            <DocumentIcon className="h-8 w-8 text-red-500" />
          </div>
        );
      
      case 'image':
        return (
          <img
            src={fullUrl}
            alt={fileName}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML = `
                <div class="w-full h-full bg-blue-50 flex items-center justify-center">
                  <svg class="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              `;
            }}
          />
        );
      
      case 'video':
        return (
          <div className="w-full h-full bg-green-50 flex items-center justify-center relative">
            <PlayIcon className="h-8 w-8 text-green-500" />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                <PlayIcon className="h-6 w-6 text-gray-700 ml-1" />
              </div>
            </div>
          </div>
        );
      
      case 'audio':
        return (
          <div className="w-full h-full bg-purple-50 flex items-center justify-center">
            <SpeakerWaveIcon className="h-8 w-8 text-purple-500" />
          </div>
        );
      
      case 'document':
      case 'text':
        return (
          <div className="w-full h-full bg-blue-50 flex items-center justify-center">
            <DocumentIcon className="h-8 w-8 text-blue-600" />
          </div>
        );
      
      case 'presentation':
        return (
          <div className="w-full h-full bg-orange-50 flex items-center justify-center">
            <DocumentIcon className="h-8 w-8 text-orange-500" />
          </div>
        );
      
      case 'spreadsheet':
        return (
          <div className="w-full h-full bg-green-50 flex items-center justify-center">
            <DocumentIcon className="h-8 w-8 text-green-600" />
          </div>
        );
      
      default:
        return (
          <div className="w-full h-full bg-gray-50 flex items-center justify-center">
            <DocumentIcon className="h-8 w-8 text-gray-500" />
          </div>
        );
    }
  };

  return (
    <div className={`rounded-lg overflow-hidden ${className}`}>
      {renderThumbnail()}
    </div>
  );
};

export default FileViewer;