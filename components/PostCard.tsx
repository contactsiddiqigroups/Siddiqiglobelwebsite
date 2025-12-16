import React from 'react';
import { BlogPost } from '../types';

interface PostCardProps {
  post: BlogPost;
  onClick: (post: BlogPost) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  return (
    <div 
      onClick={() => onClick(post)}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer flex flex-col h-full border border-slate-100"
    >
      <div className="h-48 w-full relative overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-indigo-600 shadow-sm">
          {post.category}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight line-clamp-2">
          {post.title}
        </h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>
        <div className="flex items-center mt-auto pt-4 border-t border-slate-50">
          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
            {post.author.charAt(0)}
          </div>
          <span className="ml-2 text-sm font-medium text-slate-700">{post.author}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
