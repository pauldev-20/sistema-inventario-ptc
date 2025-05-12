import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import { StoreProvider } from '@/modules/common/providers/store-provider'
import { QueryProviders } from '@/modules/common/providers/react-query-provider'
import { Toaster } from '@/modules/common/components/ui/toaster'
import { ThemeProvider } from '@/modules/common/providers/theme-provider'

export const metadata: Metadata = {
  title: 'Sistema de Inventario',
  description: 'Sistema de Inventario'
}

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter'
})

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={`bg-background min-h-screen max-w-[100vw] overflow-hidden ${inter.variable} font-sans`}>
        <StoreProvider>
          <QueryProviders>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
            <Toaster />
          </QueryProviders>
        </StoreProvider>
      </body>
    </html>
  )
}
