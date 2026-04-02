import Link from 'next/link'

const QUICK_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/sermons', label: 'Sermons' },
  { href: '/events', label: 'Events' },
  { href: '/blog', label: 'Blog' },
  { href: '/give', label: 'Give' },
  { href: '/live', label: 'Watch Live' },
  { href: '/members', label: 'Members' },
]

export default function Footer() {
  const name = process.env.NEXT_PUBLIC_CHURCH_NAME || 'Gangaw Baptist Church'
  const address = process.env.NEXT_PUBLIC_CHURCH_ADDRESS || 'Gangaw, Magway Region, Myanmar'
  const phone = process.env.NEXT_PUBLIC_CHURCH_PHONE || '+95 9 44200 0971'
  const email = process.env.NEXT_PUBLIC_CHURCH_EMAIL || 'gangawbaptistchurch2020@gmail.com'
  const times = process.env.NEXT_PUBLIC_SERVICE_TIMES || 'Sundays: 9:00 AM & 11:00 AM | Wednesdays: 7:00 PM'
  const ytChannel = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID
  const year = new Date().getFullYear()

  return (
    <footer className="gradient-navy text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Church Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/gbc-logo.png" alt="GBC" className="w-10 h-10 rounded-full shadow-lg ring-1 ring-gold-500/30" />
              <span className="font-display text-white text-xl font-semibold">{name}</span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              A Community of Faith, Hope &amp; Love — welcoming all who seek to know Christ.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {ytChannel && (
                <a
                  href="https://www.youtube.com/@gangawbaptistchurch3957"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Channel"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-600/80 hover:text-white transition-all duration-200"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.43 3.5 12 3.5 12 3.5s-7.43 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.14 0 12 0 12s0 3.86.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.57 20.5 12 20.5 12 20.5s7.43 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.86 24 12 24 12s0-3.86-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                  </svg>
                </a>
              )}
              <a
                href="https://www.facebook.com/gangawbaptistchurch"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Page"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#1877F2]/80 hover:text-white transition-all duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0 5.373 0 0 5.405 0 12.073 0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-gold-400 transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-500 inline-block"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white/70">{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-gold-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${phone}`} className="text-white/70 hover:text-gold-400 transition-colors">{phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-gold-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${email}`} className="text-white/70 hover:text-gold-400 transition-colors">{email}</a>
              </li>
              <li className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-white/50 leading-relaxed">{times}</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {year} {name}. All rights reserved.</p>
          <p>
            Built with{' '}
            <a href="https://nextjs.org" className="hover:text-gold-400 transition-colors">Next.js</a>
            {' '}& Payload CMS
          </p>
        </div>
      </div>
    </footer>
  )
}
