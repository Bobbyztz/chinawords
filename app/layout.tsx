import type { Metadata } from "next";
import "./globals.css";
import "./assets/textures/paper-texture-refined.css";
import "./assets/textures/chinese-frame.css";

export const metadata: Metadata = {
  title: "China Words Gallery",
  description: "An elegant gallery showcasing Chinese culture, food, travel, and urban life through a collection of curated images.",
  keywords: ["China", "gallery", "Chinese culture", "food", "travel", "photography", "urban China"],
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
