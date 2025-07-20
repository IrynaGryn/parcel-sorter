import { Department } from './BaseDepartment'
import type { Parcel } from '../../models/Parcel'

export class MailDepartment extends Department {
  // Processes parcels weighing up to 1kg.
  handle(parcel: Parcel, logs: string[]): void {
    if (parcel.weight <= 1) {
      parcel.department = parcel.requiresInsurance ? `Insurance & ${this.name}` : this.name
    } else {
      super.handle(parcel, logs)
    }
  }
}
