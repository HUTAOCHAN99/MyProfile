"use client";

import { useLanguage } from "./LanguageProvider";

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { language, toggleLanguage } = useLanguage();
  const isEn = language === "en";

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={isEn ? "Switch to Indonesian" : "Ganti ke Bahasa Inggris"}
      title={isEn ? "Bahasa Indonesia" : "English"}
      className={`relative inline-flex h-10 w-16 items-center justify-center rounded-lg border border-border text-body hover:text-heading hover:bg-surface-2 transition duration-300 focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
    >
      <span className="relative flex items-center gap-1 text-xs font-semibold tracking-wide">
        <span className={isEn ? "text-muted" : "text-primary"}>ID</span>
        <span className="text-muted">/</span>
        <span className={isEn ? "text-primary" : "text-muted"}>EN</span>
      </span>
    </button>
  );
}
