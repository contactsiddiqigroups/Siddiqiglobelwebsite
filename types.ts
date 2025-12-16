export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  views: number;
}

export interface AnalyticsData {
  name: string;
  views: number;
  visitors: number;
}

export enum AppView {
  HOME = 'HOME',
  READ_POST = 'READ_POST',
  CREATE_POST = 'CREATE_POST',
  ANALYTICS = 'ANALYTICS'
}