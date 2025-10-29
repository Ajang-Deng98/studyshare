import React from 'react';
import { FolderOpenIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface EmptyStateProps {
  type: 'resources' | 'search';
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  type, 
  title, 
  description, 
  actionText, 
  onAction 
}) => {
  const defaultContent = {
    resources: {
      icon: FolderOpenIcon,
      title: 'No resources found',
      description: 'There are no study materials available yet. Be the first to share!'
    },
    search: {
      icon: MagnifyingGlassIcon,
      title: 'No results found',
      description: 'Try adjusting your search terms or filters to find what you\'re looking for.'
    }
  };

  const content = defaultContent[type];
  const Icon = content.icon;

  return (
    <div className="text-center py-16">
      <Icon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title || content.title}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {description || content.description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;