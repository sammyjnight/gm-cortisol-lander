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
  title: "Genius Mind | End the 3PM Cognitive Crash Naturally",
  description:
    "16 clinically studied ingredients. One formula. Zero BS. Fix your neurochemistry, extend your decision window, and perform at your peak all day.",
  openGraph: {
    title: "Genius Mind | Cognitive Infrastructure for Operators",
    description:
      "See how 100,000+ operators are extending their decision window, eliminating brain fog, and sustaining peak output all day.",
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
