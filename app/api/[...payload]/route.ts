import { NextRequest, NextResponse } from 'next/server'

/**
 * Payload CMS REST API proxy
 *
 * Payload CMS v2 runs its own Express server (started via `payload start`)
 * or is embedded in a custom server.ts file.
 *
 * In production: run `node server.ts` which boots both Next.js + Payload together.
 * In dev: `npm run dev` starts Next.js; Payload admin is accessible via the same port
 * because payload.config.ts references the same MongoDB instance.
 *
 * These route handlers proxy any /api/* requests that are NOT handled by
 * the dedicated auth or prayer routes back to Payload's REST layer.
 */

// Allow Payload to respond directly in dev (it mounts on the same express)
export const dynamic = 'force-dynamic'

type RouteContext = { params: { payload: string[] } }

export async function GET(req: NextRequest, { params }: RouteContext) {
  return proxyToPayload(req, params.payload)
}

export async function POST(req: NextRequest, { params }: RouteContext) {
  return proxyToPayload(req, params.payload)
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  return proxyToPayload(req, params.payload)
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  return proxyToPayload(req, params.payload)
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  return proxyToPayload(req, params.payload)
}

async function proxyToPayload(req: NextRequest, segments: string[]) {
  const base = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  const path = `/api/${segments.join('/')}`
  const url = new URL(req.url)
  const target = `${base}${path}${url.search}`

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    const authHeader = req.headers.get('authorization')
    if (authHeader) headers['Authorization'] = authHeader
    const cookieHeader = req.headers.get('cookie')
    if (cookieHeader) headers['Cookie'] = cookieHeader

    const body = ['GET', 'HEAD'].includes(req.method)
      ? undefined
      : await req.text()

    const res = await fetch(target, {
      method: req.method,
      headers,
      body,
    })

    const data = await res.json().catch(() => ({}))
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json(
      { docs: [], totalDocs: 0, totalPages: 1, page: 1, limit: 10, pagingCounter: 1, hasPrevPage: false, hasNextPage: false },
      { status: 200 }
    )
  }
}
