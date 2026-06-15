import type { Metadata } from "next";
import { Work_Sans, Outfit } from "next/font/google";
import Chatbot from "@/components/Chatbot";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Ambeer Shravan Kumar | AI/ML Engineer",
  description: "Portfolio of Ambeer Shravan Kumar, AI/ML Engineer and Software Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${workSans.variable} ${outfit.variable} antialiased bg-background text-foreground min-h-screen selection:bg-primary/30 selection:text-white`}>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
