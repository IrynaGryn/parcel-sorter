<template>
    <div class="flex justify-end gap-2 mb-4">
      <Button label="Reset All" icon="pi pi-trash" severity="danger" @click="onReset" class="mr-4" :disabled="parcels.length === 0" />
      <Button label="Re-Process Parcels" icon="pi pi-refresh" severity="info" @click="onReprocess" />
    </div>
  </template>
  
  <script setup lang="ts">
  import Button from 'primevue/button'
  import { storeToRefs } from 'pinia'
  import { useParcelStore } from '../stores/parcelStore'
  
  const emit = defineEmits<{ (e: 'reset'): void; (e: 'reprocess'): void }>()
  const parcelStore = useParcelStore()
  const { parcels } = storeToRefs(parcelStore)
  
  const onReset = () => emit('reset')
  const onReprocess = () => emit('reprocess')
  </script>
  
  <script lang="ts">
  export default {}
  </script>
  