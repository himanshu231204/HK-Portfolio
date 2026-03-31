'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Check } from 'lucide-react';
import { Github, Linkedin, Twitter } from '@/components/SocialIcons';
import ContactCard from '@/components/ContactCard';

const contactDetails = [
  {
    icon: <Mail className="text-indigo-400" size={22} />,
    label: 'Email',
    value: 'himanshu231204@gmail.com',
    href: 'mailto:himanshu231204@gmail.com',
  },
  {
    icon: <Github className="text-white" size={22} />,
    label: 'GitHub',
    value: 'github.com/himanshu231204',
    href: 'https://github.com/himanshu231204',
  },
  {
    icon: <Linkedin className="text-blue-400" size={22} />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/himanshu231204',
    href: 'https://www.linkedin.com/in/himanshu231204/',
  },
  {
    icon: <Twitter className="text-white" size={22} />,
    label: 'Twitter (X)',
    value: 'twitter.com/himanshu231204',
    href: 'https://twitter.com/himanshu231204',
  },
  {
    icon: <MapPin className="text-red-400" size={22} />,
    label: 'Location',
    value: 'Patna, Bihar, India',
    href: undefined,
  },
];

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:himanshu231204@gmail.com?subject=Portfolio Contact - ${formState.name}&body=${encodeURIComponent(formState.message)}`;
    window.location.href = mailtoLink;
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      
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
            <Mail size={16} />
            <span>Let's Connect</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Let&apos;s build something amazing together</h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {contactDetails.map((info, index) => (
                <ContactCard
                  key={info.label}
                  icon={info.icon}
                  label={info.label}
                  value={info.value}
                  href={info.href}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <label className="block text-sm text-slate-400 mb-2">Name</label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors text-slate-300"
                  placeholder="Your name"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <label className="block text-sm text-slate-400 mb-2">Email</label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors text-slate-300"
                  placeholder="your@email.com"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <label className="block text-sm text-slate-400 mb-2">Message</label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors text-slate-300 resize-none"
                  placeholder="Your message..."
                />
              </motion.div>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
              >
                {isSubmitted ? (
                  <>
                    <Check size={20} /> Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={20} /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
