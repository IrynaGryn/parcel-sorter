<template>
  <div>
    <div class="flex justify-end">
      <Button 
      @click="toggleDarkMode"
      :icon="darkMode ? 'pi pi-sun' : 'pi pi-moon'" 
    />
    </div>
    <ParcelProcessor />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button';
import ParcelProcessor from './components/ParcelProcessor.vue'

const darkMode = ref(false)

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  document.body.classList.toggle('dark-mode')
}
</script>

<style>
.app-container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
