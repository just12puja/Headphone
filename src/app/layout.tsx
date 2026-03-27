import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Sony WH-1000XM6 | Silence, perfected.",
  description: "Experience the next generation of noise cancelling headphones. Ultra-premium, perfectly engineered.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-background`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
