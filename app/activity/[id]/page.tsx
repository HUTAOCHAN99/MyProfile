// app/activity/[id]/page.tsx
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  FaTag,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaHome,
  FaCalendarAlt,
} from 'react-icons/fa'
import Link from 'next/link'

// Data statis untuk proyek - TODO: ganti dengan proyek Anda sendiri (samakan dengan components/Activity.tsx)
const activities = [
  {
    id: "1",
    title: "Nama Proyek 1",
    description: "Deskripsikan proyek ini: apa masalah yang diselesaikan, teknologi yang digunakan, dan hasilnya.",
    content: `
      <p>Tuliskan latar belakang proyek ini di sini: masalah apa yang ingin Anda selesaikan, dan mengapa proyek ini penting.</p>
      
      <h3>Yang saya kerjakan:</h3>
      <ul>
        <li>Poin pekerjaan/tanggung jawab 1</li>
        <li>Poin pekerjaan/tanggung jawab 2</li>
        <li>Poin pekerjaan/tanggung jawab 3</li>
        <li>Poin pekerjaan/tanggung jawab 4</li>
      </ul>
      
      <h3>Teknologi yang digunakan:</h3>
      <ul>
        <li>Contoh: Next.js</li>
        <li>Contoh: Tailwind CSS</li>
        <li>Contoh: PostgreSQL</li>
        <li>Contoh: Vercel</li>
      </ul>
    `,
    image_url: "/images/project-1.jpg",
    status: "active",
    category: "Web Development",
    tags: ["nextjs", "react", "web"],
    registration_link: "https://github.com/username/nama-proyek-1",
    created_at: "2024-01-15",
    updated_at: "2024-02-20"
  },
  {
    id: "2",
    title: "Nama Proyek 2",
    description: "Deskripsikan proyek ini: apa masalah yang diselesaikan, teknologi yang digunakan, dan hasilnya.",
    content: `
      <p>Tuliskan latar belakang proyek ini di sini.</p>
      
      <h3>Yang saya kerjakan:</h3>
      <ul>
        <li>Poin pekerjaan/tanggung jawab 1</li>
        <li>Poin pekerjaan/tanggung jawab 2</li>
      </ul>
      
      <h3>Teknologi yang digunakan:</h3>
      <ul>
        <li>Contoh: Flutter</li>
        <li>Contoh: Firebase</li>
      </ul>
    `,
    image_url: "/images/project-2.jpg",
    status: "active",
    category: "Mobile Development",
    tags: ["flutter", "mobile"],
    registration_link: "https://github.com/username/nama-proyek-2",
    created_at: "2024-02-01",
    updated_at: "2024-02-25"
  },
  {
    id: "3",
    title: "Nama Proyek 3",
    description: "Deskripsikan proyek ini: apa masalah yang diselesaikan, teknologi yang digunakan, dan hasilnya.",
    content: `
      <p>Tuliskan latar belakang proyek ini di sini.</p>
      
      <h3>Yang saya kerjakan:</h3>
      <ul>
        <li>Poin pekerjaan/tanggung jawab 1</li>
        <li>Poin pekerjaan/tanggung jawab 2</li>
      </ul>
    `,
    image_url: "/images/project-3.jpg",
    status: "active",
    category: "UI/UX Design",
    tags: ["figma", "design"],
    registration_link: "https://figma.com/@username",
    created_at: "2024-03-01",
    updated_at: "2024-03-10"
  },
  {
    id: "4",
    title: "Nama Proyek 4",
    description: "Deskripsikan proyek ini: apa masalah yang diselesaikan, teknologi yang digunakan, dan hasilnya.",
    content: `
      <p>Tuliskan latar belakang proyek ini di sini.</p>
      
      <h3>Yang saya kerjakan:</h3>
      <ul>
        <li>Poin pekerjaan/tanggung jawab 1</li>
        <li>Poin pekerjaan/tanggung jawab 2</li>
      </ul>
    `,
    image_url: "/images/project-4.jpg",
    status: "active",
    category: "Open Source",
    tags: ["opensource", "github"],
    registration_link: "https://github.com/username/nama-proyek-4",
    created_at: "2024-02-15",
    updated_at: "2024-03-05"
  }
]

// Mendapatkan data berdasarkan id
function getActivityById(id: string) {
  return activities.find(activity => activity.id === id) || activities[0]
}

// Mendapatkan proyek terkait (exclude current)
function getRelatedActivities(currentId: string) {
  return activities
    .filter(activity => activity.id !== currentId && activity.status === 'active')
    .slice(0, 3)
}

// Generate static params untuk semua proyek
export function generateStaticParams() {
  return activities.map((activity) => ({
    id: activity.id,
  }))
}

export default async function ActivityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const activity = getActivityById(id)
  const relatedActivities = getRelatedActivities(id)

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-page pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 mb-8">
          <nav className="flex items-center space-x-2 text-sm text-muted">
            <Link
              href="/activity"
              className="flex items-center hover:text-heading transition duration-300 focus:outline-none focus:ring-2 focus:ring-primary rounded"
            >
              <FaArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
            <span className="text-subtle">/</span>
            <Link 
              href="/"
              className="flex items-center hover:text-heading transition duration-300"
            >
              <FaHome className="w-3 h-3 mr-1" />
              Home
            </Link>
            <span className="text-subtle">/</span>
            <Link 
              href="/#project"
              className="hover:text-heading transition duration-300"
            >
              Projects
            </Link>
            <span className="text-subtle">/</span>
            <span className="text-heading truncate max-w-xs">{activity.title}</span>
          </nav>
        </div>

        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="relative rounded-2xl overflow-hidden mb-8">
            <div className="relative h-64 md:h-96 bg-gradient-to-br from-primary/20 to-primary/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-4">
                  <svg className="w-24 h-24 text-primary/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <h3 className="text-2xl font-semibold text-heading/50">{activity.title}</h3>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-page via-page/60 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {activity.category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                    {activity.category}
                  </span>
                )}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                  {activity.status === 'active' ? 'Active' : 'Archived'}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading mb-4">
                {activity.title}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Project Details */}
              <div className="bg-surface/50 rounded-xl p-6 md:p-8 mb-8">
                <h2 className="text-2xl font-semibold text-heading mb-6">About This Project</h2>
                
                <div className="text-body leading-relaxed space-y-4">
                  {activity.content ? (
                    <div 
                      className="prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: activity.content }}
                    />
                  ) : (
                    <p className="whitespace-pre-line">{activity.description}</p>
                  )}
                </div>

                {/* Tags */}
                {activity.tags && activity.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-border">
                    <h3 className="text-lg font-medium text-heading mb-4 flex items-center">
                      <FaTag className="w-4 h-4 mr-2 text-primary" />
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {activity.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-surface-2 text-body"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Link CTA */}
              {activity.registration_link && (
                <div className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-xl p-6 md:p-8">
                  <div className="flex items-start">
                    <FaCalendarAlt className="w-6 h-6 text-primary mt-1 mr-4 shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-heading mb-2">Ingin Lihat Lebih Lanjut?</h3>
                      <p className="text-body mb-4">
                        Kunjungi repository, demo, atau case study lengkap dari proyek ini.
                      </p>
                      <a
                        href={activity.registration_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg shadow hover:shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        Lihat Proyek
                        <FaExternalLinkAlt className="w-4 h-4 ml-2" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Related Projects */}
            <div className="lg:col-span-1">
              {relatedActivities.length > 0 && (
                <div className="bg-surface rounded-xl p-6 sticky top-24">
                  <h3 className="text-xl font-semibold text-heading mb-6">Other Projects</h3>
                  <div className="space-y-4">
                    {relatedActivities.map((related) => (
                      <Link
                        key={related.id}
                        href={`/activity/${related.id}`}
                        className="block group"
                      >
                        <div className="flex items-center p-3 rounded-lg hover:bg-surface-2 transition duration-300 border border-border hover:border-border-strong">
                          <div className="shrink-0 w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                            <svg className="w-6 h-6 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          </div>
                          <div className="ml-4 flex-1">
                            <h4 className="text-sm font-medium text-heading group-hover:text-primary transition duration-300 line-clamp-2">
                              {related.title}
                            </h4>
                            <div className="flex items-center mt-1">
                              {related.category && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-surface-2 text-body">
                                  {related.category}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  {/* View All Projects Link */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <Link
                      href="/#project"
                      className="flex items-center justify-center text-primary hover:text-primary-light font-medium py-2 transition duration-300 group"
                    >
                      <span>View All Projects</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
