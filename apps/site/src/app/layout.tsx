import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Monitor } from "lucide-react";
import "./globals.css";
import Nav from "@/components/Nav";
import OverlookMount from "@/components/OverlookMount";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "overlookly — accessibility feedback for agents",
  description:
    "Click an element. Get the issue, the fix, and the selector — ready to hand to Claude Code, Cursor, or whatever you're shipping with.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
        <div className="md:hidden flex items-center gap-2 bg-[#f7f6f2] px-4 py-2.5 text-[12px] text-[#121212]/70">
          <Monitor className="size-3.5" />
          overlookly is currently desktop only.
        </div>

        <div className="md:hidden">
          <Nav variant="mobile" />
        </div>

        <div className="flex-1 md:flex md:justify-center">
          <div className="md:flex md:max-w-[1040px] md:w-full md:p-[60px] md:gap-x-10">
            <div className="hidden md:block md:w-28 md:shrink-0">
              <Nav variant="desktop" />
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <main className="px-5 py-10 md:px-0 md:py-0 md:max-w-[640px]">{children}</main>
              <footer className="text-[12px] text-[#121212]/50 tracking-[-0.08px] leading-[140%] px-5 md:px-0 pb-8 pt-10 mt-auto">
                <a
                  href="https://www.sicarlos.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#121212]/50 hover:text-[#121212]/70 no-underline transition-colors"
                >
                  Made by Carlos
                </a>
                {" · "}
                <a
                  href="/colophon"
                  className="text-[#121212]/50 hover:text-[#121212]/70 no-underline transition-colors"
                >
                  Colophon
                </a>
              </footer>
            </div>
          </div>
        </div>

        <OverlookMount />
      </body>
    </html>
  );
}
