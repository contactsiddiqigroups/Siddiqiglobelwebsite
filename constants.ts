import { BlogPost, AnalyticsData } from './types';

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of AI in Mobile Development',
    excerpt: 'How artificial intelligence is reshaping the way we build and deploy mobile applications.',
    content: `Artificial Intelligence is no longer just a buzzword; it's a fundamental shift in how we approach software development. In the mobile space, this is particularly evident. 
    
    From predictive text to personalized user experiences, AI is embedded in the fabric of modern apps. But what does the future hold? We are looking at on-device LLMs, smarter push notifications, and adaptive interfaces that change based on user behavior.
    
    Developers who ignore this trend risk being left behind. The integration of tools like Google's Gemini allows for features we could only dream of five years ago.`,
    author: 'Sarah Khan',
    date: 'Oct 24, 2023',
    readTime: '5 min read',
    category: 'Technology',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    views: 1240
  },
  {
    id: '2',
    title: 'Minimalism: A Guide to Digital Detox',
    excerpt: 'Reclaiming your time and attention in an increasingly noisy digital world.',
    content: `We live in an economy of attention. Every app, every notification is fighting for a slice of your mental bandwidth. Minimalism isn't just about having fewer things; it's about making space for what matters.
    
    A digital detox doesn't mean throwing away your phone. It means curating your feeds, turning off non-essential notifications, and being intentional about your screen time.`,
    author: 'Ali Raza',
    date: 'Oct 22, 2023',
    readTime: '3 min read',
    category: 'Lifestyle',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    views: 890
  },
  {
    id: '3',
    title: 'Top 10 Hidden Gems in Northern Pakistan',
    excerpt: 'Exploring the untouched beauty of the mountains beyond the popular tourist spots.',
    content: `While Hunza and Skardu get all the glory, there are valleys tucked away that offer even more pristine beauty without the crowds.
    
    1. Kumrat Valley: A dense forest paradise.
    2. Yarkhun Valley: Remote and rugged.
    3. Phander Lake: The clearest blue waters you've ever seen.
    
    Packing for these trips requires preparation, but the solitude is worth every effort.`,
    author: 'Travel with Hamza',
    date: 'Oct 20, 2023',
    readTime: '7 min read',
    category: 'Travel',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    views: 3400
  }
];

export const INITIAL_ANALYTICS: AnalyticsData[] = [
  { name: 'Mon', views: 400, visitors: 240 },
  { name: 'Tue', views: 300, visitors: 139 },
  { name: 'Wed', views: 200, visitors: 980 },
  { name: 'Thu', views: 278, visitors: 390 },
  { name: 'Fri', views: 189, visitors: 480 },
  { name: 'Sat', views: 239, visitors: 380 },
  { name: 'Sun', views: 349, visitors: 430 },
];
