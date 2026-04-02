import Link from 'next/link'

export default function HeroSection() {
  const name = process.env.NEXT_PUBLIC_CHURCH_NAME || 'Gangaw Baptist Church'
  const tagline = process.env.NEXT_PUBLIC_CHURCH_TAGLINE || 'A Community of Faith, Hope & Love'
  const times = process.env.NEXT_PUBLIC_SERVICE_TIMES || 'Sundays: 9:00 AM & 11:00 AM'

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Pure gradient background — navy to deep blue */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #0a1628 0%, #1e3a5f 40%, #0f2240 70%, #0a1628 100%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Gold accent bottom line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent, #c9a84c 30%, #c9a84c 70%, transparent)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-8 max-w-4xl mx-auto">
        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="animate-fade-in flex justify-center mb-6">
          <img
            src="/gbc-logo.png"
            alt="Gangaw Baptist Church Logo"
            className="w-20 h-20 rounded-full shadow-2xl shadow-gold-500/20 ring-2 ring-gold-500/30"
          />
        </div>

        {/* Pre-title badge */}
        <div className="animate-fade-in inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse-slow" />
          <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest">
            Welcome to Our Church Family
          </span>
        </div>

        {/* Church Name */}
        <h1 className="animate-slide-up font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          {name}
        </h1>

        {/* Tagline */}
        <p className="animate-slide-up text-lg sm:text-2xl text-white/80 mb-4 font-light">
          {tagline}
        </p>

        {/* Service Times */}
        <p className="animate-slide-up text-sm text-gold-300/90 mb-10 tracking-wide">
          {times}
        </p>

        {/* CTAs */}
        <div className="animate-slide-up flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/events"
            id="hero-join-us-btn"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-200 shadow-xl backdrop-blur-sm hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Join Us Sunday
          </Link>
          <Link
            href="/live"
            id="hero-watch-live-btn"
            className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-800 font-semibold px-8 py-4 rounded-full text-base transition-all duration-200 shadow-xl hover:shadow-gold-500/40 hover:-translate-y-0.5"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
            </span>
            Watch Live
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
