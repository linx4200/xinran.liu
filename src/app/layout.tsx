import { Geist } from "next/font/google";
import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import { FloatingToggle as DeveloperModeFloatingToggle } from '@/app/components/developer-mode/FloatingToggle';
import "./globals.css";

import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xinran Liu | Independent Web Developer",
  description: "Xinran Liu is an independent web developer specializing in building fast, reliable, and scalable web applications using React, Vue, and Next.js. Available for freelance collaborations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistSans.className} antialiased w-5xl mx-auto`}
      >
        <Nav />
        {/* The height of nav and footer is 15*spacing */}
        <main className="w-full min-h-[calc(100vh_-_var(--spacing)*30)]">
          {children}
        </main>
        <DeveloperModeFloatingToggle />
        <Footer />
      </body>
    </html>
  );
}
