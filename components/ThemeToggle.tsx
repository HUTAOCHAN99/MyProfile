"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? "Aktifkan mode gelap" : "Aktifkan mode terang"}
      title={isLight ? "Mode Gelap" : "Mode Terang"}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border text-body hover:text-heading hover:bg-surface-2 transition duration-300 focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
    >
      <FiSun
        className={`absolute w-5 h-5 transition-all duration-300 ${
          isLight ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
        }`}
      />
      <FiMoon
        className={`absolute w-5 h-5 transition-all duration-300 ${
          isLight ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
        }`}
      />
    </button>
  );
}
