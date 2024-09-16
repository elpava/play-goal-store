import { MongoClient } from 'mongodb'
import { ObjectId } from 'mongodb'

const DATABASE_NAME = process.env.DB_NAME
const PRODUCTS_COLLECTION = 'products'
const USERS_COLLECTION = 'users'
const ORDERS_COLLECTION = 'orders'
const URI = 'mongodb://0.0.0.0:27017/'

async function connectToDatabase(caller) {
  try {
    return await MongoClient.connect(URI)
  } catch (error) {
    console.log(`[${caller}]: couldn't connect to the database.`)
  }
}

export {
  DATABASE_NAME,
  PRODUCTS_COLLECTION,
  USERS_COLLECTION,
  ORDERS_COLLECTION,
  connectToDatabase,
  ObjectId,
}
