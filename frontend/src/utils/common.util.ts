import { Moment } from 'moment'

export const formatBytes = (bytes: number): { value: number; formattedValue: string } => {
  if (bytes < 1024) {
    return { value: bytes, formattedValue: `${bytes} Bytes` }
  }
  if (bytes < 1024 ** 2) {
    const value = bytes / 1024
    return { value, formattedValue: `${value.toFixed(2)} KB` }
  }
  const value = bytes / 1024 ** 2
  return { value, formattedValue: `${value.toFixed(2)} MB` }
}

export const isAppleDevice = () => {
  if (typeof window === 'undefined') return false
  // @ts-expect-error
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  return /iPhone|iPad|iPod|Macintosh/i.test(userAgent)
}

export const validateDate = (date: Moment | null): boolean => {
  if (!date) return false
  if (!date.isValid()) return false

  const year = date.year()
  if (year < 1900 || year > 2100) return false

  return true
}
