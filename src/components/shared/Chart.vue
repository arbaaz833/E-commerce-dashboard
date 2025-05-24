<template>
  <PrimeChart type="line" :data="chartData" :options="chartOptions" class="h-[30rem] w-full" />
</template>

<script setup lang="ts">
import { $dt } from '@primeuix/themes'

interface ChartProps {
  interval: 'monthly' | 'weekly' | 'daily' | 'yearly'
  title: string
  data?: number[]
}

const props = withDefaults(defineProps<ChartProps>(), {
  data: () => [65, 59, 80, 81, 56, 55, 40],
})
onMounted(() => {
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})
const lables = {
  monthly: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  weekly: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  daily: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  yearly: ['2020', '2021', '2022', '2023', '2024', '2025'],
}
const chartData = ref()
const chartOptions = ref()

const setChartData = () => {
  return {
    labels: lables[props.interval],
    datasets: [
      {
        label: props.title,
        data: props.data,
        fill: false,
        borderColor: $dt('emerald.400').value,
        tension: 0.4,
      },
    ],
  }
}
const setChartOptions = () => {
  const textColor = $dt('neutral.50').value
  const textColorSecondary = $dt('neutral.300').value
  const surfaceBorder = $dt('zinc.800').value

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  }
}
</script>
