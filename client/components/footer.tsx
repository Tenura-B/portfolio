"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export interface SocialLink {
  label: string;
  href: string;
}

export interface FooterProps {
  name?: string;
  brandName?: string;
  tagline?: string;
  email?: string;
  phone?: string;
  location?: string;
  avatarSrc?: string;
  socialLinks?: SocialLink[];
}

const defaultSocialLinks: SocialLink[] = [
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "Linkedin", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "GitHub", href: "https://github.com" },
];

export default function Footer({
  name = "Tenura Wijesooriya",
  brandName = "TENURA",
  tagline = "( Get in touch )",
  email = "tenura.developer@gmail.com",
  phone = "+94 77 123 4567",
  location = "Remote from Sri Lanka",
  avatarSrc = "/images/tenura pic.png",
  socialLinks = defaultSocialLinks,
}: FooterProps) {
  // Live formatted time (e.g. 10:01:03 PM) and current year
  const [timeString, setTimeString] = useState<string>("");
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentYear(now.getFullYear());
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-[#111215] text-white font-['Inter',Arial,sans-serif] antialiased selection:bg-white selection:text-black">
      <div className="max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 pt-16 sm:pt-24 lg:pt-28 pb-10 sm:pb-14">
        {/* ===================== Top Section ===================== */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16">
          {/* Left Side: Tagline + Headline + Contact Card */}
          <div className="flex-1 max-w-[850px]">
            {/* Tagline */}
            <span className="text-xs sm:text-sm text-zinc-400 font-normal tracking-tight block">
              {tagline}
            </span>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[76px] font-medium text-white tracking-[-0.035em] leading-[1.1] mt-6 sm:mt-8">
              Have a project in mind? <br />
              Let&apos;s talk.
            </h2>

            {/* Contact Pill / Card */}
            <a
              href={`mailto:${email}`}
              className="mt-8 sm:mt-12 inline-flex items-center gap-3.5 bg-[#1c1d22] border border-zinc-800/90 hover:border-zinc-600 px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl transition-all duration-200 shadow-md group cursor-pointer"
            >
              {/* Avatar Photo */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden relative flex-shrink-0 bg-zinc-800 border border-zinc-700/60">
                <Image
                  src={avatarSrc}
                  alt={name}
                  fill
                  className="object-cover object-top"
                  sizes="48px"
                />
              </div>

              {/* Email & Phone */}
              <div className="flex flex-col text-left">
                <span className="text-sm sm:text-[15px] font-bold text-white tracking-tight group-hover:underline">
                  {email}
                </span>
                <span className="text-xs sm:text-[13px] text-zinc-400 font-normal mt-0.5">
                  {phone}
                </span>
              </div>
            </a>
          </div>

          {/* Right Side: Clock/Location & Social Media */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-10 sm:gap-16 lg:gap-10 lg:text-right">
            {/* Time & Location */}
            <div className="flex flex-col lg:items-end">
              <span className="text-xs sm:text-sm text-zinc-400 font-mono tracking-wider tabular-nums">
                {timeString || "10:01:03 PM"}
              </span>
              <span className="text-sm sm:text-base font-medium text-white mt-1">
                {location}
              </span>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-col lg:items-end">
              <span className="text-xs sm:text-[13px] text-zinc-400 font-normal mb-3 sm:mb-4 block">
                Social media
              </span>
              <div className="flex flex-col gap-2.5 lg:items-end">
                {socialLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-[15px] font-medium text-white hover:text-zinc-300 transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-zinc-500 group-hover:text-white transition-colors">
                      ↳
                    </span>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===================== Bottom Section: Copyright & Massive Typography ===================== */}
        <div className="mt-16 sm:mt-24 lg:mt-32 pt-8 sm:pt-12 border-t border-zinc-800/60 flex flex-col-reverse md:flex-row md:items-end justify-between gap-8">
          {/* Copyright Text */}
          <div className="md:pb-3">
            <p className="text-xs sm:text-sm text-zinc-500 font-normal tracking-tight">
              ©{currentYear ? `${currentYear}.` : ""} {name}
            </p>
          </div>

          {/* Massive Brand Name & Copyright Symbol */}
          <div className="overflow-hidden">
            <h2 className="text-[clamp(3.5rem,11.5vw,13.5rem)] font-bold text-white tracking-[-0.04em] leading-[0.88] select-none uppercase flex items-baseline justify-start md:justify-end whitespace-nowrap">
              <span>{brandName}</span>
              <span className="font-light text-[0.85em] ml-2 sm:ml-4 inline-block leading-none">
                ©
              </span>
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
}
