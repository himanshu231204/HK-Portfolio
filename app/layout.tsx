import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://himanshukumar.me'),
  title: {
    default: "Himanshu Kumar | AI Engineer",
    template: "%s | Himanshu Kumar",
  },
  description: "AI engineer building agentic systems, LLM infrastructure and developer tools. Founder of OpenAgentHQ, creator of run-git and openagent-eval.",
  keywords: ["AI Engineer", "LLM", "GenAI", "RAG", "Agentic Systems", "MCP", "Open Source", "Developer Tools", "Himanshu Kumar"],
  authors: [{ name: "Himanshu Kumar" }],
  creator: "Himanshu Kumar",
  publisher: "Himanshu Kumar",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Himanshu Kumar | AI Engineer",
    description: "Building agentic systems, LLM infrastructure and developer tools in the open.",
    url: "https://himanshukumar.me",
    siteName: "Himanshu Kumar",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Himanshu Kumar — AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Himanshu Kumar | AI Engineer",
    description: "Building agentic systems, LLM infrastructure and developer tools in the open.",
    creator: "@himanshu231204",
    images: ["/og-image.svg"],
  },
  alternates: {
    canonical: "https://himanshukumar.me",
    languages: {
      en: "https://himanshukumar.me",
    },
  },
};

/**
 * Runs before first paint so the stored theme is applied without a flash of
 * the wrong palette. ThemeProvider then reads the class this sets rather than
 * touching localStorage during render (which desynced server and client HTML).
 */
const noFlashTheme = `
(function() {
  try {
    var stored = localStorage.getItem('portfolio-theme');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.classList.add(theme);
    document.documentElement.style.colorScheme = theme;
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashTheme }} />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} min-h-screen bg-bg text-ink antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:border focus:border-line-strong focus:bg-surface focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
