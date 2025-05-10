import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";

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
    <html lang="en" className={geist.className} suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
          {/* Enhanced background gradients */}
          <div className="fixed inset-0 z-0">
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-radial from-blue-900/20 via-blue-900/10 to-transparent opacity-20 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-purple-900/20 via-purple-900/10 to-transparent opacity-20 blur-3xl"></div>
            <div className="absolute top-1/3 left-1/4 w-1/3 h-1/3 bg-gradient-radial from-cyan-900/20 via-cyan-900/10 to-transparent opacity-10 blur-3xl"></div>
          </div>
          <div className="fixed inset-0 z-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] opacity-5"></div>
          
          {/* Changed to relative positioning for better transitions */}
          <div className="relative flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 pt-20 relative z-10">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
