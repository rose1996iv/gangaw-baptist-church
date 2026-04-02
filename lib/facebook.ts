// ============================================================
// Facebook Graph API helpers
// ============================================================

export interface FBPost {
  id: string
  message?: string
  story?: string
  full_picture?: string
  created_time: string
  permalink_url: string
}

export interface FBPostsResponse {
  posts: FBPost[]
  error?: string
}

// Extracts readable excerpt from FB post message
export function excerptFromMessage(message?: string, maxLen = 160): string {
  if (!message) return ''
  return message.length > maxLen ? message.slice(0, maxLen).trimEnd() + '…' : message
}

// Format ISO date to readable string
export function formatFBDate(isoDate: string): string {
  try {
    return new Date(isoDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return isoDate
  }
}

/**
 * Fetch the latest Facebook Page posts via Graph API v18
 * Returns graceful fallback on error (no access token, etc.)
 */
export async function getFacebookFeed(
  pageId?: string,
  accessToken?: string,
  limit = 3
): Promise<FBPostsResponse> {
  const id = pageId || process.env.FACEBOOK_PAGE_ID
  const token = accessToken || process.env.FACEBOOK_ACCESS_TOKEN

  if (!id || !token) {
    return {
      posts: [],
      error: 'Facebook credentials not configured — showing placeholder content.',
    }
  }

  try {
    const fields = 'id,message,story,full_picture,created_time,permalink_url'
    const url = `https://graph.facebook.com/v18.0/${id}/posts?fields=${fields}&limit=${limit}&access_token=${token}`
    const res = await fetch(url, { next: { revalidate: 3600 } }) // cache 1 hour

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      return { posts: [], error: (errData as any)?.error?.message || 'Facebook API error' }
    }

    const data = await res.json()
    return { posts: data.data || [] }
  } catch (err: any) {
    return { posts: [], error: err?.message || 'Network error fetching Facebook feed' }
  }
}
