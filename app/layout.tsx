import './globals.css'
import { Space_Grotesk } from 'next/font/google'
import { WhatsAppButton } from './components/WhatsappButton'
import MyBag from './components/cart/MyBag'
import Navbar from '@/app/components/layout/Navbar'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${spaceGrotesk.className}`}>
      <body className="bg-white text-gray-700">
        <Navbar />
        {children}
        <WhatsAppButton />
        <MyBag />
      </body>
    </html>
  )
}