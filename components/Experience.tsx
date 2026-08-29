// components/Experience.tsx
"use client";

import { useLanguage } from "./LanguageProvider";
import { translations } from "../lib/i18n";

type ExperienceItem = {
  id: string;
  role: { id: string; en: string };
  place: string;
  period: { id: string; en: string };
  category: { id: string; en: string };
  current?: boolean;
};

export const experiences: ExperienceItem[] = [
  {
    id: "1",
    role: { id: "Anggota", en: "Member" },
    place: "KSM Al-Khawarizmi",
    period: { id: "2023 — 2024", en: "2023 — 2024" },
    category: { id: "Organisasi", en: "Organization" },
  },
  {
    id: "2",
    role: { id: "Enumerator", en: "Enumerator" },
    place: "Survei Lapangan",
    period: { id: "2024", en: "2024" },
    category: { id: "Pekerjaan", en: "Work" },
  },
  {
    id: "3",
    role: {
      id: "Juara 3 — Informatics Competition",
      en: "3rd Place — Informatics Competition",
    },
    place: "HMIF, Universitas Ahmad Dahlan Yogyakarta",
    period: { id: "2024", en: "2024" },
    category: { id: "Prestasi", en: "Achievement" },
  },
  {
    id: "4",
    role: { id: "Ketua", en: "Chairman" },
    place: "KSM Al-Khawarizmi",
    period: { id: "2024 — Sekarang", en: "2024 — Present" },
    category: { id: "Organisasi", en: "Organization" },
    current: true,
  },
  {
    id: "5",
    role: { id: "Front End Developer", en: "Front End Developer" },
    place: "PT Mega Karunia Berkah",
    period: { id: "2025", en: "2025" },
    category: { id: "Pekerjaan", en: "Work" },
  },
  {
    id: "6",
    role: { id: "Community Administrator", en: "Community Administrator" },
    place: "Hachimi Discord Community",
    period: { id: "2025 — Sekarang", en: "2025 — Present" },
    category: { id: "Komunitas", en: "Community" },
    current: true,
  },
  {
    id: "7",
    role: { id: "Web Developer", en: "Web Developer" },
    place: "Madrasah Diniyah Nurul Huda Kebondalem",
    period: { id: "2026", en: "2026" },
    category: { id: "Pekerjaan", en: "Work" },
  },
  {
    id: "8",
    role: { id: "Admin & Bot Developer", en: "Admin & Bot Developer" },
    place: "AgemasenBot",
    period: { id: "2026 — Sekarang", en: "2026 — Present" },
    category: { id: "Pekerjaan", en: "Work" },
    current: true,
  },
];

export default function Experience() {
  const { language } = useLanguage();
  const t = translations[language].experience;

  return (
    <section id="journey" className="min-h-screen py-16 md:py-20 flex items-center">
      <div className="container mx-auto px-4">
        <div className="timeline-container">
          <div className="timeline-header">
            <p className="text-primary font-semibold mb-2 tracking-wider">
              {t.label}
            </p>
            <h2 className="text-3xl font-semibold text-heading">
              {t.title}
            </h2>
            <p className="text-muted mt-4 max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          <div>
            {experiences.map((item) => {
              return (
                <div
                  key={item.id}
                  className="timeline-item transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg active:translate-y-0 active:scale-[0.99]"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-heading">
                        {item.role[language]}
                      </h3>
                      <p className="text-body text-sm mt-0.5">
                        {item.place}
                      </p>
                      <div className="mt-3 flex items-center flex-wrap gap-2">
                        <span className="timeline-tag">
                          {item.category[language]}
                        </span>
                        {item.current && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-primary">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            {t.active}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="timeline-date shrink-0 text-sm font-medium text-muted whitespace-nowrap">
                      {item.period[language]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
