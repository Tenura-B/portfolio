"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Camera } from "lucide-react";

export interface ProjectItem {
  id: string;
  title: string;
  meta?: string;
  role?: string;
  company?: string;
  description?: string;
  tags?: string[];
  imageSrc?: string;
  imageFit?: "cover" | "contain";
  imagePosition?: "center" | "bottom";
  imageOffsetClass?: string;
  href?: string;
  placeholderBg?: string;
  placeholderContent?: React.ReactNode;
}

const defaultProjects: ProjectItem[] = [
  {
    id: "oncoshot",
    title: "AI-Powered Clinical Trial Matching Platform",
    meta: "MEDTECH, SAAS / 2026",
    imageSrc: "/images/te1.png",
    imageFit: "cover",
    imagePosition: "center",
    href: "#oncoshot",
    placeholderBg: "bg-gradient-to-b from-[#d1d2ce] via-[#dbdcd6] to-[#c4c6c0]",
  },
  {
    id: "escrow",
    title: "Escrow Account Opening",
    meta: "FINTECH, WEB & MOBILE / 2026",
    imageSrc: "/images/te2.png",
    imageFit: "cover",
    imagePosition: "bottom",
    href: "#escrow",
    placeholderBg: "bg-[#f3f4f5]",
  },
  {
    id: "mentor-platform",
    title: "Mentor Discovery Platform",
    meta: "EDTECH, WEB DESIGN / 2026",
    imageSrc: "/images/te5.jpg",
    imageFit: "cover",
    imagePosition: "center",
    imageOffsetClass: "translate-y-3 sm:translate-y-4",
    href: "#mentor-platform",
    placeholderBg:
      "bg-[linear-gradient(90deg,#8A8580_0%,#9B9690_25%,#A29C97_50%,#A5A19C_75%,#A39F99_100%)]",
  },
  {
    id: "letters-of-credit",
    title: "Letters of Credit",
    meta: "FINTECH, PRODUCT DESIGN / 2026",
    imageSrc: "/images/te3.png",
    imageFit: "cover",
    imagePosition: "center",
    href: "#letters-of-credit",
    placeholderBg: "bg-[#f3f4f5]",
  },
];

export interface ProjectsProps {
  title?: string;
  sectionNumber?: string;
  description?: string;
  projects?: ProjectItem[];
}

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
      return true;
    }
    return false;
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const rightLabel =
    project.meta ||
    (project.tags && project.tags.length > 0
      ? project.tags.join(", ")
      : project.role);

  const delayMs = (index % 2) * 120;

  return (
    <Link href={project.href || "#"} className="group block">
      {/* Sharp-Cornered Showcase Frame */}
      <div
        ref={containerRef}
        data-cursor="explore"
        data-project-id={project.id}
        className={`w-full aspect-[3/2] rounded-none overflow-hidden relative ring-1 ring-black/[0.04] ${project.placeholderBg || "bg-zinc-100"
          }`}
      >
        {/* Reveal Mask - Wipes/Unmasks image from Left to Right */}
        <div
          className="relative w-full h-full overflow-hidden will-change-[clip-path]"
          style={{
            clipPath: isVisible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
            WebkitClipPath: isVisible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
            transition: `clip-path 1100ms cubic-bezier(0.19, 1, 0.22, 1) ${delayMs}ms, -webkit-clip-path 1100ms cubic-bezier(0.19, 1, 0.22, 1) ${delayMs}ms`,
          }}
        >
          {project.imageSrc ? (
            <div
              className={`relative w-full h-full will-change-transform ${project.imageOffsetClass || ""
                }`}
              style={{
                transform: isVisible
                  ? "translateX(0%) scale(1)"
                  : "translateX(-6%) scale(1.08)",
                transition: `transform 1200ms cubic-bezier(0.19, 1, 0.22, 1) ${delayMs}ms`,
              }}
            >
              <Image
                src={project.imageSrc}
                alt={project.title}
                fill
                className={`${project.imageFit === "contain"
                  ? project.imagePosition === "bottom"
                    ? "object-contain object-bottom pt-3 sm:pt-5"
                    : "object-contain p-4 sm:p-6 lg:p-8"
                  : project.imagePosition === "bottom"
                    ? "object-cover object-bottom"
                    : "object-cover object-center"
                  } w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.025]`}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ) : project.placeholderContent ? (
            <div
              className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              style={{
                transform: isVisible ? "translateX(0%)" : "translateX(-5%)",
                transition: `transform 1200ms cubic-bezier(0.19, 1, 0.22, 1) ${delayMs}ms`,
              }}
            >
              {project.placeholderContent}
            </div>
          ) : (
            /* Standard Image Placeholder Fallback */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#f4f5f6]">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                <Camera className="w-6 h-6 text-zinc-500" />
              </div>
              <span className="text-xs font-bold text-zinc-700">
                Project Thumbnail Placeholder
              </span>
              <span className="text-[11px] text-zinc-500 mt-1">
                {`Add imageSrc="/images/${project.id}.png"`}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Single-Row Metadata Below Frame */}
      <div
        className="mt-3 sm:mt-3.5 flex items-baseline justify-between gap-x-4 gap-y-1 transition-all duration-700 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(8px)",
          transitionDelay: `${delayMs + 180}ms`,
        }}
      >
        <h3 className="text-base sm:text-lg lg:text-[19px] font-medium text-black tracking-tight group-hover:text-zinc-600 transition-colors min-w-0">
          {project.title}
        </h3>
        {rightLabel && (
          <span className="text-xs sm:text-[13px] font-normal uppercase tracking-tight text-zinc-500 shrink-0 text-right">
            {rightLabel}
          </span>
        )}
      </div>
    </Link>
  );
}

export default function Projects({
  title = "selected work",
  sectionNumber,
  description,
  projects = defaultProjects,
}: ProjectsProps) {
  return (
    <section
      id="projects"
      className="w-full bg-white text-black font-['Inter',Arial,sans-serif] antialiased pt-12 sm:pt-16 pb-14 sm:pb-20"
    >
      <div className="max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14">
        {/* Editorial Section Heading */}
        <div className="text-left mb-5 sm:mb-7">
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
          {description && (
            <p className="text-[14px] sm:text-[15px] text-zinc-500 leading-relaxed max-w-2xl mt-3">
              {description}
            </p>
          )}
        </div>

        {/* 2-Column Sharp Editorial Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 sm:gap-x-3.5 lg:gap-x-4 gap-y-8 sm:gap-y-10 lg:gap-y-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
