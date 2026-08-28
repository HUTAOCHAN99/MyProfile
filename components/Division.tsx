'use client'

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import type { IconType } from 'react-icons'
import {
  SiNextdotjs,
  SiReact,
  SiPython,
  SiUnity,
  SiDocker,
  SiNodedotjs,
  SiJavascript,
  SiSharp,
  SiFlutter,
  SiDart,
  SiGithub,
  SiSupabase,
  SiPostgresql,
  SiTypescript,
  SiTailwindcss,
} from 'react-icons/si'
import { LuX, LuExternalLink } from 'react-icons/lu'

// ============================================================================
// DATA — daftar teknologi. Tambah / ubah / hapus item di sini.
// ============================================================================
type Tech = {
  id: string
  name: string
  category: string
  description: string
  docUrl: string
  Icon: IconType
  color: string
}

export const ROW_1: Tech[] = [
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'React Framework',
    description:
      'Full-stack React framework untuk membangun aplikasi web modern dengan server rendering dan routing bawaan.',
    docUrl: 'https://nextjs.org/docs',
    Icon: SiNextdotjs,
    color: '#FFFFFF',
  },
  {
    id: 'react',
    name: 'React',
    category: 'UI Library',
    description:
      'Library JavaScript untuk membangun antarmuka pengguna berbasis komponen yang cepat dan reaktif.',
    docUrl: 'https://react.dev',
    Icon: SiReact,
    color: '#61DAFB',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Programming Language',
    description:
      'Bahasa pemrograman serbaguna dengan sintaks bersih, banyak dipakai untuk backend, data, dan automasi.',
    docUrl: 'https://docs.python.org/3/',
    Icon: SiPython,
    color: '#3776AB',
  },
  {
    id: 'unity',
    name: 'Unity',
    category: 'Game Engine',
    description:
      'Game engine lintas platform untuk membangun game 2D, 3D, serta pengalaman interaktif real-time.',
    docUrl: 'https://docs.unity3d.com/',
    Icon: SiUnity,
    color: '#FFFFFF',
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'Containerization',
    description:
      'Platform containerization untuk mengemas, mendistribusikan, dan menjalankan aplikasi secara konsisten.',
    docUrl: 'https://docs.docker.com/',
    Icon: SiDocker,
    color: '#2496ED',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'JavaScript Runtime',
    description:
      'Runtime JavaScript berbasis mesin V8 untuk membangun layanan backend yang cepat dan scalable.',
    docUrl: 'https://nodejs.org/en/docs',
    Icon: SiNodedotjs,
    color: '#339933',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Programming Language',
    description:
      'Bahasa inti web — menjalankan logika interaktif di browser maupun server.',
    docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    Icon: SiJavascript,
    color: '#F7DF1E',
  },
  {
    id: 'csharp',
    name: 'C#',
    category: 'Programming Language',
    description:
      'Bahasa pemrograman modern dari Microsoft, tulang punggung pengembangan game di Unity dan aplikasi .NET.',
    docUrl: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
    Icon: SiSharp,
    color: '#9B4F96',
  },
]

export const ROW_2: Tech[] = [
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'UI Toolkit',
    description:
      'Toolkit UI dari Google untuk membangun aplikasi mobile, web, dan desktop dari satu basis kode.',
    docUrl: 'https://docs.flutter.dev/',
    Icon: SiFlutter,
    color: '#02569B',
  },
  {
    id: 'dart',
    name: 'Dart',
    category: 'Programming Language',
    description:
      'Bahasa pemrograman yang dioptimalkan untuk client, dan menjadi fondasi framework Flutter.',
    docUrl: 'https://dart.dev/guides',
    Icon: SiDart,
    color: '#0175C2',
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Version Control',
    description:
      'Platform hosting kode dan kolaborasi berbasis Git untuk mengelola versi dan alur kerja tim.',
    docUrl: 'https://docs.github.com/',
    Icon: SiGithub,
    color: '#FFFFFF',
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'Backend as a Service',
    description:
      'Alternatif open-source Firebase — database, auth, dan storage siap pakai berbasis PostgreSQL.',
    docUrl: 'https://supabase.com/docs',
    Icon: SiSupabase,
    color: '#3ECF8E',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Relational Database',
    description:
      'Sistem basis data relasional open-source yang kuat, andal, dan kaya fitur.',
    docUrl: 'https://www.postgresql.org/docs/',
    Icon: SiPostgresql,
    color: '#4169E1',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Programming Language',
    description:
      'Superset JavaScript dengan static typing, meningkatkan keandalan dan skalabilitas kode.',
    docUrl: 'https://www.typescriptlang.org/docs/',
    Icon: SiTypescript,
    color: '#3178C6',
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    category: 'CSS Framework',
    description:
      'Framework CSS utility-first untuk membangun antarmuka kustom secara cepat langsung di markup.',
    docUrl: 'https://tailwindcss.com/docs',
    Icon: SiTailwindcss,
    color: '#38BDF8',
  },
]

type OriginRect = {
  top: number
  left: number
  width: number
  height: number
}

type SelectPayload = {
  tech: Tech
  rowIndex: number
  instanceKey: string
  rect: OriginRect
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function Division() {
  const [selected, setSelected] = useState<Tech | null>(null)
  const [origin, setOrigin] = useState<OriginRect | null>(null)
  const [activeInstance, setActiveInstance] = useState<string | null>(null)
  const [pausedRow, setPausedRow] = useState<number | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  const handleSelect = useCallback((payload: SelectPayload) => {
    setOrigin(payload.rect)
    setSelected(payload.tech)
    setActiveInstance(payload.instanceKey)
    setPausedRow(payload.rowIndex)
  }, [])

  const handleClose = useCallback(() => {
    setSelected(null)
    // origin / activeInstance / pausedRow dibersihkan setelah animasi exit selesai
    // (lihat onExitComplete di AnimatePresence) supaya logo "kembali" mulus
    // ke posisi marquee sebelum item aslinya ditampilkan lagi.
    triggerRef.current?.focus()
  }, [])

  // ESC untuk menutup + lock scroll (html & body) selama panel terbuka.
  // Pakai teknik "freeze" posisi scroll (bukan cuma overflow:hidden) supaya
  // beberapa browser/perangkat gak tetap bisa scroll halaman di belakang
  // backdrop, dan kompensasi lebar scrollbar biar layout gak geser.
  useEffect(() => {
    if (!selected) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKeyDown)

    const scrollY = window.scrollY
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    const previous = {
      htmlOverflow: document.documentElement.style.overflow,
      bodyPosition: document.body.style.position,
      bodyTop: document.body.style.top,
      bodyWidth: document.body.style.width,
      bodyOverflow: document.body.style.overflow,
      bodyPaddingRight: document.body.style.paddingRight,
    }

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    closeBtnRef.current?.focus()

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.documentElement.style.overflow = previous.htmlOverflow
      document.body.style.position = previous.bodyPosition
      document.body.style.top = previous.bodyTop
      document.body.style.width = previous.bodyWidth
      document.body.style.overflow = previous.bodyOverflow
      document.body.style.paddingRight = previous.bodyPaddingRight
      // Kembalikan posisi scroll persis seperti sebelum panel dibuka.
      window.scrollTo(0, scrollY)
    }
  }, [selected, handleClose])

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-page py-24 md:py-32"
    >
      {/* background grid + subtle vignette */}
      <div className="tech-hud-grid pointer-events-none absolute inset-0 z-0" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-page via-transparent to-page" />

      {/* heading */}
      <div className="relative z-10 mb-16 px-4 text-center md:mb-20">
        <p className="mb-2 flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.35em] text-cyan-400/80">
          <span className="h-px w-6 bg-cyan-400/50" />
          TECH STACK
          <span className="h-px w-6 bg-cyan-400/50" />
        </p>
        <h2 className="text-3xl font-bold tracking-wide text-heading md:text-4xl">
          Arsenal Teknologi
        </h2>
        <p className="mx-auto mt-3 max-w-md text-xs tracking-widest text-muted md:text-sm">
          PILIH SATU UNIT UNTUK MELIHAT DETAIL TEKNIS
        </p>
      </div>

      {/* marquee rows */}
      <div className="relative z-10 flex flex-col gap-6 md:gap-8">
        <MarqueeRow
          techs={ROW_1}
          direction="left"
          duration={40}
          rowIndex={0}
          isPaused={pausedRow === 0}
          activeInstance={activeInstance}
          onSelect={handleSelect}
        />
        <MarqueeRow
          techs={ROW_2}
          direction="right"
          duration={50}
          rowIndex={1}
          isPaused={pausedRow === 1}
          activeInstance={activeInstance}
          onSelect={handleSelect}
        />
      </div>

      <div className="relative z-10 mt-16 flex justify-center px-4 md:mt-20">
        <div className="w-full max-w-3xl border-t border-dashed border-white/10" />
      </div>

      <AnimatePresence
        onExitComplete={() => {
          setOrigin(null)
          setActiveInstance(null)
          setPausedRow(null)
        }}
      >
        {selected && origin && (
          <TechDetailOverlay
            key={selected.id}
            tech={selected}
            origin={origin}
            onClose={handleClose}
            closeBtnRef={closeBtnRef}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

// ============================================================================
// MARQUEE ROW — dua set item digandakan untuk loop tak-terlihat sambungannya
// ============================================================================
function MarqueeRow({
  techs,
  direction,
  duration,
  rowIndex,
  isPaused,
  activeInstance,
  onSelect,
}: {
  techs: Tech[]
  direction: 'left' | 'right'
  duration: number
  rowIndex: number
  isPaused: boolean
  activeInstance: string | null
  onSelect: (payload: SelectPayload) => void
}) {
  const animationName = 'tech-marquee'

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
      {/* edge fade agar logo terlihat "menghilang" di tepi layar — pakai var(--color-page) supaya ikut tema light/dark */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-40"
        style={{ background: 'linear-gradient(to right, var(--color-page), transparent)' }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-40"
        style={{ background: 'linear-gradient(to left, var(--color-page), transparent)' }}
      />

      <div
        className="flex w-max"
        style={{
          animationName,
          animationDuration: `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDirection: direction === 'left' ? 'normal' : 'reverse',
          animationPlayState: isPaused ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {[0, 1].map((setIndex) => (
          <div key={setIndex} className="flex shrink-0" aria-hidden={setIndex === 1}>
            {techs.map((tech) => {
              const instanceKey = `${rowIndex}-${setIndex}-${tech.id}`
              return (
                <MarqueeItem
                  key={instanceKey}
                  tech={tech}
                  isHidden={instanceKey === activeInstance}
                  tabIndex={setIndex === 1 ? -1 : 0}
                  onSelect={(rect) =>
                    onSelect({ tech, rowIndex, instanceKey, rect })
                  }
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================================
// MARQUEE ITEM — kartu teknologi yang bisa diklik di dalam marquee
// ============================================================================
function MarqueeItem({
  tech,
  isHidden,
  tabIndex,
  onSelect,
}: {
  tech: Tech
  isHidden: boolean
  tabIndex: number
  onSelect: (rect: OriginRect) => void
}) {
  const Icon = tech.Icon

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    onSelect({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    })
  }

  return (
    <motion.button
      type="button"
      tabIndex={isHidden ? -1 : tabIndex}
      aria-label={`Pilih teknologi ${tech.name}`}
      onClick={handleClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      style={{ opacity: isHidden ? 0 : 1, visibility: isHidden ? 'hidden' : 'visible' }}
      className="group relative mx-2.5 flex w-[144px] shrink-0 cursor-pointer flex-col items-center gap-3 rounded-lg border border-border bg-surface/40 px-4 py-5 backdrop-blur-sm transition-colors duration-300 hover:border-cyan-400/40 focus-visible:outline-none focus-visible:border-cyan-400/70 focus-visible:ring-1 focus-visible:ring-cyan-400/50 md:mx-3.5 md:w-[168px]"
    >
      {/* corner HUD marks */}
      <span className="pointer-events-none absolute left-1.5 top-1.5 h-2 w-2 border-l border-t border-border-strong transition-colors duration-300 group-hover:border-cyan-300" />
      <span className="pointer-events-none absolute right-1.5 top-1.5 h-2 w-2 border-r border-t border-border-strong transition-colors duration-300 group-hover:border-cyan-300" />
      <span className="pointer-events-none absolute left-1.5 bottom-1.5 h-2 w-2 border-b border-l border-border-strong transition-colors duration-300 group-hover:border-cyan-300" />
      <span className="pointer-events-none absolute right-1.5 bottom-1.5 h-2 w-2 border-b border-r border-border-strong transition-colors duration-300 group-hover:border-cyan-300" />

      <span
        className="relative flex h-11 w-11 items-center justify-center transition-all duration-300 group-hover:scale-110 md:h-12 md:w-12"
        style={{ filter: 'brightness(0.9)' }}
      >
        <Icon
          className="h-full w-full transition-all duration-300 group-hover:brightness-125"
          style={{
            color: tech.color,
            filter: `drop-shadow(0 0 0 transparent)`,
          }}
        />
        <span
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-60"
          style={{ backgroundColor: tech.color }}
        />
      </span>

      <span className="relative text-[11px] font-medium tracking-wide text-body transition-colors duration-300 group-hover:text-heading md:text-xs">
        {tech.name}
      </span>
      
    </motion.button>
  )
}

// ============================================================================
// DETAIL OVERLAY — logo terbang ke tengah (FLIP, transform-based) + panel info
// ============================================================================
function TechDetailOverlay({
  tech,
  origin,
  onClose,
  closeBtnRef,
}: {
  tech: Tech
  origin: OriginRect
  onClose: () => void
  closeBtnRef: React.RefObject<HTMLButtonElement | null>
}) {
  const Icon = tech.Icon
  const [target, setTarget] = useState<{ top: number; left: number; size: number } | null>(null)
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    const compute = () => {
      const isMobile = window.innerWidth < 768
      const size = Math.min(190, window.innerWidth * 0.42, window.innerHeight * 0.24)
      const top = window.innerHeight * (isMobile ? 0.24 : 0.28)
      const left = window.innerWidth / 2
      setTarget({ top, left, size })
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  // Portal target hanya tersedia di client — hindari mismatch SSR.
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!target || !mounted) return null

  const originCenterX = origin.left + origin.width / 2
  const originCenterY = origin.top + origin.height / 2
  const dx = originCenterX - target.left
  const dy = originCenterY - target.top
  const scale = origin.width / target.size

  const flipTransition = { type: 'spring' as const, stiffness: 180, damping: 24, mass: 0.9 }

  // Di-portal langsung ke <body> supaya `position: fixed` SELALU relatif ke
  // viewport asli (selalu 100vh penuh, di mana pun section ini di-scroll),
  // dan tidak "terjebak" jadi relatif ke ancestor manapun yang punya
  // transform/will-change aktif (mis. wrapper <Reveal> yang membungkus
  // section ini — transform ancestor membuat containing block baru untuk
  // descendant fixed, sehingga overlay jadi seolah cuma setinggi section).
  return createPortal(
    <>
      {/* backdrop: dim + blur sisa halaman */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      {/* logo terbang dari posisi marquee menuju tengah (transform-only: x/y/scale) */}
      <motion.div
        className="fixed z-50"
        style={{
          left: target.left,
          top: target.top,
          width: target.size,
          height: target.size,
          marginLeft: -target.size / 2,
          marginTop: -target.size / 2,
        }}
        initial={{ x: dx, y: dy, scale }}
        animate={{ x: 0, y: 0, scale: 1 }}
        exit={{ x: dx, y: dy, scale }}
        transition={flipTransition}
      >
        <HUDRing color={tech.color} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon
            className="h-[44%] w-[44%]"
            style={{ color: tech.color, filter: `drop-shadow(0 0 26px ${tech.color}aa)` }}
          />
        </div>
      </motion.div>

      {/* info panel */}
      <div
        className="tech-detail-overlay fixed inset-0 z-50 flex flex-col items-center overflow-hidden px-4 pb-10"
        onClick={onClose}
      >
        <div style={{ height: target.top + target.size / 2 + 32 }} className="w-full shrink-0" aria-hidden="true" />

        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Detail teknologi ${tech.name}`}
          onClick={(event) => event.stopPropagation()}
          className="relative w-full max-w-sm rounded-xl border border-border bg-surface/95 p-6 text-center shadow-[0_0_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-7"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.3, delay: 0.12 }}
        >
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Tutup panel"
            className="absolute right-3 top-3 rounded-full border border-border p-2 text-muted transition-colors duration-200 hover:border-border-strong hover:text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <LuX className="h-4 w-4" />
          </button>

          <p className="text-[10px] tracking-[0.35em] text-cyan-300/70">
            TECH · {tech.id.toUpperCase()}
          </p>
          <h3 className="mt-2 text-2xl font-bold tracking-wide text-heading">
            {tech.name.toUpperCase()}
          </h3>
          <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-muted">
            {tech.category}
          </p>

          <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-body">
            {tech.description}
          </p>

          <div className="mt-5 flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            STATUS: ACTIVE
          </div>

          <a
            href={tech.docUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-md border border-border-strong px-5 py-2.5 text-xs font-semibold tracking-wider text-heading transition-all duration-300 hover:border-cyan-300 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            VIEW DOCUMENTATION
            <LuExternalLink className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </div>
    </>,
    document.body
  )
}

// HUD ring + crosshair ticks di sekeliling logo terpilih
function HUDRing({ color }: { color: string }) {
  return (
    <>
      <motion.div
        className="pointer-events-none absolute -inset-3 rounded-full border border-dashed"
        style={{ borderColor: `${color}55` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-6 rounded-full border"
        style={{ borderColor: `${color}30` }}
        animate={{ rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      />
      <span className="pointer-events-none absolute -left-9 top-1/2 h-px w-6 -translate-y-1/2" style={{ backgroundColor: `${color}66` }} />
      <span className="pointer-events-none absolute -right-9 top-1/2 h-px w-6 -translate-y-1/2" style={{ backgroundColor: `${color}66` }} />
      <span className="pointer-events-none absolute left-1/2 -top-9 h-6 w-px -translate-x-1/2" style={{ backgroundColor: `${color}66` }} />
      <span className="pointer-events-none absolute -bottom-9 left-1/2 h-6 w-px -translate-x-1/2" style={{ backgroundColor: `${color}66` }} />
      <span className="pointer-events-none absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] tracking-[0.3em] text-white/40">
        LOCKED
      </span>
    </>
  )
}