<template>
  <div class="min-h-screen flex items-center justify-center bg-white px-4">
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
    <div v-else class="w-full max-w-4xl">
      <div class="text-center space-y-12">
        <!-- Main Text -->
        <div class="px-8">
          <p class="text-3xl md:text-5xl lg:text-6xl font-light leading-relaxed text-gray-900">
            {{ seene.text }}
          </p>
        </div>

        <!-- Footer Actions -->
        <div class="flex justify-center gap-4 text-sm">
          <router-link
            to="/"
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-900 hover:text-gray-900 transition-colors"
          >
            Create your own
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isLoading = ref(true)
const error = ref(false)
const seene = ref(null)

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
