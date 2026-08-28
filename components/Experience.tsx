// components/Experience.tsx
// Data pengalaman - TODO: tambah/ubah sesuai perjalanan Anda selanjutnya
type ExperienceItem = {
  id: string;
  role: string;
  place: string;
  period: string;
  category: string;
  current?: boolean;
};

export const experiences: ExperienceItem[] = [
  {
    id: "1",
    role: "Anggota",
    place: "KSM Al-Khawarizmi",
    period: "2023 — 2024",
    category: "Organisasi",
  },
  {
    id: "2",
    role: "Enumerator",
    place: "Survei Lapangan",
    period: "2024",
    category: "Pekerjaan",
  },
  {
    id: "3",
    role: "Juara 3 — Informatics Competition",
    place: "HMIF, Universitas Ahmad Dahlan Yogyakarta",
    period: "2024",
    category: "Prestasi",
  },
  {
    id: "4",
    role: "Ketua",
    place: "KSM Al-Khawarizmi",
    period: "2024 — Sekarang",
    category: "Organisasi",
    current: true,
  },
  {
    id: "5",
    role: "Front End Developer",
    place: "PT Mega Karunia Berkah",
    period: "2025",
    category: "Pekerjaan",
  },
  {
    id: "6",
    role: "Community Administrator",
    place: "Hachimi Discord Community",
    period: "2025 — Sekarang",
    category: "Komunitas",
    current: true,
  },
  {
    id: "7",
    role: "Web Developer",
    place: "Madrasah Diniyah Nurul Huda Kebondalem",
    period: "2026",
    category: "Pekerjaan",
  },
  {
    id: "8",
    role: "Admin & Bot Developer",
    place: "AgemasenBot",
    period: "2026 — Sekarang",
    category: "Pekerjaan",
    current: true,
  },
];

export default function Experience() {
  return (
    <section id="journey" className="min-h-screen py-16 md:py-20 flex items-center">
      <div className="container mx-auto px-4">
        <div className="timeline-container">
          {/* Header - konsisten dengan pola section lain (mis. Proyek Saya) */}
          <div className="timeline-header">
            <p className="text-primary font-semibold mb-2 tracking-wider">
              -- Pengalaman
            </p>
            <h2 className="text-3xl font-semibold text-heading">
              Perjalanan Saya
            </h2>
            <p className="text-muted mt-4 max-w-2xl mx-auto">
              Rekam jejak organisasi, pekerjaan, dan pencapaian yang telah
              saya lalui sejauh ini.
            </p>
          </div>

          {/* Timeline list */}
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
                        {item.role}
                      </h3>
                      <p className="text-body text-sm mt-0.5">
                        {item.place}
                      </p>
                      <div className="mt-3 flex items-center flex-wrap gap-2">
                        <span className="timeline-tag">
                          {item.category}
                        </span>
                        {item.current && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-primary">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Aktif
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="timeline-date shrink-0 text-sm font-medium text-muted whitespace-nowrap">
                      {item.period}
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
