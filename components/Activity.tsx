// components/Activity.tsx
'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaCalendar,
  FaCode,
  FaExternalLinkAlt,
  FaGithub,
  FaLaptopCode,
} from "react-icons/fa";
import { experiences } from "./Experience";
import { ROW_1, ROW_2 } from "./Division";
import { useLanguage } from "./LanguageProvider";
import { translations } from "../lib/i18n";
import type { Language } from "./LanguageProvider";

const activities = [
  {
    id: "1",
    title: "MyProfile - Personal Portfolio",
    description: {
      id: "Website portofolio pribadi untuk menampilkan profil, pengalaman, keahlian, dan proyek yang pernah saya kerjakan.",
      en: "A personal portfolio website showcasing my profile, experience, skills, and past projects.",
    },
    image_url: "/images/project-1.jpg",
    status: "active",
    category: "Portfolio Website",
    demo_url: "https://zhofir.vercel.app/",
    github_url: "https://github.com/HUTAOCHAN99/MyProfile",
    order_index: 1
  },
  {
    id: "2",
    title: "Sistem Informasi Madrasah Diniyah Nurul Huda Kebondalem",
    description: {
      id: "Sistem informasi madrasah diniyah untuk membantu pengelolaan data siswa, kegiatan belajar, dan administrasi pendidikan.",
      en: "An information system for an Islamic school, helping manage student data, learning activities, and academic administration.",
    },
    image_url: "/images/project-2.jpg",
    status: "active",
    category: "Education System",
    demo_url: "https://madin-nurul-huda-kebondalem.vercel.app/",
    github_url: "https://github.com/HUTAOCHAN99/Sistem-Informasi-Madin",
    order_index: 2
  },
  {
    id: "3",
    title: "AgemasenBot",
    description: {
      id: "Chatbot multifungsi untuk mencari gambar anime, mengubah gambar, GIF, dan video menjadi stiker WhatsApp, serta mengunduh media dari berbagai platform.",
      en: "A multifunctional chatbot for finding anime images, converting images, GIFs, and videos into WhatsApp stickers, and downloading media from various platforms.",
    },
    image_url: "/images/project-3.jpg",
    status: "active",
    category: "Chatbot & Automation",
    demo_url: "https://wa.me/6289650789020?text=%21menu",
    github_url: "https://github.com/HUTAOCHAN99/AgemasenBot.git",
    order_index: 3 
  },
  {
    id: "4",
    title: "Sampah Desa",
    description: {
      id: "Aplikasi pengelolaan sampah desa untuk mendata, memantau, dan membantu pengorganisasian aktivitas pengelolaan limbah.",
      en: "A village waste management app for recording, monitoring, and organizing waste management activities.",
    },
    image_url: "/images/project-4.jpg",
    status: "active",
    category: "Environmental Management",
    demo_url: "https://sistem-informasi-sampah.vercel.app/login",
    github_url: "https://github.com/HUTAOCHAN99/Sistem-Informasi-Sampah",
    order_index: 5
  },
  {
    id: "5",
    title: "Plant Monitoring",
    description: {
      id: "Aplikasi monitoring tanaman untuk memantau kondisi tanaman secara real-time dan membantu perawatan berdasarkan data yang tersedia.",
      en: "A plant monitoring app that tracks plant conditions in real time and helps with care based on the available data.",
    },
    image_url: "/images/project-5.jpg",
    status: "active",
    category: "IoT & Monitoring",
    demo_url: "https://plant-monitoring-v2.vercel.app/",
    github_url: "https://github.com/HUTAOCHAN99/plant-monitoring-v2",
    order_index: 6
  },
  {
    id: "6",
    title: "Al-Khawarizmi Website",
    description: {
      id: "Website profil KSM Al-Khawarizmi untuk memperkenalkan kelompok studi mahasiswa Islam Jurusan Teknik Informatika, kegiatan, dan informasinya.",
      en: "A profile website for KSM Al-Khawarizmi, introducing the Informatics Islamic student study group, its activities, and information.",
    },
    image_url: "/images/project-7.jpg",
    status: "active",
    category: "Organization Website",
    demo_url: "https://ak-web-pied.vercel.app/",
    github_url: "https://github.com/HUTAOCHAN99/AK-WEB",
    order_index: 6
  },
  {
    id: "7",
    title: "KanaApp",
    description: {
      id: "Aplikasi pembelajaran bahasa Jepang untuk membantu pengguna mempelajari dan berlatih huruf kana, yaitu hiragana dan katakana.",
      en: "A Japanese language learning app that helps users study and practice kana characters — hiragana and katakana.",
    },
    image_url: "/images/project-8.jpg",
    status: "active",
    category: "Learning Application",
    demo_url: "https://kana-app-delta.vercel.app/",
    github_url: "https://github.com/HUTAOCHAN99/KanaApp",
    order_index: 6
  },
  {
    id: "8",
    title: "Purewill",
    description: {
      id: "Aplikasi habit tracker untuk membantu pengguna membangun, mencatat, dan memantau kebiasaan positif secara konsisten.",
      en: "A habit tracker app that helps users build, log, and consistently monitor positive habits.",
    },
    image_url: "/images/project-11.jpg",
    status: "active",
    category: "Productivity App",
    demo_url: "",
    github_url: "https://github.com/HUTAOCHAN99/PUREWILL_FIX",
    order_index: 6
  },
  {
    id: "9",
    title: "Website Tour Mega",
    description: {
      id: "Website informasi dan promosi layanan tour dan travel untuk membantu memperkenalkan paket perjalanan Haji dan Umrah.",
      en: "An informational and promotional website for a tour and travel service, showcasing Hajj and Umrah travel packages.",
    },
    image_url: "/images/project-9.jpg",
    status: "active",
    category: "Travel Website",
    demo_url: "",
    github_url: "https://github.com/HUTAOCHAN99/Tour-Mega",
    order_index: 6
  },
];

const activeActivities = activities
  .filter(activity => activity.status === "active")
  .sort((a, b) => a.order_index - b.order_index);

const technologyCount = ROW_1.length + ROW_2.length;

function getStats(t: (typeof translations)[Language]["activity"]) {
  return [
    {
      number: `${activeActivities.length}`,
      label: t.statsProjects,
      icon: <FaLaptopCode className="text-primary text-2xl" />,
    },
    {
      number: `${experiences.length}`,
      label: t.statsExperience,
      icon: <FaCalendar className="text-primary text-2xl" />,
    },
    {
      number: `${technologyCount}`,
      label: t.statsTech,
      icon: <FaCode className="text-primary text-2xl" />,
    },
  ];
}

function CountUpNumber({ value }: { value: string }) {
  const target = Number(value);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !Number.isFinite(target)) return;

    let animationFrame = 0;
    let hasStarted = false;

    const animate = () => {
      const startTime = performance.now();
      const duration = 1200;

      const update = (currentTime: number) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(target * easedProgress));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(update);
        }
      };

      animationFrame = requestAnimationFrame(update);
    };

    const startAnimation = () => {
      if (hasStarted) return;
      hasStarted = true;
      animate();
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animationFrame = requestAnimationFrame(() => setCount(target));
      return () => cancelAnimationFrame(animationFrame);
    }

    if (typeof IntersectionObserver === "undefined") {
      startAnimation();
      return () => cancelAnimationFrame(animationFrame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [target]);

  return <div ref={ref}>{count}</div>;
}

export default function Activity() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { language } = useLanguage();
  const t = translations[language].activity;
  const stats = getStats(t);

  return (
    <section id="project" className="py-16 bg-page">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold mb-2 tracking-wider">
            {t.label}
          </p>
          <h2 className="text-3xl font-semibold text-heading">{t.title}</h2>
          <p className="text-muted mt-4 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {activeActivities.map((activity, index) => (
              <div
                key={activity.id}
                className={`group ${index >= 3 && !isExpanded ? "hidden" : ""}`}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-surface h-full flex flex-col hover:translate-y-[-4px] transition-transform duration-300">
                  {/* Thumbnail Container */}
                  <div className="relative h-48 md:h-56 overflow-hidden bg-surface-2">
                    <div className="w-full h-full bg-gradient-to-br from-surface-2 to-surface flex flex-col items-center justify-center">
                      <svg
                        className="w-12 h-12 text-subtle mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-muted text-sm">{t.thumbnailFallback}</p>
                    </div>
                    <Image
                      src={activity.image_url}
                      alt={`Thumbnail ${activity.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-page/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-semibold text-heading">
                        {activity.title}
                      </h3>
                      {activity.category && (
                        <span className="inline-block px-2 py-1 text-xs bg-primary/20 text-primary rounded mt-2">
                          {activity.category}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 md:p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-heading mb-3">
                        {activity.title}
                      </h3>
                      <p className="text-body text-sm leading-relaxed line-clamp-3">
                        {activity.description[language]}
                      </p>
                    </div>

                    <div className="mt-auto border-t border-border pt-4">
                      <div className="mb-3 flex items-center text-sm text-muted">
                        <FaCalendar className="mr-2 h-3 w-3" />
                        {activity.category}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activity.demo_url ? (
                          <a
                            href={activity.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white transition hover:bg-primary-dark"
                          >
                            <FaExternalLinkAlt className="mr-2 text-xs" />
                            {t.demo}
                          </a>
                        ) : (
                          <span className="inline-flex items-center rounded-lg border border-border px-3 py-2 text-sm text-muted">
                            {t.demoUnavailable}
                          </span>
                        )}
                        {activity.github_url ? (
                          <a
                            href={activity.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-lg border border-border-strong px-3 py-2 text-sm font-medium text-heading transition hover:border-primary hover:bg-surface-2"
                          >
                            <FaGithub className="mr-2 text-base" />
                            {t.github}
                          </a>
                        ) : (
                          <span className="inline-flex items-center rounded-lg border border-border px-3 py-2 text-sm text-muted">
                            {t.githubUnavailable}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {activeActivities.length > 3 && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setIsExpanded((expanded) => !expanded)}
                className="bg-surface hover:bg-surface-2 text-heading font-medium py-3 px-6 rounded-lg border border-border-strong hover:border-primary transition duration-300"
              >
                {isExpanded ? t.showLess : t.showAll}
              </button>
            </div>
          )}

          {/* Stats Section */}
          <div className="mt-16 pt-8 border-t border-border-subtle">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-heading mb-2">
                {t.achievementsTitle}
              </h3>
              <p className="text-muted">
                {t.achievementsSubtitle}
              </p>
            </div>

            {/* Centered Grid Wrapper */}
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="group text-center p-6 bg-surface rounded-xl shadow-md
                     hover:bg-surface-2 hover:-translate-y-1
                     transition-all duration-300"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/20">
                        {stat.icon}
                      </div>
                    </div>

                    <div className="text-3xl font-bold text-heading mb-1">
                      <CountUpNumber value={stat.number} />
                    </div>

                    <div className="text-body text-sm tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="bg-linear-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-lg p-6 md:p-8 max-w-3xl mx-auto">
              <h3 className="text-xl md:text-2xl font-semibold text-heading mb-3 md:mb-4">
                {t.ctaTitle}
              </h3>
              <p className="text-body mb-4 md:mb-6 text-sm md:text-base">
                {t.ctaSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Link
                  href="#contact"
                  className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg shadow hover:shadow-md transition duration-300 text-center"
                >
                  {t.ctaContact}
                </Link>
                <a
                  href="https://wa.me/6285656305716"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface hover:bg-surface-2 text-heading font-medium py-3 px-6 rounded-lg border border-border-strong hover:border-subtle transition duration-300 text-center"
                >
                  {t.ctaWhatsapp}
                </a>
              </div>
            </div>
          </div>
        </>
      </div>
    </section>
  );
}