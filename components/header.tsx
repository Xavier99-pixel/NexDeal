"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrandLogo } from "@/components/brand-logo";

const navItems = [
  { name: "Shop All", href: "/#collections", hasDropdown: false },
  { name: "Electronics", href: "/#collections", hasDropdown: false },
  { name: "Offers", href: "/#affiliate-guide", hasDropdown: false },
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
      {/* Announcement Bar */}
      <div className="bg-primary overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-2">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center">
              <span className="mx-4 text-sm text-primary-foreground">
                Affiliate-ready deals from Amazon, Flipkart, Myntra and more
              </span>
              <span className="mx-4 text-sm text-accent font-bold">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <BrandLogo className="shrink-0" />

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
              <div className="relative w-full flex">
                <Input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-r-none border-r-0 bg-secondary focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button type="submit" className="rounded-l-none bg-accent hover:bg-accent/90 text-accent-foreground px-6">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden lg:flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">EN</span>
                <span className="text-muted-foreground">|</span>
                <span className="text-muted-foreground">INR ₹</span>
              </div>
              
              <Button asChild variant="ghost" size="sm" className="hidden md:flex items-center gap-2">
                <Link href="/login">
                <User className="h-5 w-5" />
                <div className="text-left hidden lg:block">
                  <p className="text-xs text-muted-foreground">Hello, Sign In</p>
                  <p className="text-sm font-medium">Account & List</p>
                </div>
                </Link>
              </Button>

              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  0
                </span>
                <span className="hidden lg:inline ml-2 text-sm">Rs.0.00</span>
              </Button>

              {/* Mobile Menu Button */}
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
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-r-none border-r-0 bg-secondary"
              />
              <Button type="submit" className="rounded-l-none bg-accent hover:bg-accent/90 text-accent-foreground px-4">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>

        {/* Navigation */}
        <nav className="bg-card border-t border-border">
          <div className="max-w-7xl mx-auto px-4">
            <div className="hidden md:flex items-center justify-between py-2">
              <div className="flex items-center gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="h-3 w-3" />}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <Link href="/#collections" className="text-sm text-accent font-medium hover:underline">
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
