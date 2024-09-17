import { MongoClient } from 'mongodb'
import { ObjectId } from 'mongodb'

const DATABASE_USERNAME = process.env.DB_USERNAME
const DATABASE_PASSWORD = process.env.DB_PASSWORD
const DATABASE_NAME = process.env.DB_NAME
const PRODUCTS_COLLECTION = 'products'
const USERS_COLLECTION = 'users'
const ORDERS_COLLECTION = 'orders'
const URI = `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@cluster0.btqca.mongodb.net/`
// const URI = 'mongodb://0.0.0.0:27017/'

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
