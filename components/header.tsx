"use client";
import Link from "next/link";
import type React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useAccount } from "@/hooks/useAccount";
import { UserAvatarMenu } from "./user-avatar-menu";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const { user } = useAccount();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      closeSearch();
    }
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 150);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        closeSearch();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isSearchOpen]);

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/recipe", label: "RECIPES" },
    { href: "/cooking-tips", label: "COOKING TIPS" },
    { href: "/about-us", label: "ABOUT US" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#f9f5f0] border-b border-gray-200 transition-all duration-300 ease-in-out">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="bg-[#f26950] rounded-full w-8 h-8 flex items-center justify-center text-white font-bold transition-transform duration-200 group-hover:scale-110">
                C
              </div>
              <span className="font-bold text-lg transition-colors duration-200 group-hover:text-[#f26950]">
                Cooks Delight
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors duration-200 relative group ${
                    isActive(link.href) ? "text-[#f26950] font-bold" : "hover:text-[#f26950]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[#f26950] transition-all duration-300 ${
                      isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button
                className={`text-gray-600 hover:text-gray-900 transition-all duration-300 ease-in-out transform hover:scale-110 ${
                  isSearchOpen ? "text-[#f26950] scale-110" : ""
                }`}
                onClick={toggleSearch}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              {user ? (
                <UserAvatarMenu />
              ) : (
                <Button className="bg-[#f26950] hover:bg-[#e05840] transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                  <Link href="/account/login">Login / Sign up</Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        <div
          className={`border-t border-gray-200 bg-white overflow-hidden transition-all duration-300 ease-in-out ${
            isSearchOpen ? "max-h-24 opacity-100 transform translate-y-0" : "max-h-0 opacity-0 transform -translate-y-2"
          }`}
        >
          <div className="container mx-auto px-4 py-4">
            <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Enter ingredients (e.g., chicken, rice) or hobbies (e.g., baking, grilling)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f26950] focus:border-transparent transition-all duration-200 ${
                    isSearchOpen ? "transform scale-100" : "transform scale-95"
                  }`}
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 transition-colors duration-200" />
              </div>
              <Button
                type="submit"
                className={`bg-[#f26950] hover:bg-[#e05840] px-6 transition-all duration-200 transform hover:scale-105 ${
                  !searchQuery.trim() ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"
                }`}
                disabled={!searchQuery.trim()}
              >
                Search
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={closeSearch}
                className="text-gray-500 hover:text-gray-700 transition-all duration-200 transform hover:scale-110 hover:rotate-90"
              >
                <X className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </header>

      {isSearchOpen && (
        <div
          className={`fixed inset-0 bg-black z-40 md:hidden transition-opacity duration-300 ease-in-out ${
            isSearchOpen ? "bg-opacity-20" : "bg-opacity-0"
          }`}
          onClick={closeSearch}
        />
      )}
    </>
  )
}