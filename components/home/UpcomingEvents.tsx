import Card from '@/components/ui/Card'
import { ChurchEvent } from '@/lib/payload-client'

interface UpcomingEventsProps {
  events: ChurchEvent[]
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return {
    month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: d.getDate(),
    weekday: d.toLocaleDateString('en-US', { weekday: 'long' }),
    time: d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
  }
}

// Fallback placeholder events
const PLACEHOLDER_EVENTS: ChurchEvent[] = [
  {
    id: '1',
    title: 'Sunday Morning Worship',
    date: new Date(Date.now() + 2 * 86400000).toISOString(),
    time: '9:00 AM & 11:00 AM',
    location: 'Main Sanctuary',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Wednesday Prayer & Bible Study',
    date: new Date(Date.now() + 4 * 86400000).toISOString(),
    time: '7:00 PM',
    location: 'Fellowship Hall',
    isFeatured: false,
  },
  {
    id: '3',
    title: 'Youth Group Meeting',
    date: new Date(Date.now() + 6 * 86400000).toISOString(),
    time: '6:30 PM',
    location: 'Youth Center',
    isFeatured: false,
  },
]

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  const displayEvents = events.length > 0 ? events : PLACEHOLDER_EVENTS

  return (
    <section id="upcoming-events" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-gold-600 text-sm font-semibold uppercase tracking-widest">
            What&apos;s Happening
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-800 mt-2">
            Upcoming Events
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayEvents.map((event) => {
            const date = formatDate(event.date)
            return (
              <Card key={event.id} className="flex gap-0 !p-0 overflow-hidden">
                {/* Date accent sidebar */}
                <div className="w-20 shrink-0 gradient-navy flex flex-col items-center justify-center py-6">
                  <span className="text-gold-400 text-xs font-bold tracking-widest">{date.month}</span>
                  <span className="text-white text-4xl font-bold leading-tight">{date.day}</span>
                  <span className="text-white/50 text-xs mt-1">{date.weekday.slice(0, 3)}</span>
                </div>

                {/* Event info */}
                <div className="p-5 flex flex-col justify-center gap-1 flex-1">
                  {event.isFeatured && (
                    <span className="inline-block text-xs font-semibold text-gold-600 bg-gold-50 px-2 py-0.5 rounded-full w-fit mb-1">
                      Featured
                    </span>
                  )}
                  <h3 className="font-semibold text-navy-800 text-sm leading-snug">{event.title}</h3>
                  {event.time && (
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {event.time}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {event.location}
                  </p>
                  {event.googleCalendarLink && (
                    <a
                      href={event.googleCalendarLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 text-xs text-navy-600 hover:text-gold-600 font-medium transition-colors"
                    >
                      + Add to Calendar
                    </a>
                  )}
                </div>
              </Card>
            )
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-10">
          <a
            href="/events"
            id="view-all-events-btn"
            className="inline-flex items-center gap-2 text-navy-600 hover:text-gold-600 font-semibold text-sm transition-colors"
          >
            View All Events
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
