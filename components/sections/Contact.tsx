'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Check, AlertCircle, Loader2, MessageCircle } from 'lucide-react';
import { Github, Linkedin, Twitter } from '@/components/SocialIcons';
import ContactCard from '@/components/ContactCard';

// Replace with your actual EmailJS credentials
// Get these from https://dashboard.emailjs.com/
const EMAILJS_SERVICE_ID = 'service_ia5d169';
const EMAILJS_TEMPLATE_ID = 'template_d0tklgf';
const EMAILJS_PUBLIC_KEY = 'oUJj8uRxsyz1H-3sm';

const contactDetails = [
  {
    icon: <Mail className="text-indigo-400" size={22} />,
    label: 'Email',
    value: 'himanshu231204@gmail.com',
    href: 'mailto:himanshu231204@gmail.com',
    copyText: 'himanshu231204@gmail.com',
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
    icon: <MessageCircle className="text-green-400" size={22} />,
    label: 'WhatsApp',
    value: '+91-8777579795',
    href: 'https://wa.me/918777579795',
    copyText: '+918777579795',
  },
  {
    icon: <MapPin className="text-red-400" size={22} />,
    label: 'Location',
    value: 'Patna, Bihar, India',
    href: undefined,
  },
];

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formState.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setStatus('loading');
    
    try {
      // Dynamic import for EmailJS (works in client-side only)
      const emailjs = await import('@emailjs/browser');
      
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formState.name,
          from_email: formState.email,
          subject: formState.subject,
          message: formState.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      
      setStatus('success');
      setFormState({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
      
      // Reset error status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
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
            <span>Let&apos;s Connect</span>
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
                  copyText={info.copyText}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </motion.div>

          {/* Contact Form with EmailJS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <label className="block text-sm text-slate-400 mb-2">Name *</label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                  disabled={status === 'loading'}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none transition-colors text-slate-300 placeholder:text-slate-600 ${
                    errors.name 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-slate-800 focus:border-indigo-500'
                  }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.name}
                  </p>
                )}
              </motion.div>
              
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <label className="block text-sm text-slate-400 mb-2">Email *</label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  disabled={status === 'loading'}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none transition-colors text-slate-300 placeholder:text-slate-600 ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-slate-800 focus:border-indigo-500'
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.email}
                  </p>
                )}
              </motion.div>
              
              {/* Subject Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                <label className="block text-sm text-slate-400 mb-2">Subject *</label>
                <input
                  type="text"
                  value={formState.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  required
                  disabled={status === 'loading'}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none transition-colors text-slate-300 placeholder:text-slate-600 ${
                    errors.subject 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-slate-800 focus:border-indigo-500'
                  }`}
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.subject}
                  </p>
                )}
              </motion.div>
              
              {/* Message Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <label className="block text-sm text-slate-400 mb-2">Message *</label>
                <textarea
                  value={formState.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  required
                  disabled={status === 'loading'}
                  rows={5}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none transition-colors text-slate-300 placeholder:text-slate-600 resize-none ${
                    errors.message 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-slate-800 focus:border-indigo-500'
                  }`}
                  placeholder="Your message..."
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.message}
                  </p>
                )}
              </motion.div>
              
              {/* Status Messages */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400"
                >
                  <Check size={20} />
                  <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                </motion.div>
              )}
              
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400"
                >
                  <AlertCircle size={20} />
                  <span>Failed to send message. Please try again or email me directly.</span>
                </motion.div>
              )}
              
              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={status === 'loading' ? {} : { scale: 1.02 }}
                whileTap={status === 'loading' ? {} : { scale: 0.98 }}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : status === 'success' ? (
                  <>
                    <Check size={20} />
                    <span>Sent!</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
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