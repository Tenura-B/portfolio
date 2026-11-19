"use client";

import { useEffect, useRef, useState } from "react";

type CursorMode = "dot" | "explore";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  const modeRef = useRef<CursorMode>("dot");
  const [mode, setMode] = useState<CursorMode>("dot");
  const [visible, setVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  // Active container tracking to detect moving between containers on the same grid
  const activeContainerRef = useRef<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Stop state: turns red with white text when movement stops
  const [isStopped, setIsStopped] = useState(false);
  const isStoppedRef = useRef(false);
  const stopTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check if device uses a fine pointer (mouse / trackpad)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsFinePointer(window.matchMedia("(pointer: fine)").matches);
    }
  }, []);

  // Helper to restart the stop timer
  const restartStopTimer = () => {
    if (stopTimerRef.current) {
      clearTimeout(stopTimerRef.current);
    }
    if (modeRef.current === "explore") {
      stopTimerRef.current = setTimeout(() => {
        if (modeRef.current === "explore") {
          isStoppedRef.current = true;
          setIsStopped(true);
        }
      }, 170);
    }
  };

  // Inspect the element under the pointer coordinates to determine mode & container
  const checkCursorTarget = (x: number, y: number) => {
    if (x < 0 || y < 0) {
      if (modeRef.current !== "dot") {
        modeRef.current = "dot";
        setMode("dot");
      }
      activeContainerRef.current = null;
      if (isStoppedRef.current) {
        isStoppedRef.current = false;
        setIsStopped(false);
      }
      return;
    }

    const target = document.elementFromPoint(x, y);
    const containerEl = target?.closest('[data-cursor="explore"]') as HTMLElement | null;
    const currentContainerId = containerEl?.getAttribute("data-project-id") || (containerEl ? "explore-container" : null);
    const isExplore = Boolean(containerEl);
    const nextMode: CursorMode = isExplore ? "explore" : "dot";

    // Detect switching from one container to another (e.g. across the same grid row)
    if (currentContainerId !== activeContainerRef.current) {
      const prevContainer = activeContainerRef.current;
      activeContainerRef.current = currentContainerId;

      // Reset stopped red state immediately
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
      if (isStoppedRef.current) {
        isStoppedRef.current = false;
        setIsStopped(false);
      }

      // If jumping directly between containers on the same grid, trigger a clean snap-reset
      if (prevContainer && currentContainerId) {
        setIsResetting(true);
        if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = setTimeout(() => {
          setIsResetting(false);
          restartStopTimer();
        }, 70);
      }
    }

    if (modeRef.current !== nextMode) {
      modeRef.current = nextMode;
      setMode(nextMode);

      if (nextMode === "dot") {
        activeContainerRef.current = null;
        if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
        if (isStoppedRef.current) {
          isStoppedRef.current = false;
          setIsStopped(false);
        }
      } else {
        restartStopTimer();
      }
    }
  };

  const checkTargetRef = useRef(checkCursorTarget);
  checkTargetRef.current = checkCursorTarget;

  // Animation and follow loop
  useEffect(() => {
    if (!isFinePointer) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = () => {
      current.current.x = lerp(current.current.x, pos.current.x, 0.18);
      current.current.y = lerp(current.current.y, pos.current.y, 0.18);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Check current target every frame so scroll, fast moves, and container exits react instantly
      if (pos.current.x >= 0 && pos.current.y >= 0) {
        checkTargetRef.current(pos.current.x, pos.current.y);
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isFinePointer]);

  // Track mouse and scroll interactions
  useEffect(() => {
    if (!isFinePointer) return;

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      setVisible(true);

      // If stopped, moving resets back to white/moving state
      if (isStoppedRef.current) {
        isStoppedRef.current = false;
        setIsStopped(false);
      }

      checkCursorTarget(e.clientX, e.clientY);
      restartStopTimer();
    };

    const onScrollOrWheel = () => {
      if (isStoppedRef.current) {
        isStoppedRef.current = false;
        setIsStopped(false);
      }
      if (pos.current.x >= 0 && pos.current.y >= 0) {
        checkCursorTarget(pos.current.x, pos.current.y);
        restartStopTimer();
      }
    };

    const onLeave = () => {
      setVisible(false);
      modeRef.current = "dot";
      setMode("dot");
      activeContainerRef.current = null;
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
      if (isStoppedRef.current) {
        isStoppedRef.current = false;
        setIsStopped(false);
      }
    };

    const onEnter = () => {
      setVisible(true);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScrollOrWheel, { passive: true });
    window.addEventListener("wheel", onScrollOrWheel, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScrollOrWheel);
      window.removeEventListener("wheel", onScrollOrWheel);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  const isExploring = mode === "explore" && !isResetting;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 150ms ease" }}
    >
      {/* Enlarged rounded explore container */}
      <div
        style={{
          width: isExploring ? "124px" : "10px",
          height: isExploring ? "124px" : "10px",
          backgroundColor: isExploring ? "#ffffff" : "#000000",
          borderRadius: "9999px",
          position: "relative",
          overflow: "hidden",
          border: isExploring
            ? isStopped
              ? "1px solid rgba(239, 35, 35, 0.5)"
              : "1px solid rgba(0, 0, 0, 0.1)"
            : "0px solid transparent",
          boxShadow: isExploring
            ? isStopped
              ? "0 14px 40px rgba(239, 35, 35, 0.42)"
              : "0 10px 32px rgba(0, 0, 0, 0.12)"
            : "none",
          transition: isExploring
            ? "width 350ms cubic-bezier(0.19,1,0.22,1), height 350ms cubic-bezier(0.19,1,0.22,1), border-color 300ms ease, box-shadow 300ms ease"
            : "width 0ms, height 0ms, background-color 0ms, box-shadow 0ms, border 0ms",
        }}
      >
        {isExploring && (
          <>
            {/* Base Layer: White Background + Black Text */}
            <div className="absolute inset-0 bg-white flex items-center justify-center select-none pointer-events-none">
              <span className="text-[14.5px] font-medium text-black tracking-[-0.01em] select-none font-['Inter',Arial,sans-serif]">
                Explore
              </span>
            </div>

            {/* Wipe Layer: Red Background + White Text - Animates smoothly from Top to Bottom */}
            <div
              className="absolute inset-0 bg-[#ef2323] flex items-center justify-center select-none pointer-events-none will-change-[clip-path]"
              style={{
                clipPath: isStopped ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
                WebkitClipPath: isStopped ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
                transition: isStopped
                  ? "clip-path 420ms cubic-bezier(0.19, 1, 0.22, 1), -webkit-clip-path 420ms cubic-bezier(0.19, 1, 0.22, 1)"
                  : "clip-path 260ms ease-out, -webkit-clip-path 260ms ease-out",
              }}
            >
              <span className="text-[14.5px] font-medium text-white tracking-[-0.01em] select-none font-['Inter',Arial,sans-serif]">
                Explore
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
