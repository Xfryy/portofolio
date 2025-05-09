import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Faatih | Web Developer",
  description: "Personal portfolio of Muhammad faatih, a Design Engineer focused on building beautiful digital experiences",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.className}>
      <body className="bg-[#0A0D11] text-gray-100 min-h-screen bg-gradient-to-br from-[#0A0D11] via-[#121a24] to-[#0A0D11]">
        <div className="fixed inset-0 z-0">
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-radial from-blue-900/20 to-transparent opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-purple-900/20 to-transparent opacity-20 blur-3xl"></div>
        </div>
        <div className="fixed inset-0 z-0 bg-[url('/grid.svg')] bg-center opacity-5"></div>
        <Navbar />
        <main className="container mx-auto px-4 pt-20 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}