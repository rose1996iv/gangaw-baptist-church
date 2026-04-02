import type { CollectionConfig } from 'payload/types'

const isPastorOrAdmin = ({ req: { user } }: any) =>
  user?.role === 'admin' || user?.role === 'pastor'

const Events: CollectionConfig = {
  slug: 'events',
  labels: { singular: 'Event', plural: 'Events' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'location', 'isFeatured'],
    description: 'Manage church events and activities',
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
      name: 'date',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'time',
      type: 'text',
      admin: { description: 'Display time e.g. "9:00 AM – 11:00 AM"' },
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'googleCalendarLink',
      type: 'text',
      label: 'Google Calendar Link',
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Featured Event',
      defaultValue: false,
    },
  ],
}

export default Events
