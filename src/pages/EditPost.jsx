import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import PostEditor from '../components/posts/PostEditor';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Alert from '../components/ui/Alert';
import { API_URL } from '../config/config';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleSubmit = async (postData) => {
    try {
      await axios.put(`${API_URL}/posts/${id}`, postData);
      navigate(`/post/${id}`);
    } catch (err) {
      console.error('Failed to update post:', err);
      throw new Error(err.response?.data?.message || 'Failed to update post');
    }
  };

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

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Post</h1>
        
        <PostEditor 
          initialData={post} 
          onSubmit={handleSubmit} 
          submitButtonText="Update Post" 
          isEditing={true} 
        />
      </motion.div>
    </div>
  );
};

export default EditPost;