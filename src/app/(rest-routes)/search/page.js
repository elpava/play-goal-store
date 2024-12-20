import Image from 'next/image'
import clsx from 'clsx/lite'
import searchProducts from 'database/products/search-products'
import UpdateURLAtClient from '@/_components/ui/update-url-at-client'
import PageTransition from '@/_components/ui/animation/page-transition'
import Empty from '@/_components/ui/common/empty'

export const metadata = {
  title: 'جستجو محصولات',
}

export default async function SearchPage({ searchParams }) {
  const queries = new URLSearchParams(searchParams)
  const { query } = searchParams
  let data

  let isEmptyQuery
  let isInvalidResult

  if (query) {
    data = await searchProducts(query)
    queries.set('state', 'success')
    isInvalidResult = data.length === 0
    if (isInvalidResult) {
      queries.set('state', 'failure')
    }
  }

  isEmptyQuery = query === '' || !data

  return (
    <section className="grid">
      <UpdateURLAtClient queries={queries.toString()} />
      {isEmptyQuery ? (
        <Empty type="search" />
      ) : (
        <div>
          <div
            className={clsx(
              'flex items-end gap-4',
              !isInvalidResult && 'sm:mb-10',
            )}
          >
            <div className="text-xl">عبارت مورد جستجو:</div>
            <span className="text-lg font-bold sm:text-xl">{query}</span>
          </div>

          {isInvalidResult ? (
            <Empty type="search" />
          ) : (
            <ol className="divide-y divide-zinc-300 px-10 py-4">
              {data.map(({ _id, slug, name, brand, thumbnails }, idx) => (
                <li key={_id} className="relative py-1">
                  <PageTransition
                    href={`/products/${slug}`}
                    className="flex items-center gap-8 py-4 text-sm font-bold xs:mr-4 sm:text-2xl"
                  >
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-red-200 sm:size-28">
                      <Image
                        src={`/images/products/${thumbnails[0]}`}
                        alt={name}
                        fill
                        sizes="(min-width: 768px) 100vw, (min-width: 640px) 50vw, (min-width: 475px) 33vw, 85vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="basis-4/5 sm:basis-10/12">
                      <h3>{name}</h3>
                      <span className="rounded-3xl bg-zinc-900 p-1 text-xs font-bold capitalize text-zinc-100 sm:p-1.5 sm:text-base">
                        {brand}
                      </span>
                    </div>
                  </PageTransition>
                  <span className="absolute -right-6 top-1/2 -translate-y-1/2 text-lg sm:text-2xl">
                    {idx + 1}.
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </section>
  )
}
