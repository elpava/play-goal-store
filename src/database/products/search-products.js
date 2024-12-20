import {
  DATABASE_NAME,
  PRODUCTS_COLLECTION,
  connectToDatabase,
} from '../connect'

export default async function searchProducts(query) {
  const caller = searchProducts.name
  let data, client
  query = query.trim()

  try {
    client = await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    data = await db
      .collection(PRODUCTS_COLLECTION)
      .find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { brand: { $regex: query, $options: 'i' } },
        ],
      })
      .toArray()
    data = JSON.parse(JSON.stringify(data))
  } catch (error) {
    throw new Error(
      `[${caller}]: Couldn't find the queried products data.\n message: ${error}`,
    )
  } finally {
    await client.close()
  }

  return data
}
