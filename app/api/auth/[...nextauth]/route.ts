import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'

const handler = NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_APP_ID || '',
      clientSecret: process.env.FACEBOOK_APP_SECRET || '',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // In a full implementation: upsert user in Payload CMS with 'member' role
      // For now, allow all Facebook sign-ins
      return true
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as any).id = token.sub
        ;(session.user as any).facebookId = token.sub
      }
      return session
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
  },
  pages: {
    signIn: '/members',
    error: '/members',
  },
})

export { handler as GET, handler as POST }
