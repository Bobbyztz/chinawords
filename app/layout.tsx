import type { Metadata } from "next";
import "./globals.css";
import "./assets/textures/paper-texture-refined.css";
import "./assets/textures/chinese-frame.css";
import "./assets/styles/biophilic-design.css";

export const metadata: Metadata = {
  title: "Chinawords",
  description: "从衣、食、住、行到历史人文，探索中国传统与创新的精彩故事",
  keywords: ["中国文化", "中国生活方式", "中国传统", "中国创新", "衣食住行", "中国美学", "文化遗产"],
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
