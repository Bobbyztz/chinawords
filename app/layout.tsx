import type { Metadata } from "next";
import "./globals.css";
import "./assets/textures/paper-texture-refined.css";
import "./assets/textures/chinese-frame.css";
import "./assets/styles/biophilic-design.css";

export const metadata: Metadata = {
  title: "Eco Biophilic Hub",
  description: "An environmental organization dedicated to creating sustainable, nature-inspired spaces that promote wellbeing and protect our planet.",
  keywords: ["environment", "sustainability", "biophilic design", "nature", "eco-friendly", "community", "green initiatives"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-background">
        {children}
      </body>
    </html>
  );
}
