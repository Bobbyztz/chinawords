import type { Metadata } from "next";
import "./globals.css";
import "./assets/textures/paper-texture-refined.css";
import "./assets/textures/chinese-frame.css";
import "./assets/styles/biophilic-design.css";
import "./assets/styles/chinawords-design.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "寰语·中国 | Chinawords - 探索中国传统与创新的生活方式",
  description: "寰语·中国致力于记录和分享当代中国的生活方式与文化创新，从衣食住行到历史人文，展现中国故事的多元与魅力。探索中国传统与现代的完美融合。",
  keywords: [
    "中国文化",
    "中国生活方式",
    "中国传统",
    "中国创新",
    "衣食住行",
    "中国美学",
    "文化遗产",
    "中国时尚",
    "中国美食",
    "中国建筑",
    "中国交通",
    "中国娱乐",
    "文化体验",
    "寰语中国",
    "chinawords"
  ],
  authors: [{ name: "Chinawords Team" }],
  creator: "Chinawords",
  publisher: "Chinawords",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL("https://chinawords.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "寰语·中国 | Chinawords - 探索中国传统与创新的生活方式",
    description: "寰语·中国致力于记录和分享当代中国的生活方式与文化创新，从衣食住行到历史人文，展现中国故事的多元与魅力。",
    url: "https://chinawords.com",
    siteName: "Chinawords",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Chinawords Logo",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "寰语·中国 | Chinawords - 探索中国传统与创新的生活方式",
    description: "寰语·中国致力于记录和分享当代中国的生活方式与文化创新，从衣食住行到历史人文，展现中国故事的多元与魅力。",
    images: ["/logo.png"],
    creator: "@chinawords",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: "文化",
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
        <Analytics />
      </body>
    </html>
  );
}
