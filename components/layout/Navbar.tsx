'use client'

import { useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/sermons', label: 'Sermons' },
  { href: '/events', label: 'Events' },
  { href: '/blog', label: 'Blog' },
  { href: '/give', label: 'Give' },
  { href: '/members', label: 'Members' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 glass-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/gbc-logo.png"
              alt="GBC Logo"
              className="w-9 h-9 rounded-full shadow-md group-hover:scale-105 transition-transform ring-1 ring-gold-500/40"
            />
            <span className="font-display text-white text-lg font-semibold hidden sm:block">
              {process.env.NEXT_PUBLIC_CHURCH_NAME || 'Gangaw Baptist Church'}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 text-sm font-medium transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Live CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/live"
              id="watch-live-btn"
              className="hidden sm:flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-800 font-semibold text-sm px-4 py-2 rounded-full transition-all duration-200 shadow-lg hover:shadow-gold-500/30"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Watch Live
            </Link>

            {/* Hamburger */}
            <button
              id="mobile-menu-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 pt-1 border-t border-white/10 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-white/10 text-sm font-medium transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/live"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 mt-2 bg-gold-500 text-navy-800 font-semibold text-sm px-4 py-3 rounded-xl transition-all duration-200"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Watch Live
          </Link>
        </div>
      </div>
    </nav>
  )
}
