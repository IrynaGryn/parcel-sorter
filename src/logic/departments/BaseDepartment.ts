// BaseDepartment.ts - Abstract base class for departments
// Implements the Chain of Responsibility pattern.

import type { Parcel } from '../../models/Parcel'

export abstract class Department {
  protected next?: Department

  constructor(public name: string) {}

  // Links the next department in the chain.
  setNext(next: Department): Department {
    this.next = next
    return next
  }

  // Processes the parcel or passes it to the next department.
  handle(parcel: Parcel, logs: string[]): void {
    if (this.next) {
      this.next.handle(parcel, logs)
    } else {
      logs.push(`[UNHANDLED] Parcel to ${parcel.recipient.name}`)
    }
  }
}
