<template>
  <PrimeCard class="min-w-80">
    <template #title>
      <h2 class="text-lg font-semibold">
        {{ props.title }}
      </h2>
    </template>
    <template #content>
      <slot name="content" />
    </template>
  </PrimeCard>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>
