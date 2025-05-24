import React from 'react';
import { BookOpen } from 'lucide-react';

const Logo = ({ className }) => {
  return (
    <div className={`text-blue-600 ${className}`}>
      <BookOpen className="h-8 w-8" />
    </div>
  );
};

export default Logo;