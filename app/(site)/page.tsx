import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import UpcomingEvents from '@/components/home/UpcomingEvents'
import FacebookFeed from '@/components/home/FacebookFeed'
import SermonCard from '@/components/sermons/SermonCard'
import { getLatestSermons, getUpcomingEvents } from '@/lib/payload-client'
import { getFacebookFeed } from '@/lib/facebook'

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_CHURCH_NAME || 'Gangaw Baptist Church'} | Welcome`,
  description: `${process.env.NEXT_PUBLIC_CHURCH_TAGLINE || 'A Community of Faith, Hope & Love'}. Join us for worship, sermons, and community events.`,
}

// Revalidate every 5 minutes
export const revalidate = 300

// Placeholder sermons for initial display
const PLACEHOLDER_SERMONS = [
  {
    id: 'ph1',
    title: 'Come Let Us Adore Him',
    pastor: 'GBC Pastoral Team',
    date: new Date(Date.now() - 7 * 86400000).toISOString(),
    youtubeUrl: 'vGR74QBdIbM',
    scripture: 'John 1:14',
    tags: [{ tag: 'Worship' }, { tag: 'Adoration' }],
    isLive: false,
  },
  {
    id: 'ph2',
    title: 'Dance — Encounters',
    pastor: 'GBC Pastoral Team',
    date: new Date(Date.now() - 14 * 86400000).toISOString(),
    youtubeUrl: 'keVCWWl0jVg',
    scripture: 'Psalm 150:4',
    tags: [{ tag: 'Dance' }],
    isLive: false,
  },
  {
    id: 'ph3',
    title: 'Good Morning Dance',
    pastor: 'GBC Pastoral Team',
    date: new Date(Date.now() - 21 * 86400000).toISOString(),
    youtubeUrl: 'KdX3R4utOnE',
    scripture: 'Philippians 4:4',
    tags: [{ tag: 'Joy' }],
    isLive: false,
  },
]

export default async function HomePage() {
  // Parallel data fetching — graceful fallback on error
  const [sermonsResult, eventsResult, fbResult] = await Promise.allSettled([
    getLatestSermons(3),
    getUpcomingEvents(3),
    getFacebookFeed(),
  ])

  const rawSermons =
    sermonsResult.status === 'fulfilled' ? sermonsResult.value : []
  const sermons =
    Array.isArray(rawSermons) && rawSermons.length > 0 ? rawSermons : PLACEHOLDER_SERMONS

  const rawEvents =
    eventsResult.status === 'fulfilled' ? eventsResult.value : []
  const events = Array.isArray(rawEvents) ? rawEvents : []

  const fbPosts =
    fbResult.status === 'fulfilled' && fbResult.value?.posts ? fbResult.value.posts : []
  const fbError =
    fbResult.status === 'fulfilled' ? fbResult.value?.error : 'Unable to load Facebook feed.'

  const [featured, ...rest] = sermons

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Latest Sermons */}
      <section id="latest-sermons" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold-600 text-sm font-semibold uppercase tracking-widest">
              Preach the Word
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-800 mt-2">
              Latest Sermons
            </h2>
            <div className="w-16 h-1 bg-gold-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Featured sermon + 2 grid cards */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <SermonCard sermon={featured as any} featured />
            </div>
            <div className="lg:col-span-2 flex flex-col gap-6">
              {rest.map((s) => (
                <SermonCard key={s.id} sermon={s as any} />
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href="/sermons"
              id="view-all-sermons-btn"
              className="inline-flex items-center gap-2 text-navy-600 hover:text-gold-600 font-semibold text-sm transition-colors"
            >
              View All Sermons
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <UpcomingEvents events={events} />

      {/* Scripture Banner */}
      <section className="gradient-navy py-16 text-center px-4">
        <blockquote className="max-w-3xl mx-auto">
          <p className="font-display text-2xl sm:text-3xl text-white italic leading-relaxed mb-4">
            &ldquo;For God so loved the world, that he gave his only Son, that whoever believes in
            him should not perish but have eternal life.&rdquo;
          </p>
          <cite className="text-gold-400 text-sm font-semibold not-italic tracking-widest uppercase">
            John 3:16
          </cite>
        </blockquote>
      </section>

      {/* Facebook Feed */}
      <FacebookFeed posts={fbPosts} error={fbError} />

      {/* Give CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center px-4">
          <span className="text-gold-600 text-sm font-semibold uppercase tracking-widest">
            Support the Ministry
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-800 mt-2 mb-4">
            Give Generously
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Your giving enables us to serve our community, share the Gospel, and care for those in
            need. Every contribution makes a difference.
          </p>
          <a
            href="/give"
            id="give-cta-btn"
            className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-800 font-bold px-8 py-4 rounded-full text-base transition-all duration-200 shadow-xl hover:shadow-gold-500/30 hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Give Now
          </a>
        </div>
      </section>
    </>
  )
}
