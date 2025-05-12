"use client";

import React, { useState, useEffect, useRef } from "react";
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

  // Check if current page is homepage
  const isHomepage = pathname === "/";

  // Initialize isScrolled based on whether we're on the homepage or not
  const [isScrolled, setIsScrolled] = useState(!isHomepage);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null); // Ref for the user menu

  // Process pathname for title
  const segments = pathname.split("/").filter(Boolean);

  // Handle scroll effect for transparent to solid background
  useEffect(() => {
    const handleScroll = () => {
      // Only update isScrolled based on scroll position when on homepage
      if (isHomepage) {
        setIsScrolled(window.scrollY > 20);
      }
    };

    // Add scroll listener only on homepage
    if (isHomepage) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isHomepage]);

  useEffect(() => {
    // Function to handle clicks outside the user menu
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    // Add event listener when the menu is open
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]); // Re-run effect if isUserMenuOpen changes

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
      className={`nav-chinawords w-full z-10 ${
        isScrolled ? (isHomepage ? "py-2" : "py-1") : "py-3"
      }`}
    >
      <div className="pl-4 pr-6 flex justify-between items-center">
        {/* Logo and Navigation Title */}
        <div className="flex items-center gap-2 h-10">
          {/* Logo - clickable to home */}
          <Link href="/" className="flex-shrink-0">
            <div className={`relative w-10 h-10`}>
              <Image
                src={logo}
                alt={logoAlt}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
          </Link>

          {/* Title with breadcrumb navigation */}
          <div className="flex items-center pl-1 h-10">
            <div
              className={`font-bold font-serif-sc text-black text-xl translate-y-[5px] flex items-center`}
            >
              {/* Home link */}
              <Link href="/" className="cursor-pointer hover:text-[#C20F1E]">
                China Words
              </Link>

              {/* Path segments */}
              {segments.length > 0 &&
                segments.map((segment, index) => {
                  // Build the path up to this segment
                  const segmentPath =
                    "/" + segments.slice(0, index + 1).join("/");
                  const capitalizedSegment =
                    segment.charAt(0).toUpperCase() + segment.slice(1);

                  return (
                    <React.Fragment key={index}>
                      {/* Non-clickable dash */}
                      <span className="mx-1"> - </span>

                      {/* Clickable segment */}
                      <Link
                        href={segmentPath}
                        className="cursor-pointer hover:text-[#C20F1E]"
                      >
                        {capitalizedSegment}
                      </Link>
                    </React.Fragment>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1.5">
          {/* Only show navigation links on homepage or when not scrolled */}
          {(isHomepage || !isScrolled) &&
            links
              .filter((link) => link.label !== "注册/登录")
              .map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={`nav-link font-medium font-sans-sc hover:text-film-red relative overflow-hidden group text-sm`}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-film-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              ))}

          {/* Project Progress Link - only show on homepage or when not scrolled */}
          {(isHomepage || !isScrolled) && (
            <Link
              href="/progress"
              className={`nav-link font-medium text-sm hover:text-film-red relative overflow-hidden group `}
            >
              项目进度
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-film-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          )}

          {/* User Menu or Login/Register Link - always visible */}
          {session ? (
            <div className="relative">
              <div
                onClick={toggleUserMenu}
                onKeyDown={(e) => e.key === "Enter" && toggleUserMenu()}
                className="nav-link font-medium text-sm hover:text-film-red relative overflow-hidden group cursor-pointer flex items-center gap-1"
                role="button"
                tabIndex={0}
                aria-haspopup="true"
                aria-expanded={isUserMenuOpen}
              >
                <span>{session.user.username}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isUserMenuOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                  />
                </svg>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-film-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </div>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div
                  ref={userMenuRef} // Assign ref to the menu div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                >
                  <Link
                    href="/settings"
                    className={`block px-4 py-2 text-gray-700 text-sm hover:bg-gray-100 font-sans-sc`}
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    设置
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-sans-sc`}
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
                className={`nav-link font-medium font-sans-sc hover:text-film-red relative text-sm overflow-hidden group`}
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
        className={`md:hidden absolute w-full overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        <div className="px-6">
          <div className="flex flex-col space-y-3">
            {/* Only show navigation links on homepage or when not scrolled */}
            {(isHomepage || !isScrolled) &&
              links
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
                  className={`py-2 px-4 hover:bg-ink-gray rounded-md text-dark-gray font-sans-sc text-sm`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  个人资料
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className={`w-full text-left py-2 px-4 hover:bg-ink-gray rounded-md text-dark-gray font-sans-sc text-sm`}
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
                  className={`py-2 px-4 hover:bg-ink-gray rounded-md text-dark-gray font-sans-sc text-sm}`}
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
