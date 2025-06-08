import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from '@/components/AuthProvider';
import MusicPlayer from '@/components/MusicPlayer';
import { playlist } from '@/config/music';

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "M. Faatih | Portofolio",
  description: "Personal portfolio of Muhammad Faatih, a Web Developer focused on building beautiful digital experiences",
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
    <html lang="en" className={`${geist.className} overflow-x-hidden`} suppressHydrationWarning>
      <body className="min-h-screen overflow-x-hidden bg-background">
        <AuthProvider>
          <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
              {/* Enhanced background gradients with better mobile performance */}
              <div className="fixed inset-0 z-0 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-radial from-blue-900/20 via-blue-900/10 to-transparent opacity-20 blur-3xl transform-gpu"></div>
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-purple-900/20 via-purple-900/10 to-transparent opacity-20 blur-3xl transform-gpu"></div>
                <div className="absolute top-1/3 left-1/4 w-1/3 h-1/3 bg-gradient-radial from-cyan-900/20 via-cyan-900/10 to-transparent opacity-10 blur-3xl transform-gpu"></div>
              </div>
              <div className="fixed inset-0 z-0 bg-center [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] opacity-5"></div>
              
              {/* Changed to relative positioning with width constraint */}
              <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden">
                <Navbar />
                <main className="flex-grow w-full relative z-10">
                  <div className="container mx-auto px-4 pt-20">
                    {children}
                  </div>
                </main>
                <Footer />
                <MusicPlayer playlist={playlist} />
              </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
