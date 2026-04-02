import type { Metadata } from 'next'
import { getPublicMembers } from '@/lib/payload-client'

export const metadata: Metadata = {
  title: 'Members — Gangaw Baptist Church',
  description: 'Connect with the Gangaw Baptist Church community.',
}

export const revalidate = 600

const PLACEHOLDER_MEMBERS = [
  { id: 'm1', name: 'GBC Lead Pastor', role: 'pastor', bio: 'Lead Pastor of Gangaw Baptist Church, serving the congregation with dedication.', avatar: '', isPublic: true },
  { id: 'm2', name: 'GBC Deacon', role: 'deacon', bio: 'Serving the congregation in practical ministry.', avatar: '', isPublic: true },
  { id: 'm3', name: 'GBC Elder', role: 'elder', bio: 'Elder and Sunday School teacher, passionate about discipleship.', avatar: '', isPublic: true },
  { id: 'm4', name: 'Worship Team Leader', role: 'general', bio: 'Worship team leader and children\'s ministry volunteer.', avatar: '', isPublic: true },
  { id: 'm5', name: 'Youth Ministry Leader', role: 'deacon', bio: 'Overseeing the youth and outreach programs.', avatar: '', isPublic: true },
  { id: 'm6', name: 'Church Secretary', role: 'general', bio: 'Church secretary and coordinator for community events.', avatar: '', isPublic: true },
]

const ROLE_LABELS: Record<string, string> = {
  pastor: 'Pastor',
  elder: 'Elder',
  deacon: 'Deacon',
  general: 'Member',
}

const ROLE_COLORS: Record<string, string> = {
  pastor: 'bg-navy-100 text-navy-700',
  elder: 'bg-gold-50 text-gold-700',
  deacon: 'bg-blue-50 text-blue-700',
  general: 'bg-gray-100 text-gray-600',
}

function getInitials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

export default async function MembersPage() {
  let members: any[] = []
  let isAuthenticated = false // In real app: check NextAuth session server-side

  try {
    members = await getPublicMembers()
  } catch {
    members = PLACEHOLDER_MEMBERS
  }

  if (members.length === 0) members = PLACEHOLDER_MEMBERS

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="gradient-navy py-20 text-center px-4">
        <span className="text-gold-400 text-sm font-semibold uppercase tracking-widest">Our Family</span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">Member Directory</h1>
        <p className="text-white/70 max-w-xl mx-auto">
          Connect with our church family. Sign in with Facebook to access the full member portal.
        </p>
        <div className="w-16 h-1 bg-gold-500 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Login Banner */}
      <div className="bg-navy-50 border-b border-navy-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-navy-700">
            <strong>Sign in</strong> to access the full member directory, request prayer, and more.
          </div>
          <a
            href="/api/auth/signin"
            id="member-signin-btn"
            className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#1565d8] text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg shrink-0"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073C24 5.405 18.627 0 12 0 5.373 0 0 5.405 0 12.073 0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
            </svg>
            Continue with Facebook
          </a>
        </div>
      </div>

      {/* Members Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              id={`member-${member.id}`}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col items-center text-center gap-3"
            >
              {/* Avatar */}
              {member.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-navy-100"
                />
              ) : (
                <div className="w-16 h-16 rounded-full gradient-navy flex items-center justify-center text-white text-xl font-bold ring-2 ring-navy-100">
                  {getInitials(member.name)}
                </div>
              )}

              {/* Name & Role */}
              <div>
                <h3 className="font-semibold text-navy-800">{member.name}</h3>
                <span className={`inline-block mt-1 text-xs px-2.5 py-0.5 rounded-full font-medium ${ROLE_COLORS[member.role] || ROLE_COLORS.general}`}>
                  {ROLE_LABELS[member.role] || member.role}
                </span>
              </div>

              {/* Bio */}
              {member.bio && (
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{member.bio}</p>
              )}

              {/* Joined */}
              {member.joinedDate && (
                <p className="text-xs text-gray-400">
                  Member since {new Date(member.joinedDate).getFullYear()}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
