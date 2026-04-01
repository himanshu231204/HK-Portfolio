import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://himanshukumar.me'),
  title: {
    default: "Himanshu Kumar | AI/ML & GenAI Engineer",
    template: "%s | Himanshu Kumar",
  },
  description: "AI/ML Developer | Open Source Builder | Creator of RUN-GIT - Building Tools That Solve Real Problems",
  keywords: ["AI", "ML", "GenAI", "Machine Learning", "Open Source", "Developer", "Portfolio", "Himanshu Kumar"],
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
    title: "Himanshu Kumar | AI/ML & GenAI Engineer",
    description: "Building Tools That Solve Real Problems - AI/ML Developer & Open Source Builder",
    url: "https://himanshukumar.me",
    siteName: "Himanshu Kumar Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Himanshu Kumar Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Himanshu Kumar | AI/ML & GenAI Engineer",
    description: "Building Tools That Solve Real Problems",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geist.variable} min-h-screen bg-[#030014] dark:bg-[#030014] light:bg-slate-50 text-slate-50 dark:text-slate-50 light:text-slate-900 antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
