<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import AuthLayout from '../layouts/AuthLayout.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'

const route = useRoute()

const layoutComponent = computed(() => {
  const layout = route.meta.layout
  return layout === 'dashboardLayout' ? DashboardLayout : AuthLayout
})
</script>
