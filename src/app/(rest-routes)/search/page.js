import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx/lite'
import searchProducts from 'database/products/search-products'
import UpdateURLAtClient from '@/_components/ui/update-url-at-client'
import Empty from '@/_components/ui/empty'

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
    <main className="grid">
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
                  <Link
                    href={`/products/${slug}`}
                    className="mr-4 flex items-center gap-8 py-4 text-sm font-bold sm:text-2xl"
                  >
                    <div className="relative size-16 basis-1/5 sm:size-28 sm:basis-2/12">
                      <Image
                        src={`/images/products/${thumbnails[0]}`}
                        alt={name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="basis-4/5 sm:basis-10/12">
                      <h3>{name}</h3>
                      <span className="rounded-3xl bg-zinc-900 p-1 text-xs font-bold capitalize text-zinc-100 sm:p-1.5 sm:text-base">
                        {brand}
                      </span>
                    </div>
                  </Link>
                  <span className="absolute -right-6 top-1/2 -translate-y-1/2 text-lg sm:text-2xl">
                    {idx + 1}.
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </main>
  )
}
