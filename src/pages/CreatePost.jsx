import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import PostEditor from '../components/posts/PostEditor';
import { API_URL } from '../config/config';

const CreatePost = () => {
  const navigate = useNavigate();

  const handleSubmit = async (postData) => {
    try {
      const response = await axios.post(`${API_URL}/posts`, postData);
      // Redirect to the newly created post
      navigate(`/post/${response.data.id}`);
    } catch (err) {
      console.error('Failed to create post:', err);
      throw new Error(err.response?.data?.message || 'Failed to create post');
    }
  };

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Write a New Post</h1>
        
        <PostEditor onSubmit={handleSubmit} />
      </motion.div>
    </div>
  );
};

export default CreatePost;