// ============================================================
// Typed Payload CMS REST API client (for Server Components)
// ============================================================

const BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000'

export interface PaginatedResult<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
}

async function fetchPayload<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${BASE_URL}/api${path}`
  const res = await fetch(url, {
    ...options,
    signal: AbortSignal.timeout(5000), // fail fast — 5s max
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
  })
  if (!res.ok) {
    throw new Error(`Payload API error ${res.status}: ${path}`)
  }
  return res.json()
}

// ---- Sermons ----
export interface Sermon {
  id: string
  title: string
  pastor: string
  date: string
  youtubeUrl: string
  description?: any
  tags?: { tag: string }[]
  scripture?: string
  isLive?: boolean
}

export async function getSermons(limit = 10, page = 1): Promise<PaginatedResult<Sermon>> {
  return fetchPayload<PaginatedResult<Sermon>>(
    `/sermons?limit=${limit}&page=${page}&sort=-date`,
    { next: { revalidate: 300 } }
  )
}

export async function getLatestSermons(limit = 3): Promise<Sermon[]> {
  try {
    const result = await getSermons(limit, 1)
    return result?.docs ?? []
  } catch {
    return []
  }
}

// ---- Events ----
export interface ChurchEvent {
  id: string
  title: string
  date: string
  time?: string
  location: string
  description?: any
  googleCalendarLink?: string
  isFeatured?: boolean
}

export async function getEvents(limit = 10, page = 1): Promise<PaginatedResult<ChurchEvent>> {
  const now = new Date().toISOString()
  return fetchPayload<PaginatedResult<ChurchEvent>>(
    `/events?where[date][greater_than]=${now}&limit=${limit}&page=${page}&sort=date`,
    { next: { revalidate: 300 } }
  )
}

export async function getUpcomingEvents(limit = 3): Promise<ChurchEvent[]> {
  try {
    const result = await getEvents(limit, 1)
    return result?.docs ?? []
  } catch {
    return []
  }
}

// ---- Posts ----
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: any
  author?: { name: string }
  coverImage?: string
  tags?: { tag: string }[]
  status: 'draft' | 'published'
  publishedAt?: string
}

export async function getPosts(limit = 6, page = 1): Promise<PaginatedResult<BlogPost>> {
  return fetchPayload<PaginatedResult<BlogPost>>(
    `/posts?where[status][equals]=published&limit=${limit}&page=${page}&sort=-publishedAt&depth=1`,
    { next: { revalidate: 300 } }
  )
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const result = await fetchPayload<PaginatedResult<BlogPost>>(
      `/posts?where[slug][equals]=${slug}&where[status][equals]=published&depth=1`,
      { next: { revalidate: 300 } }
    )
    return result.docs[0] ?? null
  } catch {
    return null
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  const result = await fetchPayload<PaginatedResult<BlogPost>>(
    `/posts?where[status][equals]=published&limit=100&depth=0`,
    { next: { revalidate: 3600 } }
  )
  return result.docs.map((p) => p.slug)
}

// ---- Members ----
export interface Member {
  id: string
  name: string
  email?: string
  role: string
  bio?: string
  avatar?: string
  joinedDate?: string
  isPublic: boolean
}

export async function getPublicMembers(limit = 50): Promise<Member[]> {
  try {
    const result = await fetchPayload<PaginatedResult<Member>>(
      `/members?where[isPublic][equals]=true&limit=${limit}&sort=name`,
      { next: { revalidate: 600 } }
    )
    return result?.docs ?? []
  } catch {
    return []
  }
}

// ---- YouTube URL helper ----
export function extractYouTubeId(urlOrId: string): string {
  // Handle plain IDs
  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) return urlOrId
  // Handle full URLs
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ]
  for (const p of patterns) {
    const m = urlOrId.match(p)
    if (m) return m[1]
  }
  return urlOrId
}
