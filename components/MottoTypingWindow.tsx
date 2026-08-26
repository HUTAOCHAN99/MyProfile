"use client";

import { useEffect, useState } from "react";
import { VscVscode } from "react-icons/vsc";

interface MottoTypingWindowProps {
  /** Nama file yang tampil di title bar & tab, mis. "motto.ts" */
  fileName?: string;
  /** Motto yang akan diketik (tanpa tanda kutip) */
  motto: string;
  /** Kecepatan mengetik per karakter (ms) */
  typingSpeed?: number;
  /** Kecepatan menghapus per karakter (ms) */
  deletingSpeed?: number;
  /** Jeda setelah selesai mengetik sebelum mulai menghapus (ms) */
  pauseAfterTyping?: number;
  /** Jeda setelah selesai menghapus sebelum mengetik ulang (ms) */
  pauseBeforeRetyping?: number;
  /** Ulangi animasi terus-menerus */
  loop?: boolean;
}

export default function MottoTypingWindow({
  fileName = "motto.ts",
  motto,
  typingSpeed = 55,
  deletingSpeed = 30,
  pauseAfterTyping = 2200,
  pauseBeforeRetyping = 600,
  loop = true,
}: MottoTypingWindowProps) {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "waiting">(
    "typing"
  );

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setText(motto);
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < motto.length) {
        timeout = setTimeout(() => {
          setText(motto.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pauseAfterTyping);
      }
    } else if (phase === "pausing") {
      if (loop) {
        timeout = setTimeout(() => setPhase("deleting"), 0);
      }
      // if not looping, stay paused forever (text stays fully typed)
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(motto.slice(0, text.length - 1));
        }, deletingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("waiting"), pauseBeforeRetyping);
      }
    } else if (phase === "waiting") {
      timeout = setTimeout(() => setPhase("typing"), 0);
    }

    return () => clearTimeout(timeout);
  }, [text, phase, motto, typingSpeed, deletingSpeed, pauseAfterTyping, pauseBeforeRetyping, loop]);

  return (
    <div className="rounded-lg overflow-hidden shadow-xl border border-white/10 bg-[#1e1e1e] w-full">
      {/* Windows-style title bar */}
      <div className="flex items-center justify-between bg-[#2b2b2b] px-3 py-2 select-none">
        <div className="flex items-center gap-2 min-w-0">
          <VscVscode className="text-[15px] leading-none text-[#23a8f2]" aria-label="Visual Studio Code" />
          <span className="text-gray-300 text-xs sm:text-sm truncate">
            {fileName} - Code Editor
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className="w-6 h-5 flex items-center justify-center text-gray-400 hover:bg-white/10 rounded-sm text-xs">
            &#x2212;
          </span>
          <span className="w-6 h-5 flex items-center justify-center text-gray-400 hover:bg-white/10 rounded-sm text-xs">
            &#x25A1;
          </span>
          <span className="w-6 h-5 flex items-center justify-center text-gray-300 hover:bg-red-600 hover:text-white rounded-sm text-xs">
            &#x2715;
          </span>
        </div>
      </div>

      {/* File tab */}
      <div className="flex items-center bg-[#252526] border-b border-black/40">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e] border-r border-black/40 text-xs sm:text-sm text-gray-200">
          <span className="w-2 h-2 rounded-sm bg-primary inline-block" />
          {fileName}
        </div>
      </div>

      {/* Code area */}
      <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed min-h-[200px] sm:min-h-[240px]">
        <div className="flex">
          <span className="text-gray-600 w-6 shrink-0 select-none">1</span>
          <span className="text-emerald-500/80">{"// Motto saya"}</span>
        </div>
        <div className="flex">
          <span className="text-gray-600 w-6 shrink-0 select-none">2</span>
          <span>
            <span className="text-sky-400">const</span>{" "}
            <span className="text-gray-200">motto</span>{" "}
            <span className="text-gray-400">=</span>{" "}
            <span className="text-orange-300">
              &quot;{text}
              <span className="inline-block w-[2px] h-[1em] align-middle bg-primary ml-[1px] animate-pulse" />
              &quot;
            </span>
            <span className="text-gray-400">;</span>
          </span>
        </div>
        <div className="flex">
          <span className="text-gray-600 w-6 shrink-0 select-none">3</span>
          <span>&nbsp;</span>
        </div>
        <div className="flex">
          <span className="text-gray-600 w-6 shrink-0 select-none">4</span>
          <span>
            <span className="text-pink-400">console</span>
            <span className="text-gray-400">.</span>
            <span className="text-yellow-300">log</span>
            <span className="text-gray-400">(</span>
            <span className="text-gray-200">motto</span>
            <span className="text-gray-400">);</span>
          </span>
        </div>
      </div>
    </div>
  );
}
