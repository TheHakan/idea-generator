import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Idea Generator – Community Idea Board",
  description: "A community-driven idea board built with Next.js and Supabase. Submit, upvote, and discover the best ideas!",
  keywords: [
    "idea generator",
    "community ideas",
    "nextjs",
    "supabase",
    "upvote",
    "feature requests",
    "feedback board"
  ],
  authors: [{ name: "TheHakan" }],
  openGraph: {
    title: "Idea Generator – Community Idea Board",
    description: "A community-driven idea board built with Next.js and Supabase. Submit, upvote, and discover the best ideas!",
    siteName: "Idea Generator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Idea Generator – Community Idea Board",
    description: "A community-driven idea board built with Next.js and Supabase. Submit, upvote, and discover the best ideas!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
