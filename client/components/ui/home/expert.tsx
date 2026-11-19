"use client";

import React from "react";

export interface ExpertiseItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const defaultExpertise: ExpertiseItem[] = [
  {
    id: "complex-ux",
    title: "Complex UX Design",
    description:
      "Turning complex workflows and requirements into clear, efficient, and user-friendly experiences for digital products",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-black"
      >
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" fill="none" />
      </svg>
    ),
  },
  {
    id: "design-systems",
    title: "Design Systems",
    description:
      "Building and maintaining systems that unify teams, accelerate development, and keep products consistent at scale.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-black"
      >
        <rect x="8" y="8" width="13" height="13" rx="2" fill="none" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </svg>
    ),
  },
  {
    id: "design-leadership",
    title: "Design Leadership",
    description:
      "Leading design processes and teams end-to-end. From discovery and prototyping to developer handoff and launch.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-black"
      >
        <circle cx="12" cy="12" r="7" />
        <line x1="12" y1="1" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="1" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="23" y2="12" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "product-driven-ui",
    title: "Product-Driven UI",
    description:
      "Designing interfaces that balance usability, aesthetics, and business goals to deliver measurable product impact.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-black"
      >
        {/* Selection marquee dashed corners */}
        <path d="M4 3h2M3 4v2M3 10v2M10 3h2M16 3h2M4 17H3v-2" />
        {/* Pointer cursor on bottom right */}
        <path
          d="M15 15l6 2.5-2.5 1 2.5 3-1.5 1.5-2.5-3-1 2.5L15 15z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    ),
  },
];

export interface ExpertProps {
  title?: string;
  items?: ExpertiseItem[];
}

export default function Expert({
  title = "Expertise",
  items = defaultExpertise,
}: ExpertProps) {
  return (
    <section
      id="expertise"
      className="w-full bg-white text-black font-['Inter',Arial,sans-serif] antialiased pt-6 sm:pt-8 pb-16 sm:pb-20"
    >
      <div className="max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14">
        {/* Section Header - Centered */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-5xl sm:text-6xl lg:text-[76px] font-bold text-black tracking-[-0.03em]">
            {title}
          </h2>
        </div>

        {/* 4-Column Expertise Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col items-start group">
              {/* Icon Badge */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-zinc-100 flex items-center justify-center mb-6 text-black border border-zinc-200/60 shadow-[0_2px_8px_rgb(0,0,0,0.03)] transition-transform duration-300 group-hover:-translate-y-1">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-[19px] font-bold text-black tracking-tight mb-2.5">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[13.5px] sm:text-[14px] text-zinc-600 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
