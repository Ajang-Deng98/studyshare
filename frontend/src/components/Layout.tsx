import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
        <nav className="border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold text-gray-800">
                  StudyShare
                </Link>
              </div>

              <div className="hidden md:flex items-center space-x-4">
                {user ? (
                  <>
                    <Link to="/search" className="text-gray-700 font-medium hover:text-gray-900">
                      Search
                    </Link>
                    <Link to="/dashboard" className="text-gray-700 font-medium hover:text-gray-900">
                      Dashboard
                    </Link>
                    <Link to="/upload" className="text-gray-700 font-medium hover:text-gray-900">
                      Upload
                    </Link>
                    <Link to="/profile" className="text-gray-700 font-medium hover:text-gray-900">
                      Profile
                    </Link>
                    <button onClick={handleLogout} className="btn-secondary">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-gray-700 font-medium hover:text-gray-900">
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

        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;