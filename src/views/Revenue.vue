<template>
  <Heading title="Statistics" class="mb-4" />
  <div class="flex items-center justify-start gap-4 pb-4 border-b border-zinc-800">
    <Card title="Orders">
      <template #content>
        <p>Total orders placed: 150</p>
      </template>
    </Card>
    <Card title="Revenue">
      <template #content>
        <p class="text-gray-700 dark:text-gray-300">Total: 15000 $</p>
      </template>
    </Card>
  </div>
  <Heading title="Trends" class="mt-4">
    <PrimeSelect
      v-model="selectedCity"
      :options="categories"
      placeholder="Select a category"
      class="min-w-60"
    />
  </Heading>
  <div class="flex items-center justify-start gap-4 mt-4">
    <Chart interval="monthly" title="Orders" />
    <Chart interval="monthly" title="Revenue" />
  </div>
</template>

<script setup lang="ts">
import Card from '@/components/shared/Card.vue'
import Chart from '@/components/shared/Chart.vue'
import Heading from '../components/shared/Heading.vue'

const selectedCity = ref<string>('')

const categories = [
  'Electronics',
  'Home & Kitchen',
  'Books',
  'Sports & Outdoors',
  'Accessories',
  'Office Supplies',
  'Beauty & Personal Care',
  'Toys & Games',
  'Automotive',
  'Groceries',
  'Health',
]
</script>
