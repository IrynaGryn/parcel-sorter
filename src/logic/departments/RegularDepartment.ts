import { Department } from './BaseDepartment'
import type { Parcel } from '../../models/Parcel'

export class RegularDepartment extends Department {
  // Processes parcels weighing >1kg and <=10kg.
  handle(parcel: Parcel, logs: string[]): void {
    if (parcel.weight > 1 && parcel.weight <= 10) {
      parcel.department = parcel.requiresInsurance ? `Insurance & ${this.name}` : this.name
    } else {
      super.handle(parcel, logs)
    }
  }
}
