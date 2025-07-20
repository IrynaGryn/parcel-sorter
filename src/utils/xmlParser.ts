import type { Parcel } from '../models/Parcel'

export function parseParcelsFromXML(xmlString: string): Parcel[] {
  // This built-in browser class allows you to parse XML/HTML strings into a document you can query.
  const parser = new DOMParser()
  // Turns the raw XML string into a structured DOM document.
  const doc = parser.parseFromString(xmlString, 'application/xml')
  // Grabs each parcel record from the XML.
  const parcelElements = Array.from(doc.getElementsByTagName('Parcel'))

  //Map each <Parcel> element to a Parcel object
  return parcelElements.map(el => {
    const name = el.querySelector('Receipient > Name')?.textContent || ''
    const street = el.querySelector('Street')?.textContent || ''
    const houseNumber = el.querySelector('HouseNumber')?.textContent || ''
    const postalCode = el.querySelector('PostalCode')?.textContent || ''
    const city = el.querySelector('City')?.textContent || ''
    const weight = parseFloat(el.querySelector('Weight')?.textContent || '0')
    const value = parseFloat(el.querySelector('Value')?.textContent || '0')

    // Return an array of Parcel objects
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
