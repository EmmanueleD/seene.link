<template>
  <div class="min-h-screen flex items-center justify-center bg-white px-4">
    <div class="w-full max-w-2xl">
      <!-- Logo/Title -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-light text-gray-900 mb-2">seene.link</h1>
        <p class="text-gray-500 text-sm">Share your words with a single link</p>
      </div>

      <!-- Main Form -->
      <div class="space-y-6">
        <!-- Textarea -->
        <div>
          <textarea
            v-model="text"
            placeholder="Write something..."
            class="w-full h-48 px-6 py-4 text-lg border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
            maxlength="500"
          ></textarea>
          <div class="text-right text-sm text-gray-400 mt-2">
            {{ text.length }} / 500
          </div>
        </div>

        <!-- Create Button -->
        <button
          @click="createSeene"
          :disabled="!text.trim() || isCreating"
          class="w-full py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {{ isCreating ? 'Creating...' : 'Create Seene' }}
        </button>

        <!-- Success Message -->
        <div v-if="createdUrl" class="p-6 bg-gray-50 rounded-lg space-y-4 animate-fade-in">
          <p class="text-sm text-gray-600">Your Seene is ready!</p>
          <div class="flex gap-2">
            <input
              :value="createdUrl"
              readonly
              class="flex-1 px-4 py-2 bg-white border border-gray-200 rounded text-sm"
            />
            <button
              @click="copyLink"
              class="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors text-sm"
            >
              {{ copied ? 'Copied!' : 'Copy' }}
            </button>
          </div>
          <div class="flex gap-2">
            <a
              :href="createdUrl"
              target="_blank"
              class="flex-1 text-center py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              View your Seene →
            </a>
            <button
              @click="createAnother"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:border-gray-900 hover:text-gray-900 transition-colors text-sm"
            >
              Create Another
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const text = ref('')
const isCreating = ref(false)
const createdUrl = ref('')
const copied = ref(false)

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
        text: text.value.trim()
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
  text.value = ''
  createdUrl.value = ''
  copied.value = false
}
</script>
