import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {cn} from "@/lib/utils";
import {Header} from "@/components/header";
import {Toaster} from "@/components/ui/toaster";
import "@/styles/globals.css";
import Providers from "@/components/providers";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Kinda Reddit",
  description: "A Reddit clone built with Next.js",
};

interface Props {
  children: React.ReactNode;
  authModal: React.ReactNode;
}

const RootLayout = ({children, authModal}: Props) => {
  return (
    <html
      lang="en"
      className={cn("bg-white text-slate-900 antialiased", inter.className)}
    >
      <Providers>
        <body className="min-h-screen bg-slate-50 antialiased">
          <Header />
          <main className="container max-w-7xl mx-auto h-full pt-12">
            {children}
          </main>
          {authModal}
          <Toaster />
        </body>
      </Providers>
    </html>
  );
};

export default RootLayout;
