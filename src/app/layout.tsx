import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as verified variable
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SubLet - Bachelor Mess & Sublet Rental in Dhaka",
  description: "Find your perfect mess seat or sublet in Dhaka city.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <body
        className={`${inter.variable} min-h-screen bg-[#EEF0E9] font-sans text-gray-900 antialiased flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
