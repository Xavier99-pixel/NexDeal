"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrandLogo } from "@/components/brand-logo";

const navItems = [
  { name: "Top Picks", href: "/#collections", hasDropdown: false },
  { name: "Electronics", href: "/#collections", hasDropdown: false },
  { name: "Trending", href: "/#trending", hasDropdown: false },
  { name: "Spotlight", href: "/#spotlight", hasDropdown: false },
  { name: "About", href: "/about", hasDropdown: false },
  { name: "Contact", href: "/contact", hasDropdown: false },
];

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <header className="w-full sticky top-0 z-50">
      <div className="bg-[#0b1f44] overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-2">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center">
              <span className="mx-4 inline-flex items-center gap-2 text-sm font-medium text-white/90">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                Fresh picks across gadgets, fashion, beauty and home
              </span>
              <span className="mx-4 text-sm text-amber-300 font-bold">•</span>
            </span>
          ))}
        </div>
      </div>

      <div className="border-b border-border bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <BrandLogo className="shrink-0" />

            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
              <div className="relative w-full flex">
                <Input
                  type="text"
                  placeholder="Search mobiles, laptops, watches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 w-full rounded-l-full rounded-r-none border-r-0 bg-[#f5f7fb] pl-5 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button type="submit" className="h-11 rounded-l-none rounded-r-full bg-[#ffb000] px-6 text-[#111827] hover:bg-[#f4a300]">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </form>

            <div className="flex items-center gap-2 md:gap-3">
              <div className="hidden lg:flex items-center gap-2 rounded-full border border-border bg-[#f8fafc] px-3 py-2 text-sm">
                <span className="text-muted-foreground">EN</span>
                <span className="text-muted-foreground">|</span>
                <span className="text-muted-foreground">INR ₹</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="md:hidden mt-3">
            <div className="relative w-full flex">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-l-full rounded-r-none border-r-0 bg-[#f5f7fb]"
              />
              <Button type="submit" className="rounded-l-none rounded-r-full bg-[#ffb000] px-4 text-[#111827] hover:bg-[#f4a300]">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>

        {/* Navigation */}
        <nav className="border-t border-border bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="hidden md:flex items-center justify-between py-2">
              <div className="flex items-center gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-1 text-sm font-semibold text-foreground/82 transition-colors hover:text-primary"
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="h-3 w-3" />}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <Link href="/#collections" className="text-sm font-semibold text-[#b77800] hover:underline">
                  All Collections
                </Link>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms
                </Link>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-border">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center justify-between py-2 text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
                {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
              </Link>
            ))}
            <div className="border-t border-border pt-3 space-y-2">
              <Link href="/#collections" className="block py-2 text-accent font-medium">
                All Collections
              </Link>
              <Link href="/terms" className="block py-2 text-muted-foreground">
                Terms
              </Link>
              <Link href="/about" className="block py-2 text-muted-foreground">
                About Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
