"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation"; // <-- Add this import

interface NavLink {
  label: string;
  href: string;
}

interface ChinawordsNavigationProps {
  logo?: string;
  logoAlt?: string;
  links: NavLink[];
}

const ChinawordsNavigation: React.FC<ChinawordsNavigationProps> = ({
  logo = "/logo.png",
  logoAlt = "Chinawords",
  links,
}) => {
  const { data: session } = useSession();
  const pathname = usePathname(); // <-- Get the pathname
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Process pathname for title
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  const titleSuffix = firstSegment
    ? ` - ${firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1)}`
    : "";
  const dynamicTitle = `China Words${titleSuffix}`;

  // Check if current page is homepage
  const isHomepage = pathname === "/";

  // Handle scroll effect for transparent to solid background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // If not homepage, set isScrolled to true by default
    if (!isHomepage) {
      setIsScrolled(true);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomepage]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    window.location.href = "/";
  };

  return (
    <nav
      className={`nav-chinawords fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? (isHomepage ? "py-2 shadow-md" : "py-1 shadow-md") : "py-5"
      }`}
    >
      <div className="pl-4 pr-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 h-10">
          <div className={`relative ${isScrolled && !isHomepage ? "w-8 h-8" : "w-10 h-10"} flex-shrink-0 transition-all duration-300`}>
            <Image
              src={logo}
              alt={logoAlt}
              width={isScrolled && !isHomepage ? 32 : 40}
              height={isScrolled && !isHomepage ? 32 : 40}
              className="object-contain"
            />
          </div>
          <div className="flex items-center pl-1 h-10">
            <span className={`font-bold font-serif-sc text-black ${isScrolled && !isHomepage ? "text-xl" : "text-2xl"} transition-all duration-300 translate-y-[5px]`}>
              {dynamicTitle}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1.5">
          {/* Only show navigation links on homepage or when not scrolled */}
          {(isHomepage || !isScrolled) && links
            .filter((link) => link.label !== "注册/登录")
            .map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="nav-link font-medium font-sans-sc hover:text-film-red relative overflow-hidden group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-film-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            ))}

          {/* Project Progress Link - only show on homepage or when not scrolled */}
          {(isHomepage || !isScrolled) && (
            <Link
              href="/progress"
              className="nav-link font-medium font-sans-sc hover:text-film-red relative overflow-hidden group"
            >
              项目进度
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-film-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          )}

          {/* User Menu or Login/Register Link - always visible */}
          {session ? (
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className={`nav-link font-medium font-sans-sc hover:text-film-red flex items-center gap-1 relative overflow-hidden group`}
                style={{ fontSize: isScrolled && !isHomepage ? '0.875rem' : '1.125rem' }}
              >
                <span>{session.user.username}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isUserMenuOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                  />
                </svg>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-film-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    href="/profile"
                    className={`block px-4 py-2 ${isScrolled && !isHomepage ? "text-xs" : "text-sm"} text-gray-700 hover:bg-gray-100 font-sans-sc`}
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    个人资料
                  </Link>
                  <Link
                    href="/upload"
                    className={`block px-4 py-2 ${isScrolled && !isHomepage ? "text-xs" : "text-sm"} text-gray-700 hover:bg-gray-100 font-sans-sc`}
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    上传内容
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className={`block w-full text-left px-4 py-2 ${isScrolled && !isHomepage ? "text-xs" : "text-sm"} text-gray-700 hover:bg-gray-100 font-sans-sc`}
                  >
                    退出登录
                  </button>
                </div>
              )}
            </div>
          ) : (
            links.find((link) => link.label === "注册/登录") && (
              <Link
                href={
                  links.find((link) => link.label === "注册/登录")?.href ||
                  "/login"
                }
                className={`nav-link font-medium font-sans-sc hover:text-film-red relative overflow-hidden group`}
                style={{ fontSize: isScrolled && !isHomepage ? '0.875rem' : '1.125rem' }}
              >
                注册/登录
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-film-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            )
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-film-red"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-porcelain-white shadow-md transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        <div className="px-6">
          <div className="flex flex-col space-y-3">
            {/* Only show navigation links on homepage or when not scrolled */}
            {(isHomepage || !isScrolled) && links
              .filter((link) => link.label !== "注册/登录")
              .map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="py-2 px-4 hover:bg-ink-gray rounded-md text-dark-gray font-sans-sc"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

            {/* Project Progress Link (Mobile) - only show on homepage or when not scrolled */}
            {(isHomepage || !isScrolled) && (
              <Link
                href="/progress"
                className="py-2 px-4 hover:bg-ink-gray rounded-md text-dark-gray font-sans-sc"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                项目进度
              </Link>
            )}

            {/* User Menu or Login/Register Link (Mobile) */}
            {session ? (
              <>
                <Link
                  href="/profile"
                  className={`py-2 px-4 hover:bg-ink-gray rounded-md text-dark-gray font-sans-sc ${isScrolled && !isHomepage ? "text-sm" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  个人资料
                </Link>
                <Link
                  href="/upload"
                  className={`py-2 px-4 hover:bg-ink-gray rounded-md text-dark-gray font-sans-sc ${isScrolled && !isHomepage ? "text-sm" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  上传内容
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className={`w-full text-left py-2 px-4 hover:bg-ink-gray rounded-md text-dark-gray font-sans-sc ${isScrolled && !isHomepage ? "text-sm" : ""}`}
                >
                  退出登录
                </button>
              </>
            ) : (
              links.find((link) => link.label === "注册/登录") && (
                <Link
                  href={
                    links.find((link) => link.label === "注册/登录")?.href ||
                    "/login"
                  }
                  className={`py-2 px-4 hover:bg-ink-gray rounded-md text-dark-gray font-sans-sc ${isScrolled && !isHomepage ? "text-sm" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  注册/登录
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ChinawordsNavigation;
