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
    <div 
      v-else 
      class="relative w-full min-h-screen flex items-center justify-center cursor-pointer py-20"
      @click="toggleControls"
      @touchend.prevent="toggleControls"
    >
      <!-- Main Text -->
      <div class="px-8 text-center pointer-events-none">
        <p 
          class="text-3xl md:text-5xl lg:text-6xl font-light leading-relaxed whitespace-pre-wrap"
          :style="{ 
            fontFamily: seene.font || 'Judson',
            color: seene.text_color || '#111827'
          }"
        >
          {{ seene.text }}
        </p>
      </div>

      <!-- Actions (Bottom Right) -->
      <div 
        class="fixed bottom-8 right-8 flex flex-col gap-2 transition-all duration-300 pointer-events-auto"
        :class="showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'"
        @click.stop
      >
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
const showControls = ref(false)

const toggleControls = () => {
  showControls.value = !showControls.value
}

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

// Load custom Google Font if needed
const loadCustomFont = (fontName) => {
  // Check if it's one of the default fonts (already loaded)
  const defaultFonts = ['Judson', 'Inter', 'Playfair Display', 'Space Mono', 'Crimson Text', 'Roboto Mono']
  if (defaultFonts.includes(fontName)) return
  
  const fontId = `custom-font-${fontName.replace(/\s+/g, '-')}`
  
  // Check if font is already loaded
  if (document.getElementById(fontId)) return
  
  // Create new link element for Google Font
  const link = document.createElement('link')
  link.id = fontId
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}:wght@300;400;500&display=swap`
  document.head.appendChild(link)
}

onMounted(async () => {
  const id = route.params.id
  
  try {
    // Call API to get Seene
    const response = await fetch(`/api/get?id=${id}`)
    
    if (response.ok) {
      const data = await response.json()
      seene.value = data
      
      // Load custom font if needed
      if (data.font) {
        loadCustomFont(data.font)
      }
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
