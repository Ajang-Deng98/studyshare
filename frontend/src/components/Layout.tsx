import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="glass sticky top-0 z-50">
        <nav className="border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                  StudyShare
                </Link>
              </div>

              {/* Search Bar */}
              {user && (
                <div className="hidden md:flex flex-1 max-w-lg mx-8">
                  <form onSubmit={handleSearch} className="w-full">
                    <div className="relative">
                      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search resources..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-2xl focus:ring-2 focus:ring-primary-500 text-sm transition-all duration-300"
                      />
                    </div>
                  </form>
                </div>
              )}

              <div className="hidden md:flex items-center space-x-2">
                {user ? (
                  <>
                    <Link to="/dashboard" className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-primary-600 dark:hover:text-primary-400 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300">
                      Dashboard
                    </Link>
                    <Link to="/upload" className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-primary-600 dark:hover:text-primary-400 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300">
                      Upload
                    </Link>
                    <Link to="/profile" className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-primary-600 dark:hover:text-primary-400 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300">
                      Profile
                    </Link>
                    <button
                      onClick={toggleTheme}
                      className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                    >
                      {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                    </button>
                    <button onClick={handleLogout} className="btn-secondary ml-2">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={toggleTheme}
                      className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                    >
                      {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                    </button>
                    <Link to="/login" className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-primary-600 dark:hover:text-primary-400 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300">
                      Login
                    </Link>
                    <Link to="/register" className="btn-primary">
                      Register
                    </Link>
                  </>
                )}
              </div>

              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {user ? (
                  <>
                    <Link to="/search" className="block px-3 py-2 text-gray-700 dark:text-gray-300">Search</Link>
                    <Link to="/dashboard" className="block px-3 py-2 text-gray-700 dark:text-gray-300">Dashboard</Link>
                    <Link to="/upload" className="block px-3 py-2 text-gray-700 dark:text-gray-300">Upload</Link>
                    <Link to="/profile" className="block px-3 py-2 text-gray-700 dark:text-gray-300">Profile</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block px-3 py-2 text-gray-700 dark:text-gray-300">Login</Link>
                    <Link to="/register" className="block px-3 py-2 text-gray-700 dark:text-gray-300">Register</Link>
                  </>
                )}
              </div>
            </div>
          )}
        </nav>

        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;