import NextAuthProvider from '@/next-auth-provider'
import ReactQueryProvider from '@/react-query-provider'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from './getQueryClient'
import getProductsAction from 'action/products/get-products'
import { VAZIRMATN_FONT } from 'util/share-font'

import './globals.css'
import UserIdManagement from './user-id-management'

export const metadata = {
  title: 'پلی گل',
  description: 'فروشگاه پلی گل',
}

export default async function RootLayout({ children }) {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: () => getProductsAction(),
  })

  return (
    <html className={VAZIRMATN_FONT.className} lang="fa" dir="rtl">
      <body>
        <NextAuthProvider>
          <ReactQueryProvider>
            <UserIdManagement>
              <HydrationBoundary state={dehydrate(queryClient)}>
                {children}
              </HydrationBoundary>
            </UserIdManagement>
          </ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
