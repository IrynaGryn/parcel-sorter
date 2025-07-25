import { defineStore } from 'pinia'
import type { Parcel } from '../models/Parcel'

export const useParcelStore = defineStore('parcelStore', {
  state: () => ({
    parcels: [] as Parcel[],
    logs: [] as string[],
    originalXml: '' as string,
  }),
  actions: {
    // Saves parcels into the store.
    setParcels(parcels: Parcel[]) {
      this.parcels = parcels
    },
    // Saves logs into the store.
    setLogs(logs: string[]) {
      this.logs = logs
    },
    // Saves original XML into the store.
    setOriginalXml(xml: string) {
      this.originalXml = xml
    },
    // Clears parcels and logs.
    clear() {
      this.parcels = []
      this.logs = []
    }
  }
})
