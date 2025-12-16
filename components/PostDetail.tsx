import React from 'react';
import { BlogPost } from '../types';

interface PostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onBack }) => {
  return (
    <div className="animate-fade-in pb-20">
      <button 
        onClick={onBack}
        className="fixed top-20 left-4 z-20 md:absolute md:top-0 md:left-0 md:relative bg-white/80 backdrop-blur p-2 rounded-full shadow-md text-slate-700 hover:bg-white transition-all"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden shadow-lg mb-8">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <span className="inline-block px-3 py-1 bg-indigo-600 rounded-full text-xs font-semibold mb-3">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
            {post.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-white/90">
            <span>By {post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-0">
        <div className="prose prose-lg prose-indigo max-w-none text-slate-700 leading-relaxed whitespace-pre-line">
            {/* 
              We use whitespace-pre-line to preserve line breaks from the API response 
              without dangerously setting HTML.
            */}
            {post.content}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
