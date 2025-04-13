import type { Metadata } from "next";
import "./globals.css";
import "./assets/textures/paper-texture-refined.css";

export const metadata: Metadata = {
  title: "Skeuomorphic Sketchbook Gallery",
  description: "An immersive image gallery with a realistic sketchbook aesthetic featuring photo collections, artwork showcases, and detailed image views.",
  keywords: ["gallery", "sketchbook", "art", "photography", "portfolio", "skeuomorphic"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-amber-50">
        {children}
      </body>
    </html>
  );
}
