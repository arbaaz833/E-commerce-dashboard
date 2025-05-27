<template>
  <PrimeChart type="line" :data="chartData" :options="chartOptions" class="h-[25rem] w-full" />
</template>

<script setup lang="ts">
import { $dt } from '@primeuix/themes'

interface ChartProps {
  labels: string[]
  title: string
  data: number[]
}

const props = defineProps<ChartProps>()
const chartData = ref()
const chartOptions = ref()

const setChartData = () => {
  return {
    labels: props.labels,
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

watch(
  props,
  () => {
    chartData.value = setChartData()
  },
  { immediate: true },
)
onMounted(() => {
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})
// const lables = {
//   monthly: [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December',
//   ],
//   weekly: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
//   daily: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
//   yearly: ['2020', '2021', '2022', '2023', '2024', '2025'],
// }
</script>
