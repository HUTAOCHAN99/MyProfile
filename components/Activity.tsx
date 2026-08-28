// components/Activity.tsx
import Link from "next/link";
import Image from "next/image";
import {
  FaCalendar,
  FaCode,
  FaLaptopCode,
} from "react-icons/fa";
import { experiences } from "./Experience";
import { ROW_1, ROW_2 } from "./Division";

// Data statis untuk proyek - TODO: ganti dengan proyek Anda sendiri
const activities = [
  {
    id: "1",
    title: "MyProfile - Personal Portfolio",
    description: "Website portofolio pribadi yang berisi karya dan pengalaman saya.",
    image_url: "/images/project-1.jpg",
    status: "active",
    category: "Web Development",
    order_index: 1
  },
  {
    id: "2",
    title: "Sistem Informasi Madrasah Diniyah Nurul Huda Kebondalem",
    description: "Sistem informasi untuk madrasah diniyah yang berfungsi untuk mengelola data siswa dan kegiatan pendidikan.",
    image_url: "/images/project-2.jpg",
    status: "active",
    category: "Mobile Development",
    order_index: 2
  },
  {
    id: "3",
    title: "AgemasenBot",
    description: "Chatbot untuk membantu pengguna dalam menemukan gambar anime,convert image,gif,video menjadi stiker whatsapp,download media dari berbagai platform,dan lainnya.",
    image_url: "/images/project-3.jpg",
    status: "active",
    category: "UI/UX Design",
    order_index: 3
  },
  {
    id: "4",
    title: "Sampah Desa",
    description: "Aplikasi untuk mengelola dan memantau limbah di desa.",
    image_url: "/images/project-4.jpg",
    status: "active",
    category: "Freelance",
    order_index: 5
  },
  {
    id: "5",
    title: "Plant Monitoring",
    description: "Aplikasi untuk memantau kondisi tanaman secara real-time.",
    image_url: "/images/project-5.jpg",
    status: "active",
    category: "Personal Project",
    order_index: 6
  },
  {
    id: "6",
    title: "Al-Khawarizmi Website",
    description: "Website untuk memperkenalkan kelompok studi mahasiswa Islam Jurusan Teknik Informatika.",
    image_url: "/images/project-7.jpg",
    status: "active",
    category: "Personal Project",
    order_index: 6
  },
  {
    id: "7",
    title: "KanaApp",
    description: "Aplikasi untuk membantu pengguna belajar huruf kana (hiragana dan katakana) dalam bahasa Jepang.",
    image_url: "/images/project-8.jpg",
    status: "active",
    category: "Personal Project",
    order_index: 6
  },
  {
    id: "8",
    title: "Purewill",
    description: "Aplikasi Habit Tracker.",
    image_url: "/images/project-11.jpg",
    status: "active",
    category: "Personal Project",
    order_index: 6
  },
  {
    id: "9",
    title: "Website Tour Mega",
    description: "Website untuk memperkenalkan jasa tour dan travel Haji dan Umrah.",
    image_url: "/images/project-9.jpg",
    status: "active",
    category: "Personal Project",
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
            {activeActivities.map((activity) => (
              <div key={activity.id} className="group">
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

                    <div className="mt-auto pt-4 border-t border-border">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted flex items-center">
                          <FaCalendar className="w-3 h-3 mr-2" />
                          {activity.category}
                        </span>
                        <Link
                          href={`/activity/${activity.id}`}
                          className="text-primary hover:text-primary-light font-medium flex items-center group-hover:translate-x-1 transition-transform duration-300"
                        >
                          Learn More
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

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