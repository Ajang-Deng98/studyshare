import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Resource, Comment, Rating } from '../types';
import api from '../utils/api';
import { useAuth } from '../hooks/useAuth';
import { StarIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

const ResourceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [resource, setResource] = useState<Resource | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [userRating, setUserRating] = useState<number>(0);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchResource();
      fetchComments();
      fetchRatings();
    }
  }, [id, user]);

  const fetchResource = async () => {
    try {
      const response = await api.get(`/resources/${id}/`);
      setResource(response.data);
    } catch (error) {
      console.error('Error fetching resource:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await api.get(`/resources/${id}/comments/`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchRatings = async () => {
    try {
      const response = await api.get(`/resources/${id}/ratings/`);
      setRatings(response.data);
      if (user) {
        const myRating = response.data.find((r: Rating) => r.user.id === user.id);
        setUserRating(myRating ? myRating.rating_value : 0);
      }
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  const submitRating = async (rating: number) => {
    if (!user) return;
    try {
      await api.post(`/resources/${id}/ratings/`, { rating_value: rating });
      setUserRating(rating);
      // Refresh resource data to get updated average
      await fetchResource();
    } catch (error: any) {
      console.error('Error submitting rating:', error);
    }
  };

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit comment called', { user, newComment, id });
    if (!user || !newComment.trim()) {
      console.log('Validation failed');
      return;
    }
    try {
      console.log('Posting comment...');
      const response = await api.post(`/resources/${id}/comments/`, { content: newComment.trim() });
      console.log('Comment posted successfully:', response.data);
      setNewComment('');
      await fetchComments();
    } catch (error: any) {
      console.error('Error submitting comment:', error.response?.data || error.message);
    }
  };

  const downloadFile = () => {
    if (resource?.id) {
      const link = document.createElement('a');
      link.href = `http://localhost:8000/api/resources/${resource.id}/download/`;
      link.download = resource.title;
      link.click();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-400"></div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800">Resource not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{resource.title}</h1>
            <p className="text-gray-600 mb-6">{resource.description}</p>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {resource.subject}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {resource.topic}
              </span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                {resource.course_code}
              </span>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
              <span>By {resource.uploader.name}</span>
              <span>Uploaded {new Date(resource.upload_date).toLocaleDateString()}</span>
              <div className="flex items-center space-x-1">
                <StarIcon className="h-4 w-4 text-yellow-400" />
                <span>{resource.average_rating.toFixed(1)} ({ratings.length} ratings)</span>
              </div>
            </div>

            {resource.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {resource.tags.map((tag) => (
                  <span key={tag.id} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={downloadFile}
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-all shadow-md hover:shadow-lg"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
            <span>Download</span>
          </button>
        </div>

        {/* File Preview & Download */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">File Preview</h3>
            <button
              onClick={downloadFile}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all"
            >
              <ArrowDownTrayIcon className="h-4 w-4" />
              <span>Download File</span>
            </button>
          </div>
          
          {resource.file.toLowerCase().endsWith('.pdf') ? (
            <div>
              <embed
                src={`http://localhost:8000${resource.file}#toolbar=1&navpanes=1&scrollbar=1`}
                type="application/pdf"
                className="w-full h-96 border border-gray-300 rounded-lg mb-4"
                title="PDF Preview"
              />
              <div className="text-center">
                <button
                  onClick={downloadFile}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 mx-auto transition-all"
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ) : resource.file.toLowerCase().match(/\.(docx?|txt|rtf)$/) ? (
            <div>
              <div className="bg-white border border-gray-300 rounded-lg p-6 mb-4">
                <div className="flex items-center justify-center h-48">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📄</div>
                    <p className="text-gray-600 font-medium">{resource.file.split('/').pop()}</p>
                    <p className="text-gray-500 text-sm">Document file</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button
                  onClick={downloadFile}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 mx-auto transition-all"
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                  <span>Download Document</span>
                </button>
              </div>
            </div>
          ) : resource.file.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/) ? (
            <div>
              <img
                src={`http://localhost:8000${resource.file}`}
                alt={resource.title}
                className="max-w-full h-auto rounded-lg mb-4 mx-auto"
              />
              <div className="text-center">
                <button
                  onClick={downloadFile}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 mx-auto transition-all"
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                  <span>Download Image</span>
                </button>
              </div>
            </div>
          ) : resource.file.toLowerCase().match(/\.(mp4|avi|mov|wmv)$/) ? (
            <div>
              <video
                controls
                className="w-full h-96 rounded-lg mb-4"
                src={`http://localhost:8000${resource.file}`}
              >
                Your browser does not support the video tag.
              </video>
              <div className="text-center">
                <button
                  onClick={downloadFile}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 mx-auto transition-all"
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                  <span>Download Video</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="bg-white rounded-lg p-8 border-2 border-dashed border-gray-300">
                <ArrowDownTrayIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">File: {resource.file.split('/').pop()}</p>
                <p className="text-gray-500 mb-6">Preview not available for this file type</p>
                <button
                  onClick={downloadFile}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-medium flex items-center space-x-2 mx-auto transition-all text-lg"
                >
                  <ArrowDownTrayIcon className="h-6 w-6" />
                  <span>Download File</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Rating Section */}
        {user && (
          <div className="mb-8 bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Rate this resource</h3>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => submitRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    {star <= userRating ? (
                      <StarIcon className="h-8 w-8 text-yellow-400 hover:text-yellow-500" />
                    ) : (
                      <StarOutlineIcon className="h-8 w-8 text-gray-300 hover:text-yellow-400" />
                    )}
                  </button>
                ))}
              </div>
              {userRating > 0 && (
                <span className="text-gray-600 font-medium ml-3">
                  You rated: {userRating}/5
                </span>
              )}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Comments ({comments.length})</h3>
          
          {user && (
            <form onSubmit={submitComment} className="mb-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none"
                rows={3}
                required
              />
              <button
                type="submit"
                className="mt-3 bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-xl font-medium transition-all"
                onClick={(e) => {
                  console.log('Button clicked');
                  submitComment(e);
                }}
              >
                Post Comment
              </button>
            </form>
          )}

          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="font-medium text-gray-800">{comment.user.name}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetail;