import NextAuth from 'next-auth'
import { AuthError } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import userExists from 'database/users/user-exists'
import getUser from 'database/users/get-user'
import addUser from 'database/users/add-user'
import encryptPassword from 'library/encryption'
import allowOrderSynchronization from 'database/users/allow-order-synchronization'
import syncGuestOrderWithUserOrder from 'database/orders/sync-order'

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
        authorize.email = authorize.email.toLowerCase()
        const { state, password, orderBeforeLogin } = authorize
        let user
        let parsedOrderBeforeLogin =
          orderBeforeLogin && JSON.parse(orderBeforeLogin)

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

        if (parsedOrderBeforeLogin) {
          const {
            allow: isAllowedOrderSynchronization,
            orderId: existEmptyOrderId,
          } = await allowOrderSynchronization(user.id)

          if (isAllowedOrderSynchronization) {
            await syncGuestOrderWithUserOrder(
              parsedOrderBeforeLogin,
              user.id,
              existEmptyOrderId,
            )
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
