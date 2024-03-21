import {
  DATABASE_NAME,
  PRODUCTS_COLLECTION,
  client,
  connectToDatabase,
} from '../connect'

export async function getProducts() {
  const caller = getProducts.name
  let data

  try {
    await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    data = await db.collection(PRODUCTS_COLLECTION).find({}).toArray()
    data = JSON.parse(JSON.stringify(data))
  } catch (error) {
    throw new Error(
      `[${caller}]: Couldn't find the products data.\n message: ${error}`,
    )
  }

  client.close()
  console.log(`🔒 [${caller}]: close connection.`)

  return data
}

export async function getProductsProperties(props) {
  const caller = getProductsProperties.name
  let data

  try {
    await connectToDatabase(caller)
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
  }

  client.close()
  console.log(`🔒 [${caller}]: close connection.`)

  return data
}

export async function getProduct(query = '') {
  const caller = getProduct.name
  let data

  try {
    await connectToDatabase(caller)
    const db = client.db(DATABASE_NAME)
    data = await db.collection(PRODUCTS_COLLECTION).findOne({ slug: query })
    data = JSON.parse(JSON.stringify(data))
  } catch (error) {
    throw new Error(`[${caller}]: Couldn't find ${query}.\n message: ${error}`)
  }

  client.close()
  console.log(`🔒 [${caller}]: close connection.`)

  return data
}
