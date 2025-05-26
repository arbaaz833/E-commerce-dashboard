import axios from '@/config/axios'
import type { Order } from '@/types'
import { objectToFormData } from '@/utils'

const getProducts = async () => {
  const res = await axios.get('/products')
  return res.data
}

const getOrders = async (): Promise<Order[]> => {
  const res = await axios.get('/products/orders')
  console.log('res: ', res)
  return res.data
}

const createProduct = async (data: Record<string, any>) => {
  const formData = objectToFormData(data)
  return await axios.post('/products/orders', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

const updateProduct = async (data: Record<string, any>) => {
  const res = await axios.patch('/products/update', data)
  return res.data
}

export const productsService = {
  getProducts,
  getOrders,
  createProduct,
  updateProduct,
}
