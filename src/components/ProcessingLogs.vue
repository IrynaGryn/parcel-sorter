<template>
    <Panel header="Processing Logs" class="mt-4">
      <div v-if="logs.length === 0" class="text-gray-500 italic p-3 text-center">
        No logs yet. Upload a file to start processing.
      </div>
  
      <div v-else class="logs-container">
        <div
          v-for="(log, index) in logs"
          :key="index"
          :class="['log-entry', getLogClass(log)]"
        >
          <i :class="getLogIcon(log)" class="mr-4"></i> {{ log }}
        </div>
      </div>
    </Panel>
  </template>
  
  <script setup lang="ts">
  import Panel from 'primevue/panel'
  defineProps<{ logs: string[] }>()
  
  const getLogClass = (log: string) => {
    if (log.includes('[Insurance]')) return 'log-insurance'
    if (log.includes('[Mail]')) return 'log-mail'
    if (log.includes('[Regular]')) return 'log-regular'
    if (log.includes('[Heavy]')) return 'log-heavy'
    return 'log-unhandled'
  }
  
  const getLogIcon = (log: string) => {
    if (log.includes('[Insurance]')) return 'pi pi-shield'
    if (log.includes('[Mail]')) return 'pi pi-envelope'
    if (log.includes('[Regular]')) return 'pi pi-box'
    if (log.includes('[Heavy]')) return 'pi pi-truck'
    return 'pi pi-exclamation-triangle'
  }
  </script>
  
  <script lang="ts">
  export default {}
  </script>
  
  <style scoped>
  .logs-container {
    max-height: 180px;
    overflow-y: auto;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #f9f9f9;
    padding: 12px;
  }
  
  .log-entry {
    padding: 8px 10px;
    border-radius: 4px;
    margin-bottom: 6px;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
  }
  
  .log-insurance { background-color: #e0f7fa; color: #006064; }
  .log-mail { background-color: #e8f5e9; color: #2e7d32; }
  .log-regular { background-color: #e3f2fd; color: #1565c0; }
  .log-heavy { background-color: #fce4ec; color: #880e4f; }
  .log-unhandled { background-color: #fbe9e7; color: #bf360c; }

   body.dark-mode .log-insurance { background-color: #555; color: white }
   body.dark-mode .log-mail { background-color: #555; color: white }
   body.dark-mode .log-regular { background-color: #555; color: white }
   body.dark-mode .log-heavy { background-color: #555; color: white }
   body.dark-mode .log-unhandled { background-color: #555; color: white }
  </style>
  