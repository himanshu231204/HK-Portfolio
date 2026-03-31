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

export interface FeaturedProject {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  github: string;
  tags: string[];
  featured: boolean;
}

export interface FeaturedProjectsData {
  projects: FeaturedProject[];
}
