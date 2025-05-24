import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { PenLine, Trash2, Edit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Alert from '../components/ui/Alert';
import { API_URL, DATE_FORMAT_OPTIONS } from '../config/config';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  useEffect(() => {
    fetchUserPosts();
  }, [currentUser]);

  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/posts/user/${currentUser?.id}`);
      setPosts(response.data);
    } catch (err) {
      console.error('Failed to fetch user posts:', err);
      setError('Failed to load your posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`${API_URL}/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id));
      setSuccessMessage('Post deleted successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Failed to delete post:', err);
      setError('Failed to delete post. Please try again.');
    } finally {
      setDeleteConfirmId(null);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Manage your blog posts</p>
          </div>
          
          <Link 
            to="/create-post" 
            className="btn-primary mt-4 md:mt-0 flex items-center justify-center md:justify-start"
          >
            <PenLine className="h-5 w-5 mr-2" />
            Write New Post
          </Link>
        </div>
        
        {error && <Alert type="error" message={error} onClose={() => setError('')} />}
        {successMessage && <Alert type="success" message={successMessage} onClose={() => setSuccessMessage('')} />}
        
        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-medium text-gray-700 mb-4">You haven't written any posts yet</h3>
            <p className="text-gray-500 mb-6">Start sharing your thoughts with the world</p>
            <Link to="/create-post" className="btn-primary inline-flex items-center">
              <PenLine className="h-5 w-5 mr-2" />
              Write Your First Post
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map(post => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                          <Link to={`/post/${post.id}`} className="hover:text-blue-600 transition-colors">
                            {post.title}
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(post.created_at).toLocaleDateString('en-US', DATE_FORMAT_OPTIONS)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-3">
                          <Link 
                            to={`/edit-post/${post.id}`}
                            className="text-indigo-600 hover:text-indigo-900 transition-colors"
                          >
                            <Edit className="h-5 w-5" />
                          </Link>
                          
                          {deleteConfirmId === post.id ? (
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => deletePost(post.id)}
                                className="text-red-600 hover:text-red-900 text-xs font-bold"
                              >
                                YES
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="text-gray-600 hover:text-gray-900 text-xs font-bold"
                              >
                                NO
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(post.id)}
                              className="text-red-600 hover:text-red-900 transition-colors"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;