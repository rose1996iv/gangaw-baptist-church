import { buildConfig } from 'payload/config'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'

import Users from './collections/Users'
import Sermons from './collections/Sermons'
import Events from './collections/Events'
import Posts from './collections/Posts'
import Members from './collections/Members'

export default buildConfig({
  serverURL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '— Gangaw Baptist Church Admin',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/gbc',
  }),
  collections: [Users, Sermons, Events, Posts, Members],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: [
    process.env.NEXTAUTH_URL || 'http://localhost:3000',
    'https://gangawbaptist.org',
  ],
  csrf: [
    process.env.NEXTAUTH_URL || 'http://localhost:3000',
    'https://gangawbaptist.org',
  ],
})
