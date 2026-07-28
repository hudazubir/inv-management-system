<script setup>
import { ArrowLeft, PackageSearch } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
</script>

<template>
  <main
    class="flex min-h-screen items-center justify-center bg-stone-100 p-6 text-center"
  >
    <section>
      <div
        class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400 text-stone-950"
      >
        <PackageSearch :size="30" />
      </div>

      <p class="mt-6 text-sm font-bold uppercase tracking-widest text-amber-700">
        Error 404
      </p>

      <h1 class="mt-2 text-4xl font-bold tracking-tight text-stone-900">
        Page not found
      </h1>

      <p class="mx-auto mt-3 max-w-md text-stone-500">
        The page you requested doesn’t exist or may have been moved.
      </p>

      <RouterLink
        :to="{ name: 'dashboard' }"
        class="mt-8 inline-flex items-center gap-2 rounded-xl bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
      >
        <ArrowLeft :size="18" />
        Return to dashboard
      </RouterLink>
    </section>
  </main>
</template>