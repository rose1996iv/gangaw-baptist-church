import type { CollectionConfig } from 'payload/types'

const isPastorOrAdmin = ({ req: { user } }: any) =>
  user?.role === 'admin' || user?.role === 'pastor'

const Sermons: CollectionConfig = {
  slug: 'sermons',
  labels: { singular: 'Sermon', plural: 'Sermons' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'pastor', 'date', 'isLive', 'createdAt'],
    description: 'Manage sermon videos and recordings',
  },
  access: {
    read: () => true,
    create: isPastorOrAdmin,
    update: isPastorOrAdmin,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'pastor',
      type: 'text',
      defaultValue: 'GBC Pastoral Team',
    },
    {
      name: 'date',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayOnly', displayFormat: 'MMM d, yyyy' } },
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      label: 'YouTube URL',
      admin: { description: 'Full YouTube video URL (e.g. https://youtu.be/vGR74QBdIbM)' },
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text' }],
    },
    {
      name: 'isLive',
      type: 'checkbox',
      label: 'Mark as Live Stream',
      defaultValue: false,
    },
  ],
}

export default Sermons
