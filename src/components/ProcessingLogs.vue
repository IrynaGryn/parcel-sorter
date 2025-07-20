<template>
    <Panel class="mt-4">
      <template #header>
        <div class="header-flex">
          <span>Processing Logs</span>
          <Button label="Export Logs" icon="pi pi-download" @click="exportLogs" size="small" :disabled="logs.length === 0"/>
        </div>
      </template>
      <div v-if="logs.length === 0" class="text-gray-500 italic p-3 text-center">
        No logs yet. Upload a file to start processing.
      </div>
  
      <div v-else class="logs-container">
        <div
          v-for="(log, index) in logs.slice().reverse()"
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
  import Button from 'primevue/button'

  const { logs } = defineProps<{ logs: string[] }>()
  
  const getLogClass = (log: string) => {
    if (log.includes('[Processing]')) return 'log-processing'
    if (log.includes('[Reprocess]')) return 'log-reprocess'
    return 'log-deleted'
  }
  
  const getLogIcon = (log: string) => {
    if (log.includes('[Reprocess]')) return 'pi pi-shield'
    if (log.includes('[Processing]')) return 'pi pi-truck'
    return 'pi pi-exclamation-triangle'
  }

  const exportLogs = () => {
    const csvContent = logs.join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'logs.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
  
  .log-processing { background-color: #e0f7fa; color: #006064; }
  .log-reprocess { background-color: #e8f5e9; color: #2e7d32; }
  .log-deleted { background-color: #fbe9e7; color: #bf360c; }

   body.dark-mode .log-processing { background-color: #555; color: white }
   body.dark-mode .llog-reprocess { background-color: #555; color: white }
   body.dark-mode .log-deleted { background-color: #555; color: white }

   .header-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
}
  </style>
  