import ReactQueryProvider from '@/react-query-provider'
import { VAZIRMATN_FONT } from 'util/share-font'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { getProductsAction } from 'action/products/get-products'

export const metadata = {
  title: 'پلی گل',
  description: 'فروشگاه پلی گل',
}

const queryClient = new QueryClient()

await queryClient.prefetchQuery({
  queryKey: ['products'],
  queryFn: () => getProductsAction(),
})

export default async function RootLayout({ children }) {
  return (
    <html className={VAZIRMATN_FONT.className} lang="fa" dir="rtl">
      <body>
        <ReactQueryProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
          </HydrationBoundary>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
