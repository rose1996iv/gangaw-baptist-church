# Gangaw Baptist Church Website

A full-stack church website built with **Next.js 14**, **Payload CMS v2**, **Tailwind CSS**, and **MongoDB**.

**Live YouTube Channel:** https://www.youtube.com/@gangawbaptistchurch3957

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS v3 |
| CMS | Payload CMS v2 (self-hosted) |
| Database | MongoDB |
| Auth | Payload built-in + NextAuth (Facebook Login) |
| Email | Resend (free tier) |
| Deployment | Vercel (output: standalone) |

---

## Pages

| Route | Description |
|-------|-------------|
| / | Homepage — Hero, Sermons, Events, Facebook Feed |
| /sermons | Sermon archive with YouTube embeds |
| /live | Live stream + Prayer Request form |
| /events | Church event calendar |
| /give | Online giving via PayPal |
| /blog | News & devotional posts |
| /members | Member directory (login required) |
| /admin | Payload CMS admin panel |

---

## CMS User Roles

| Role | Permissions |
|------|------------|
| dmin | Full access to all collections + user management |
| pastor | Create/edit Sermons, Events, Posts |
| editor | Create/edit Posts only |
| member | Read-only access to member directory |

---

## Quick Start

### 1. Clone & Install
`ash
git clone <your-repo-url>
cd gbc
npm install
`

### 2. Configure Environment
`ash
cp .env.example .env.local
# Edit .env.local with your real values:
# - MONGODB_URI (MongoDB Atlas or local)
# - PAYLOAD_SECRET (min 32 chars)
# - NEXTAUTH_SECRET
# - Facebook App credentials (optional)
# - Resend API key (optional)
`

### 3. Run Development Server
`ash
npm run dev
# Open http://localhost:3000
# Admin panel: http://localhost:3000/admin
`

### 4. Create First Admin User
Visit http://localhost:3000/admin and create your first admin account.

---

## Deployment to Vercel

### Prerequisites
- MongoDB Atlas cluster (free tier works)
- GitHub repository

### Steps
1. Push to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add all environment variables from .env.example
4. Deploy — Vercel auto-detects Next.js

> **Note:** Payload CMS admin panel works on Vercel's serverless functions.
> For production, ensure NEXTAUTH_URL is set to your Vercel domain.

---

## Facebook Integration

Set these in .env.local to enable the Facebook feed widget:
`
FACEBOOK_PAGE_ID=your_page_id
FACEBOOK_ACCESS_TOKEN=your_page_access_token
NEXT_PUBLIC_FACEBOOK_APP_ID=your_app_id
`

The widget shows a graceful placeholder if credentials are not set.

---

## YouTube Channel

The site uses **Gangaw Baptist Church**'s official YouTube channel:
- Channel: @gangawbaptistchurch3957
- Channel ID: UC3eJ_77bADN03SZ6QNCYPel

Update NEXT_PUBLIC_YOUTUBE_CHANNEL_ID and NEXT_PUBLIC_YOUTUBE_LIVE_VIDEO_ID in .env.local.

---

## Project Structure

`
app/
  (site)/          # Public pages
  api/             # API routes (Payload, NextAuth, Prayer)
components/
  layout/          # Navbar, Footer
  home/            # HeroSection, FacebookFeed, UpcomingEvents
  sermons/         # SermonCard
  ui/              # Button, Card
lib/
  facebook.ts      # Facebook Graph API client
  payload-client.ts# Payload REST client
payload/
  payload.config.ts
  collections/     # Users, Sermons, Events, Posts, Members
public/
  church-hero.png  # Hero background image
`

---

## License

MIT © Gangaw Baptist Church
