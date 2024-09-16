import {
  DATABASE_NAME,
  PRODUCTS_COLLECTION,
  connectToDatabase,
} from '../connect'

const cache = {}
const KEY = '/products'

export async function getProducts() {
  const caller = getProducts.name
  let data, client

  if (cache[KEY]) {
    console.log('Serve products data from cache.')
    return cache[KEY]
  }

  try {
    client = await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    data = await db.collection(PRODUCTS_COLLECTION).find({}).toArray()
    data = JSON.parse(JSON.stringify(data))
    cache[KEY] = data
  } catch (error) {
    throw new Error(
      `[${caller}]: Couldn't find the products data.\n message: ${error}`,
    )
  } finally {
    await client.close()
  }

  return data
}

export async function getProductsProperties(props) {
  const caller = getProductsProperties.name
  let data, client

  try {
    client = await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    data = await db
      .collection(PRODUCTS_COLLECTION)
      .find({})
      .project(props)
      .toArray()
    data = JSON.parse(JSON.stringify(data))
  } catch (error) {
    throw new Error(
      `[${caller}]: Couldn't find the products ${props}.\n message: ${error}`,
    )
  } finally {
    await client.close()
  }

  return data
}

export async function getProduct(query = '') {
  const caller = getProduct.name
  let data, client

  try {
    client = await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    data = await db.collection(PRODUCTS_COLLECTION).findOne({ slug: query })
    data = JSON.parse(JSON.stringify(data))
  } catch (error) {
    throw new Error(`[${caller}]: Couldn't find ${query}.\n message: ${error}`)
  } finally {
    await client.close()
  }

  return data
}
