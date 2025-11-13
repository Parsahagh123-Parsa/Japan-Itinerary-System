import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Layout/Header'
import { ToastProvider } from '../components/UI/ToastContainer'
import { ErrorBoundary } from '../components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Japan Itinerary System',
  description: 'AI-powered Japan travel planning platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <ToastProvider>
            <Header />
            {children}
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}

