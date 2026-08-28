// components/Activity.tsx
'use client';

import { useState } from "react";
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

// Data statis untuk proyek - TODO: ganti dengan proyek Anda sendiri
const activities = [
  {
    id: "1",
    title: "MyProfile - Personal Portfolio",
    description: "Website portofolio pribadi untuk menampilkan profil, pengalaman, keahlian, dan proyek yang pernah saya kerjakan.",
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
    description: "Sistem informasi madrasah diniyah untuk membantu pengelolaan data siswa, kegiatan belajar, dan administrasi pendidikan.",
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
    description: "Chatbot multifungsi untuk mencari gambar anime, mengubah gambar, GIF, dan video menjadi stiker WhatsApp, serta mengunduh media dari berbagai platform.",
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
    description: "Aplikasi pengelolaan sampah desa untuk mendata, memantau, dan membantu pengorganisasian aktivitas pengelolaan limbah.",
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
    description: "Aplikasi monitoring tanaman untuk memantau kondisi tanaman secara real-time dan membantu perawatan berdasarkan data yang tersedia.",
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
    description: "Website profil KSM Al-Khawarizmi untuk memperkenalkan kelompok studi mahasiswa Islam Jurusan Teknik Informatika, kegiatan, dan informasinya.",
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
    description: "Aplikasi pembelajaran bahasa Jepang untuk membantu pengguna mempelajari dan berlatih huruf kana, yaitu hiragana dan katakana.",
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
    description: "Aplikasi habit tracker untuk membantu pengguna membangun, mencatat, dan memantau kebiasaan positif secara konsisten.",
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
    description: "Website informasi dan promosi layanan tour dan travel untuk membantu memperkenalkan paket perjalanan Haji dan Umrah.",
    image_url: "/images/project-9.jpg",
    status: "active",
    category: "Travel Website",
    demo_url: "",
    github_url: "https://github.com/HUTAOCHAN99/Tour-Mega",
    order_index: 6
  },
];

// Filter aktivitas aktif dan urutkan berdasarkan order_index
const activeActivities = activities
  .filter(activity => activity.status === "active")
  .sort((a, b) => a.order_index - b.order_index);

const technologyCount = ROW_1.length + ROW_2.length;

// Angka mengikuti data yang ditampilkan di portfolio.
const stats = [
  {
    number: `${activeActivities.length}`,
    label: "Proyek Tercatat",
    icon: <FaLaptopCode className="text-primary text-2xl" />,
  },
  {
    number: `${experiences.length}`,
    label: "Pengalaman Tercatat",
    icon: <FaCalendar className="text-primary text-2xl" />,
  },
  {
    number: `${technologyCount}`,
    label: "Teknologi Dikuasai",
    icon: <FaCode className="text-primary text-2xl" />,
  },
];

export default function Activity() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="project" className="py-16 bg-page">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold mb-2 tracking-wider">
            -- Proyek
          </p>
          <h2 className="text-3xl font-semibold text-heading">Proyek Saya</h2>
          <p className="text-muted mt-4 max-w-2xl mx-auto">
            Beberapa proyek yang pernah saya kerjakan, baik proyek pribadi,
            freelance, maupun profesional.
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
                      <p className="text-muted text-sm">Project thumbnail</p>
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
                        {activity.description}
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
                            Demo
                          </a>
                        ) : (
                          <span className="inline-flex items-center rounded-lg border border-border px-3 py-2 text-sm text-muted">
                            Demo belum tersedia
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
                            GitHub
                          </a>
                        ) : (
                          <span className="inline-flex items-center rounded-lg border border-border px-3 py-2 text-sm text-muted">
                            GitHub belum tersedia
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
                {isExpanded ? "Tampilkan Lebih Sedikit" : "Lihat Semua Proyek"}
              </button>
            </div>
          )}

          {/* Stats Section */}
          <div className="mt-16 pt-8 border-t border-border-subtle">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-heading mb-2">
                Pencapaian Saya
              </h3>
              <p className="text-muted">
                Perjalanan dan pencapaian saya dalam angka
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
                      {stat.number}
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
                Tertarik Berkolaborasi?
              </h3>
              <p className="text-body mb-4 md:mb-6 text-sm md:text-base">
                Punya proyek menarik atau ingin bekerja sama? Jangan ragu
                untuk menghubungi saya.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Link
                  href="#contact"
                  className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg shadow hover:shadow-md transition duration-300 text-center"
                >
                  Hubungi Saya
                </Link>
                {/* TODO: ganti dengan nomor WhatsApp Anda, format: 628xxxxxxxxxx */}
                <a
                  href="https://wa.me/62812345678900"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface hover:bg-surface-2 text-heading font-medium py-3 px-6 rounded-lg border border-border-strong hover:border-subtle transition duration-300 text-center"
                >
                  Chat via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </>
      </div>
    </section>
  );
}