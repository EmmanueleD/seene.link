<template>
  <div>
    <label class="block text-xs font-semibold text-gray-700 mb-2.5">{{ label }}</label>
    
    <!-- Preset Colors -->
    <div class="grid grid-cols-6 gap-2 mb-3">
      <button
        v-for="color in presetColors"
        :key="color"
        @click="selectColor(color)"
        class="w-full aspect-square rounded-lg border-2 transition-all hover:scale-110"
        :class="modelValue === color ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2' : 'border-gray-200 hover:border-gray-300'"
        :style="{ backgroundColor: color }"
        :title="color"
      ></button>
    </div>

    <!-- Custom Color Picker -->
    <div class="relative">
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        type="color"
        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div 
        class="w-full h-12 rounded-xl border-2 border-gray-200 transition-all hover:border-gray-300 cursor-pointer flex items-center justify-between px-4 bg-white"
      >
        <div class="flex items-center gap-3">
          <div 
            class="w-6 h-6 rounded-md border border-gray-300"
            :style="{ backgroundColor: modelValue }"
          ></div>
          <span class="text-xs font-mono font-medium text-gray-700">
            {{ modelValue }}
          </span>
        </div>
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  presetColors: {
    type: Array,
    default: () => [
      '#000000', '#FFFFFF', '#EF4444', '#F59E0B', '#10B981', '#3B82F6',
      '#8B5CF6', '#EC4899', '#6B7280', '#F3F4F6', '#FEE2E2', '#FEF3C7'
    ]
  }
})

const emit = defineEmits(['update:modelValue'])

const selectColor = (color) => {
  emit('update:modelValue', color)
}
</script>
