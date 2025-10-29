import React, { useState } from 'react';
import { ArrowDownTrayIcon, EyeIcon, PlayIcon, DocumentIcon, PhotoIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';

interface FilePreviewProps {
  fileUrl: string;
  fileName: string;
  title: string;
  resourceId?: number;
  onDownload: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ fileUrl, fileName, title, resourceId, onDownload }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageError, setImageError] = useState(false);

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
  // Use the serve endpoint for better content type handling
  const fullUrl = resourceId 
    ? `http://localhost:8000/api/resources/${resourceId}/serve/`
    : (fileUrl.startsWith('http') ? fileUrl : `http://localhost:8000${fileUrl}`);

  const renderPDFPreview = () => (
    <div className="relative">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
          <div className="flex items-center space-x-2">
            <DocumentIcon className="h-5 w-5 text-red-500" />
            <span className="font-medium text-gray-700">PDF Document</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsFullscreen(true)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="View Fullscreen"
            >
              <EyeIcon className="h-4 w-4" />
            </button>
            <button
              onClick={onDownload}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Download"
            >
              <ArrowDownTrayIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
        <iframe
          src={`${fullUrl}#toolbar=1&navpanes=1&scrollbar=1`}
          className="w-full h-96 border-0"
          title="PDF Preview"
        />
      </div>
      
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="w-full h-full max-w-6xl bg-white rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-gray-100 border-b">
              <h3 className="font-semibold text-gray-800">{title}</h3>
              <button
                onClick={() => setIsFullscreen(false)}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                ×
              </button>
            </div>
            <iframe
              src={`${fullUrl}#toolbar=1&navpanes=1&scrollbar=1`}
              className="w-full h-full border-0"
              title="PDF Fullscreen"
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderImagePreview = () => (
    <div className="relative">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
          <div className="flex items-center space-x-2">
            <PhotoIcon className="h-5 w-5 text-blue-500" />
            <span className="font-medium text-gray-700">Image</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsFullscreen(true)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="View Fullscreen"
            >
              <EyeIcon className="h-4 w-4" />
            </button>
            <button
              onClick={onDownload}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Download"
            >
              <ArrowDownTrayIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="p-4 flex justify-center bg-gray-50">
          {!imageError ? (
            <img
              src={fullUrl}
              alt={title}
              className="max-w-full max-h-96 object-contain rounded-lg shadow-sm"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-gray-500">
              <PhotoIcon className="h-16 w-16 mb-2" />
              <p>Unable to load image</p>
            </div>
          )}
        </div>
      </div>

      {isFullscreen && !imageError && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-full max-h-full">
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl font-bold z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
            >
              ×
            </button>
            <img
              src={fullUrl}
              alt={title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderVideoPreview = () => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
        <div className="flex items-center space-x-2">
          <PlayIcon className="h-5 w-5 text-green-500" />
          <span className="font-medium text-gray-700">Video</span>
        </div>
        <button
          onClick={onDownload}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          title="Download"
        >
          <ArrowDownTrayIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="p-4 bg-black">
        <video
          controls
          className="w-full max-h-96 rounded-lg"
          preload="metadata"
        >
          <source src={fullUrl} />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );

  const renderAudioPreview = () => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
        <div className="flex items-center space-x-2">
          <SpeakerWaveIcon className="h-5 w-5 text-purple-500" />
          <span className="font-medium text-gray-700">Audio</span>
        </div>
        <button
          onClick={onDownload}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          title="Download"
        >
          <ArrowDownTrayIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-center mb-4">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
            <SpeakerWaveIcon className="h-12 w-12 text-white" />
          </div>
        </div>
        <audio
          controls
          className="w-full"
          preload="metadata"
        >
          <source src={fullUrl} />
          Your browser does not support the audio tag.
        </audio>
      </div>
    </div>
  );

  const renderTextPreview = () => {
    const [textContent, setTextContent] = useState<string>('');
    const [loadingText, setLoadingText] = useState(false);
    const [textError, setTextError] = useState(false);

    const loadTextContent = async () => {
      setLoadingText(true);
      try {
        const response = await fetch(fullUrl);
        if (response.ok) {
          const text = await response.text();
          setTextContent(text.slice(0, 1000)); // Show first 1000 characters
        } else {
          setTextError(true);
        }
      } catch (error) {
        setTextError(true);
      } finally {
        setLoadingText(false);
      }
    };

    React.useEffect(() => {
      loadTextContent();
    }, []);

    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
          <div className="flex items-center space-x-2">
            <DocumentIcon className="h-5 w-5 text-green-600" />
            <span className="font-medium text-gray-700">Text Document</span>
          </div>
          <button
            onClick={onDownload}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Download"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="p-4">
          {loadingText ? (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          ) : textError ? (
            <div className="text-center py-8">
              <DocumentIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Unable to preview text content</p>
              <button
                onClick={onDownload}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Download to View
              </button>
            </div>
          ) : (
            <div>
              <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-64 overflow-y-auto">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                  {textContent}
                  {textContent.length >= 1000 && '...'}
                </pre>
              </div>
              <div className="text-center">
                <button
                  onClick={onDownload}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Download Full Document
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderDocumentPreview = () => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
        <div className="flex items-center space-x-2">
          <DocumentIcon className="h-5 w-5 text-blue-600" />
          <span className="font-medium text-gray-700">Document</span>
        </div>
        <button
          onClick={onDownload}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          title="Download"
        >
          <ArrowDownTrayIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="p-8 text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <DocumentIcon className="h-10 w-10 text-blue-600" />
        </div>
        <h3 className="font-medium text-gray-800 mb-2">{fileName}</h3>
        <p className="text-gray-500 mb-4">Microsoft Word Document</p>
        <button
          onClick={onDownload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Download to View
        </button>
      </div>
    </div>
  );

  const renderUnknownFile = () => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
        <div className="flex items-center space-x-2">
          <DocumentIcon className="h-5 w-5 text-gray-500" />
          <span className="font-medium text-gray-700">File</span>
        </div>
        <button
          onClick={onDownload}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          title="Download"
        >
          <ArrowDownTrayIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="p-8 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <DocumentIcon className="h-10 w-10 text-gray-500" />
        </div>
        <h3 className="font-medium text-gray-800 mb-2">{fileName}</h3>
        <p className="text-gray-500 mb-4">Preview not available</p>
        <button
          onClick={onDownload}
          className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Download File
        </button>
      </div>
    </div>
  );

  const renderPreview = () => {
    switch (fileType) {
      case 'pdf':
        return renderPDFPreview();
      case 'image':
        return renderImagePreview();
      case 'video':
        return renderVideoPreview();
      case 'audio':
        return renderAudioPreview();
      case 'text':
        return renderTextPreview();
      case 'document':
      case 'presentation':
      case 'spreadsheet':
        return renderDocumentPreview();
      default:
        return renderUnknownFile();
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">File Preview</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
          {getFileExtension(fileName).toUpperCase()}
        </span>
      </div>
      {renderPreview()}
    </div>
  );
};

export default FilePreview;