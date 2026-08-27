// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider, themeInitScript } from '../components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

// TODO: ganti title & description sesuai identitas Anda
export const metadata = {
  title: 'AZAN DEV',
  description: 'Portfolio pribadi Zhofir - Fullstack Developer',

  icons: {
    icon: '/assets/logo_AZAN.webp',
    shortcut: '/assets/logo_AZAN.webp',
    apple: '/assets/logo_AZAN.webp',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Runs before paint so a saved "light" preference doesn't flash dark first */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${inter.className} bg-page text-body`} suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
