import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Resource } from '../types';
import api from '../utils/api';
import { StarIcon, EyeIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';

const Dashboard: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [mostDownloaded, setMostDownloaded] = useState<Resource[]>([]);
  const [topRated, setTopRated] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await api.get('/resources/');
      const allResources = response.data;
      setResources(allResources.slice(0, 6));
      
      // Mock most downloaded and top rated for demo
      setMostDownloaded(allResources.slice(0, 3));
      setTopRated(allResources.sort((a: Resource, b: Resource) => b.average_rating - a.average_rating).slice(0, 3));
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex-1">
          <Link to={`/resources/${resource.id}`} className="hover:text-gray-600">
            {resource.title}
          </Link>
        </h3>
        <a
          href={`http://localhost:8000/api/resources/${resource.id}/download/`}
          download={resource.title}
          className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-all ml-2"
          title="Download file"
        >
          <ArrowDownTrayIcon className="h-4 w-4" />
        </a>
      </div>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {resource.description}
      </p>
      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
        <span>{resource.subject}</span>
        <span>{resource.course_code}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <StarIcon className="h-4 w-4 text-yellow-400" />
          <span className="text-sm">{resource.average_rating.toFixed(1)}</span>
        </div>
        <span className="text-xs text-gray-500">
          by {resource.uploader.name}
        </span>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Welcome back! Discover and share study resources with your community.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Link
          to="/upload"
          className="bg-black hover:bg-gray-800 text-white p-6 rounded-lg text-center transition-colors border-2 border-black"
        >
          <ArrowDownTrayIcon className="h-8 w-8 mx-auto mb-2" />
          <h3 className="text-lg font-bold">Upload Resource</h3>
          <p className="text-sm font-medium">Share your study materials</p>
        </Link>
        
        <Link
          to="/search"
          className="bg-white hover:bg-gray-100 text-black p-6 rounded-lg text-center transition-colors border-2 border-black"
        >
          <EyeIcon className="h-8 w-8 mx-auto mb-2" />
          <h3 className="text-lg font-bold">Browse Resources</h3>
          <p className="text-sm font-medium">Find study materials</p>
        </Link>
        
        <Link
          to="/profile"
          className="bg-white hover:bg-gray-100 text-black p-6 rounded-lg text-center transition-colors border-2 border-black"
        >
          <StarIcon className="h-8 w-8 mx-auto mb-2" />
          <h3 className="text-lg font-bold">My Profile</h3>
          <p className="text-sm font-medium">Manage your uploads</p>
        </Link>
      </div>

      {/* Recent Resources */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Recent Resources
          </h2>
          <Link to="/search" className="text-primary-600 hover:text-primary-700 font-medium">
            View all →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>

      {/* Stats Sections */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Most Downloaded */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Most Downloaded
          </h2>
          <div className="space-y-4">
            {mostDownloaded.map((resource, index) => (
              <div key={resource.id} className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg">
                <div className="bg-primary-100 dark:bg-primary-900 text-primary-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    <Link to={`/resources/${resource.id}`} className="hover:text-primary-600">
                      {resource.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500">{resource.subject}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Rated */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Top Rated
          </h2>
          <div className="space-y-4">
            {topRated.map((resource, index) => (
              <div key={resource.id} className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg">
                <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    <Link to={`/resources/${resource.id}`} className="hover:text-primary-600">
                      {resource.title}
                    </Link>
                  </h3>
                  <div className="flex items-center space-x-1">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-gray-500">{resource.average_rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;