'use client'

import { useEffect, useRef, useState } from 'react'
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaWhatsapp,
  FaArrowRight,
  FaGoogle,
  FaMicrosoft,
  FaYahoo,
  FaPaperPlane,
  FaTimes
} from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'
import { useLanguage } from './LanguageProvider'
import { translations } from '../lib/i18n'

interface ContactFormData {
  name: string
  email: string
  message: string
}

interface ContactFormErrors {
  name?: string
  email?: string
  message?: string
}

// Alamat email pemilik website — tujuan dari semua pesan contact form.
const OWNER_EMAIL = 'ahmadzhofir1808@gmail.com'

type EmailPlatform = 'gmail' | 'outlook' | 'yahoo' | 'default'

const EMAIL_PLATFORMS: {
  id: EmailPlatform
  label: string
  icon: typeof FaGoogle
}[] = [
  { id: 'gmail', label: 'Gmail', icon: FaGoogle },
  { id: 'outlook', label: 'Outlook', icon: FaMicrosoft },
  { id: 'yahoo', label: 'Yahoo Mail', icon: FaYahoo },
  { id: 'default', label: 'Default Email App', icon: FaEnvelope }
]

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Membangun URL "compose" untuk masing-masing platform email dari data form.
 * Semua nilai di-encode dengan encodeURIComponent agar aman dimasukkan ke URL
 * (menangani spasi, newline, dan karakter non-English).
 * Tidak ada password/credential yang dikirim atau disimpan di sini — ini
 * hanya membuka halaman compose milik masing-masing penyedia email.
 */
function buildComposeUrl(platform: EmailPlatform, data: ContactFormData): string {
  const subject = `Contact from ${data.name}`
  const body = `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`

  const to = encodeURIComponent(OWNER_EMAIL)
  const su = encodeURIComponent(subject)
  const bo = encodeURIComponent(body)

  switch (platform) {
    case 'gmail':
      return `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}&body=${bo}`
    case 'outlook':
      return `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${su}&body=${bo}`
    case 'yahoo':
      return `https://compose.mail.yahoo.com/?to=${to}&subject=${su}&body=${bo}`
    case 'default':
    default:
      return `mailto:${to}?subject=${su}&body=${bo}`
  }
}

export default function Contact() {
  const { language } = useLanguage()
  const t = translations[language].contact
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuItemRefs = useRef<(HTMLButtonElement | null)[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Hilangkan error field ini begitu user mulai memperbaikinya
    setErrors(prev => (prev[name as keyof ContactFormErrors] ? { ...prev, [name]: undefined } : prev))
  }

  const validate = (): boolean => {
    const nextErrors: ContactFormErrors = {}

    if (!formData.name.trim()) {
      nextErrors.name = t.errorName
    }

    if (!formData.email.trim()) {
      nextErrors.email = t.errorEmail
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      nextErrors.email = t.errorEmailInvalid
    }

    if (!formData.message.trim()) {
      nextErrors.message = t.errorMessage
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  // Klik "Send Message": validasi dulu, baru tampilkan pilihan platform email.
  const handleTriggerClick = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      toast.error(t.toastCheckFields)
      return
    }
    setIsMenuOpen(prev => !prev)
  }

  // User memilih salah satu platform: buka halaman compose sesuai platform.
  const handleSelectPlatform = (platform: EmailPlatform) => {
    if (!validate()) {
      setIsMenuOpen(false)
      toast.error(t.toastCheckFields)
      return
    }

    const url = buildComposeUrl(platform, formData)

    if (platform === 'default') {
      // mailto: harus dibuka di tab yang sama agar OS/browser bisa
      // mengarahkan ke aplikasi email default.
      window.location.assign(url)
    } else {
      window.open(url, '_blank', 'noopener,noreferrer')
    }

    setIsMenuOpen(false)
    triggerRef.current?.focus()

    const platformLabel = EMAIL_PLATFORMS.find(p => p.id === platform)?.label ?? platform
    toast.success(t.toastOpening(platformLabel))
  }

  // Tutup modal saat klik di luar dialog
  useEffect(() => {
    if (!isMenuOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  // Aksesibilitas keyboard: Escape menutup modal & mengembalikan fokus,
  // ArrowUp/ArrowDown/Home/End navigasi antar pilihan.
  const handleMenuKeyDown = (e: React.KeyboardEvent) => {
    const items = menuItemRefs.current.filter(Boolean) as HTMLButtonElement[]
    const currentIndex = items.findIndex(item => item === document.activeElement)

    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        setIsMenuOpen(false)
        triggerRef.current?.focus()
        break
      case 'ArrowDown':
        e.preventDefault()
        items[(currentIndex + 1 + items.length) % items.length]?.focus()
        break
      case 'ArrowUp':
        e.preventDefault()
        items[(currentIndex - 1 + items.length) % items.length]?.focus()
        break
      case 'Home':
        e.preventDefault()
        items[0]?.focus()
        break
      case 'End':
        e.preventDefault()
        items[items.length - 1]?.focus()
        break
    }
  }

  useEffect(() => {
    if (isMenuOpen) {
      menuItemRefs.current[0]?.focus()
    }
  }, [isMenuOpen])

  return (
    <section id="contact" className="py-16 bg-page-alt">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--color-surface)',
            color: 'var(--color-heading)',
            border: '1px solid var(--color-border)'
          }
        }}
      />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <div className="lg:w-1/2">
            <div className="mb-8">
              <p className="text-primary font-semibold mb-2 tracking-wider">
                {t.label}
              </p>
              <h2 className="text-3xl font-semibold text-heading">
                {t.title}
              </h2>
            </div>

            <form onSubmit={handleTriggerClick} className="space-y-6" noValidate>
              <div>
                <label htmlFor="name" className="block text-body font-medium mb-2">
                  {t.nameLabel}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`w-full px-4 py-3 bg-surface-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-heading transition duration-300 ${
                    errors.name ? 'border-red-500' : 'border-border-strong'
                  }`}
                  placeholder={t.namePlaceholder}
                />
                {errors.name && (
                  <p id="name-error" role="alert" className="mt-2 text-sm text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-body font-medium mb-2">
                  {t.emailLabel}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`w-full px-4 py-3 bg-surface-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-heading transition duration-300 ${
                    errors.email ? 'border-red-500' : 'border-border-strong'
                  }`}
                  placeholder={t.emailPlaceholder}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="mt-2 text-sm text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-body font-medium mb-2">
                  {t.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`w-full px-4 py-3 bg-surface-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-heading transition duration-300 ${
                    errors.message ? 'border-red-500' : 'border-border-strong'
                  }`}
                  placeholder={t.messagePlaceholder}
                ></textarea>
                {errors.message && (
                  <p id="message-error" role="alert" className="mt-2 text-sm text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Trigger + modal pilihan platform email */}
              <div className="relative">
                <button
                  ref={triggerRef}
                  type="submit"
                  aria-haspopup="dialog"
                  aria-expanded={isMenuOpen}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg shadow hover:shadow-md transition duration-300 flex items-center justify-center gap-2"
                >
                  <FaPaperPlane className="text-sm" />
                  {t.sendMessage}
                </button>

                {isMenuOpen && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                    onMouseDown={() => setIsMenuOpen(false)}
                  >
                    <div
                      ref={menuRef}
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="email-platform-title"
                      onMouseDown={event => event.stopPropagation()}
                      onKeyDown={handleMenuKeyDown}
                      className="w-full max-w-md rounded-2xl border border-border-strong bg-surface p-6 shadow-2xl"
                    >
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                            {t.sendMessage}
                          </p>
                          <h3 id="email-platform-title" className="text-xl font-semibold text-heading">
                            {t.choosePlatformTitle}
                          </h3>
                          <p className="mt-2 text-sm text-muted">
                            {t.choosePlatformSubtitle}
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-label={t.closePlatformAria}
                          onClick={() => {
                            setIsMenuOpen(false)
                            triggerRef.current?.focus()
                          }}
                          className="rounded-lg p-2 text-muted transition hover:bg-surface-2 hover:text-heading focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <FaTimes />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {EMAIL_PLATFORMS.map(({ id, label, icon: Icon }, index) => (
                          <button
                            key={id}
                            ref={el => {
                              menuItemRefs.current[index] = el
                            }}
                            type="button"
                            onClick={() => handleSelectPlatform(id)}
                            className="flex items-center gap-3 rounded-xl border border-border-strong bg-surface-2 px-4 py-4 text-left text-body transition hover:border-primary hover:bg-page focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <Icon className="text-lg text-primary" />
                            <span className="font-medium">{label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Contact Info - TODO: ganti dengan data kontak Anda sendiri */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-semibold text-heading mb-8">
              {t.infoTitle}
              <span className="block">{t.infoTitleLine2}</span>
            </h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-primary mr-4 mt-1">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-heading mb-1">
                    {t.locationLabel}
                  </h4>
                  <p className="text-body">
                    Ngaglik ,Sleman, Daerah Istimewa Yogyakarta, Indonesia
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-primary mr-4 mt-1">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-heading mb-1">
                    {t.emailInfoLabel}
                  </h4>
                  <a href="mailto:email@anda.com" className="text-body hover:text-primary transition duration-300">
                    ahmadzhofir1808@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-primary mr-4 mt-1">
                  <FaWhatsapp className="text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-heading mb-1">
                    {t.whatsappLabel}
                  </h4>
                  <a href="https://wa.me/6285656305716" target="_blank" className="text-body hover:text-primary transition duration-300">
                    +62 856-5630-5716
                  </a>
                </div>
              </div>

              <div className="pt-8">
                <a
                  href="/doc/MyCV.pdf"
                  download="Zhofir_CV.pdf"
                  className="inline-flex items-center text-primary font-medium hover:text-primary-light transition duration-300"
                >
                  {t.downloadCv}
                  <FaArrowRight className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}