"use client";

import MottoTypingWindow from "./MottoTypingWindow";
import { useLanguage } from "./LanguageProvider";
import { translations } from "../lib/i18n";

export default function About() {
  const { language } = useLanguage();
  const t = translations[language].about;

  return (
    <section id="about" className="bg-page-alt">
      <div className="container mx-auto px-4 pt-8">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
          {/* Code editor window - typing motto */}
          <div className="lg:w-1/2 w-full">
            <p className="text-primary font-semibold mb-4 tracking-wider lg:hidden">
              {t.label}
            </p>
            {/* TODO: ganti motto di bawah ini dengan motto Anda sendiri */}
            <MottoTypingWindow
              fileName="motto.ts"
              motto="Start converting 0 to 1, from 1 to 10 and from 10 to 100"
            />
          </div>

          {/* Content */}
          <div className="lg:w-1/2">
            <p className="text-primary font-semibold mb-4 tracking-wider hidden lg:block">
              {t.label}
            </p>
            {/* TODO: ganti dengan cerita/keahlian Anda sendiri */}
            <p className="text-body mb-8 text-justify">
              {t.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}