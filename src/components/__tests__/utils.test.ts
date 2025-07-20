import { describe, it, expect } from 'vitest'
import {
  formatDate,
  formatDateTime,
  formatCurrency,
  formatNumber,
  formatPercentage,
  truncateText,
  capitalizeFirst,
  kebabCase,
  camelCase,
  isValidEmail,
  isValidPhone,
  isValidUrl,
  unique,
  groupBy,
  sortBy,
  omit,
  pick,
  debounce,
  generateId
} from '@/lib/utils'

describe('Date Utilities', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-15')
    const formatted = formatDate(date)
    expect(formatted).toMatch(/Jan 15, 2024/)
  })

  it('formats date time correctly', () => {
    const date = new Date('2024-01-15T14:30:00')
    const formatted = formatDateTime(date)
    expect(formatted).toMatch(/Jan 15, 2024/)
    expect(formatted).toMatch(/2:30/)
  })
})

describe('Number Utilities', () => {
  it('formats currency correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,235')
    expect(formatCurrency(1234.56, 'EUR')).toMatch(/€/)
  })

  it('formats numbers correctly', () => {
    expect(formatNumber(1234567)).toBe('1,234,567')
  })

  it('formats percentages correctly', () => {
    expect(formatPercentage(25)).toBe('25.0%')
    expect(formatPercentage(12.345)).toBe('12.3%')
  })
})

describe('String Utilities', () => {
  it('truncates text correctly', () => {
    expect(truncateText('Hello World', 5)).toBe('He...')
    expect(truncateText('Hello', 10)).toBe('Hello')
  })

  it('capitalizes first letter correctly', () => {
    expect(capitalizeFirst('hello world')).toBe('Hello world')
    expect(capitalizeFirst('HELLO')).toBe('Hello')
  })

  it('converts to kebab case correctly', () => {
    expect(kebabCase('Hello World')).toBe('hello-world')
    expect(kebabCase('camelCase')).toBe('camel-case')
  })

  it('converts to camel case correctly', () => {
    expect(camelCase('hello-world')).toBe('helloWorld')
    expect(camelCase('Hello World')).toBe('helloWorld')
  })
})

describe('Validation Utilities', () => {
  it('validates email correctly', () => {
    expect(isValidEmail('test@example.com')).toBe(true)
    expect(isValidEmail('invalid-email')).toBe(false)
    expect(isValidEmail('test@')).toBe(false)
  })

  it('validates phone correctly', () => {
    expect(isValidPhone('+1234567890')).toBe(true)
    expect(isValidPhone('123-456-7890')).toBe(true)
    expect(isValidPhone('123')).toBe(false)
  })

  it('validates URL correctly', () => {
    expect(isValidUrl('https://example.com')).toBe(true)
    expect(isValidUrl('http://test.org')).toBe(true)
    expect(isValidUrl('invalid-url')).toBe(false)
  })
})

describe('Array Utilities', () => {
  it('removes duplicates correctly', () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3])
    expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c'])
  })

  it('groups by key correctly', () => {
    const data = [
      { category: 'A', value: 1 },
      { category: 'B', value: 2 },
      { category: 'A', value: 3 }
    ]
    const grouped = groupBy(data, 'category')
    expect(grouped.A).toHaveLength(2)
    expect(grouped.B).toHaveLength(1)
  })

  it('sorts by key correctly', () => {
    const data = [
      { name: 'Charlie', age: 30 },
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 35 }
    ]
    const sorted = sortBy(data, 'age')
    expect(sorted[0].age).toBe(25)
    expect(sorted[2].age).toBe(35)
  })
})

describe('Object Utilities', () => {
  const testObject = { a: 1, b: 2, c: 3, d: 4 }

  it('omits keys correctly', () => {
    const result = omit(testObject, ['b', 'd'])
    expect(result).toEqual({ a: 1, c: 3 })
    expect(result).not.toHaveProperty('b')
    expect(result).not.toHaveProperty('d')
  })

  it('picks keys correctly', () => {
    const result = pick(testObject, ['a', 'c'])
    expect(result).toEqual({ a: 1, c: 3 })
    expect(result).not.toHaveProperty('b')
    expect(result).not.toHaveProperty('d')
  })
})

describe('Utility Functions', () => {
  it('generates random ID', () => {
    const id1 = generateId()
    const id2 = generateId()
    expect(id1).not.toBe(id2)
    expect(id1).toHaveLength(8)
  })

  it('debounces function calls', () => {
    return new Promise<void>((done) => {
    let callCount = 0
    const debouncedFn = debounce(() => {
      callCount++
    }, 100)

    debouncedFn()
    debouncedFn()
    debouncedFn()

      setTimeout(() => {
        expect(callCount).toBe(1)
        done()
      }, 150)
    })
  })
})