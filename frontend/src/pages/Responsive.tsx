import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, UserGroupIcon, ChartBarIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const Responsive: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Study Resources
              <span className="block text-blue-600">For Everyone</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Access thousands of study materials, connect with peers, and enhance your learning journey
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
                Join Now
              </Link>
              <Link to="/search" className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium">
                Browse Resources
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 py-4">
            {['all', 'mathematics', 'science', 'literature', 'history'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
            <div className="text-xl lg:text-2xl font-bold text-blue-600">2.5K</div>
            <div className="text-xs lg:text-sm text-gray-600">Active Students</div>
          </div>
          <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
            <div className="text-xl lg:text-2xl font-bold text-green-600">1.8K</div>
            <div className="text-xs lg:text-sm text-gray-600">Study Materials</div>
          </div>
          <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
            <div className="text-xl lg:text-2xl font-bold text-purple-600">4.9</div>
            <div className="text-xs lg:text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
            <div className="text-xl lg:text-2xl font-bold text-orange-600">150+</div>
            <div className="text-xs lg:text-sm text-gray-600">Universities</div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            { icon: BookOpenIcon, title: 'Quality Resources', desc: 'Curated study materials from top students and educators' },
            { icon: UserGroupIcon, title: 'Collaborative Learning', desc: 'Connect with peers and share knowledge effectively' },
            { icon: ChartBarIcon, title: 'Track Progress', desc: 'Monitor your learning journey with detailed analytics' },
            { icon: GlobeAltIcon, title: 'Global Community', desc: 'Join students from universities worldwide' },
            { icon: BookOpenIcon, title: 'Multiple Formats', desc: 'PDFs, videos, notes, and interactive content' },
            { icon: UserGroupIcon, title: 'Expert Support', desc: 'Get help from experienced tutors and mentors' }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
              <feature.icon className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Uploads</h2>
              <div className="space-y-4">
                {[
                  { title: 'Calculus Study Guide', subject: 'Mathematics', author: 'Sarah Chen', rating: 4.8 },
                  { title: 'Physics Lab Reports', subject: 'Science', author: 'Mike Johnson', rating: 4.6 },
                  { title: 'Literature Analysis', subject: 'English', author: 'Emma Davis', rating: 4.9 },
                  { title: 'Chemistry Notes', subject: 'Science', author: 'Alex Kim', rating: 4.7 }
                ].map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-full sm:w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">by {item.author} • {item.subject}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400">★★★★★</div>
                        <span className="text-sm text-gray-600">{item.rating}</span>
                      </div>
                    </div>
                    <div className="flex sm:flex-col gap-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: 'Upload Resource', link: '/upload' },
                  { label: 'Join Study Group', link: '/groups' },
                  { label: 'Find Tutor', link: '/tutors' },
                  { label: 'Help Center', link: '/help' }
                ].map((action, index) => (
                  <Link
                    key={index}
                    to={action.link}
                    className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['calculus', 'physics', 'chemistry', 'biology', 'history', 'literature'].map((tag) => (
                  <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Responsive;