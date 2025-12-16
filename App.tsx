import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BlogPost, AppView, AnalyticsData } from './types';
import { INITIAL_POSTS, INITIAL_ANALYTICS } from './constants';
import PostCard from './components/PostCard';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setCurrentView(AppView.READ_POST);
    window.scrollTo(0, 0);
  };

  const handleCreatePost = (newPost: BlogPost) => {
    setPosts([newPost, ...posts]);
    setCurrentView(AppView.HOME);
  };

  // Mobile App-like navigation handler
  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            onClick={() => navigateTo(AppView.HOME)} 
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
              G
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              GenBlog
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => navigateTo(AppView.HOME)}
              className={`text-sm font-medium transition-colors ${currentView === AppView.HOME ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'}`}
            >
              Home
            </button>
            <button 
              onClick={() => navigateTo(AppView.ANALYTICS)}
              className={`text-sm font-medium transition-colors ${currentView === AppView.ANALYTICS ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'}`}
            >
              Analytics
            </button>
            <button 
              onClick={() => navigateTo(AppView.CREATE_POST)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all shadow-md hover:shadow-indigo-500/30"
            >
              Write with AI
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-600"
          >
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               {isMenuOpen ? (
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               ) : (
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
               )}
             </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-slate-100 shadow-xl p-4 flex flex-col gap-4 animate-slide-down">
             <button 
              onClick={() => navigateTo(AppView.HOME)}
              className="p-3 rounded-lg bg-slate-50 text-left font-medium text-slate-700"
            >
              Home Feed
            </button>
             <button 
              onClick={() => navigateTo(AppView.ANALYTICS)}
              className="p-3 rounded-lg bg-slate-50 text-left font-medium text-slate-700"
            >
              Analytics Dashboard
            </button>
            <button 
              onClick={() => navigateTo(AppView.CREATE_POST)}
              className="p-3 rounded-lg bg-indigo-600 text-left font-medium text-white shadow-lg"
            >
              Write New Post
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {currentView === AppView.HOME && (
          <div className="space-y-8 animate-fade-in">
             <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">Latest Stories</h1>
                  <p className="text-slate-500 mt-1">Insights, thoughts, and AI-generated wisdom.</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {posts.map(post => (
                 <PostCard key={post.id} post={post} onClick={handlePostClick} />
               ))}
             </div>
          </div>
        )}

        {currentView === AppView.READ_POST && selectedPost && (
          <PostDetail post={selectedPost} onBack={() => setCurrentView(AppView.HOME)} />
        )}

        {currentView === AppView.CREATE_POST && (
          <CreatePost onPostCreated={handleCreatePost} onCancel={() => setCurrentView(AppView.HOME)} />
        )}

        {currentView === AppView.ANALYTICS && (
          <div className="animate-fade-in space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
               <h2 className="text-xl font-bold text-slate-800 mb-6">Traffic Overview</h2>
               <div className="h-80 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={INITIAL_ANALYTICS} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Area type="monotone" dataKey="views" stroke="#4f46e5" fillOpacity={1} fill="url(#colorViews)" />
                    </AreaChart>
                 </ResponsiveContainer>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-sm text-slate-500 font-medium">Total Posts</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">{posts.length}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-sm text-slate-500 font-medium">Total Views</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">
                  {posts.reduce((acc, curr) => acc + curr.views, 0).toLocaleString()}
                </p>
              </div>
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-sm text-slate-500 font-medium">Top Author</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">AI Assistant</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Button for Mobile (Create) */}
      {currentView === AppView.HOME && (
        <button
          onClick={() => navigateTo(AppView.CREATE_POST)}
          className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center z-50 hover:scale-105 transition-transform"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      )}

      {/* Bottom Nav for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-3 z-40 pb-safe">
        <button 
          onClick={() => navigateTo(AppView.HOME)}
          className={`flex flex-col items-center gap-1 ${currentView === AppView.HOME ? 'text-indigo-600' : 'text-slate-400'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button 
          onClick={() => navigateTo(AppView.ANALYTICS)}
          className={`flex flex-col items-center gap-1 ${currentView === AppView.ANALYTICS ? 'text-indigo-600' : 'text-slate-400'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-[10px] font-medium">Stats</span>
        </button>
      </div>
    </div>
  );
}

export default App;
