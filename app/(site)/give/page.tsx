import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Give — Gangaw Baptist Church',
  description: 'Support the ministry of Gangaw Baptist Church through your generous giving.',
}

const GIVING_WAYS = [
  {
    icon: '🙏',
    title: 'Tithe & Offering',
    description: 'Honor God with the firstfruits of your income as an act of worship and faith.',
  },
  {
    icon: '🏗️',
    title: 'Building Fund',
    description: 'Help us build and maintain our facilities for generations of worship to come.',
  },
  {
    icon: '🌍',
    title: 'Missions Support',
    description: 'Partner with missionaries spreading the Gospel at home and around the world.',
  },
]

const FAQ = [
  {
    q: 'Is my donation tax-deductible?',
    a: 'Gangaw Baptist Church is a registered non-profit organization. Please contact the church office for official donation receipts and tax documentation.',
  },
  {
    q: 'How do I get a donation receipt?',
    a: 'Please contact the church office at gangawbaptistchurch2020@gmail.com or call +95 9 44200 0971 for donation receipts.',
  },
  {
    q: 'Can I set up recurring giving?',
    a: 'Yes, through your PayPal account you can set up automatic recurring donations on a weekly, bi-weekly, or monthly schedule.',
  },
  {
    q: 'What percentage goes to ministry?',
    a: 'We are committed to financial integrity. Over 85% of all giving goes directly to ministry, programs, and missions. Financial reports are available upon request.',
  },
]

export default function GivePage() {
  const paypalLink = process.env.NEXT_PUBLIC_PAYPAL_ME_LINK || 'https://www.paypal.me/YourChurchHandle'

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="gradient-navy py-20 text-center px-4">
        <span className="text-gold-400 text-sm font-semibold uppercase tracking-widest">Support the Ministry</span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">Give Generously</h1>
        <p className="text-white/70 max-w-xl mx-auto">
          &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion,
          for God loves a cheerful giver.&rdquo; — 2 Corinthians 9:7
        </p>
        <div className="w-16 h-1 bg-gold-500 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Giving Ways */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {GIVING_WAYS.map((way) => (
            <div key={way.title} className="text-center p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="text-4xl mb-4">{way.icon}</div>
              <h3 className="font-display text-xl font-bold text-navy-800 mb-2">{way.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{way.description}</p>
            </div>
          ))}
        </div>

        {/* PayPal Donate Button */}
        <div className="text-center bg-gradient-to-br from-navy-50 to-gold-50 rounded-3xl p-12 mb-16 border border-gold-100">
          <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-8 h-8 text-navy-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="font-display text-3xl font-bold text-navy-800 mb-3">Give Online</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Giving online is safe, easy, and available 24/7. Use your PayPal account or any major debit/credit card.
          </p>
          <a
            href={paypalLink}
            id="paypal-donate-btn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-400 text-navy-800 font-bold px-10 py-5 rounded-full text-lg transition-all duration-200 shadow-xl hover:shadow-gold-500/30 hover:-translate-y-0.5"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.58 2.977-2.477 4.502-5.652 4.502h-1.452l-.984 6.232h1.793c.458 0 .845-.333.916-.785l.038-.2.72-4.559.046-.252c.071-.452.458-.785.916-.785h.576c3.736 0 6.658-1.518 7.513-5.908z"/>
            </svg>
            Donate via PayPal
          </a>
          <p className="text-xs text-gray-400 mt-4">Secure payment powered by PayPal. No PayPal account required.</p>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="font-display text-2xl font-bold text-navy-800 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ.map((item, i) => (
              <details
                key={i}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
                id={`faq-${i}`}
              >
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer select-none text-navy-800 font-semibold hover:bg-navy-50 transition-colors">
                  <span>{item.q}</span>
                  <svg
                    className="w-5 h-5 text-gold-500 shrink-0 ml-4 transition-transform duration-300 group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
