import { describe, it, expect } from 'vitest'
import { parseParcelsFromXML } from '../utils/xmlParser'

describe('XML Parser Edge Cases', () => {
  it('should return empty array for empty XML', () => {
    expect(parseParcelsFromXML('')).toEqual([])
  })

  it('should handle invalid XML gracefully', () => {
    expect(parseParcelsFromXML('<invalid')).toEqual([])
  })
})
