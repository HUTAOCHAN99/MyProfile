'use client'

import { useState } from 'react'
import { 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaWhatsapp, 
  FaArrowRight,
  FaCheckCircle
} from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'

interface ContactFormData {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulasi pengiriman form
    try {
      // Simulasi delay network
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      })
      
      setIsSuccess(true)
      toast.success('Pesan berhasil dikirim! (Mode Demo)')
      
      // Reset success state setelah 5 detik
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)

    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
                -- Contact
              </p>
              <h2 className="text-3xl font-semibold text-heading">
                Get In Touch
              </h2>
            </div>

            {isSuccess ? (
              <div className="bg-green-900/20 border border-green-700 rounded-lg p-8 text-center">
                <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-heading mb-2">
                  Terima Kasih!
                </h3>
                <p className="text-body">
                  Pesan Anda telah berhasil dikirim. Saya akan membalas secepatnya.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 text-primary hover:text-primary-light font-medium"
                >
                  Kirim pesan lainnya
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-body font-medium mb-2">
                    Name *
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-surface-2 border border-border-strong rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-heading transition duration-300" 
                    placeholder="Your Name" 
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-body font-medium mb-2">
                    Email *
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-surface-2 border border-border-strong rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-heading transition duration-300" 
                    placeholder="you@example.com" 
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-body font-medium mb-2">
                    Message *
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-surface-2 border border-border-strong rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-heading transition duration-300" 
                    placeholder="Your Message"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg shadow hover:shadow-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Mengirim...
                    </>
                  ) : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info - TODO: ganti dengan data kontak Anda sendiri */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-semibold text-heading mb-8">
              Punya proyek atau pertanyaan?
              <span className="block">Mari terhubung!</span>
            </h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-primary mr-4 mt-1">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-heading mb-1">
                    Location
                  </h4>
                  <p className="text-body">
                    Kota, Provinsi, Indonesia
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-primary mr-4 mt-1">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-heading mb-1">
                    Email
                  </h4>
                  <a href="mailto:email@anda.com" className="text-body hover:text-primary transition duration-300">
                    email@anda.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-primary mr-4 mt-1">
                  <FaWhatsapp className="text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-heading mb-1">
                    WhatsApp
                  </h4>
                  <a href="https://wa.me/62812345678900" target="_blank" className="text-body hover:text-primary transition duration-300">
                    +62 812-3456-7890
                  </a>
                </div>
              </div>

              <div className="pt-8">
                <a href="/assets/CV-NamaAnda.pdf" target="_blank" className="inline-flex items-center text-primary font-medium hover:text-primary-light transition duration-300">
                  Download CV
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