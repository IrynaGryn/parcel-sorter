import { Department } from './BaseDepartment'
import type { Parcel } from '../../models/Parcel'

export class InsuranceDepartment extends Department {
  // Checks parcel value and signs off if necessary.
  handle(parcel: Parcel, logs: string[]): void {
    if (parcel.value > 1000) {
      logs.push(`[Processing] Parcel for ${parcel.recipient.name} requires insurance.`)
      parcel.requiresInsurance = true
    }
    super.handle(parcel, logs)
  }
}
