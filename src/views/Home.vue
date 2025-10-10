<template>
  <div 
    class="relative min-h-screen flex items-center justify-center px-4 transition-all duration-300"
    :style="backgroundStyle"
  >
    <!-- Main Editable Text (Center) -->
    <div class="w-full max-w-4xl px-8 text-center">
      <textarea
        v-model="text"
        placeholder="Click to start writing..."
        class="w-full bg-transparent border-none outline-none resize-none text-center text-3xl md:text-5xl lg:text-6xl font-light leading-relaxed transition-all"
        :style="{ 
          fontFamily: selectedFont,
          color: textColor,
          minHeight: '200px'
        }"
        maxlength="500"
        @focus="showControls = true"
      ></textarea>
      
      <!-- Character Count (subtle) -->
      <div 
        v-if="text.length > 0"
        class="text-sm mt-4 transition-opacity"
        :style="{ color: textColor, opacity: 0.5 }"
      >
        {{ text.length }} / 500
      </div>
    </div>

    <!-- Controls Panel (Bottom Right - Hover) -->
    <div 
      class="fixed bottom-8 right-8 bg-white rounded-lg shadow-2xl p-6 space-y-4 w-80 transition-opacity duration-300"
      :class="showControls || createdUrl ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    >
      <!-- Close Button -->
      <button
        v-if="!createdUrl"
        @click="showControls = false"
        class="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
      >
        ×
      </button>

      <!-- Success Message -->
      <div v-if="createdUrl" class="space-y-4">
        <p class="text-sm text-gray-600 font-medium">Your Seene is ready!</p>
        <div class="flex gap-2">
          <input
            :value="createdUrl"
            readonly
            class="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded text-xs"
          />
          <button
            @click="copyLink"
            class="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors text-xs"
          >
            {{ copied ? '✓' : 'Copy' }}
          </button>
        </div>
        <div class="flex gap-2">
          <a
            :href="createdUrl"
            target="_blank"
            class="flex-1 text-center py-2 text-xs text-gray-600 hover:text-gray-900 transition-colors"
          >
            View →
          </a>
          <button
            @click="createAnother"
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:border-gray-900 transition-colors text-xs"
          >
            New Seene
          </button>
        </div>
      </div>

      <!-- Customization Options -->
      <div v-else class="space-y-4">
        <!-- Font Selector -->
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-2">Font</label>
          <select
            v-model="selectedFont"
            class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="Inter">Inter</option>
            <option value="Playfair Display">Playfair Display</option>
            <option value="Space Mono">Space Mono</option>
            <option value="Crimson Text">Crimson Text</option>
            <option value="Roboto Mono">Roboto Mono</option>
          </select>
        </div>

        <!-- Text Color -->
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-2">Text Color</label>
          <input
            v-model="textColor"
            type="color"
            class="w-full h-10 border border-gray-200 rounded-lg cursor-pointer"
          />
        </div>

        <!-- Background Gradient -->
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-2">Background</label>
          <div class="flex gap-2">
            <input
              v-model="gradientStart"
              type="color"
              class="w-1/2 h-10 border border-gray-200 rounded-lg cursor-pointer"
            />
            <input
              v-model="gradientEnd"
              type="color"
              class="w-1/2 h-10 border border-gray-200 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        <!-- Create Button -->
        <button
          @click="createSeene"
          :disabled="!text.trim() || isCreating"
          class="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
        >
          {{ isCreating ? 'Creating...' : 'Create Seene' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const text = ref('Write something beautiful.\n\nChange the font, colors, and style.\n\nThen click "Create Seene" to share it.')
const isCreating = ref(false)
const createdUrl = ref('')
const copied = ref(false)
const selectedFont = ref('Inter')
const textColor = ref('#111827')
const gradientStart = ref('#ffffff')
const gradientEnd = ref('#f3f4f6')
const showControls = ref(false)

const backgroundStyle = computed(() => {
  return {
    background: `linear-gradient(135deg, ${gradientStart.value} 0%, ${gradientEnd.value} 100%)`
  }
})

onMounted(() => {
  // Show controls after 2 seconds to guide the user
  setTimeout(() => {
    if (!createdUrl.value) {
      showControls.value = true
    }
  }, 2000)
})

const createSeene = async () => {
  if (!text.value.trim()) return

  isCreating.value = true
  
  try {
    // Call API to create Seene
    const response = await fetch('/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text.value.trim(),
        font: selectedFont.value,
        text_color: textColor.value,
        gradient_start: gradientStart.value,
        gradient_end: gradientEnd.value
      })
    })

    if (!response.ok) {
      throw new Error('Failed to create Seene')
    }

    const data = await response.json()
    createdUrl.value = data.url
    
  } catch (error) {
    console.error('Error creating Seene:', error)
    alert('Failed to create Seene. Please try again.')
  } finally {
    isCreating.value = false
  }
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(createdUrl.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy:', error)
  }
}

const createAnother = () => {
  text.value = 'Write something beautiful.\n\nChange the font, colors, and style.\n\nThen click "Create Seene" to share it.'
  createdUrl.value = ''
  copied.value = false
  selectedFont.value = 'Inter'
  textColor.value = '#111827'
  gradientStart.value = '#ffffff'
  gradientEnd.value = '#f3f4f6'
  showControls.value = false
  setTimeout(() => {
    showControls.value = true
  }, 500)
}
</script>
