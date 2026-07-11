"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo";

const footerLinks = {
  shopCategories: [
    { name: "Electronics", href: "/#collections" },
    { name: "Headphones", href: "/#collections" },
    { name: "Smartphones", href: "/#collections" },
    { name: "Laptops", href: "/#collections" },
    { name: "Smartwatches", href: "/#collections" },
    { name: "Gaming", href: "/#collections" },
  ],
  customerService: [
    { name: "Contact Us", href: "/contact" },
    { name: "Disclosure", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "About NexDeal", href: "/about" },
  ],
  aboutUs: [
    { name: "Our Story", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Affiliate Program", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0b1f44] text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">Get cleaner product picks</h3>
              <p className="text-primary-foreground/70 text-sm">
                Receive shortlist updates for gadgets, style, home and daily-use products.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 w-full md:w-[300px]"
              />
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shrink-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <BrandLogo inverted className="mb-4" />
            <p className="text-primary-foreground/70 text-sm mb-4">
              A cleaner way to discover useful products, compare value, and continue on trusted store pages.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="font-semibold mb-4">Shop Categories</h4>
            <ul className="space-y-2">
              {footerLinks.shopCategories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              {footerLinks.customerService.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>India-first product discovery platform</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Phone className="h-4 w-4 shrink-0" />
                <span>Support available by email</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Mail className="h-4 w-4 shrink-0" />
                <span>support@nexdeal.in</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-primary-foreground/70">
            <p>&copy; 2026 NexDeal. All rights reserved.</p>
            <p className="text-xs">
              Disclosure: Some outbound product links may support NexDeal at no extra cost to shoppers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
