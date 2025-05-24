import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Clock, User, Edit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Alert from '../components/ui/Alert';
import { API_URL, DATE_FORMAT_OPTIONS } from '../config/config';

const PostDetail = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error('Failed to fetch post:', err);
        setError('Failed to load post. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="page-container">
        <Alert type="error" message={error} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="page-container">
        <Alert type="error" message="Post not found" />
      </div>
    );
  }

  const formattedDate = new Date(post.created_at).toLocaleDateString(
    'en-US', 
    DATE_FORMAT_OPTIONS
  );

  const isAuthor = currentUser && currentUser.id === post.author_id;

  return (
    <div className="page-container">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-gray-600 mb-6">
            <div className="flex items-center mr-6 mb-2">
              <User className="h-5 w-5 mr-2" />
              <span>{post.author_name}</span>
            </div>
            <div className="flex items-center mb-2">
              <Clock className="h-5 w-5 mr-2" />
              <span>{formattedDate}</span>
            </div>
          </div>
          
          {isAuthor && (
            <div className="flex">
              <Link 
                to={`/edit-post/${post.id}`} 
                className="btn-secondary flex items-center"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Post
              </Link>
            </div>
          )}
        </header>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>
      </motion.article>
    </div>
  );
};

export default PostDetail;