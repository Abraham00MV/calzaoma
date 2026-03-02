import './globals.css'
import { Poppins } from 'next/font/google'
import { WhatsAppButton } from './components/WhatsappButton'
import MyBag from './components/cart/MyBag'


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={poppins.variable}>
      <body className="font-sans bg-white text-gray-700">
        {children}
        <WhatsAppButton />
        <MyBag />


      </body>
    </html>
  )
}
