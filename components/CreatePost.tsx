import React, { useState } from 'react';
import { generateBlogContent } from '../services/geminiService';
import { BlogPost } from '../types';

interface CreatePostProps {
  onPostCreated: (post: BlogPost) => void;
  onCancel: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated, onCancel }) => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Informative');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const generatedData = await generateBlogContent(topic, tone);
      
      const newPost: BlogPost = {
        id: Date.now().toString(),
        title: generatedData.title,
        excerpt: generatedData.excerpt,
        content: generatedData.content,
        category: generatedData.category,
        author: 'AI Assistant', // Default author
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: '3 min read',
        imageUrl: `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 1000)}`,
        views: 0
      };

      onPostCreated(newPost);
    } catch (err) {
      setError("Failed to generate content. Please try again or check your API Key.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8 animate-fade-in-up">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">AI Writer Studio</h2>
        <p className="text-slate-500">Describe what you want to write about, and let GenBlog handle the rest.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Topic or Idea</label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., The benefits of green tea, How to start coding in 2024..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none h-32"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Tone</label>
          <div className="flex flex-wrap gap-2">
            {['Informative', 'Professional', 'Humorous', 'Casual', 'Persuasive'].map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  tone === t 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <button
            onClick={onCancel}
            disabled={isGenerating}
            className="flex-1 px-6 py-3 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !topic.trim()}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all ${
              isGenerating || !topic.trim() ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30'
            }`}
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Generate Post</span>
              </>
            )}
          </button>
        </div>
        
        <div className="text-center text-xs text-slate-400 mt-2">
          Powered by Google Gemini AI
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
