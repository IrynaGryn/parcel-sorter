import { Department } from './BaseDepartment'
import type { Parcel } from '../../models/Parcel'

export class InsuranceDepartment extends Department {
  // Checks parcel value and signs off if necessary.
  handle(parcel: Parcel, logs: string[]): void {
    if (parcel.value > 1000) {
      logs.push(`[${this.name}] Handling parcel to ${parcel.recipient.name}`)
      parcel.requiresInsurance = true
    }
    super.handle(parcel, logs)
  }
}
