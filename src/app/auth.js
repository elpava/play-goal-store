import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { getUser } from 'database/users/getUser'
import { addUser } from 'database/users/addUser'
import encryptPassword from 'library/encryption'

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
          user = await getUser({ email, password: hashedPassword })
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

        if (!user) {
          return null
        }

        return user
      },
    }),
  ],
})
