"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";

export interface HeroMetaItem {
  label: string;
  value: string;
  hasBullet?: boolean;
}

export interface HeroSectionProps {
  name?: string;
  brandName?: string;
  role?: string;
  greeting?: string;
  headline?: React.ReactNode;
  bio?: React.ReactNode;
  showNavbar?: boolean;
  imageSrc?: string;
  imagePosition?: "left" | "right";
  metaItems?: HeroMetaItem[];
  scrollText?: string;
  scrollTarget?: string;
}

const defaultMetaItems: HeroMetaItem[] = [
  {
    label: "Currently",
    value: "Available for new projects",
    hasBullet: true,
  },
  {
    label: "Specialized at",
    value: "UI/UX, Website, Branding",
  },
  {
    label: "Working globally",
    value: "Poland based",
  },
];

export default function HeroSection({
  name = "Tenura Wijesooriya",
  brandName,
  headline = (
    <>
      Product Engineer building impactful digital products and creating
      seamless, scalable web experiences from concept to reality.
    </>
  ),
  showNavbar = true,
  imageSrc = "/images/tenura pic.png",
  imagePosition = "left",
  metaItems = defaultMetaItems,
}: HeroSectionProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <section
      id="home"
      className="w-full bg-white text-black font-['Inter',Arial,sans-serif] antialiased selection:bg-black selection:text-white overflow-x-hidden"
    >
      {/* Top Navigation Bar */}
      {showNavbar && <Navbar name={name} />}

      <div className="max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 pb-10 sm:pb-12">
        {/* ===================== Main Hero Section Grid ===================== */}
        <div
          className={`pt-2 sm:pt-5 lg:pt-6 flex flex-col ${
            isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
          } items-start justify-between gap-6 sm:gap-8 lg:gap-14 xl:gap-18 2xl:gap-24`}
        >
          {/* Portrait Image Container (Left Side - Sharp Corners & Responsive Width) */}
          <div className="flex-shrink-0 w-full max-w-[380px] mx-auto sm:mx-0 sm:w-[320px] md:w-[350px] lg:max-w-none lg:w-[380px] xl:w-[410px] 2xl:w-[440px]">
            <div className="relative aspect-[4/4.3] sm:aspect-[5/6] w-full rounded-none overflow-hidden bg-gradient-to-b from-[#f3f4f6] via-[#eaedf0] to-[#e0e4e8] border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group">
              <Image
                src={imageSrc}
                alt={name}
                fill
                priority
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 380px, 440px"
              />
            </div>
          </div>

          {/* Right Side Column: Headline + Availability + Right-Side Line + Name on Right */}
          <div className="flex-1 flex flex-col w-full min-w-0">
            {/* Top: Headline Typography */}
            <div className="max-w-[960px] 2xl:max-w-[1120px] lg:pt-1">
              <h1 className="text-[22px] sm:text-2xl md:text-[30px] lg:text-[36px] xl:text-[44px] 2xl:text-[50px] font-normal sm:font-medium text-black leading-[1.28] sm:leading-[1.18] tracking-[-0.03em] sm:tracking-[-0.035em]">
                {headline}
              </h1>
            </div>

            {/* Middle: Availability / Meta Info on Right Side (Moved up) */}
            <div className="mt-5 sm:mt-8 w-full">
              <div className="grid grid-cols-1 min-[440px]:grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 2xl:gap-12">
                {metaItems.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1 sm:gap-1.5">
                    <span className="text-xs sm:text-[13px] text-zinc-500 font-normal tracking-tight">
                      {item.label}
                    </span>
                    <div className="text-sm sm:text-[15px] font-medium text-black tracking-tight flex items-center gap-2">
                      {item.hasBullet && (
                        <span className="w-1.5 h-1.5 rounded-full bg-black inline-block flex-shrink-0" />
                      )}
                      <span>{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Horizontal Line */}
            <div className="w-full h-px bg-zinc-200 my-4 sm:my-5" />

            {/* Bottom of Right Side: Name */}
            <div className="w-full overflow-hidden pt-1">
              <h2 className="text-[clamp(1.25rem,7.2vw,2.75rem)] sm:text-[clamp(2rem,7.2vw,4.25rem)] lg:text-[clamp(2rem,3.6vw,5.2rem)] xl:text-[clamp(2.4rem,4.2vw,6.2rem)] 2xl:text-[clamp(2.8rem,4.6vw,7.2rem)] font-bold text-black tracking-[-0.04em] leading-[0.95] uppercase select-none whitespace-nowrap">
                {brandName || name}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
