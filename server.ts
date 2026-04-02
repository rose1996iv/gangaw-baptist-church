// @ts-check
require('dotenv').config({ path: '.env.local' })

// Tell Payload where its config is
process.env.PAYLOAD_CONFIG_PATH = require('path').resolve(__dirname, 'payload/payload.config.ts')

const express = require('express')
const next = require('next')

const PORT = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'

async function start() {
  const app = express()

  // 1. Initialize Payload CMS (it reads PAYLOAD_CONFIG_PATH automatically)
  const { default: payload } = await import('payload')

  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'fallback-secret',
    mongoURL: process.env.MONGODB_URI,
    express: app,
    onInit: async () => {
      payload.logger.info(`✅ Payload Admin → http://localhost:${PORT}/admin`)
    },
  })

  // 2. Prepare Next.js
  const nextApp = next({ dev, port: PORT })
  const handle = nextApp.getRequestHandler()
  await nextApp.prepare()

  // 3. All remaining routes → Next.js
  app.all('*', (req: any, res: any) => handle(req, res))

  // 4. Start
  app.listen(PORT, () => {
    console.log(`\n🚀  Server   → http://localhost:${PORT}`)
    console.log(`📋  Admin    → http://localhost:${PORT}/admin`)
    console.log(`🌐  Website  → http://localhost:${PORT}\n`)
  })
}

start().catch((err: Error) => {
  console.error('Startup error:', err.message)
  process.exit(1)
})
