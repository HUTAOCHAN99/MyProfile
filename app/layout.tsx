// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider, themeInitScript } from '../components/ThemeProvider'
import { LanguageProvider } from '../components/LanguageProvider'
import { CustomCursor } from '../components/CustomCursor'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AZAN DEV',
  description: 'Portfolio pribadi Zhofir - Software Developer',

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
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${inter.className} bg-page text-body`} suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <CustomCursor />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
