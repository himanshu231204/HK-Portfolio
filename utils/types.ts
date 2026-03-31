export interface LinkedInPost {
  id: number;
  title: string;
  description: string;
  date: string;
  url: string;
  likes: number;
  comments: number;
  shares: number;
}

export interface LinkedInData {
  profileUrl: string;
  posts: LinkedInPost[];
}
