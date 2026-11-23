import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteHeader from "./_components/site-header";
import SiteFooter from "./_components/site-footer";
import SiteMain from "./_components/site-main";
import { themeBootstrap } from "./_components/theme-config";
import "./globals.css";
import "./_components/site-header.css";
import "./_features/home/programmer-scene.css";
import "./theme.css";
import "./screen-flow.css";
import "./_features/about/orbital-study.css";
import "./_features/work/project-gallery.css";
import "./_features/about/journey-section.css";
import "./_features/skills/skills-section.css";
import "./_features/work/work-details.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Otniel Rahadiyan Sumantri · Software Developer",
  description: "Junior full-stack developer based in Jakarta. Explore Otniel’s web, mobile, real-time, and AI-powered projects, built with TypeScript, React, Next.js, and Node.js.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head><script dangerouslySetInnerHTML={{ __html: themeBootstrap }} /></head>
      <body className="min-h-full flex flex-col">
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        <SiteMain>{children}</SiteMain>
        <SiteFooter />
      </body>
    </html>
  );
}
