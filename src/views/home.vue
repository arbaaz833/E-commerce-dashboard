<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <div
      className="text-6xl mb-4 bg-gradient-to-r from-[#484348] to-[#787478] bg-clip-text text-transparent font-extrabold pb-1"
    >
      Welcome to E-commerce Dashboard
    </div>
    <PrimeButton @click="navigate"> Enter Dashboard </PrimeButton>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const navigate = () => {
  router.push('/revenue')
}
</script>
