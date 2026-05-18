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
  title: "Mars Men | Crush Cortisol Belly With This Natural T Upgrade",
  description:
    "8 ingredients. One formula. Zero BS. Drop your cortisol, free your testosterone, and watch the belly disappear while energy skyrockets.",
  openGraph: {
    title: "Mars Men | Natural Testosterone Support",
    description:
      "See how 429,576+ men over 30 are burning fat, building strength, and getting results that show.",
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
