import Card from '@/components/ui/Card'
import { FBPost, excerptFromMessage, formatFBDate } from '@/lib/facebook'

interface FacebookFeedProps {
  posts: FBPost[]
  error?: string
}

const GBC_FB_URL = 'https://www.facebook.com/gangawbaptistchurch'

// Placeholder content shown when FB credentials aren't configured
const PLACEHOLDER_POSTS = [
  {
    id: 'ph1',
    message:
      'ဘုရားသခင်ကို ချီးမွမ်းခြင်းနှင့် ကိုးကွယ်မှုတွင် ပါဝင်ကြပါ။ ဤတနင်္ဂနွေ နံနက် ၉ နာရီတွင် ကျွန်ုပ်တို့နှင့် အတူ ဝမ်းမြောက်ခြင်းဖြင့် ကိုးကွယ်ကြပါ! 🙏 Join us this Sunday at 9:00 AM for worship. Everyone is welcome!',
    created_time: new Date(Date.now() - 1 * 86400000).toISOString(),
    permalink_url: GBC_FB_URL,
  },
  {
    id: 'ph2',
    message:
      'Gangaw Baptist Church Youth Group — ယုဝလူငယ်များ ဓမ္မသင်တန်းနှင့် ဖော်ရွေခြင်းအစီအစဥ် မကြာမီ ကျင်းပမည်ဖြစ်ပါသည်။ မိဘများနှင့် လူငယ်များ ပါဝင်ကြပါ!',
    created_time: new Date(Date.now() - 3 * 86400000).toISOString(),
    permalink_url: GBC_FB_URL,
  },
  {
    id: 'ph3',
    message:
      'ဆုတောင်းလိုက်ရသော်ဖြင့် — "ငြိမ်သက်ဘိသကိ်ပေးသောဘုရားသခင် သင်တို့ ခပ်သိမ်းနှင့် အတူတကွ ရှိပါစေသော်" ✝️ Wednesday Prayer Meeting — 7:00 PM. Come as you are.',
    created_time: new Date(Date.now() - 6 * 86400000).toISOString(),
    permalink_url: GBC_FB_URL,
  },
]

export default function FacebookFeed({ posts, error }: FacebookFeedProps) {
  const isPlaceholder = posts.length === 0
  const displayPosts = isPlaceholder ? PLACEHOLDER_POSTS : posts

  return (
    <section id="facebook-feed" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-gold-600 text-sm font-semibold uppercase tracking-widest">
            Stay Connected
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-800 mt-2">
            From Our Facebook Page
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto mt-4 rounded-full" />

          {/* Facebook Page Link Badge */}
          <a
            href={GBC_FB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] text-xs font-semibold px-4 py-2 rounded-full transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073C24 5.405 18.627 0 12 0 5.373 0 0 5.405 0 12.073 0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
            </svg>
            facebook.com/gangawbaptistchurch
          </a>

          {isPlaceholder && (
            <p className="mt-2 text-xs text-gray-400 italic">
              {error?.includes('localhost') || !error
                ? 'Live Facebook feed — configure FACEBOOK_ACCESS_TOKEN in .env.local to show real posts.'
                : error}
            </p>
          )}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayPosts.map((post) => (
            <Card key={post.id} className="flex flex-col gap-4 !p-0 overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* Cover image */}
              {(post as any).full_picture && (
                <div className="aspect-video overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={(post as any).full_picture}
                    alt="Facebook post"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* No image — show GBC colored header bar */}
              {!(post as any).full_picture && (
                <div className="h-2 gradient-navy" />
              )}

              <div className="p-5 flex flex-col gap-3 flex-1">
                {/* Facebook icon + page name + date */}
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1877F2] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0 5.373 0 0 5.405 0 12.073 0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                  </svg>
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs font-semibold text-navy-800">Gangaw Baptist Church</span>
                    <span className="text-[10px] text-gray-400">{formatFBDate(post.created_time)}</span>
                  </div>
                </div>

                {/* Message */}
                <p className="text-sm text-gray-700 leading-relaxed flex-1">
                  {excerptFromMessage(post.message, 200)}
                </p>

                {/* View on Facebook link */}
                <a
                  href={post.permalink_url || GBC_FB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1877F2] hover:text-[#1565d8] transition-colors mt-auto"
                >
                  View on Facebook
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </Card>
          ))}
        </div>

        {/* Follow CTA */}
        <div className="text-center mt-10">
          <a
            href={GBC_FB_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="follow-facebook-btn"
            className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#1565d8] text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073C24 5.405 18.627 0 12 0 5.373 0 0 5.405 0 12.073 0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
            </svg>
            Follow Us on Facebook
          </a>
        </div>
      </div>
    </section>
  )
}
