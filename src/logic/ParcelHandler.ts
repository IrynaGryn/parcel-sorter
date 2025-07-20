import type { Parcel } from '../models/Parcel'
import { Department } from './departments/BaseDepartment'
import { InsuranceDepartment } from './departments/InsuranceDepartment'
import { MailDepartment } from './departments/MailDepartment'
import { RegularDepartment } from './departments/RegularDepartment'
import { HeavyDepartment } from './departments/HeavyDepartment'

export class ParcelHandler {
  private chain: Department

  constructor() {
    const insurance = new InsuranceDepartment('Insurance')
    insurance
      .setNext(new MailDepartment('Mail'))
      .setNext(new RegularDepartment('Regular'))
      .setNext(new HeavyDepartment('Heavy'))

    this.chain = insurance
  }

  // Processes all parcels and returns the logs.
  process(parcels: Parcel[]): string[] {
    const logs: string[] = []
    parcels.forEach(parcel => this.chain.handle(parcel, logs))
    return logs
  }
}
