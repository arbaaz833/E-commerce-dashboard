<template>
  <div class="flex items-center justify-between">
    <div class="text-2xl font-bold">
      {{ title }}
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{
  title: string
}>()
</script>
