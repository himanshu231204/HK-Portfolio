'use client';

import { useState, FormEvent } from 'react';
import { AlertCircle, Check, Loader2, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { Github, Linkedin, Twitter } from '@/components/SocialIcons';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import ContactCard from '@/components/ContactCard';

// EmailJS keys are publishable by design. They are read from env first so a
// deployment can rotate them without a code change; the existing values remain
// as fallbacks so nothing breaks if the vars are not set.
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? 'service_ia5d169';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? 'template_d0tklgf';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? 'oUJj8uRxsyz1H-3sm';

const contactDetails = [
  {
    icon: <Mail size={15} />,
    label: 'Email',
    value: 'himanshu231204@gmail.com',
    href: 'mailto:himanshu231204@gmail.com',
    copyText: 'himanshu231204@gmail.com',
  },
  {
    icon: <Github size={15} />,
    label: 'GitHub',
    value: 'github.com/himanshu231204',
    href: 'https://github.com/himanshu231204',
  },
  {
    icon: <Linkedin size={15} />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/himanshu231204',
    href: 'https://www.linkedin.com/in/himanshu231204/',
  },
  {
    icon: <Twitter size={15} />,
    label: 'Twitter (X)',
    value: 'twitter.com/himanshu231204',
    href: 'https://twitter.com/himanshu231204',
  },
  {
    icon: <MessageCircle size={15} />,
    label: 'WhatsApp',
    value: '+91-8777579795',
    href: 'https://wa.me/918777579795',
    copyText: '+918777579795',
  },
  {
    icon: <MapPin size={15} />,
    label: 'Location',
    value: 'Patna, Bihar, India',
  },
];

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const fieldClass = (hasError: boolean) =>
  `w-full rounded-lg border bg-[var(--bg-subtle)] px-3.5 py-2.5 text-sm text-ink transition-colors placeholder:text-ink-faint focus:outline-none disabled:opacity-60 ${
    hasError
      ? 'border-red-500/60 focus:border-red-500'
      : 'border-[var(--border)] focus:border-[var(--accent-border)]'
  }`;

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

    if (!formState.name.trim()) newErrors.name = 'Name is required';

    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formState.subject.trim()) newErrors.subject = 'Subject is required';

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
    if (!validateForm()) return;

    setStatus('loading');

    try {
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
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (field: keyof FormErrors, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const fieldError = (field: keyof FormErrors) =>
    errors[field] ? (
      <p
        id={`${field}-error`}
        className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
      >
        <AlertCircle size={12} /> {errors[field]}
      </p>
    ) : null;

  return (
    <Section
      id="contact"
      index="10"
      title="Get in touch"
      description="Open to AI/ML and GenAI internships, open source collaboration, or a conversation about agent infrastructure."
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
        {/* Directory */}
        <Reveal>
          <h3 className="mono-label">Direct channels</h3>
          <div className="mt-4">
            {contactDetails.map((info) => (
              <ContactCard
                key={info.label}
                icon={info.icon}
                label={info.label}
                value={info.value}
                href={info.href}
                copyText={info.copyText}
              />
            ))}
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.08}>
          <h3 className="mono-label">Send a message</h3>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs text-ink-muted">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formState.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  disabled={status === 'loading'}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={fieldClass(Boolean(errors.name))}
                  placeholder="Your name"
                />
                {fieldError('name')}
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs text-ink-muted">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formState.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  disabled={status === 'loading'}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={fieldClass(Boolean(errors.email))}
                  placeholder="you@company.com"
                />
                {fieldError('email')}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="mb-1.5 block text-xs text-ink-muted">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                value={formState.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                disabled={status === 'loading'}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                className={fieldClass(Boolean(errors.subject))}
                placeholder="What is this about?"
              />
              {fieldError('subject')}
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-xs text-ink-muted">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                value={formState.message}
                onChange={(e) => handleChange('message', e.target.value)}
                disabled={status === 'loading'}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`${fieldClass(Boolean(errors.message))} resize-none`}
                placeholder="A few lines about what you have in mind."
              />
              {fieldError('message')}
            </div>

            <div aria-live="polite">
              {status === 'success' && (
                <p className="flex items-center gap-2 rounded-lg border border-[var(--positive)]/30 bg-[var(--positive-soft)] px-3.5 py-3 text-sm text-[var(--positive)]">
                  <Check size={16} /> Message sent — I&apos;ll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-3 text-sm text-red-400">
                  <AlertCircle size={16} /> Could not send. Please email me directly.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-hard inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent-contrast)] transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending
                </>
              ) : status === 'success' ? (
                <>
                  <Check size={16} /> Sent
                </>
              ) : (
                <>
                  <Send size={16} /> Send message
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
