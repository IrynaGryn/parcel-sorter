// xmlParser.ts - Parses XML string and converts it to Parcel objects.

// xmlParser.ts - Parses XML string and converts it to Parcel objects.
import type { Parcel } from '../models/Parcel'

export function parseParcelsFromXML(xmlString: string): Parcel[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlString, 'application/xml')
  const parcelElements = Array.from(doc.getElementsByTagName('Parcel'))

  return parcelElements.map(el => {
    const name = el.querySelector('Receipient > Name')?.textContent || ''
    const street = el.querySelector('Street')?.textContent || ''
    const houseNumber = el.querySelector('HouseNumber')?.textContent || ''
    const postalCode = el.querySelector('PostalCode')?.textContent || ''
    const city = el.querySelector('City')?.textContent || ''
    const weight = parseFloat(el.querySelector('Weight')?.textContent || '0')
    const value = parseFloat(el.querySelector('Value')?.textContent || '0')

    return {
      recipient: {
        name,
        address: { street, houseNumber, postalCode, city }
      },
      weight,
      value
    }
  })
}
