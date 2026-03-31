import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Himanshu Kumar | AI/ML & GenAI Engineer",
  description: "AI/ML Developer | Open Source Builder | Creator of RUN-GIT - Building Tools That Solve Real Problems",
  keywords: ["AI", "ML", "GenAI", "Machine Learning", "Open Source", "Developer", "Portfolio"],
  authors: [{ name: "Himanshu Kumar" }],
  openGraph: {
    title: "Himanshu Kumar | AI/ML & GenAI Engineer",
    description: "Building Tools That Solve Real Problems - AI/ML Developer & Open Source Builder",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Himanshu Kumar | AI/ML & GenAI Engineer",
    description: "Building Tools That Solve Real Problems",
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
