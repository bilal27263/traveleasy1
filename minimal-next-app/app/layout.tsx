<<<<<<< HEAD
import { Navigation } from '@/components/navigation'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TravelEasy Morocco',
  description: 'Discover the magic of Morocco with TravelEasy',
=======
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
>>>>>>> d7d080f (Integrated dashboard design and implemented authentication)
}

export default function RootLayout({
  children,
<<<<<<< HEAD
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="pt-16">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-12">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
    <div>
      <h3 className="text-xl font-bold mb-4">Travel Easy</h3>
      <p className="text-gray-400">Discover the magic of Morocco with us.</p>
      <p className="text-gray-400 mt-4">Email: bilalaiyadi04@gmail.com</p>
    </div>
    <div>
      <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
      <ul className="space-y-2">
        <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
        <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
        <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
        <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
      </ul>
    </div>
    <div>
      <h4 className="text-lg font-semibold mb-4">Our Partners</h4>
      <ul className="space-y-2">
        <li className="text-gray-400">FABWS</li>
        <li className="text-gray-400">GudCity</li>
        <li className="text-gray-400">Partner Hotel 1</li>
        <li className="text-gray-400">Partner Hotel 2</li>
      </ul>
      <h4 className="text-lg font-semibold mt-6 mb-2">Follow Us</h4>
      <div className="flex space-x-4">
        <Link href="#" className="text-gray-400 hover:text-white transition-colors">
          <span className="sr-only">Facebook</span>
          <FacebookIcon className="h-6 w-6" />
        </Link>
        <Link href="#" className="text-gray-400 hover:text-white transition-colors">
          <span className="sr-only">Instagram</span>
          <InstagramIcon className="h-6 w-6" />
        </Link>
        <Link href="#" className="text-gray-400 hover:text-white transition-colors">
          <span className="sr-only">Twitter</span>
          <TwitterIcon className="h-6 w-6" />
        </Link>
      </div>
    </div>
    <div>
      <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
      <p className="text-gray-400 mb-4">Subscribe to our newsletter for travel tips and exclusive offers.</p>
      <form className="flex flex-col space-y-2">
        <Input type="email" placeholder="Your email" className="bg-gray-700 text-white" />
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600">Subscribe</Button>
      </form>
    </div>
  </div>
  <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
    <p className="mb-4">&copy; 2023 Travel Easy. All rights reserved.</p>
    <Button asChild variant="outline" className="bg-orange-500 hover:bg-orange-600 text-white">
      <Link href="/contact">Contact Us</Link>
    </Button>
  </div>
</footer>
      </body>
    </html>
  )
}

=======
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
>>>>>>> d7d080f (Integrated dashboard design and implemented authentication)
