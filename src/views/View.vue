<template>
  <div 
    class="min-h-screen flex items-center justify-center px-4"
    :style="backgroundStyle"
  >
    <!-- Loading State -->
    <div v-if="isLoading" class="text-center">
      <div class="text-gray-400 animate-pulse">Loading...</div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center space-y-6">
      <div class="space-y-2">
        <h1 class="text-6xl">404</h1>
        <p class="text-gray-600">Seene not found</p>
      </div>
      <router-link
        to="/"
        class="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
      >
        Create your own
      </router-link>
    </div>

    <!-- Content -->
    <div v-else class="relative w-full h-screen flex items-center justify-center">
      <!-- Main Text -->
      <div class="px-8 text-center">
        <p 
          class="text-3xl md:text-5xl lg:text-6xl font-light leading-relaxed whitespace-pre-wrap"
          :style="{ 
            fontFamily: seene.font || 'Inter',
            color: seene.text_color || '#111827'
          }"
        >
          {{ seene.text }}
        </p>
      </div>

      <!-- Hover Actions (Bottom Right) -->
      <div class="fixed bottom-8 right-8 flex flex-col gap-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <button
          @click="copyLink"
          class="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors shadow-lg"
        >
          {{ copied ? 'Copied!' : 'Copy Link' }}
        </button>
        <router-link
          to="/"
          class="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:border-gray-900 hover:text-gray-900 transition-colors text-center shadow-lg"
        >
          Create Your Own
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isLoading = ref(true)
const error = ref(false)
const seene = ref(null)
const copied = ref(false)

const backgroundStyle = computed(() => {
  if (!seene.value) return {}
  const start = seene.value.gradient_start || '#ffffff'
  const end = seene.value.gradient_end || '#f3f4f6'
  return {
    background: `linear-gradient(135deg, ${start} 0%, ${end} 100%)`
  }
})

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy:', error)
  }
}

onMounted(async () => {
  const id = route.params.id
  
  try {
    // Call API to get Seene
    const response = await fetch(`/api/get?id=${id}`)
    
    if (response.ok) {
      const data = await response.json()
      seene.value = data
    } else {
      error.value = true
    }
    
  } catch (err) {
    console.error('Error loading Seene:', err)
    error.value = true
  } finally {
    isLoading.value = false
  }
})
</script>
