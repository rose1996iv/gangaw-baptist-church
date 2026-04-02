import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, request } = body

    if (!name || !request) {
      return NextResponse.json({ error: 'Name and request are required.' }, { status: 400 })
    }

    const resendKey = process.env.RESEND_API_KEY
    const toEmail = process.env.RESEND_PRAYER_TO_EMAIL || 'gangawbaptistchurch2020@gmail.com'
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@gangawbaptist.org'

    if (!resendKey || resendKey.startsWith('re_xxx') || resendKey === 're_xxxxxxxxxxxxxxxxxxxx') {
      // Dev fallback: log to console
      console.log('[Prayer Request]', { name, email, request })
      return NextResponse.json({ success: true, note: 'Logged to console (no Resend key configured)' })
    }

    // Send via Resend
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email || undefined,
        subject: `New Prayer Request from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #1e3a5f; margin-bottom: 4px;">New Prayer Request</h2>
            <p style="color: #888; font-size: 13px; margin-top: 0;">Submitted via Gangaw Baptist Church website</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><strong>From:</strong> ${name}</p>
            ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
            <div style="background: #f8f9fa; border-left: 4px solid #c9a84c; padding: 16px; border-radius: 4px; margin-top: 16px;">
              <p style="margin: 0; white-space: pre-wrap;">${request}</p>
            </div>
            <p style="color: #888; font-size: 12px; margin-top: 24px;">Sent from your church website prayer form.</p>
          </div>
        `,
      }),
    })

    if (!emailRes.ok) {
      const err = await emailRes.json()
      console.error('[Prayer Email Error]', err)
      return NextResponse.json({ error: 'Email delivery failed.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('[Prayer API Error]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
