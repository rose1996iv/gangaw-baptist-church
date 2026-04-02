import type { CollectionConfig } from 'payload/types'

const Members: CollectionConfig = {
  slug: 'members',
  labels: { singular: 'Member', plural: 'Members' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'joinedDate', 'isPublic'],
    description: 'Church member directory',
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      // members can only see isPublic entries
      return { isPublic: { equals: true } }
    },
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'joinedDate',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Deacon', value: 'deacon' },
        { label: 'Elder', value: 'elder' },
        { label: 'General Member', value: 'general' },
      ],
      defaultValue: 'general',
    },
    {
      name: 'isPublic',
      type: 'checkbox',
      label: 'Show in Public Directory',
      defaultValue: true,
    },
  ],
}

export default Members
