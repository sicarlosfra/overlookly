import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
      <body className="min-h-screen">
        {/* Mobile top bar — full width, standard pattern */}
        <div className="md:hidden">
          <Nav variant="mobile" />
        </div>

        {/*
          Desktop: the whole sidebar+content block is centered together
          as one unit on the page, with margin on both far edges of the
          viewport — the sidebar is NOT pinned to the browser's left edge.
        */}
        <div className="md:flex md:justify-center">
          <div className="md:flex md:max-w-[1040px] md:w-full">
            <div className="hidden md:block md:w-56 md:shrink-0">
              <Nav variant="desktop" />
            </div>
            <main className="flex-1 min-w-0 px-5 md:px-10">{children}</main>
          </div>
        </div>
        <OverlookMount />
      </body>
    </html>
  );
}
