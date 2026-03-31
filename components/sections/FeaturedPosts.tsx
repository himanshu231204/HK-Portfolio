'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Linkedin } from '@/components/SocialIcons';
import PostCard from '@/components/PostCard';

interface FeaturedPost {
  id: number;
  title: string;
  date: string;
  description: string;
  link: string;
}

interface FeaturedPostsData {
  profileUrl: string;
  posts: FeaturedPost[];
}

export default function FeaturedPosts() {
  const [posts, setPosts] = useState<FeaturedPost[]>([]);
  const [profileUrl, setProfileUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/data/featuredPosts.json');
        if (!response.ok) {
          throw new Error('Failed to fetch featured posts');
        }
        const data: FeaturedPostsData = await response.json();
        
        // Sort by date (newest first)
        const sortedPosts = data.posts.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        setPosts(sortedPosts);
        setProfileUrl(data.profileUrl);
      } catch (err) {
        console.error('Error loading featured posts:', err);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Featured <span className="gradient-text">Posts</span>
            </h2>
            <p className="text-slate-400">Sharing what I build and learn in public</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass rounded-2xl p-6 animate-pulse">
                <div className="w-12 h-12 rounded-xl bg-white/10 mb-4" />
                <div className="h-4 bg-white/10 rounded w-1/3 mb-3" />
                <div className="h-6 bg-white/10 rounded w-3/4 mb-3" />
                <div className="h-16 bg-white/10 rounded w-full mb-4" />
                <div className="h-12 bg-white/10 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-indigo-400 text-sm mb-4"
          >
            <Linkedin size={16} />
            <span>Featured Posts</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Sharing what I <span className="gradient-text">build</span> and <span className="gradient-text">learn</span> in public
          </h2>
          
          <p className="text-slate-400 max-w-2xl mx-auto">
            A curated collection of my best posts about AI/ML, open source, and developer tools.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <PostCard
              key={post.id}
              title={post.title}
              description={post.description}
              date={post.date}
              link={post.link}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <motion.a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 glass hover:bg-white/10 rounded-xl font-medium transition-colors"
          >
            <Linkedin size={20} className="text-blue-500" />
            View All on LinkedIn <ExternalLink size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
