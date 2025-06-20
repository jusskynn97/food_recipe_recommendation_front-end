import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="bg-[#f26950] rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
              C
            </div>
            <span className="font-bold text-lg">Cooks Delight</span>
          </div>

          <nav className="flex flex-wrap justify-center space-x-6 mb-4 md:mb-0">
            <Link href="/" className="hover:text-[#f26950]">
              HOME
            </Link>
            <Link href="/recipes" className="hover:text-[#f26950]">
              RECIPES
            </Link>
            <Link href="/cooking-tips" className="hover:text-[#f26950]">
              COOKING TIPS
            </Link>
            <Link href="/about-us" className="hover:text-[#f26950]">
              ABOUT US
            </Link>
          </nav>

          <div className="flex space-x-4">
            <Link href="#" className="hover:text-[#f26950]">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="hover:text-[#f26950]">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="hover:text-[#f26950]">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="hover:text-[#f26950]">
              <Youtube className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400 mt-8">COPYRIGHT © 2023 COOKS DELIGHT</div>
      </div>
    </footer>
  )
}
