<template>
  <div class="relative" ref="dropdownRef">
    <label class="block text-xs font-semibold text-gray-700 mb-2.5">Font</label>
    
    <!-- Selected Font Display -->
    <button
      @click="isOpen = !isOpen"
      class="w-full px-4 py-3 text-left border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-all bg-white hover:border-gray-300 flex items-center justify-between group"
    >
      <span class="text-sm font-medium" :style="{ fontFamily: modelValue }">
        {{ modelValue }}
      </span>
      <svg 
        class="w-4 h-4 text-gray-400 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-if="isOpen"
        class="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden"
      >
        <button
          v-for="font in fonts"
          :key="font"
          @click="selectFont(font)"
          class="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between group"
          :class="{ 'bg-gray-100': modelValue === font }"
        >
          <span class="text-sm font-medium" :style="{ fontFamily: font }">
            {{ font }}
          </span>
          <svg 
            v-if="modelValue === font"
            class="w-4 h-4 text-gray-900" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const fonts = [
  'Inter',
  'Playfair Display',
  'Space Mono',
  'Crimson Text',
  'Roboto Mono'
]

const isOpen = ref(false)
const dropdownRef = ref(null)

const selectFont = (font) => {
  emit('update:modelValue', font)
  isOpen.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
