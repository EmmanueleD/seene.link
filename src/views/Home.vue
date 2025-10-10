<template>
  <div class="relative min-h-screen flex items-center justify-center px-4 transition-all duration-300"
    :style="backgroundStyle">
    <!-- Main Editable Text (Center) -->
    <div class="w-full max-w-5xl px-8 text-center">
      <textarea v-model="text" placeholder="Click to start writing..."
        class="w-full bg-transparent border-none outline-none resize-none text-center text-3xl md:text-5xl lg:text-6xl font-light leading-relaxed transition-all"
        :style="{
          fontFamily: selectedFont,
          color: textColor,
          overflow: 'hidden'
        }" maxlength="500" @focus="showControls = true" @input="autoResize" ref="textareaRef"></textarea>

      <!-- Character Count (subtle) -->
      <div v-if="text.length > 0" class="text-sm mt-4 transition-opacity" :style="{ color: textColor, opacity: 0.5 }">
        {{ text.length }} / 500
      </div>
    </div>

    <!-- Controls Panel (Bottom Right - Hover) -->
    <div
      class="fixed bottom-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 space-y-5 w-80 transition-all duration-300 border border-gray-100"
      :class="showControls || createdUrl ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'">
      <!-- Close Button -->
      <button v-if="!createdUrl" @click="showControls = false"
        class="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Success Message -->
      <div v-if="createdUrl" class="space-y-4">
        <p class="text-sm text-gray-600 font-medium">Your Seene is ready!</p>
        <div class="flex gap-2">
          <input :value="createdUrl" readonly
            class="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded text-xs" />
          <button @click="copyLink"
            class="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors text-xs">
            {{ copied ? '✓' : 'Copy' }}
          </button>
        </div>
        <div class="flex gap-2">
          <a :href="createdUrl" target="_blank"
            class="flex-1 text-center py-2 text-xs text-gray-600 hover:text-gray-900 transition-colors">
            View →
          </a>
          <button @click="createAnother"
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:border-gray-900 transition-colors text-xs">
            New Seene
          </button>
        </div>
      </div>

      <!-- Customization Options -->
      <div v-else class="space-y-5">
        <!-- Font Selector -->
        <FontSelector v-model="selectedFont" />

        <!-- Text Color -->
        <ColorPicker 
          v-model="textColor" 
          label="Text Color"
          :preset-colors="['#000000', '#FFFFFF', '#111827', '#6B7280', '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#F3F4F6', '#1F2937']"
        />

        <!-- Background Gradient -->
        <GradientPicker 
          :start-color="gradientStart"
          :end-color="gradientEnd"
          @update:start-color="gradientStart = $event"
          @update:end-color="gradientEnd = $event"
        />

        <!-- Create Button -->
        <button @click="createSeene" :disabled="!text.trim() || isCreating"
          class="w-full py-3.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all text-sm shadow-lg hover:shadow-xl active:scale-95">
          {{ isCreating ? 'Creating...' : 'Create Seene' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import FontSelector from '../components/FontSelector.vue'
import ColorPicker from '../components/ColorPicker.vue'
import GradientPicker from '../components/GradientPicker.vue'

const text = ref('Write something beautiful.\n\nChange the font, colors, and style.\n\n Share your Seene!')
const isCreating = ref(false)
const createdUrl = ref('')
const copied = ref(false)
const selectedFont = ref('Inter')
const textColor = ref('#111827')
const gradientStart = ref('#ffffff')
const gradientEnd = ref('#f3f4f6')
const showControls = ref(false)
const textareaRef = ref(null)

// Auto-resize textarea
const autoResize = () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
    const newHeight = Math.min(textareaRef.value.scrollHeight, window.innerHeight * 0.8)
    textareaRef.value.style.height = newHeight + 'px'
  }
}

const backgroundStyle = computed(() => {
  return {
    background: `linear-gradient(135deg, ${gradientStart.value} 0%, ${gradientEnd.value} 100%)`
  }
})

onMounted(() => {
  // Set initial height
  autoResize()
  
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
  text.value = 'Write something beautiful.\n\nChange the font, colors, and style.\n\n Share your Seene!'
  createdUrl.value = ''
  copied.value = false
  selectedFont.value = 'Inter'
  textColor.value = '#111827'
  gradientStart.value = '#ffffff'
  gradientEnd.value = '#f3f4f6'
  showControls.value = false
  setTimeout(() => {
    autoResize()
    showControls.value = true
  }, 500)
}
</script>
