import type { Metadata } from 'next'
import { getPosts, type BlogPost } from '@/lib/payload-client'
import Card from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Blog — Gangaw Baptist Church',
  description: 'Read articles, devotional posts, and ministry updates from Gangaw Baptist Church.',
}

export const revalidate = 0

const PLACEHOLDER_POSTS = Array.from({ length: 6 }, (_, i) => ({
  id: `ph${i}`,
  title: [
    'Finding Peace in the Storm',
    'What the Bible Says About Community',
    'Five Ways to Strengthen Your Prayer Life',
    'Understanding the Great Commission',
    'The Gift of Forgiveness',
    'How to Study the Bible Effectively',
  ][i],
  slug: `placeholder-${i}`,
  excerpt: 'A thoughtful reflection on faith, community, and growing in the grace and knowledge of our Lord Jesus Christ.',
  author: { name: 'Pastor John Smith' },
  publishedAt: new Date(Date.now() - (i + 1) * 14 * 86400000).toISOString(),
  tags: [{ tag: ['Faith', 'Community', 'Prayer', 'Mission', 'Grace', 'Scripture'][i] }],
  status: 'published' as const,
  coverImage: `https://images.unsplash.com/photo-${['1504052434569-70ad5836ab65','1532012197267-da84d127e765','1529156069898-49953e39b3ac','1551847677-dc82d1f2b1a0','1499209974431-9dddcece7f88','1517048676732-d65bc937f952'][i]}?w=600&q=80`,
  content: null,
}))

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const page = Number(searchParams.page) || 1
  let rawDocs: BlogPost[] = []
  let totalPages = 1

  try {
    const postsData = await getPosts(6, page)
    rawDocs = postsData?.docs ?? []
    totalPages = postsData?.totalPages ?? 1
  } catch {
    rawDocs = []
  }

  const posts = rawDocs.length > 0 ? rawDocs : (PLACEHOLDER_POSTS as unknown as BlogPost[])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="gradient-navy py-20 text-center px-4">
        <span className="text-gold-400 text-sm font-semibold uppercase tracking-widest">Ministry Updates</span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">Church Blog</h1>
        <p className="text-white/70 max-w-xl mx-auto">
          Devotionals, announcements, and spiritual reflections from our pastoral team.
        </p>
        <div className="w-16 h-1 bg-gold-500 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: BlogPost) => (
            <Card key={post.id} padding={false} className="flex flex-col overflow-hidden">
              {/* Cover Image */}
              {post.coverImage && (
                <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              <div className="p-5 flex flex-col gap-3 flex-1">
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {post.tags?.slice(0, 2).map(({ tag }: { tag: string }) => (
                    <span key={tag} className="text-xs bg-navy-50 text-navy-600 px-2 py-0.5 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="font-display text-lg font-bold text-navy-800 leading-snug line-clamp-2">
                  {post.title}
                </h2>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                )}

                {/* Meta + ReadMore */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                  <div className="text-xs text-gray-400">
                    <span>{post.author?.name}</span>
                    {post.publishedAt && (
                      <>
                        <span className="mx-1">·</span>
                        <span>{formatDate(post.publishedAt)}</span>
                      </>
                    )}
                  </div>
                  <a
                    href={`/blog/${post.slug}`}
                    id={`blog-read-${post.id}`}
                    className="text-xs text-navy-600 hover:text-gold-600 font-semibold transition-colors flex items-center gap-0.5"
                  >
                    Read
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {page > 1 && (
              <a href={`/blog?page=${page - 1}`} className="px-4 py-2 rounded-full border border-gray-200 text-navy-600 text-sm hover:bg-navy-50 transition-colors">← Prev</a>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                href={`/blog?page=${p}`}
                id={`blog-page-${p}`}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all ${
                  p === page ? 'bg-navy-600 text-white shadow-lg' : 'bg-white border border-gray-200 text-navy-600 hover:border-navy-300'
                }`}
              >
                {p}
              </a>
            ))}
            {page < totalPages && (
              <a href={`/blog?page=${page + 1}`} className="px-4 py-2 rounded-full border border-gray-200 text-navy-600 text-sm hover:bg-navy-50 transition-colors">Next →</a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
