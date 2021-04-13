import { checkValidDateStr, toISO8061 } from './dateHelpers'

describe('checkValidDateStr funciton', () => {
  it('should return true if given date string is in YYYY/MM/DD format', () => {
    expect(checkValidDateStr('1920-10-04')).toBe(true)
  })

  it('should return false if given string is not YYYY/MM/DD format', () => {
    expect(checkValidDateStr('something-other-else')).toBe(false)
  })
})

describe('toISO8061 function', () => {
  it('should return string in YYYY/MM/DD format if date object given', () => {
    const einsteinsBirthday = new Date('March 14, 1879 11:30:00')
    expect(toISO8061(einsteinsBirthday)).toBe('1879-03-14')
  })

  it('should return the input if input format YYYY-MM-DD', () => {
    expect(toISO8061('1980-01-01')).toBe('1980-01-01')
  })

  it('should throw expection if format of input string different than', () => {
    expect(() => toISO8061('worst-date-ever')).toThrowError(/Invalid date/)
  })
})