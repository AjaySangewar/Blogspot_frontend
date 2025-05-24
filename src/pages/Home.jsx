import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import PostList from '../components/posts/PostList';
import Alert from '../components/ui/Alert';
import { API_URL } from '../config/config';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Get search query from URL
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search') || '';
    
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/posts`);
        setPosts(response.data);
        
        // Filter posts if search query exists
        if (searchQuery) {
          filterPosts(searchQuery, response.data);
        } else {
          setFilteredPosts(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, [location.search]);

  const filterPosts = (query, postsToFilter = posts) => {
    const filtered = postsToFilter.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(query.toLowerCase());
      const contentMatch = post.content.toLowerCase().includes(query.toLowerCase());
      return titleMatch || contentMatch;
    });
    
    setFilteredPosts(filtered);
  };

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-blue-600">Blogspot</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover insightful articles, share your thoughts, and engage with a community of writers.
          </p>
        </div>
        
        {location.search && (
          <div className="mb-8">
            <Alert 
              type="info" 
              message={
                filteredPosts.length > 0
                  ? `Found ${filteredPosts.length} result(s) for "${new URLSearchParams(location.search).get('search')}"`
                  : `No results found for "${new URLSearchParams(location.search).get('search')}"`
              }
            />
          </div>
        )}
        
        <PostList 
          posts={filteredPosts} 
          loading={loading} 
          error={error} 
        />
      </motion.div>
    </div>
  );
};

export default Home;