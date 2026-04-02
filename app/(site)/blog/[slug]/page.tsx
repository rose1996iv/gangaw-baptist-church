import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPostSlugs } from '@/lib/payload-client'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug)
    if (!post) return { title: 'Post Not Found' }
    return {
      title: post.title,
      description: post.excerpt || `Read "${post.title}" on our church blog.`,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: post.coverImage ? [post.coverImage] : [],
      },
    }
  } catch {
    return { title: 'Blog Post' }
  }
}

type SlateNode = { text?: string; children?: SlateNode[] }

function renderRichText(content: SlateNode | SlateNode[] | string | null | undefined): string {
  if (!content) return ''
  if (typeof content === 'string') return content
  // Basic Slate richtext → plain text extraction
  if (Array.isArray(content)) {
    return content
      .map((node: SlateNode) => {
        if (node.text !== undefined) return node.text
        if (node.children) return renderRichText(node.children)
        return ''
      })
      .join(' ')
  }
  if (content.children) return renderRichText(content.children)
  return ''
}

export default async function BlogPostPage({ params }: Props) {
  let post = null
  try {
    post = await getPostBySlug(params.slug)
  } catch {
    notFound()
  }

  if (!post) notFound()

  const plainContent = renderRichText(post.content)
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <div className="min-h-screen">
      {/* Cover image */}
      {post.coverImage && (
        <div className="w-full h-64 sm:h-80 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags?.map(({ tag }) => (
            <span key={tag} className="text-xs bg-navy-50 text-navy-600 px-3 py-1 rounded-full font-medium">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-800 mb-6 leading-tight text-balance">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
          {post.author?.name && (
            <span className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-navy-600 flex items-center justify-center text-white text-xs font-bold">
                {post.author.name.charAt(0)}
              </div>
              {post.author.name}
            </span>
          )}
          {formattedDate && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formattedDate}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="prose prose-navy prose-lg max-w-none text-gray-700 leading-relaxed">
          {plainContent ? (
            <p className="whitespace-pre-wrap">{plainContent}</p>
          ) : (
            <p className="text-gray-400 italic">This post has no content yet.</p>
          )}
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <a href="/blog" className="inline-flex items-center gap-2 text-navy-600 hover:text-gold-600 font-semibold text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Blog
          </a>
        </div>
      </article>
    </div>
  )
}
