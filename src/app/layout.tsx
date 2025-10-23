import { Geist, Geist_Mono } from "next/font/google";
import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import "./globals.css";

import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hi!!! todo",
  description: "todotodotodotodo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 试试看: bg-[#F8F7F5] */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-5xl mx-auto`}
      >
        <Nav />
        {/* The height of nav and footer is 15*spacing */}
        <main className="w-full min-h-[calc(100vh_-_var(--spacing)*30)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
