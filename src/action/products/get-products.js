'use server'

import { getProducts } from 'database/products/get-produtcs'

export default async function getProductsAction() {
  return await getProducts()
}
