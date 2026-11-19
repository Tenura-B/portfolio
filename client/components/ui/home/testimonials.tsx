"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, User } from "lucide-react";

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
  imageSrc?: string;
  imageClassName?: string;
  thumbClassName?: string;
}

const defaultTestimonials: TestimonialItem[] = [
  {
    id: "kurt-merriweather",
    name: "KURT MERRIWEATHER",
    role: "VP, Strategy & Transformation at Walk West",
    quote:
      "Anyone who is fortunate enough to work with Tenura will greatly benefit from his passion to develop experience...that meets the highest standard of excellence.",
    imageSrc: "/images/chan.png",
    imageClassName: "scale-[1.22] origin-bottom translate-x-5 sm:translate-x-7",
    thumbClassName: "scale-[1.22] origin-bottom translate-x-1.5",
  },
  {
    id: "sarah-chen",
    name: "SARAH CHEN",
    role: "Head of Product at Oncoshot MedTech",
    quote:
      "Tenura has an exceptional ability to navigate complex system architecture and turn ambiguous business challenges into intuitive, high-performance web applications.",
    imageSrc: "/images/nu.png",
    imageClassName: "scale-[1.12] origin-bottom translate-x-4 sm:translate-x-6",
    thumbClassName: "scale-[1.12] origin-bottom translate-x-1.5",
  },
];

export interface TestimonialsProps {
  title?: string;
  sectionNumber?: string;
  items?: TestimonialItem[];
}

export default function Testimonials({
  title = "testimonials",
  sectionNumber,
  items = defaultTestimonials,
}: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;

    // Change testimonial (image + content) every 4 seconds.
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev >= items.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, [items.length, activeIndex]);

  const activeItem = items[activeIndex] || items[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  // Format index as 01 / 02
  const formattedCurrent = String(activeIndex + 1).padStart(2, "0");
  const formattedTotal = String(items.length).padStart(2, "0");

  return (
    <section
      id="testimonials"
      className="w-full bg-white text-black font-['Inter',Arial,sans-serif] antialiased pt-10 sm:pt-14 pb-16 sm:pb-24"
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
        </div>

        {/* 2-Column Responsive Grid Layout (Fixes zoom and wider screen gaps) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 2xl:gap-16 items-start">
          {/* Main Portrait Image Container */}
          <div className="w-full lg:col-span-5 xl:col-span-4 max-w-[520px] lg:max-w-none mx-auto lg:mx-0">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#eef0f3] border border-zinc-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center justify-center group">
              {items.map((person, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={person.id}
                    aria-hidden={!isActive}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    {person.imageSrc ? (
                      <Image
                        src={person.imageSrc}
                        alt={person.name}
                        fill
                        className={`object-cover object-bottom ${
                          person.imageClassName || ""
                        }`}
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    ) : (
                      /* Sleek Portrait Placeholder */
                      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-zinc-100 to-zinc-200">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 text-zinc-400 border border-zinc-200">
                          <User className="w-12 h-12 text-zinc-500" />
                        </div>
                        <span className="text-sm font-bold text-zinc-800 tracking-tight">
                          {person.name}
                        </span>
                        <span className="text-xs text-zinc-500 mt-1 max-w-[220px]">
                          Image placeholder • Click thumbnail below to switch
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Quote, Author, Navigation & Thumbnails */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between w-full lg:pt-2 2xl:pt-4">
            {/* Quote Typography (Reduced text size for better visual balance) */}
            <div key={activeItem.id} className="transition-opacity duration-300">
              <blockquote className="text-xl sm:text-2xl lg:text-[26px] xl:text-[30px] font-normal sm:font-medium text-black leading-[1.38] sm:leading-[1.32] tracking-[-0.025em]">
                &ldquo;{activeItem.quote}&rdquo;
              </blockquote>

              {/* Author Details */}
              <div className="mt-8 sm:mt-10">
                <h3 className="text-lg sm:text-xl font-black text-black tracking-tight uppercase">
                  {activeItem.name}
                </h3>
                <p className="text-sm sm:text-[15px] text-zinc-500 font-medium tracking-tight mt-1">
                  {activeItem.role}
                </p>
              </div>
            </div>

            {/* Navigation Controls: Prev, Next & Counter */}
            <div className="mt-10 sm:mt-12 flex items-center gap-4">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-11 h-11 rounded-full flex items-center justify-center bg-zinc-100 hover:bg-zinc-200 text-black border border-zinc-200 transition-all active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-11 h-11 rounded-full flex items-center justify-center bg-black hover:bg-zinc-800 text-white shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <span className="text-xs sm:text-sm font-semibold tracking-wider text-zinc-500 ml-2">
                {formattedCurrent} / {formattedTotal}
              </span>
            </div>

            {/* 4 Small Thumbnails of Other People */}
            <div className="mt-8 sm:mt-10 pt-6 border-t border-zinc-100">
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                {items.map((person, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={person.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "border-black ring-2 ring-black/10 scale-105 shadow-md opacity-100"
                          : "border-zinc-200 opacity-60 hover:opacity-100 hover:border-zinc-400"
                      }`}
                      aria-label={`View testimonial from ${person.name}`}
                    >
                      {person.imageSrc ? (
                        <Image
                          src={person.imageSrc}
                          alt={person.name}
                          fill
                          className={`object-cover object-bottom bg-[#eef0f3] ${
                            person.thumbClassName || ""
                          }`}
                          sizes="80px"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 text-zinc-700 p-1 text-center">
                          <User className="w-5 h-5 mb-1 text-zinc-500" />
                          <span className="text-[9px] font-bold uppercase truncate max-w-full px-1">
                            {person.name.split(" ")[0]}
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
