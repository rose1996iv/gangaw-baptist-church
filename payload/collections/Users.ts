import type { CollectionConfig } from 'payload/types'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  labels: { singular: 'User', plural: 'Users' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) =>
      user?.role === 'admin' ? true : { id: { equals: user?.id } },
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'member',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Pastor', value: 'pastor' },
        { label: 'Editor', value: 'editor' },
        { label: 'Member', value: 'member' },
      ],
      access: {
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
    {
      name: 'facebookId',
      type: 'text',
      admin: { readOnly: true, description: 'Auto-filled on Facebook login' },
    },
  ],
}

export default Users
