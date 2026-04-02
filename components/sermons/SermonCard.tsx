'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import { Sermon, extractYouTubeId } from '@/lib/payload-client'

interface SermonCardProps {
  sermon: Sermon
  featured?: boolean
}

function formatSermonDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// ─── Featured Card (always embeds the iframe) ───────────────────────────────
function FeaturedSermonCard({ sermon }: { sermon: Sermon }) {
  const videoId = extractYouTubeId(sermon.youtubeUrl)
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`

  return (
    <Card padding={false} className="overflow-hidden">
      <div className="aspect-video w-full">
        <iframe
          src={embedUrl}
          title={sermon.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {sermon.tags?.map(({ tag }) => (
            <span key={tag} className="text-xs bg-navy-50 text-navy-600 px-2 py-0.5 rounded-full font-medium">
              {tag}
            </span>
          ))}
          {sermon.isLive && (
            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
              LIVE
            </span>
          )}
        </div>
        <h3 className="font-display text-2xl font-bold text-navy-800 mb-2">{sermon.title}</h3>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {sermon.pastor}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatSermonDate(sermon.date)}
          </span>
          {sermon.scripture && (
            <span className="flex items-center gap-1 text-gold-600 font-medium">
              📖 {sermon.scripture}
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}

// ─── Regular Card (click-to-play inline embed) ────────────────────────────────
function RegularSermonCard({ sermon }: { sermon: Sermon }) {
  const [playing, setPlaying] = useState(false)
  const videoId = extractYouTubeId(sermon.youtubeUrl)
  // autoplay=1 so it starts when user clicks
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`

  return (
    <Card padding={false} className="overflow-hidden flex flex-col">
      {/* Thumbnail / inline player */}
      <div className="aspect-video relative overflow-hidden bg-navy-900 group">
        {playing ? (
          // Swap thumbnail for actual iframe when clicked
          <iframe
            src={embedUrl}
            title={sermon.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <>
            {/* YouTube thumbnail */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
              alt={sermon.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Clickable play button overlay */}
            <button
              onClick={() => setPlaying(true)}
              aria-label={`Play ${sermon.title}`}
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors duration-300 cursor-pointer"
            >
              {/* YouTube-style red play button */}
              <span className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center shadow-2xl transition-transform duration-200 hover:scale-110">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>

            {/* Live badge */}
            {sermon.isLive && (
              <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
                LIVE
              </div>
            )}

            {/* YouTube logo watermark */}
            <div className="absolute bottom-2 right-2">
              <svg className="w-10 h-7 opacity-80" viewBox="0 0 90 20" fill="white">
                <path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="#FF0000"/>
                <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white"/>
              </svg>
            </div>
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex flex-wrap gap-1">
          {sermon.tags?.slice(0, 2).map(({ tag }) => (
            <span key={tag} className="text-xs bg-navy-50 text-navy-600 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-semibold text-navy-800 text-sm leading-snug line-clamp-2">{sermon.title}</h3>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-auto pt-2 border-t border-gray-50">
          <span>{sermon.pastor}</span>
          <span>·</span>
          <span>{formatSermonDate(sermon.date)}</span>
        </div>
        {/* Watch on YouTube fallback */}
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-red-600 transition-colors mt-1"
          onClick={(e) => e.stopPropagation()}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.43 3.5 12 3.5 12 3.5s-7.43 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.14 0 12 0 12s0 3.86.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.57 20.5 12 20.5 12 20.5s7.43 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.86 24 12 24 12s0-3.86-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
          </svg>
          Watch on YouTube
        </a>
      </div>
    </Card>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function SermonCard({ sermon, featured = false }: SermonCardProps) {
  if (featured) return <FeaturedSermonCard sermon={sermon} />
  return <RegularSermonCard sermon={sermon} />
}
