'use client';

import { createContext, useCallback, useContext, useSyncExternalStore, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio-theme';

/* -------------------------------------------------------------------------
 * The class on <html> is the source of truth. The inline script in
 * app/layout.tsx sets it before first paint, so the theme is external state
 * that React subscribes to rather than something React owns — which is why
 * this reads through useSyncExternalStore instead of syncing state in an
 * effect (the previous approach risked a hydration mismatch).
 * ---------------------------------------------------------------------- */

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains('light') ? 'light' : 'dark';
}

/** The server has no DOM; layout.tsx's default matches this. */
function getServerSnapshot(): Theme {
  return 'dark';
}

function applyTheme(next: Theme) {
  const root = document.documentElement;
  root.classList.remove('dark', 'light');
  root.classList.add(next);
  root.style.colorScheme = next;

  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this session.
  }

  listeners.forEach((listener) => listener());
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => applyTheme(next), []);

  const toggleTheme = useCallback(
    () => applyTheme(theme === 'dark' ? 'light' : 'dark'),
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
