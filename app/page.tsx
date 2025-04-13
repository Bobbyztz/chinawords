import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center paper-bg">
      <div className="max-w-md mx-auto text-center p-8 bg-white/80 rounded-md shadow-sm">
        <h1 className="handwritten-title text-4xl mb-6">Sketchbook Gallery</h1>
        <p className="mb-8 text-gray-700">
          Explore our elegant sketchbook-style image gallery featuring artwork and photography
          presented in a clean, minimalist design inspired by an artist's portfolio.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/refined-gallery"
            className="px-6 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-md shadow-sm transition-colors"
          >
            View Gallery
          </Link>
          <Link
            href="/gallery"
            className="px-6 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-md shadow-sm transition-colors"
          >
            Original Version
          </Link>
        </div>
      </div>
    </div>
  );
}
