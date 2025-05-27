<template>
  <div class="flex flex-col h-screen">
    <header
      class="bg-transparent shadow-md h-16 flex items-center justify-between px-6 border-b border-zinc-800"
    >
      <div class="text-xl font-semibold">E-commerce Dashboard</div>
      <div class="text-sm text-gray-600">Welcome</div>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <aside class="w-64 bg-zinc-900 border-r border-zinc-800 text-white flex-shrink-0">
        <nav class="flex flex-col p-4 space-y-2">
          <RouterLink
            v-for="route in sidebarRoutes"
            :key="route.path"
            :to="route.path"
            class="block p-2 rounded hover:bg-neutral-700 transition-all text-sm truncate"
            active-class="bg-neutral-700"
          >
            <i :class="`${route.meta!.icon} mr-2`"></i>
            <span>{{ route.meta!.label }}</span>
          </RouterLink>
        </nav>
      </aside>

      <main class="flex-1 overflow-y-auto p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { sidebarRoutes } from '../router/index.ts'
</script>
