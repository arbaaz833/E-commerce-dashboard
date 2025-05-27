<template>
  <PrimeButton pt:root="!p-2 !h-8 " size="small" @click="buttonClicked">Update stock</PrimeButton>
</template>

<script setup lang="ts">
const props = defineProps({
  params: Object,
})
const buttonClicked = () => {
  const _params = props.params!
  if (_params.clicked && typeof _params.clicked === 'function') {
    _params.clicked(_params.data)
  } else {
    console.error("Handler function 'clicked' not provided or not a function in cellRendererParams")
  }
}
</script>
