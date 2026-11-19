"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export interface ThoughtProps {
  author?: string;
  imageSrc?: string;
  imageAlt?: string;
}

const PORTRAIT_PANELS = [
  {
    bgClass: "from-zinc-300 to-zinc-400",
    imgClass: "object-[28%_22%] scale-[1.55]",
  },
  {
    bgClass: "from-zinc-200 to-zinc-300",
    imgClass: "object-[42%_20%] -scale-x-[1.75] scale-y-[1.75]",
  },
  {
    bgClass: "from-zinc-100 to-zinc-300",
    imgClass: "object-[50%_18%] scale-[1.9]",
  },
  {
    bgClass: "from-zinc-200 to-zinc-300",
    imgClass: "object-[60%_22%] scale-[1.65]",
  },
  {
    bgClass: "from-zinc-300 to-zinc-400",
    imgClass: "object-[70%_24%] -scale-x-[1.55] scale-y-[1.55]",
  },
] as const;

// Helper to precalculate word letter start indices
function createLineWordIndices(words: string[], initialOffset: number) {
  let offset = initialOffset;
  return words.map((word) => {
    const item = { word, startIndex: offset, length: word.length };
    offset += word.length;
    return item;
  });
}

// Letter sequence offsets across all lines:
const LINE_1_ITEMS = createLineWordIndices(["Do", "not", "follow", "where", "the"], 0);
// Line 1: 19 letters (0..18)

const LINE_2_ITEMS = createLineWordIndices(["path", "may", "lead"], 19);
// Line 2: 11 letters (19..29)

const PORTRAIT_INDEX = 30;
const PORTRAIT_STEPS = 1; // Snappy transition past portrait strip

const LINE_3_OFFSET = PORTRAIT_INDEX + PORTRAIT_STEPS; // 31
const LINE_3_ITEMS = createLineWordIndices(["Go", "instead", "where", "there", "is"], LINE_3_OFFSET);
// Line 3: 21 letters (31..51)

const LINE_4_NO_OFFSET = LINE_3_OFFSET + 21; // 52 ("n" is 52, "o" is 53)

const LINE_4_REST_OFFSET = LINE_4_NO_OFFSET + 2; // 54
const LINE_4_REST_ITEMS = createLineWordIndices(["path", "and", "leave", "a", "trail."], LINE_4_REST_OFFSET);
// Line 4 rest: 19 letters (54..72)

const TOTAL_STEPS = LINE_4_REST_OFFSET + 19; // 73 total letter steps

function HighlightWordLetters({
  word,
  startIndex,
  totalSteps,
  progress,
}: {
  word: string;
  startIndex: number;
  totalSteps: number;
  progress: number;
}) {
  return (
    <span className="inline-block whitespace-nowrap">
      {word.split("").map((char, charIdx) => {
        const letterIndex = startIndex + charIdx;
        const isHighlighted = progress >= letterIndex / totalSteps;
        return (
          <span
            key={charIdx}
            className="transition-colors duration-100 ease-out"
            style={{
              color: isHighlighted ? "#000000" : "#d4d4d8",
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}

export default function Thought({
  author = "Ralph Waldo Emerson",
  imageSrc = "/images/tenura pic.png",
  imageAlt = "Portrait strip",
}: ThoughtProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Faster scroll window: starts at 78% down viewport and finishes at 38%
      const startOffset = windowHeight * 0.78;
      const endOffset = windowHeight * 0.38;

      const totalDist = startOffset - endOffset;
      const currentPos = startOffset - rect.top;
      const rawProgress = currentPos / totalDist;
      const clamped = Math.min(Math.max(rawProgress, 0), 1);

      setProgress(clamped);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const isPortraitActive = progress >= PORTRAIT_INDEX / TOTAL_STEPS;
  const isNoActive = progress >= LINE_4_NO_OFFSET / TOTAL_STEPS;
  const isNoOActive = progress >= (LINE_4_NO_OFFSET + 1) / TOTAL_STEPS;

  return (
    <section
      ref={sectionRef}
      id="thought"
      className="relative w-full bg-white text-black font-['Inter',Arial,sans-serif] antialiased overflow-hidden pt-14 sm:pt-20 lg:pt-24 pb-20 sm:pb-24 lg:pb-28"
    >
      <div className="max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 relative z-10">
        <div className="max-w-[1380px]">
          <blockquote className="text-[32px] sm:text-[50px] md:text-[64px] lg:text-[78px] xl:text-[92px] 2xl:text-[102px] font-bold tracking-[-0.045em] leading-[1.08] select-none">
            {/* Line 1 - Letter by Letter */}
            <span className="block">
              {LINE_1_ITEMS.map((item, i) => (
                <React.Fragment key={item.word + i}>
                  <HighlightWordLetters
                    word={item.word}
                    startIndex={item.startIndex}
                    totalSteps={TOTAL_STEPS}
                    progress={progress}
                  />
                  {i < LINE_1_ITEMS.length - 1 ? " " : ""}
                </React.Fragment>
              ))}
            </span>

            {/* Line 2 with Portrait Strip - Letter by Letter */}
            <span className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 md:gap-x-5">
              <span>
                {LINE_2_ITEMS.map((item, i) => (
                  <React.Fragment key={item.word + i}>
                    <HighlightWordLetters
                      word={item.word}
                      startIndex={item.startIndex}
                      totalSteps={TOTAL_STEPS}
                      progress={progress}
                    />
                    {i < LINE_2_ITEMS.length - 1 ? " " : ""}
                  </React.Fragment>
                ))}
              </span>

              {/* Inline 5-panel grayscale portrait strip */}
              <span
                aria-hidden="true"
                className="inline-grid grid-cols-5 gap-[1.5px] bg-zinc-200 w-[2.35em] h-[0.86em] align-middle overflow-hidden select-none translate-y-[0.03em] transition-all duration-300"
                style={{
                  opacity: isPortraitActive ? 1 : 0.35,
                  filter: isPortraitActive
                    ? "grayscale(100%) contrast(125%)"
                    : "grayscale(100%) contrast(85%)",
                }}
              >
                {PORTRAIT_PANELS.map((panel, index) => (
                  <span
                    key={index}
                    className={`relative h-full w-full overflow-hidden bg-gradient-to-b ${panel.bgClass}`}
                  >
                    <Image
                      src={imageSrc}
                      alt={index === 0 ? imageAlt : ""}
                      fill
                      className={`object-cover grayscale contrast-125 ${panel.imgClass}`}
                      sizes="120px"
                    />
                  </span>
                ))}
              </span>
            </span>

            {/* Line 3 - Letter by Letter */}
            <span className="block">
              {LINE_3_ITEMS.map((item, i) => (
                <React.Fragment key={item.word + i}>
                  <HighlightWordLetters
                    word={item.word}
                    startIndex={item.startIndex}
                    totalSteps={TOTAL_STEPS}
                    progress={progress}
                  />
                  {i < LINE_3_ITEMS.length - 1 ? " " : ""}
                </React.Fragment>
              ))}
            </span>

            {/* Line 4 with dotted 'o' - Letter by Letter */}
            <span className="block">
              <span className="inline-block whitespace-nowrap">
                <span
                  className="transition-colors duration-100 ease-out"
                  style={{
                    color: isNoActive ? "#000000" : "#d4d4d8",
                  }}
                >
                  n
                </span>
                <span className="relative inline-block">
                  <span
                    className="transition-colors duration-100 ease-out"
                    style={{
                      color: isNoOActive ? "#000000" : "#d4d4d8",
                    }}
                  >
                    o
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 -translate-x-1/2 bottom-[-0.14em] w-[0.14em] h-[0.14em] rounded-full transition-colors duration-100"
                    style={{
                      backgroundColor: isNoOActive ? "#000000" : "#d4d4d8",
                    }}
                  />
                </span>
              </span>{" "}
              {LINE_4_REST_ITEMS.map((item, i) => (
                <React.Fragment key={item.word + i}>
                  <HighlightWordLetters
                    word={item.word}
                    startIndex={item.startIndex}
                    totalSteps={TOTAL_STEPS}
                    progress={progress}
                  />
                  {i < LINE_4_REST_ITEMS.length - 1 ? " " : ""}
                </React.Fragment>
              ))}
            </span>
          </blockquote>

          <p
            className="mt-10 sm:mt-14 md:mt-16 text-xs sm:text-sm md:text-base font-normal tracking-[-0.01em] transition-colors duration-200"
            style={{
              color: progress >= 0.88 ? "#27272a" : "#d4d4d8",
            }}
          >
            {author}
          </p>
        </div>
      </div>

      {/* Bottom-right oversized red outlined quotation marks */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-0 right-0 translate-x-[16%] sm:translate-x-[14%] z-0"
      >
        <svg
          viewBox="0 0 340 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[170px] sm:w-[230px] md:w-[280px] lg:w-[320px] xl:w-[360px] h-auto block transition-all duration-300"
          style={{
            opacity: 0.35 + 0.65 * progress,
            transform: `scale(${0.96 + 0.04 * progress})`,
          }}
        >
          <path
            d="M22 242 V146 C22 86 52 38 118 14 L132 76 C92 92 78 114 78 138 H134 V242"
            stroke="#ef2323"
            strokeWidth="1.75"
            strokeLinejoin="miter"
          />
          <path
            d="M174 242 V146 C174 86 204 38 270 14 L284 76 C244 92 230 114 230 138 H286 V242"
            stroke="#ef2323"
            strokeWidth="1.75"
            strokeLinejoin="miter"
          />
        </svg>
      </div>
    </section>
  );
}
