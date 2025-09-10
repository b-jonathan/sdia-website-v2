"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // eslint-disable-next-line no-undef
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleDropdownEnter = (dropdown: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setOpenDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
    setDropdownTimeout(timeout);
  };

  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const isActivePage = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed left-1/2 top-4 z-50 w-[90%] max-w-4xl -translate-x-1/2 transform rounded-full border border-gray-200 bg-white/90 px-12 py-3 shadow-lg backdrop-blur-md">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-3 transition-opacity hover:opacity-80"
        >
          <div className="flex h-7 w-7 overflow-hidden rounded-full bg-gradient-to-br from-primary-600 to-primary-700">
            <Image
              src="/logo.jpeg" // make sure logo.jpeg is in /public
              alt="SDIA Logo"
              width={28}
              height={28}
              className="h-full w-full object-cover"
            />
          </div>

          <span className="hidden px-8 pl-[0] font-semibold text-gray-800 sm:block">
            SDIA{" "}
          </span>
          <span className="font-semibold text-gray-800 sm:hidden">SDIA</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-1 lg:flex">
          <a
            href="/about"
            className={`rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${
              isActivePage("/about")
                ? "bg-primary-600 text-white"
                : "text-gray-600 hover:bg-primary-50 hover:text-primary-600"
            }`}
          >
            About
          </a>

          {/* People Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleDropdownEnter("people")}
            onMouseLeave={handleDropdownLeave}
          >
            <button
              className={`flex items-center rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${
                isActivePage("/team") || isActivePage("/alumni")
                  ? "bg-primary-600 text-white"
                  : "text-gray-600 hover:bg-primary-50 hover:text-primary-600"
              }`}
            >
              People <ChevronDown className="ml-1 h-3 w-3" />
            </button>
            {openDropdown === "people" && (
              <div
                className="absolute left-0 top-full z-50 mt-1 min-w-[120px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                onMouseEnter={() => handleDropdownEnter("people")}
                onMouseLeave={handleDropdownLeave}
              >
                <a
                  href="/team"
                  className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                >
                  Team
                </a>
                <a
                  href="/alumni"
                  className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                >
                  Alumni
                </a>
              </div>
            )}
          </div>

          <a
            href="/events"
            className={`rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${
              isActivePage("/events")
                ? "bg-primary-600 text-white"
                : "text-gray-600 hover:bg-primary-50 hover:text-primary-600"
            }`}
          >
            Events
          </a>

          <a
            href="/contact"
            className={`rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${
              isActivePage("/contact")
                ? "bg-primary-600 text-white"
                : "text-gray-600 hover:bg-primary-50 hover:text-primary-600"
            }`}
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="p-1 lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 rounded-lg border border-gray-200 bg-white p-4 shadow-lg lg:hidden">
          <div className="flex flex-col space-y-2">
            <a
              href="/about"
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                isActivePage("/about")
                  ? "bg-primary-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              About
            </a>
            <div className="px-4 py-2 text-sm font-medium text-gray-800">
              People
            </div>
            <a
              href="/team"
              className={`rounded-lg px-6 py-2 text-sm ${
                isActivePage("/team")
                  ? "bg-primary-100 text-primary-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Team
            </a>
            <a
              href="/alumni"
              className={`rounded-lg px-6 py-2 text-sm ${
                isActivePage("/alumni")
                  ? "bg-primary-100 text-primary-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Alumni
            </a>
            <a
              href="/events"
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                isActivePage("/events")
                  ? "bg-primary-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Events
            </a>
            <a
              href="/contact"
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                isActivePage("/contact")
                  ? "bg-primary-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
