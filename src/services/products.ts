import axios from '@/config/axios'
import type { Order } from '@/types'
import { objectToFormData } from '@/utils'

const getProducts = async () => {
  const res = await axios.get('/products')
  return res.data
}

const getOrders = async (): Promise<Order[]> => {
  const res = await axios.get('/products/orders')
  return res.data
}

const createProduct = async (data: Record<string, any>) => {
  const formData = objectToFormData(data)
  return await axios.post('/products/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

const updateProduct = async ({ id, newStock }: Record<string, any>) => {
  const res = await axios.patch(`/products/update/${id}`, { newStock })
  return res.data
}

export const productsService = {
  getProducts,
  getOrders,
  createProduct,
  updateProduct,
}
