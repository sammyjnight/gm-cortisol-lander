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
  title: "Genius Mind | Cortisol Is Shrinking Your Brain — Here's How to Stop It",
  description:
    "Every high-pressure year you've run this business, cortisol has been shrinking your hippocampus. 16 clinically-dosed ingredients to protect what you've built.",
  openGraph: {
    title: "Genius Mind | Cortisol Is Shrinking Your Brain",
    description:
      "The region responsible for pattern recognition, fast recall, and sharp instinct — shrinking under chronic stress. Protect it.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
