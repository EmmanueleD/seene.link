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
        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-2.5">Font</label>
          <Listbox v-model="selectedFont">
            <div class="relative">
              <ListboxButton
                class="relative w-full px-4 py-2.5 text-sm text-left bg-white border border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all cursor-pointer">
                <span class="block truncate" :style="{ fontFamily: selectedFont }">{{ selectedFont }}</span>
                <span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </ListboxButton>
              <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <ListboxOptions
                  class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto focus:outline-none">
                  <ListboxOption v-for="font in fonts" :key="font" :value="font" v-slot="{ active, selected }">
                    <li :class="[
                      active ? 'bg-gray-100' : '',
                      'relative cursor-pointer select-none py-3 px-4 text-sm transition-colors'
                    ]" :style="{ fontFamily: font }">
                      <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                        {{ font }}
                      </span>
                      <span v-if="selected" class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-900">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd" />
                        </svg>
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>

        <!-- Text Color -->
        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-2.5">Text Color</label>
          <div class="space-y-2">
            <!-- Color Presets -->
            <div class="flex gap-2">
              <button v-for="color in textColorPresets" :key="color" @click="textColor = color"
                class="w-8 h-8 rounded-lg border-2 transition-all hover:scale-110"
                :class="textColor === color ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2' : 'border-gray-200'"
                :style="{ backgroundColor: color }">
              </button>
              <!-- Custom Color Picker -->
              <div class="relative flex-1">
                <input v-model="textColor" type="color"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div
                  class="w-full h-8 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all cursor-pointer flex items-center justify-center"
                  :style="{ backgroundColor: textColor }">
                  <svg class="w-4 h-4" :style="{ color: getContrastColor(textColor) }" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="text-xs text-gray-500 text-center font-mono">{{ textColor }}</div>
          </div>
        </div>

        <!-- Background Gradient -->
        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-2.5">Background Gradient</label>
          <div class="space-y-2">
            <!-- Gradient Presets -->
            <div class="grid grid-cols-4 gap-2">
              <button v-for="preset in gradientPresets" :key="preset.name" @click="applyGradient(preset)"
                class="h-10 rounded-lg border-2 transition-all hover:scale-105"
                :class="gradientStart === preset.start && gradientEnd === preset.end ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-1' : 'border-gray-200'"
                :style="{ background: `linear-gradient(135deg, ${preset.start} 0%, ${preset.end} 100%)` }">
              </button>
            </div>
            <!-- Custom Gradient -->
            <div class="flex gap-2">
              <div class="flex-1 relative">
                <input v-model="gradientStart" type="color"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div
                  class="w-full h-10 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all cursor-pointer"
                  :style="{ backgroundColor: gradientStart }"></div>
              </div>
              <div class="flex-1 relative">
                <input v-model="gradientEnd" type="color"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div
                  class="w-full h-10 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all cursor-pointer"
                  :style="{ backgroundColor: gradientEnd }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Create Button -->
        <button @click="createSeene" :disabled="!text.trim() || isCreating"
          class="w-full py-3.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all text-sm shadow-lg hover:shadow-xl">
          {{ isCreating ? 'Creating...' : 'Create Seene' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'

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

// Font options
const fonts = ['Inter', 'Playfair Display', 'Space Mono', 'Crimson Text', 'Roboto Mono']

// Text color presets
const textColorPresets = ['#111827', '#ffffff', '#ef4444', '#3b82f6', '#10b981', '#f59e0b']

// Gradient presets
const gradientPresets = [
  { name: 'Default', start: '#ffffff', end: '#f3f4f6' },
  { name: 'Sunset', start: '#ff6b6b', end: '#feca57' },
  { name: 'Ocean', start: '#667eea', end: '#764ba2' },
  { name: 'Forest', start: '#134e5e', end: '#71b280' },
  { name: 'Rose', start: '#f093fb', end: '#f5576c' },
  { name: 'Night', start: '#0f2027', end: '#2c5364' },
  { name: 'Peach', start: '#ffecd2', end: '#fcb69f' },
  { name: 'Mint', start: '#d4fc79', end: '#96e6a1' }
]

// Apply gradient preset
const applyGradient = (preset) => {
  gradientStart.value = preset.start
  gradientEnd.value = preset.end
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
