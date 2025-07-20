<template>
  <div>
    <h1>📦 Parcel Sorting System</h1>

    <div class="mb-4 flex justify-between">
      <FileUpload
        mode="basic"
        accept=".xml"
        chooseLabel="Upload XML File"
        @select="onFileSelect"
        class="w-full mb-4"
      />

      <ParcelActions @reset="onReset" @reprocess="onReprocess" />
    </div>

    <ParcelTable
      :key="tableKey"
      :parcels="parcelStore.parcels"
      @delete="onDeleteParcel"
      :loading="loading"
    />

    <ProcessingLogs :logs="parcelStore.logs" />

    <ConfirmDialog />
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { parseParcelsFromXML } from '../utils/xmlParser'
import { ParcelHandler } from '../logic/ParcelHandler'
import { useParcelStore } from '../stores/parcelStore'
import FileUpload from 'primevue/fileupload'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'

import ParcelActions from './ParcelActions.vue'
import ParcelTable from './ParcelTable.vue'
import ProcessingLogs from './ProcessingLogs.vue'

const parcelStore = useParcelStore()
const confirm = useConfirm()
const toast = useToast()
const loading = ref(false)
const tableKey = ref(0)

// Handles XML file upload and parsing
const onFileSelect = (event: any) => {
  loading.value = true
  const file = event.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    const xmlString = e.target?.result as string
    const parcels = parseParcelsFromXML(xmlString)
    const handler = new ParcelHandler()
    const logs = handler.process(parcels)

    parcelStore.setParcels(parcels)
    parcelStore.setLogs(logs)
    parcelStore.setOriginalXml(xmlString)
    tableKey.value++

    loading.value = false
    toast.add({ severity: 'success', summary: 'Success', detail: 'Parcels processed!', life: 3000 })
  }
  reader.readAsText(file)
}

// Delete single parcel and related logs
const onDeleteParcel = (parcel: any) => {
  confirm.require({
    message: `Are you sure you want to delete parcel for ${parcel.recipient.name}?`,
    header: 'Confirm Deletion',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      parcelStore.parcels = parcelStore.parcels.filter((p: any) => p !== parcel)
      parcelStore.logs = parcelStore.logs.filter((log: string) => !log.includes(parcel.recipient.name))
      parcelStore.logs.push(`[Delete] Parcel for ${parcel.recipient.name} has been deleted`)
      toast.add({ severity: 'warn', summary: 'Deleted', detail: 'Parcel deleted', life: 3000 })
    }
  })
}

// Reset all parcels and logs
const onReset = () => {
  confirm.require({
    message: 'Are you sure you want to reset all data?',
    header: 'Confirm Reset',
    icon: 'pi pi-info-circle',
    accept: () => {
      parcelStore.clear()
      tableKey.value++
      parcelStore.logs.push(`[Reset] All parcels and logs have been cleared`)
      toast.add({ severity: 'info', summary: 'Reset', detail: 'All data cleared', life: 3000 })
    }
  })
}

// Reprocess all parcels through handler
const onReprocess = () => {
  if (!parcelStore.originalXml) {
    toast.add({ severity: 'warn', summary: 'No file', detail: 'Please upload a file first', life: 3000 })
    return
  }

  const parcels = parseParcelsFromXML(parcelStore.originalXml)
  const handler = new ParcelHandler()
  const logs = handler.process(parcels)
  parcelStore.setParcels(parcels)
  parcelStore.setLogs(logs)
  parcelStore.logs.push(`[Reprocess] Parcels reprocessed at ${new Date().toLocaleTimeString()}`)
  toast.add({ severity: 'success', summary: 'Reprocessed', detail: 'Parcels reprocessed', life: 3000 })
}
</script>

<script lang="ts">
export default {}
</script>
