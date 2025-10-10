<template>
  <div>
    <label class="block text-xs font-semibold text-gray-700 mb-2.5">Background Gradient</label>
    
    <!-- Preset Gradients -->
    <div class="grid grid-cols-3 gap-2 mb-3">
      <button
        v-for="preset in presetGradients"
        :key="preset.name"
        @click="selectGradient(preset)"
        class="w-full aspect-video rounded-lg border-2 transition-all hover:scale-105"
        :class="isCurrentGradient(preset) ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2' : 'border-gray-200 hover:border-gray-300'"
        :style="{ background: `linear-gradient(135deg, ${preset.start} 0%, ${preset.end} 100%)` }"
        :title="preset.name"
      ></button>
    </div>

    <!-- Custom Gradient Pickers -->
    <div class="flex gap-3">
      <div class="flex-1 relative">
        <input
          :value="startColor"
          @input="$emit('update:startColor', $event.target.value)"
          type="color"
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div 
          class="w-full h-12 rounded-xl border-2 border-gray-200 transition-all hover:border-gray-300 cursor-pointer"
          :style="{ backgroundColor: startColor }"
        ></div>
      </div>
      <div class="flex-1 relative">
        <input
          :value="endColor"
          @input="$emit('update:endColor', $event.target.value)"
          type="color"
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div 
          class="w-full h-12 rounded-xl border-2 border-gray-200 transition-all hover:border-gray-300 cursor-pointer"
          :style="{ backgroundColor: endColor }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  startColor: {
    type: String,
    required: true
  },
  endColor: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:startColor', 'update:endColor'])

const presetGradients = [
  { name: 'Default', start: '#ffffff', end: '#f3f4f6' },
  { name: 'Sunset', start: '#ff6b6b', end: '#feca57' },
  { name: 'Ocean', start: '#667eea', end: '#764ba2' },
  { name: 'Forest', start: '#134e5e', end: '#71b280' },
  { name: 'Candy', start: '#ff9a9e', end: '#fecfef' },
  { name: 'Night', start: '#0f2027', end: '#2c5364' },
  { name: 'Peach', start: '#ffecd2', end: '#fcb69f' },
  { name: 'Sky', start: '#a8edea', end: '#fed6e3' },
  { name: 'Fire', start: '#f12711', end: '#f5af19' }
]

const selectGradient = (preset) => {
  emit('update:startColor', preset.start)
  emit('update:endColor', preset.end)
}

const isCurrentGradient = (preset) => {
  return props.startColor.toLowerCase() === preset.start.toLowerCase() && 
         props.endColor.toLowerCase() === preset.end.toLowerCase()
}
</script>
