import { Geist, Geist_Mono } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { FloatingToggle as DeveloperModeFloatingToggle } from '@/components/developer-mode/FloatingToggle';
import { Info as DeveloperModePopUpInfo } from '@/components/developer-mode/Info';

import "@/styles/globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xinran Liu | Independent Web Developer",
  description: "Xinran Liu is an independent web developer specializing in building fast, reliable, and scalable web applications using React, Vue, and Next.js. Available for freelance collaborations.",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    // todo: lang
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistSans.className} ${geistMono.variable} antialiased w-5xl mx-auto`}
      >
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Nav />
        {/* The height of nav and footer is 15*spacing */}
        <main id="main-content" className="w-full min-h-[calc(100vh_-_var(--spacing)*30)]" role="main">
          {children}
        </main>
        <Footer />
        <DeveloperModeFloatingToggle />
        <DeveloperModePopUpInfo />
      </body>
    </html>
  );
}
