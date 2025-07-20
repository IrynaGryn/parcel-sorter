<template>
    <div>
        <DataTable
        :loading="loading"
        :value="filteredParcels"
        :paginator="true"
        :rows="5"
        showGridlines
        responsiveLayout="scroll"
        stripedRows
        v-model:filters="filters"
        filterDisplay="menu"
        :globalFilterFields="['recipient.name', 'recipient.address.city']"
        >

        <template #empty>
            <div class="text-center text-gray-500 italic p-3">
                No parcels yet. Upload a file to start processing.
            </div>
        </template>

        <template #header>
            <div class="flex justify-between items-center">
            <span class="text-lg font-semibold">Processed Parcels</span>
            <InputText v-model="globalFilter" placeholder="Search by name or city..." />
            </div>
        </template>
    
        <Column field="recipient.name" header="Recipient Name" sortable />
        <Column field="recipient.address.city" header="City" sortable />
        <Column field="weight" header="Weight (kg)" sortable />
        <Column field="value" header="Value (€)" sortable />
        <Column field="department" header="Department" sortable filter filterMatchMode="equals">
            <template #filter="{ filterModel, filterCallback }">
            <Select
                v-model="filterModel.value"
                :options="departmentOptions"
                optionLabel="label"
                optionValue="value"
                placeholder="Select Department"
                @change="filterCallback()"
                class="w-full"
                showClear
            />
            </template>
        </Column>
    
        <Column header="Actions">
            <template #body="{ data }">
            <Button icon="pi pi-trash" severity="danger" size="small" @click="() => emit('delete', data)" v-tooltip="'Delete'" />
            </template>
        </Column>
        </DataTable>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import InputText from 'primevue/inputtext'
  import Select from 'primevue/select'
  import Button from 'primevue/button'
  import { FilterMatchMode } from '@primevue/core/api'
  
  const props = defineProps<{ parcels: any[], loading: boolean }>()
  const emit = defineEmits<{ (e: 'delete', parcel: any): void }>()
  
  const globalFilter = ref('')
  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    department: { value: null, matchMode: FilterMatchMode.EQUALS },
  })
  
  const departmentOptions = [
    { label: 'Mail', value: 'Mail' },
    { label: 'Regular', value: 'Regular' },
    { label: 'Heavy', value: 'Heavy' },
    { label: 'Insurance', value: 'Insurance' },
    { label: 'Insurance & Mail', value: 'Insurance & Mail' },
    { label: 'Insurance & Regular', value: 'Insurance & Regular' },
    { label: 'Insurance & Heavy', value: 'Insurance & Heavy' },
  ]

  // Computed for global filtering
  const filteredParcels = computed(() => {
    if (!globalFilter.value) return props.parcels
    return props.parcels.filter(p =>
      p.recipient.name.toLowerCase().includes(globalFilter.value.toLowerCase()) ||
      p.recipient.address.city.toLowerCase().includes(globalFilter.value.toLowerCase())
    )
  })
  </script>
  
  <script lang="ts">
  export default {}
  </script>
  