'use client';

import { useTheme } from '@/components/ThemeProvider';
import { useEffect } from 'react';

export default function ThemeClassLoader({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  useEffect(() => {
    // Apply theme class to document for Tailwind dark mode
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  return <>{children}</>;
}