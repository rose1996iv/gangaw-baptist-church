# Gangaw Baptist Church Website (GBC)

A fully-featured, production-ready church website built with **Next.js 14**, **Payload CMS v2**, **Tailwind CSS**, and **MongoDB**.

**Live YouTube Channel:** https://www.youtube.com/@gangawbaptistchurch3957  
**Official Facebook Page:** https://www.facebook.com/gangawbaptistchurch

---

## 🛠 Tech Stack

- **Frontend:** Next.js 14 (App Router, TypeScript), Tailwind CSS
- **Backend & CMS:** Payload CMS v2 (Self-hosted via Express Custom Server)
- **Database:** MongoDB Atlas
- **Integrations:** 
  - Facebook Graph API (Live Feed)
  - YouTube API (Sermons & Live Stream)
  - NextAuth (Facebook Login for Members)
  - Resend (Prayer Request Emails)
- **Deployment:** Vercel

---

## 📝 How Content is Managed (CMS)

This website uses **Payload CMS** to manage content dynamically. Once deployed, you do not need to touch the code to update the website's content.

### Using the Admin Panel

The admin panel is where you update your website's data.
**Access it at:** `http://localhost:3000/admin` (Local only, see why below).

You can add, edit, or delete:
1. **Sermons:** Enter the Title, Preacher, Date, and YouTube Video URL. It will automatically update the Homepage and Sermons page.
2. **Events:** Create church events, set dates, times, and descriptions. They will appear on the Homepage and Events calendar.
3. **Blog / News:** Write announcements or devotional articles.
4. **Members:** Manage church directory members, their roles, and photos.
5. **Media Library:** Upload images and files to use across the site.

> **Can I update existing content?**  
> YES! Anything you add or edit in the Admin Panel will instantly reflect on the main website.

---

## 🚀 Deployment to Vercel

### Step 1: Push to GitHub
1. Commit all your latest changes.
2. Push to your repository: `https://github.com/rose1996iv/gangaw-baptist-church.git`

### Step 2: Vercel Setup
1. Go to [Vercel](https://vercel.com) and click **Import Project**.
2. Select the `gangaw-baptist-church` repository.
3. Open the **Environment Variables** section and add everything from your local `.env.local` file.
   - *Crucial:* Set `MONGODB_URI` using the **Standard (non-SRV)** connection string.
4. Click **Deploy**.

> ⚠️ **IMPORTANT NOTE FOR VERCEL DEPLOYMENT:**
> Next.js hosts perfectly on Vercel. However, Payload CMS v2 requires a custom Express server (`server.ts`) which **Vercel's serverless environment does not support**.
> 
> **How this works in practice:**
> - Your **Public Website** (Next.js) will run perfectly on Vercel, fetching data directly from your MongoDB Atlas database.
> - To **Manage Content**, you must run the admin panel locally on your computer using `npm run dev:full`. When you add a sermon or event locally, it saves to MongoDB, and your live Vercel website will instantly show it!

---

## 💻 Local Development

### Running the App
To start **both** the Website and the Admin Panel:
```bash
npm run dev:full
```
- Website: `http://localhost:3000`
- Admin Panel: `http://localhost:3000/admin`

*(If you only need to work on the Next.js frontend, you can use `npm run dev`)*

### Environment Variables
Duplicate `.env.example` to `.env.local` and configure your keys, specifically your `MONGODB_URI` and `PAYLOAD_SECRET`.

---

## 🌐 API Integrations

### Facebook Feed
The homepage automatically pulls the latest posts from the official GBC Facebook page.
Required `.env.local` keys:
- `FACEBOOK_PAGE_ID`
- `FACEBOOK_ACCESS_TOKEN` (Long-lived Page Access Token)

### YouTube Embeds
Sermon videos use an optimized click-to-play iFrame to ensure fast page load speeds. Update the `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID` in `.env.local` to link the main channel.

---

## License
MIT © Gangaw Baptist Church
