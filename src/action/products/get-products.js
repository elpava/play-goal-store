'use server'

import { getProducts } from 'database/products/get-produtcs'

export async function getProductsAction() {
  return await getProducts()
}
