import type { Metadata } from 'next'
import { getSermons } from '@/lib/payload-client'
import SermonCard from '@/components/sermons/SermonCard'

export const metadata: Metadata = {
  title: 'Sermons — Gangaw Baptist Church',
  description: 'Watch and listen to our latest sermons, messages, and Bible teachings from Gangaw Baptist Church (GBC).',
}

export const revalidate = 0

const PLACEHOLDER_SERMONS = Array.from({ length: 6 }, (_, i) => ({
  id: `ph${i}`,
  title: ['Come Let Us Adore Him', 'Dance — Encounters', 'Good Morning Dance', 'Walking in Faith', 'The Power of Prayer', 'Hope in Christ'][i],
  pastor: 'GBC Pastoral Team',
  date: new Date(Date.now() - (i + 1) * 7 * 86400000).toISOString(),
  youtubeUrl: ['vGR74QBdIbM', 'keVCWWl0jVg', 'KdX3R4utOnE', 'vGR74QBdIbM', 'keVCWWl0jVg', 'KdX3R4utOnE'][i],
  scripture: ['John 1:14', 'Psalm 150:4', 'Philippians 4:4', 'Hebrews 11:1', 'Matthew 6:9', 'Romans 15:13'][i],
  tags: [{ tag: ['Worship', 'Dance', 'Joy', 'Faith', 'Prayer', 'Hope'][i] }],
  isLive: false,
}))

export default async function SermonsPage({
  searchParams,
}: {
  searchParams: { page?: string; pastor?: string; tag?: string }
}) {
  const page = Number(searchParams.page) || 1
  let sermonsData = { docs: [] as any[], totalPages: 1 }

  try {
    sermonsData = await getSermons(9, page)
  } catch {
    sermonsData = { docs: PLACEHOLDER_SERMONS, totalPages: 1 }
  }

  const sermons = (sermonsData?.docs?.length ?? 0) > 0 ? sermonsData.docs : PLACEHOLDER_SERMONS
  const [featured, ...rest] = sermons
  const totalPages = sermonsData?.totalPages || 1

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="gradient-navy py-20 text-center px-4">
        <span className="text-gold-400 text-sm font-semibold uppercase tracking-widest">Preach the Word</span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">Sermons</h1>
        <p className="text-white/70 max-w-xl mx-auto">
          Listen, watch, and grow through our library of messages from God&apos;s Word.
        </p>
        <div className="w-16 h-1 bg-gold-500 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Sermon */}
        {featured && (
          <div className="mb-12">
            <h2 className="text-sm font-semibold text-gold-600 uppercase tracking-widest mb-4">Latest Message</h2>
            <SermonCard sermon={featured} featured />
          </div>
        )}

        {/* Divider */}
        {rest.length > 0 && (
          <>
            <h2 className="text-sm font-semibold text-gold-600 uppercase tracking-widest mb-6">More Sermons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((sermon) => (
                <SermonCard key={sermon.id} sermon={sermon} />
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                href={`/sermons?page=${p}`}
                id={`sermon-page-${p}`}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 ${
                  p === page
                    ? 'bg-navy-600 text-white shadow-lg'
                    : 'bg-white border border-gray-200 text-navy-600 hover:border-navy-300 hover:bg-navy-50'
                }`}
              >
                {p}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
