import { describe, it, expect } from 'vitest'
import { ParcelHandler } from '../logic/ParcelHandler'
import type { Parcel } from '../models/Parcel'

describe('ParcelHandler', () => {
  it('should process parcel with correct departments', () => {
    const parcel: Parcel = {
      recipient: {
        name: 'Test User',
        address: {
          street: 'Test Street',
          houseNumber: '1',
          postalCode: '0000AA',
          city: 'Test City'
        }
      },
      weight: 0.5,
      value: 1500
    }

    const handler = new ParcelHandler()
    const logs = handler.process([parcel])

    expect(logs).toContain('[Processing] Parcel for Test User requires insurance.')
    expect(parcel.department).toBe('Insurance & Mail')
  })
})
