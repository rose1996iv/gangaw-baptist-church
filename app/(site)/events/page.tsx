import type { Metadata } from 'next'
import { getEvents } from '@/lib/payload-client'

export const metadata: Metadata = {
  title: 'Events — Gangaw Baptist Church',
  description: 'Stay up to date with upcoming events, services, and gatherings at Gangaw Baptist Church.',
}

export const revalidate = 300

const PLACEHOLDER_EVENTS = (() => {
  const base = Date.now()
  return [
    { id: 'e1', title: 'Sunday Morning Worship', date: new Date(base + 2 * 86400000).toISOString(), time: '9:00 AM & 11:00 AM', location: 'Main Sanctuary', isFeatured: true },
    { id: 'e2', title: 'Wednesday Prayer & Bible Study', date: new Date(base + 4 * 86400000).toISOString(), time: '7:00 PM', location: 'Fellowship Hall', isFeatured: false },
    { id: 'e3', title: 'Youth Group Night', date: new Date(base + 6 * 86400000).toISOString(), time: '6:30 PM', location: 'Youth Center', isFeatured: false },
    { id: 'e4', title: 'Men\'s Breakfast', date: new Date(base + 9 * 86400000).toISOString(), time: '8:00 AM', location: 'Fellowship Hall', isFeatured: false },
    { id: 'e5', title: 'Women\'s Bible Study', date: new Date(base + 11 * 86400000).toISOString(), time: '10:00 AM', location: 'Room 201', isFeatured: false },
    { id: 'e6', title: 'Community Outreach Day', date: new Date(base + 16 * 86400000).toISOString(), time: '9:00 AM', location: 'Community Park', isFeatured: true },
  ]
})()

function formatEventDate(dateStr: string) {
  const d = new Date(dateStr)
  return {
    month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: d.getDate(),
    weekday: d.toLocaleDateString('en-US', { weekday: 'long' }),
    full: d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  }
}

export default async function EventsPage() {
  let events: any[] = []
  try {
    const result = await getEvents(12, 1)
    events = result?.docs ?? []
  } catch {
    events = PLACEHOLDER_EVENTS
  }

  if (events.length === 0) events = PLACEHOLDER_EVENTS

  const featured = events.filter((e) => e.isFeatured)
  const regular = events.filter((e) => !e.isFeatured)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="gradient-navy py-20 text-center px-4">
        <span className="text-gold-400 text-sm font-semibold uppercase tracking-widest">What&apos;s On</span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">Upcoming Events</h1>
        <p className="text-white/70 max-w-xl mx-auto">
          Come as you are and join us for worship, fellowship, and community.
        </p>
        <div className="w-16 h-1 bg-gold-500 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Featured Events */}
        {featured.length > 0 && (
          <div className="mb-12">
            <h2 className="text-sm font-semibold text-gold-600 uppercase tracking-widest mb-6">Featured Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map((event) => {
                const date = formatEventDate(event.date)
                return (
                  <div
                    key={event.id}
                    className="gradient-navy rounded-2xl overflow-hidden flex shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Date block */}
                    <div className="w-24 shrink-0 flex flex-col items-center justify-center py-8 bg-white/10">
                      <span className="text-gold-400 text-xs font-bold tracking-widest">{date.month}</span>
                      <span className="text-white text-5xl font-bold leading-tight">{date.day}</span>
                      <span className="text-white/50 text-xs">{date.weekday.slice(0, 3)}</span>
                    </div>
                    {/* Details */}
                    <div className="p-6 flex flex-col justify-center gap-2 flex-1">
                      <span className="text-gold-400 text-xs font-bold uppercase tracking-widest">Featured</span>
                      <h3 className="font-display text-xl font-bold text-white">{event.title}</h3>
                      {event.time && <p className="text-white/70 text-sm">⏰ {event.time}</p>}
                      <p className="text-white/70 text-sm">📍 {event.location}</p>
                      {event.googleCalendarLink && (
                        <a href={event.googleCalendarLink} target="_blank" rel="noopener noreferrer"
                          className="mt-2 text-gold-400 hover:text-gold-300 text-xs font-semibold transition-colors">
                          + Add to Google Calendar
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* All Events List */}
        <h2 className="text-sm font-semibold text-gold-600 uppercase tracking-widest mb-6">All Upcoming Events</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50 overflow-hidden">
          {events.map((event) => {
            const date = formatEventDate(event.date)
            return (
              <div
                key={event.id}
                id={`event-${event.id}`}
                className="flex items-center gap-4 px-6 py-4 hover:bg-navy-50/50 transition-colors"
              >
                {/* Mini date */}
                <div className="w-14 h-14 rounded-xl gradient-navy flex flex-col items-center justify-center shrink-0">
                  <span className="text-gold-400 text-[10px] font-bold tracking-wider leading-none">{date.month}</span>
                  <span className="text-white text-xl font-bold leading-tight">{date.day}</span>
                </div>

                {/* Event info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-navy-800 text-sm">{event.title}</h3>
                    {event.isFeatured && (
                      <span className="text-xs bg-gold-50 text-gold-600 px-2 py-0.5 rounded-full font-semibold">Featured</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                    {event.time && <span>⏰ {event.time}</span>}
                    <span>📍 {event.location}</span>
                  </div>
                </div>

                {/* Calendar link */}
                {event.googleCalendarLink && (
                  <a
                    href={event.googleCalendarLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-xs text-navy-600 hover:text-gold-600 font-semibold border border-navy-100 hover:border-gold-200 px-3 py-1.5 rounded-full transition-all"
                  >
                    + Calendar
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
