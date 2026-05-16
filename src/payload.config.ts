import path from 'path'
import { fileURLToPath } from 'url'

import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { gcsStorage } from '@payloadcms/storage-gcs'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { LandingPage } from './globals/LandingPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isProd = process.env.NODE_ENV === 'production'

const serverURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — ReUP CMS',
    },
  },
  collections: [Users, Media, Pages],
  globals: [LandingPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: isProd
    ? postgresAdapter({
        pool: { connectionString: process.env.DATABASE_URI! },
      })
    : // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('@payloadcms/db-sqlite').sqliteAdapter({
        client: { url: process.env.DATABASE_URI || 'file:./reup-landing.db' },
        push: true,
      }),
  plugins: isProd && process.env.GCS_BUCKET
    ? [
        gcsStorage({
          collections: { media: true },
          bucket: process.env.GCS_BUCKET,
          options: {},
        }),
      ]
    : [],
  sharp,
  cors: [serverURL],
  csrf: [serverURL],
})
