import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Genius Mind | Your Brain Isn\u2019t Tired. It\u2019s Running On What Cortisol Left Behind.",
  description:
    "16 clinically studied ingredients. One formula. Zero BS. Restore what cortisol depleted. Cognitive infrastructure for operators who demand more.",
  openGraph: {
    title: "Genius Mind | Cognitive Infrastructure for Operators",
    description:
      "See how operators are restoring cognitive chemistry, extending their decision window, and sustaining peak output all day.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
