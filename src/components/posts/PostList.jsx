import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import { POSTS_PER_PAGE } from '../../config/config';

const PostList = ({ posts, loading, error }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedPosts, setPaginatedPosts] = useState([]);
  
  useEffect(() => {
    if (posts) {
      const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
      const endIndex = startIndex + POSTS_PER_PAGE;
      setPaginatedPosts(posts.slice(startIndex, endIndex));
    }
  }, [posts, currentPage]);
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <div className="text-center text-red-500 my-8">{error}</div>;
  }
  
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center my-12">
        <h3 className="text-xl font-medium text-gray-700">No posts found</h3>
        <p className="text-gray-500 mt-2">Be the first to create a post!</p>
      </div>
    );
  }
  
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default PostList;