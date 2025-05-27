<template>
  <PrimeImage pt:root="!rounded-full" width="50" heigth="50" :src="imageUrl" preview />
</template>

<script setup lang="ts">
const props = defineProps({
  params: Object,
})

const imageUrl = computed(() => {
  const url = props.params!.data.imageUrl
  if (url.includes('images/placeholder')) {
    return '/products.png'
  }
})
</script>
