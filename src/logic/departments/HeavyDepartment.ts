// HeavyDepartment.ts - Handles parcels weighing over 10kg.

import { Department } from './BaseDepartment'
import type { Parcel } from '../../models/Parcel'

export class HeavyDepartment extends Department {
  // Processes parcels weighing over 10kg.
  handle(parcel: Parcel, logs: string[]): void {
    if (parcel.weight > 10) {
        logs.push(`[${this.name}] Handling parcel to ${parcel.recipient.name}`)
        parcel.department = parcel.requiresInsurance ? `Insurance & ${this.name}` : this.name
      } else {
        super.handle(parcel, logs)
      }
  }
}
