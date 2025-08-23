"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-black font-black text-sm">Z</span>
              </div>
              <span className="text-xl font-black text-white">ZYNO</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium raptor-themed merchandise for dinosaur enthusiasts. Quality products that bring prehistoric power
              to your everyday life.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Home
              </Link>
              <Link href="/shop" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Shop All
              </Link>
              <Link
                href="/shop?category=posters"
                className="text-gray-400 hover:text-orange-500 transition-colors text-sm"
              >
                Posters
              </Link>
              <Link
                href="/shop?category=polaroids"
                className="text-gray-400 hover:text-orange-500 transition-colors text-sm"
              >
                Polaroids
              </Link>
              <Link
                href="/shop?category=tshirts"
                className="text-gray-400 hover:text-orange-500 transition-colors text-sm"
              >
                T-Shirts
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                About Us
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Customer Service</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/contact" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Contact Us
              </Link>
              <Link href="/shipping" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Shipping Info
              </Link>
              <Link href="/returns" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Returns & Exchanges
              </Link>
              <Link href="/size-guide" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Size Guide
              </Link>
              <Link href="/faq" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                FAQ
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Stay Updated</h3>
            <p className="text-gray-400 text-sm">Subscribe to get updates on new products and exclusive offers.</p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
              />
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold">Subscribe</Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        {/* Contact Info */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 text-gray-400 pr-8">
            <Mail className="h-4 w-4 text-orange-500" />
            <span className="text-sm">zynostorez@gmail.com</span>
          </div>

          <div className="flex items-center space-x-3 text-gray-400 pr-8">
            <Instagram className="h-4 w-4 text-orange-500" />
            <span className="text-sm">zynostorez@gmail.com</span>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">© 2024 ZYNO. All rights reserved.</div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
