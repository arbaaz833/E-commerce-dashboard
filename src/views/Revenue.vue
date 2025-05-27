<template>
  <div v-if="loading" class="flex flex-col gap-4">
    <PrimeSkeleton v-for="i in 3" :key="i" class="min-h-10 w-full rounded-2xl" />
  </div>
  <div v-else>
    <Heading title="Statistics" class="mb-4">
      <PrimeSelect
        v-model="selectedCategory"
        :options="categories"
        @change="updateFilteredOrders"
        placeholder="Select a category"
        class="min-w-60"
      />
    </Heading>
    <div class="flex items-center justify-start gap-4 pb-4 border-b border-zinc-800">
      <Card title="Orders">
        <template #content>
          <p>Total orders placed: {{ totalOrders }}</p>
        </template>
      </Card>
      <Card title="Revenue">
        <template #content>
          <p class="text-gray-700 dark:text-gray-300">Total: {{ totalRevenue }} $</p>
        </template>
      </Card>
    </div>
    <Heading title="Trends" class="mt-4">
      <PrimeSelect
        v-model="selectedInterval"
        :options="[
          { label: 'Daily', value: 'daily' },
          { label: 'Weekly', value: 'weekly' },
          { label: 'Monthly', value: 'monthly' },
          { label: 'Yearly', value: 'yearly' },
        ]"
        placeholder="Select an interval"
        optionLabel="label"
        optionValue="value"
        class="min-w-60"
      />
    </Heading>
    <div class="flex items-center justify-start gap-4 mt-4">
      <Chart
        :labels="revenueDataByInterval.labels"
        title="Orders"
        :data="revenueDataByInterval.orderCounts"
      />
      <Chart
        :labels="revenueDataByInterval.labels"
        title="Revenue"
        :data="revenueDataByInterval.revenues"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from '@/components/shared/Card.vue'
import Chart from '@/components/shared/Chart.vue'
import Heading from '../components/shared/Heading.vue'
import { productsService } from '@/services/products'
import type { Order } from '@/types'
import { categories } from '@/constants'

const selectedCategory = ref<string>(categories[0])
const filteredOrders = ref<Order[]>([])
const allOrders = ref<Order[]>([])
const loading = ref<boolean>(false)
const selectedInterval = ref('monthly')

const totalRevenue = computed(() => {
  return filteredOrders.value.reduce((sum, order) => sum + order.totalPrice, 0).toFixed(0)
})

const totalOrders = computed(() => {
  return filteredOrders.value.length
})

onMounted(async () => {
  try {
    loading.value = true
    await fetchOrders()
    loading.value = false
  } catch (error) {
    loading.value = false
    console.error('Error fetching orders:', error)
  }
})

const fetchOrders = async () => {
  const orders = await productsService.getOrders()
  allOrders.value = orders
  filteredOrders.value = orders.filter((order) => {
    return order.category === selectedCategory.value
  })
}

const updateFilteredOrders = () => {
  const filtered = allOrders.value.filter((order) => {
    return order.category === selectedCategory.value
  })

  filteredOrders.value = filtered
}

function getISOWeekAndYear(date: Date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))

  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))

  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))

  const weekNumber = Math.ceil(((d.valueOf() - yearStart.valueOf()) / 86400000 + 1) / 7)
  return { year: d.getUTCFullYear(), week: weekNumber }
}

const revenueDataByInterval = computed(() => {
  if (!filteredOrders.value || filteredOrders.value.length === 0) {
    return { labels: [], revenues: [], orderCounts: [] }
  }

  const aggregationMap = new Map()

  filteredOrders.value.forEach((order) => {
    if (!order.orderDate || !order.totalPrice) {
      console.warn('Skipping order with missing date or price:', order)
      return
    }
    const date = new Date(order.orderDate)
    let key

    switch (selectedInterval.value) {
      case 'daily':
        key = `D${date.getDay()}`
        break
      case 'weekly':
        const { year: weekYear, week: weekNum } = getISOWeekAndYear(date)
        key = `W${String(weekNum).padStart(2, '0')}`
        break
      case 'monthly':
        key = `M${String(date.getMonth() + 1).padStart(2, '0')}`
        break
      case 'yearly':
        key = `Y${date.getFullYear().toString()}`
        break
      default:
        console.warn('Invalid selectedTimePeriod:', selectedInterval.value)
        return { labels: [], revenues: [], orderCounts: [] }
    }

    if (!aggregationMap.has(key)) {
      aggregationMap.set(key, { totalRevenue: 0, orderCount: 0 })
    }
    const currentEntry = aggregationMap.get(key)
    currentEntry.totalRevenue += order.totalPrice
    currentEntry.orderCount += 1
  })

  const sortedEntries = Array.from(aggregationMap.entries()).sort((a, b) => {
    const aKey = a[0].slice(1)
    const bKey = b[0].slice(1)
    if (aKey < bKey) return -1
    if (aKey > bKey) return 1
    return 0
  })

  const labels = []
  const revenues = []
  const orderCounts = []

  for (const [key, value] of sortedEntries) {
    labels.push(key)
    revenues.push(parseFloat(value.totalRevenue.toFixed(2)))
    orderCounts.push(value.orderCount)
  }

  return { labels, revenues, orderCounts }
})
</script>
