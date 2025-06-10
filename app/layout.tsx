import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navigation/navbar";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Appsolutely Useless - The World's Most Pointless Games",
  description:
    "A collection of the dumbest, most pointless mini-games ever created. Waste your time with purpose!",
  keywords:
    "useless games, pointless apps, funny games, time waster, mini games",
  authors: [{ name: "Appsolutely Useless Team" }],
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .safe-area-inset-bottom {
              padding-bottom: env(safe-area-inset-bottom);
            }
            .safe-area-inset-top {
              padding-top: env(safe-area-inset-top);
            }
          `,
          }}
        />
      </head>
      <body
        className={`${inter.className} h-full bg-gradient-to-br from-purple-50 via-white to-teal-50`}
      >
        <div className="min-h-full flex flex-col">
          <Navbar />
          <div className="fixed bottom-4 right-4 z-50">
            <a
              href="https://bolt.new/"
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-all duration-300 hover:shadow-2xl"
            >
              <img
                src="https://storage.bolt.army/black_circle_360x360.png"
                alt="Built with Bolt.new badge"
                className="w-20 h-20 md:w-28 md:h-28 rounded-full shadow-lg  "
              />
            </a>
          </div>
          <main className="flex-1 pb-20 md:pb-4">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
