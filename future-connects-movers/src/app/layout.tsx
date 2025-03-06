import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-geist',
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: "Future Connects | Moving Services in DMV Area",
  description: "Professional moving services for residential and commercial clients in the DC, Maryland, and Virginia area.",
  keywords: "moving company, movers, DMV area, DC movers, Maryland movers, Virginia movers, residential moving, commercial moving",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 ml-20 lg:ml-64 min-h-screen flex flex-col">
            <main className="flex-grow pt-6 px-4 md:px-8">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
