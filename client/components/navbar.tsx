"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
  bold?: boolean;
}

export interface NavbarProps {
  name?: string;
  logoSrc?: string;
  navLinks?: NavItem[];
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}

const defaultNavLinks: NavItem[] = [
  { label: "Home", href: "#home", active: true },
  { label: "Projects", href: "#projects" },
  { label: "About me", href: "#about" },
  { label: "Download CV", href: "#cv", bold: true },
];

export default function Navbar({
  name = "Tenura Wijesooriya",
  logoSrc = "/images/logo.png",
  navLinks = defaultNavLinks,
  ctaText = "Let's work together",
  ctaHref = "#contact",
  onCtaClick,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const desktopCtaClass =
    "group inline-flex items-center gap-2 bg-[#09164f] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-[#0d1f6e] transition-all duration-200 shadow-sm active:scale-95 whitespace-nowrap";

  const renderCta = (className: string, iconSizeClass: string, onAfterClick?: () => void) =>
    onCtaClick ? (
      <button
        type="button"
        onClick={() => {
          onCtaClick();
          onAfterClick?.();
        }}
        className={`${className} cursor-pointer`}
      >
        <span>{ctaText}</span>
        <ArrowRight className={`${iconSizeClass} transition-transform duration-200 group-hover:translate-x-0.5`} />
      </button>
    ) : (
      <Link href={ctaHref} onClick={onAfterClick} className={className}>
        <span>{ctaText}</span>
        <ArrowRight className={`${iconSizeClass} transition-transform duration-200 group-hover:translate-x-0.5`} />
      </Link>
    );

  return (
    <header className="w-full bg-white text-black font-['Inter',Arial,sans-serif]">
      <div className="max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14">
        <div className="flex items-center justify-between gap-3 py-4 sm:py-6 lg:py-8">
          {/* Brand Logo */}
          <div className="flex items-center min-w-0">
            <Link
              href="/"
              className="flex items-center hover:opacity-90 transition-opacity"
            >
              <Image
                src={logoSrc}
                alt={name || "Logo"}
                width={360}
                height={100}
                priority
                className="h-10 sm:h-16 md:h-20 lg:h-24 w-auto max-w-[140px] sm:max-w-none object-contain object-left"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-9 lg:gap-11">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-[15px] transition-colors relative ${item.active
                    ? "font-semibold text-black after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-black"
                    : item.bold
                      ? "font-bold text-black hover:opacity-80"
                      : "font-medium text-zinc-700 hover:text-black"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            {renderCta(desktopCtaClass, "w-4 h-4")}
          </div>

          {/* Mobile Menu Action & Hamburger */}
          <div className="md:hidden flex items-center gap-1.5 sm:gap-2 shrink-0">
            {renderCta(
              "group hidden min-[380px]:inline-flex items-center gap-1.5 bg-[#09164f] hover:bg-[#0d1f6e] text-white text-[11px] sm:text-xs font-semibold px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full transition-colors whitespace-nowrap",
              "w-3.5 h-3.5"
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-black hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-3.5 py-4 px-2 border-t border-zinc-100 border-b border-zinc-200 mb-4">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base py-1 transition-colors ${item.active
                    ? "font-bold text-black"
                    : item.bold
                      ? "font-bold text-black"
                      : "font-medium text-zinc-700"
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 min-[380px]:hidden">
              {renderCta(
                "group inline-flex w-full items-center justify-center gap-2 bg-[#09164f] hover:bg-[#0d1f6e] text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors",
                "w-4 h-4",
                () => setMobileMenuOpen(false)
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
