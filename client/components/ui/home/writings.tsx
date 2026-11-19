"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export interface WritingItem {
  id: string;
  brand: string;
  title: string;
  description: string;
  tags: string[];
  imageSrc?: string;
  href?: string;
}

const defaultWritings: WritingItem[] = [
  {
    id: "mirsad-ai",
    brand: "MirsadAI",
    title: "MirsadAI — Compliance Engine",
    description:
      "Compliance engine at the core of TamamOS — shaping product UI, website, and pitch materials around complex AML workflows and decision-making.",
    tags: ["AI compliance", "AML platform", "Product UI", "Website", "Pitch deck"],
    imageSrc: "/images/saas.png",
    href: "#mirsad-ai",
  },
  {
    id: "tamam",
    brand: "Tamam",
    title: "Tamam — Fintech Ecosystem",
    description:
      "Fintech product ecosystem for GCC markets — shaping mobile app flows, websites, back-office tools, pitch materials, and identity across the Tamam ecosystem.",
    tags: ["Fintech ecosystem", "Mobile app", "KYC", "Back-office", "Pitch materials"],
    imageSrc: "/images/pro2.png",
    href: "#tamam",
  },
  {
    id: "muneera",
    brand: "Muneera",
    title: "Muneera — AI Travel Companion",
    description:
      "Culturally-intelligent AI travel companion for the GCC — shaping a public website and chat UI around local guidance, bilingual assistance, and travel support.",
    tags: ["AI travel", "Website", "Chat UI", "GCC", "Cultural guidance"],
    imageSrc: "/images/Luxe Travel Studio Landing Page.png",
    href: "#muneera",
  },
];

export interface WritingsProps {
  title?: string;
  sectionNumber?: string;
  writings?: WritingItem[];
}

export default function Writings({
  title = "writings",
  sectionNumber,
  writings = defaultWritings,
}: WritingsProps) {
  // Active row index (defaults to 0 so an image is already active when scrolling down)
  const [activeRow, setActiveRow] = useState<number>(0);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isHoveringRef = useRef(false);

  // Automatically update active row as the user scrolls through the section
  useEffect(() => {
    const handleScroll = () => {
      // Mouse hover takes priority over scroll position
      if (isHoveringRef.current) return;

      const viewportCenter = window.innerHeight * 0.5;
      let closestIndex = 0;
      let minDistance = Infinity;

      rowRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const rowCenter = rect.top + rect.height * 0.5;
        const distance = Math.abs(rowCenter - viewportCenter);

        // Check if row is visible within the viewport
        if (rect.bottom > 80 && rect.top < window.innerHeight - 80) {
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        }
      });

      if (minDistance !== Infinity) {
        setActiveRow((prev) => (prev !== closestIndex ? closestIndex : prev));
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      id="writings"
      className="w-full bg-white text-black font-['Inter',Arial,sans-serif] antialiased pt-12 sm:pt-16 pb-16 sm:pb-24"
    >
      <div className="max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14">
        {/* Section Heading */}
        <div className="text-left mb-4 sm:mb-6">
          <div className="flex items-baseline gap-3">
            {sectionNumber && (
              <span className="text-sm sm:text-base font-mono text-zinc-400 select-none">
                {sectionNumber}
              </span>
            )}
            <h2 className="text-5xl sm:text-6xl md:text-[66px] lg:text-[76px] font-medium text-zinc-900 tracking-[-0.045em] leading-[0.95]">
              {title}
            </h2>
          </div>
        </div>

        {/* Rows */}
        <div className="w-full border-t border-zinc-200">
          {writings.map((item, index) => {
            const isActive = activeRow === index;
            const href = item.href || "#";

            return (
              <div
                key={item.id}
                ref={(el) => {
                  rowRefs.current[index] = el;
                }}
                onMouseEnter={() => {
                  isHoveringRef.current = true;
                  setActiveRow(index);
                }}
                onMouseLeave={() => {
                  isHoveringRef.current = false;
                }}
                className="relative border-b border-zinc-200/90"
                style={{ minHeight: "160px" }}
              >
                {/* Desktop only — floating image for the active row, absolutely positioned right column */}
                {item.imageSrc && (
                  <div
                    className="hidden lg:flex absolute right-0 top-0 bottom-0 items-center justify-end pointer-events-none z-10"
                    style={{ width: "calc(30% + 60px)" }}
                  >
                    <div
                      className="w-[300px] lg:w-[360px] xl:w-[420px] h-full overflow-hidden ring-1 ring-black/[0.08] shadow-xl"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive
                          ? "translateX(0) scale(1)"
                          : "translateX(28px) scale(0.95)",
                        transition:
                          "opacity 350ms cubic-bezier(0.19,1,0.22,1), transform 350ms cubic-bezier(0.19,1,0.22,1)",
                      }}
                    >
                      <Image
                        src={item.imageSrc}
                        alt={item.brand}
                        fill
                        className="object-cover object-top"
                        sizes="420px"
                      />
                    </div>
                  </div>
                )}

                {/* Row content */}
                <Link
                  href={href}
                  className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center py-14 sm:py-16 lg:py-20"
                >
                  {/* Left — Brand name */}
                  <div className="lg:col-span-4 xl:col-span-3 flex items-center">
                    <h3
                      style={{
                        transition: "color 250ms ease, filter 250ms ease",
                        color: isActive ? "#111" : "#a1a1aa",
                        filter: isActive ? "blur(0px)" : "blur(0.3px)",
                        fontWeight: 500,
                      }}
                      className="text-[28px] sm:text-[34px] lg:text-[40px] tracking-[-0.03em] leading-[1.1]"
                    >
                      {item.brand}
                    </h3>
                  </div>

                  {/* Middle — Description + Tags */}
                  <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center">
                    <p className="text-[14.5px] sm:text-[15.5px] text-zinc-600 leading-[1.7] font-normal">
                      {item.description}
                    </p>
                    {item.tags && item.tags.length > 0 && (
                      <div className="mt-3.5 sm:mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center text-[11.5px] sm:text-[12.5px] font-normal text-zinc-700 bg-white border border-zinc-200/90 px-2.5 py-1 rounded-[3px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Mobile & tablet — inline image after content */}
                    {item.imageSrc && (
                      <div className="lg:hidden mt-6 w-full relative aspect-[16/10] overflow-hidden ring-1 ring-black/[0.08] shadow-md">
                        <Image
                          src={item.imageSrc}
                          alt={item.brand}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 1024px) 100vw, 0px"
                        />
                      </div>
                    )}
                  </div>

                  {/* Right — spacer column keeps the grid honest on desktop */}
                  <div className="lg:col-span-3 xl:col-span-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
