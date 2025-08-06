"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null)

  const handleDropdownEnter = (dropdown: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout)
      setDropdownTimeout(null)
    }
    setOpenDropdown(dropdown)
  }

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setOpenDropdown(null)
    }, 200)
    setDropdownTimeout(timeout)
  }

  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const isActivePage = (path: string) => {
    if (path === "/" && currentPath === "/") return true
    if (path !== "/" && currentPath.startsWith(path)) return true
    return false
  }

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md rounded-full px-12 py-3 shadow-lg border border-gray-200 w-[90%] max-w-4xl">
      <div className="flex items-center justify-between">
        <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <div className="w-7 h-7 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">SD</span>
          </div>
          <span className="font-semibold text-gray-800 hidden sm:block px-8 pl-[0]">SDIA </span>
          <span className="font-semibold text-gray-800 sm:hidden">SDIA</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          <a
            href="/about"
            className={`px-5 py-1.5 rounded-full font-medium transition-colors text-sm ${
              isActivePage("/about")
                ? "bg-primary-600 text-white"
                : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
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
              className={`flex items-center px-5 py-1.5 rounded-full font-medium transition-colors text-sm ${
                isActivePage("/team") || isActivePage("/alumni")
                  ? "bg-primary-600 text-white"
                  : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
              }`}
            >
              People <ChevronDown className="ml-1 w-3 h-3" />
            </button>
            {openDropdown === "people" && (
              <div
                className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px] z-50"
                onMouseEnter={() => handleDropdownEnter("people")}
                onMouseLeave={handleDropdownLeave}
              >
                <a href="/team" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                  Team
                </a>
                <a href="/alumni" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                  Alumni
                </a>
              </div>
            )}
          </div>

          <a
            href="/events"
            className={`px-5 py-1.5 rounded-full font-medium transition-colors text-sm ${
              isActivePage("/events")
                ? "bg-primary-600 text-white"
                : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
            }`}
          >
            Events
          </a>

          <a
            href="/contact"
            className={`px-5 py-1.5 rounded-full font-medium transition-colors text-sm ${
              isActivePage("/contact")
                ? "bg-primary-600 text-white"
                : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
            }`}
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="flex flex-col space-y-2">
            <a
              href="/about"
              className={`px-4 py-2 rounded-lg font-medium text-sm ${
                isActivePage("/about") ? "bg-primary-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              About
            </a>
            <div className="px-4 py-2 text-gray-800 font-medium text-sm">People</div>
            <a
              href="/team"
              className={`px-6 py-2 rounded-lg text-sm ${
                isActivePage("/team") ? "bg-primary-100 text-primary-600" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Team
            </a>
            <a
              href="/alumni"
              className={`px-6 py-2 rounded-lg text-sm ${
                isActivePage("/alumni") ? "bg-primary-100 text-primary-600" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Alumni
            </a>
            <a
              href="/events"
              className={`px-4 py-2 rounded-lg font-medium text-sm ${
                isActivePage("/events") ? "bg-primary-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Events
            </a>
            <a
              href="/contact"
              className={`px-4 py-2 rounded-lg font-medium text-sm ${
                isActivePage("/contact") ? "bg-primary-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
