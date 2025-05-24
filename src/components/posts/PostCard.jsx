import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { DATE_FORMAT_OPTIONS } from '../../config/config';

const PostCard = ({ post }) => {
  const formattedDate = new Date(post.created_at).toLocaleDateString(
    'en-US', 
    DATE_FORMAT_OPTIONS
  );

  // Create a safe excerpt from the post content
  const createExcerpt = (content) => {
    // Remove HTML tags and get plain text
    const plainText = content.replace(/<[^>]*>/g, '');
    // Limit to 150 characters
    return plainText.length > 150 
      ? `${plainText.substring(0, 150)}...` 
      : plainText;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card h-full flex flex-col"
    >
      <div className="p-6 flex-grow">
        <Link to={`/post/${post.id}`}>
          <h2 className="text-xl font-semibold mb-3 hover:text-blue-600 transition-colors">
            {post.title}
          </h2>
        </Link>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <div className="flex items-center mr-4">
            <User className="h-4 w-4 mr-1" />
            <span>{post.author_name}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">
          {createExcerpt(post.content)}
        </p>
      </div>
      
      <div className="px-6 pb-6 mt-auto">
        <Link 
          to={`/post/${post.id}`} 
          className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center transition-colors"
        >
          Read more
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

export default PostCard;