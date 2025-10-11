<template>
  <div class="relative min-h-screen flex items-center justify-center px-4 transition-all duration-300 cursor-pointer"
    :style="backgroundStyle" @click="toggleControls">
    <!-- Main Editable Text (Center) -->
    <div class="w-full max-w-5xl px-8 text-center">
      <textarea v-model="text" placeholder="Click to start writing..."
        aria-label="Enter your text to create a Seene"
        class="w-full bg-transparent border-none outline-none resize-none text-center text-3xl md:text-5xl lg:text-6xl font-light leading-relaxed transition-all cursor-text"
        :style="{
          fontFamily: selectedFont,
          color: textColor,
          overflow: 'hidden'
        }" maxlength="500" @input="autoResize" @click.stop ref="textareaRef"></textarea>

      <!-- Character Count (subtle) -->
      <div v-if="text.length > 0" class="text-sm mt-4 transition-opacity" :style="{ color: textColor, opacity: 0.5 }">
        {{ text.length }} / 500
      </div>
    </div>

    <!-- Controls Panel (Bottom Right) -->
    <div
      class="fixed bottom-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 space-y-5 w-80 transition-all duration-300 border border-gray-100"
      :class="showControls || createdUrl ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'"
      @click.stop>
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
          <input type="color" v-model="textColor"
            aria-label="Select text color"
            class="w-16 h-10 rounded-lg cursor-pointer border-2 border-gray-200">
          <button @click="copyLink"
            :aria-label="copied ? 'Link copied' : 'Copy link to clipboard'"
            class="w-full bg-gray-100 text-gray-900 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all">
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
        <div>
          <div class="flex items-center justify-between mb-2.5">
            <label class="block text-xs font-semibold text-gray-700">Font</label>
          </div>
          <select v-model="selectedFont" @change="onFontChange"
            aria-label="Select font"
            class="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white transition-all">
            <option value="Judson">Judson</option>
            <option value="Inter">Inter</option>
            <option value="Playfair Display">Playfair Display</option>
            <option value="Space Mono">Space Mono</option>
            <option value="Crimson Text">Crimson Text</option>
            <option value="Roboto Mono">Roboto Mono</option>
            <option value="__custom__">Custom...</option>
          </select>

          <!-- Custom Font Input -->
          <div v-if="showCustomFontInput" class="mt-3 space-y-2">
            <input
              v-model="customFontName"
              type="text"
              placeholder="Enter Google Font name (e.g. Lora)"
              aria-label="Enter custom Google Font name"
              class="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              @input="loadCustomFont"
            />
            <p class="text-xs text-gray-500">
              Find fonts at <a href="https://fonts.google.com" target="_blank"
                class="underline hover:text-gray-900">fonts.google.com</a>
            </p>
          </div>
        </div>

        <!-- Text Color -->
        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-2.5">Text Color</label>
          <div class="relative">
            <input v-model="textColor" type="color" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <div
              class="w-full h-12 rounded-xl border-2 border-gray-200 transition-all hover:border-gray-300 cursor-pointer flex items-center justify-between px-4"
              :style="{ backgroundColor: textColor }">
              <span class="text-xs font-mono font-medium" :style="{ color: getContrastColor(textColor) }">
                {{ textColor }}
              </span>
              <svg class="w-4 h-4" :style="{ color: getContrastColor(textColor) }" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Background Gradient -->
        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-2.5">Background Gradient</label>
          <div class="flex gap-3">
            <div class="flex-1 relative">
              <input type="color" v-model="gradientStart"
                aria-label="Select gradient start color"
                class="w-16 h-10 rounded-lg cursor-pointer border-2 border-gray-200">
              <div
                class="w-full h-12 rounded-xl border-2 border-gray-200 transition-all hover:border-gray-300 cursor-pointer"
                :style="{ backgroundColor: gradientStart }"></div>
            </div>
            <div class="flex-1 relative">
              <input type="color" v-model="gradientEnd"
                aria-label="Select gradient end color"
                class="w-16 h-10 rounded-lg cursor-pointer border-2 border-gray-200">
              <div
                class="w-full h-12 rounded-xl border-2 border-gray-200 transition-all hover:border-gray-300 cursor-pointer"
                :style="{ backgroundColor: gradientEnd }"></div>
            </div>
          </div>
        </div>

        <!-- Create Button -->
        <button @click="createSeene" :disabled="!text.trim() || isCreating"
          aria-label="Create Seene"
          class="w-full bg-gray-900 text-white py-3.5 rounded-xl font-medium hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl">
          {{ isCreating ? 'Creating...' : 'Create Seene' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const text = ref('Write something beautiful.\n\nChange the font, colors, and style.\n\n Share your Seene!')
const isCreating = ref(false)
const createdUrl = ref('')
const copied = ref(false)
const selectedFont = ref('Judson')
const customFontName = ref('')
const showCustomFontInput = ref(false)
const textColor = ref('#111827')
const gradientStart = ref('#ffffff')
const gradientEnd = ref('#f3f4f6')
const showControls = ref(false)
const textareaRef = ref(null)

// Toggle controls visibility
const toggleControls = () => {
  showControls.value = !showControls.value
}

// Handle font change
const onFontChange = () => {
  if (selectedFont.value === '__custom__') {
    showCustomFontInput.value = true
  } else {
    showCustomFontInput.value = false
    customFontName.value = ''
  }
}

// Load custom Google Font dynamically
const loadCustomFont = () => {
  if (!customFontName.value.trim()) return

  const fontName = customFontName.value.trim()
  const fontId = `custom-font-${fontName.replace(/\s+/g, '-')}`

  // Remove existing custom font link if any
  const existingLink = document.getElementById(fontId)
  if (existingLink) {
    existingLink.remove()
  }

  // Create new link element for Google Font
  const link = document.createElement('link')
  link.id = fontId
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}:wght@300;400;500&display=swap`
  document.head.appendChild(link)

  // Update selected font to use custom font
  selectedFont.value = fontName
}

// Helper function to get contrast color for text
const getContrastColor = (hexColor) => {
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128 ? '#000000' : '#FFFFFF'
}

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
  selectedFont.value = 'Judson'
  customFontName.value = ''
  showCustomFontInput.value = false
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
