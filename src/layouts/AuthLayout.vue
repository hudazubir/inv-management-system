<script setup>
import { RouterView } from 'vue-router'
import { Store } from 'lucide-vue-next'
</script>

<template>
  <div class="grid min-h-screen bg-stone-100 lg:grid-cols-2">
    <section
      class="hidden flex-col justify-between bg-stone-950 p-12 text-white lg:flex"
    >
      <div class="flex items-center gap-3">
        <div
          class="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400 text-stone-950"
        >
          <Store :size="23" />
        </div>

        <div>
          <p class="text-lg font-bold">Shelfwise</p>
          <p class="text-xs uppercase tracking-widest text-stone-500">
            Inventory
          </p>
        </div>
      </div>

      <div class="max-w-lg">
        <p class="text-sm font-semibold uppercase tracking-widest text-amber-400">
          Smarter inventory control
        </p>

        <h1 class="mt-4 text-4xl font-bold leading-tight">
          Keep every product, supplier, and stock movement under control.
        </h1>

        <p class="mt-5 text-stone-400">
          A focused inventory workspace designed for growing businesses.
        </p>
      </div>

      <p class="text-sm text-stone-600">
        © 2026 Shelfwise Inventory
      </p>
    </section>

    <main class="flex items-center justify-center p-6 sm:p-10">
      <div class="w-full max-w-md">
        <RouterView />
      </div>
    </main>
  </div>
</template>