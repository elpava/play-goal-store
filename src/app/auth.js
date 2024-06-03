import NextAuth from 'next-auth'
import { AuthError } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import userExists from 'database/users/user-exists'
import getUser from 'database/users/get-user'
import addUser from 'database/users/add-user'
import encryptPassword from 'library/encryption'

export class CredentialsError extends AuthError {
  static type

  constructor(type, message) {
    super()
    this.message = message
    this.type = type
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: { signIn: '/login' },
  providers: [
    Credentials({
      authorize: async authorize => {
        const { state, password } = authorize
        let user

        const isSignIn = state === 'sign-in'

        const hashedPassword = await encryptPassword(password)

        if (isSignIn) {
          const { email } = authorize

          await userExists(email)

          user = await getUser(email, hashedPassword)
          user = {
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
          }
        } else {
          user = await addUser({ ...authorize, password: hashedPassword })
          user = {
            id: user.insertedId,
            name: `${authorize.firstName} ${authorize.lastName}`,
            email: authorize.email,
          }
        }

        return user
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub
      }

      return session
    },
  },
})
