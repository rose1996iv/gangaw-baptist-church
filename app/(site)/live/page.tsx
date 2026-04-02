'use client'

import { useState } from 'react'

const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID

export default function LivePage() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  async function handlePrayerRequest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      request: (form.elements.namedItem('request') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/prayer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Server error')
      setSubmitted(true)
      form.reset()
    } catch {
      setError('Unable to submit at this time. Please try again or call the church office.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="gradient-navy py-20 text-center px-4">
        <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 rounded-full px-4 py-1.5 mb-6">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <span className="text-red-300 text-xs font-semibold uppercase tracking-widest">Live Stream</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Watch Live</h1>
        <p className="text-white/70 max-w-xl mx-auto">
          Join us for worship from anywhere in the world. Stream our Sunday services and special events.
        </p>
        <div className="w-16 h-1 bg-gold-500 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* YouTube Live Embed */}
        <div className="mb-16">
          <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-navy-900">
            {channelId ? (
              <iframe
                src={`https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1`}
                title="Live Church Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-white/50">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.43 3.5 12 3.5 12 3.5s-7.43 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.14 0 12 0 12s0 3.86.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.57 20.5 12 20.5 12 20.5s7.43 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.86 24 12 24 12s0-3.86-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
                <p className="text-sm text-center">
                  Set <code className="bg-white/10 px-1 rounded">NEXT_PUBLIC_YOUTUBE_CHANNEL_ID</code> in <code className="bg-white/10 px-1 rounded">.env.local</code> to enable live stream
                </p>
              </div>
            )}
          </div>

          {/* Service times info */}
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            {[
              { label: 'Sunday Morning', time: '9:00 AM & 11:00 AM' },
              { label: 'Wednesday Evening', time: '7:00 PM' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100">
                <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-navy-800 font-medium">{s.label}: <strong>{s.time}</strong></span>
              </div>
            ))}
          </div>
        </div>

        {/* Prayer Request Form */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-gold-600 text-sm font-semibold uppercase tracking-widest">We Care</span>
            <h2 className="font-display text-3xl font-bold text-navy-800 mt-2 mb-3">Submit a Prayer Request</h2>
            <p className="text-gray-600 text-sm">Our pastoral team prays over every request. Your request is kept confidential.</p>
          </div>

          {submitted ? (
            <div id="prayer-success" className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-green-800 text-lg mb-2">Prayer Request Received</h3>
              <p className="text-green-700 text-sm">Thank you for trusting us with your prayer. Our pastoral team will be praying for you.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-sm text-green-600 hover:text-green-800 font-medium transition-colors"
              >
                Submit another request →
              </button>
            </div>
          ) : (
            <form id="prayer-form" onSubmit={handlePrayerRequest} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
              <div>
                <label htmlFor="prayer-name" className="block text-sm font-medium text-navy-800 mb-1.5">
                  Your Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="prayer-name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Smith"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-400 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label htmlFor="prayer-email" className="block text-sm font-medium text-navy-800 mb-1.5">
                  Email Address
                </label>
                <input
                  id="prayer-email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-400 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label htmlFor="prayer-request" className="block text-sm font-medium text-navy-800 mb-1.5">
                  Prayer Request <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="prayer-request"
                  name="request"
                  required
                  rows={5}
                  placeholder="Share your prayer request here..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-400 focus:border-transparent transition-all resize-none"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">{error}</p>
              )}

              <button
                id="prayer-submit-btn"
                type="submit"
                disabled={submitting}
                className="w-full bg-navy-600 hover:bg-navy-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    🙏 Submit Prayer Request
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
