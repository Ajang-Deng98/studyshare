import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

interface UploadForm {
  title: string;
  description: string;
  subject: string;
  topic: string;
  course_code: string;
  tags: string;
  file: FileList;
}

const Upload: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UploadForm>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onSubmit = async (data: UploadForm) => {
    if (!data.file || data.file.length === 0) {
      toast.error('Please select a file to upload');
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('subject', data.subject);
    formData.append('topic', data.topic);
    formData.append('course_code', data.course_code);
    formData.append('file', data.file[0]);
    
    // Process tags
    const tagNames = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    formData.append('tag_names', JSON.stringify(tagNames));

    try {
      await api.post('/resources/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          setUploadProgress(progress);
        },
      });

      toast.success('Resource uploaded successfully!');
      reset();
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Upload failed');
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-black mb-2">
          Upload Resource
        </h1>
        <p className="text-black font-medium">
          Share your study materials with the community
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white border-2 border-black rounded-lg shadow-lg p-6">
          <div className="space-y-6">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                File Upload
              </label>
              <div className="border-2 border-dashed border-black rounded-lg p-6 text-center bg-gray-50">
                <CloudArrowUpIcon className="h-12 w-12 text-black mx-auto mb-4" />
                <input
                  {...register('file', { required: 'File is required' })}
                  type="file"
                  accept=".pdf,.docx,.doc,.jpg,.jpeg,.png"
                  className="block w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-2 file:border-black file:text-sm file:font-bold file:bg-white file:text-black hover:file:bg-gray-100"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Supported formats: PDF, DOCX, DOC, JPG, PNG (Max 10MB)
                </p>
              </div>
              {errors.file && (
                <p className="mt-1 text-sm text-red-600">{errors.file.message}</p>
              )}
            </div>

            {/* Upload Progress */}
            {loading && uploadProgress > 0 && (
              <div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                {...register('title', { required: 'Title is required' })}
                type="text"
                className="input-field"
                placeholder="Enter resource title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows={4}
                className="input-field"
                placeholder="Describe your resource"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            {/* Subject and Topic */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject
                </label>
                <input
                  {...register('subject', { required: 'Subject is required' })}
                  type="text"
                  className="input-field"
                  placeholder="e.g., Mathematics"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Topic
                </label>
                <input
                  {...register('topic', { required: 'Topic is required' })}
                  type="text"
                  className="input-field"
                  placeholder="e.g., Calculus"
                />
                {errors.topic && (
                  <p className="mt-1 text-sm text-red-600">{errors.topic.message}</p>
                )}
              </div>
            </div>

            {/* Course Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Course Code
              </label>
              <input
                {...register('course_code', { required: 'Course code is required' })}
                type="text"
                className="input-field"
                placeholder="e.g., MATH101"
              />
              {errors.course_code && (
                <p className="mt-1 text-sm text-red-600">{errors.course_code.message}</p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tags
              </label>
              <input
                {...register('tags')}
                type="text"
                className="input-field"
                placeholder="Enter tags separated by commas (e.g., notes, exam, study guide)"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate multiple tags with commas
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Upload Resource'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Upload;