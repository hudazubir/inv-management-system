<script setup>
import { onBeforeUnmount, watch } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'lg',
  },
})

const emit = defineEmits(['close'])

const sizeClasses = {
  sm: 'max-w-md',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

function close() {
  emit('close')
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    close()
  }
}

watch(
  () => props.open,
  (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    if (isOpen) {
      window.addEventListener('keydown', handleKeydown)
    } else {
      window.removeEventListener('keydown', handleKeydown)
    }
  },
)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      :aria-label="title"
    >
      <div
        class="absolute inset-0 bg-stone-950/60 backdrop-blur-sm"
        @click="close"
      ></div>

      <section
        class="relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        :class="sizeClasses[size]"
      >
        <header
          class="flex items-start justify-between border-b border-stone-200 px-6 py-5"
        >
          <div>
            <h2 class="text-xl font-bold text-stone-900">{{ title }}</h2>

            <p v-if="description" class="mt-1 text-sm text-stone-500">
              {{ description }}
            </p>
          </div>

          <button
            type="button"
            class="rounded-lg p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
            aria-label="Close modal"
            @click="close"
          >
            <X :size="20" />
          </button>
        </header>

        <div class="overflow-y-auto p-6">
          <slot />
        </div>

        <footer
          v-if="$slots.footer"
          class="border-t border-stone-200 bg-stone-50 px-6 py-4"
        >
          <slot name="footer" />
        </footer>
      </section>
    </div>
  </Teleport>
</template>