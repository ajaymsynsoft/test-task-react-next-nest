import { ChipProps } from '@mui/material'

export const formatToTitleCase = (value: string) => {
  value = String(value || '')
  value = value
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
  value = value.toLowerCase()
  value = value.replace(/(^|\s)\w/g, (match) => match.toUpperCase())
  return value
}

type Color = ChipProps['color']

export const getStatusColor = (status: string): Color => {
  status = String(status)

  const color: Record<string, Color> = {
    inactive: 'default',
    draft: 'default',
    active: 'success',
    paid: 'success',
    completed: 'success',
    profileCompleted: 'success',
    booked: 'success',
    approved: 'success',
    closed: 'success',
    verified: 'success',
    issued: 'success',
    partiallyPaid: 'secondary',
    pending: 'warning',
    notVerified: 'warning',
    open: 'warning',
    unpaid: 'warning',
    cancel: 'error',
    incomplete: 'warning',
    profileIncomplete: 'warning',
    rejected: 'error',
    cancelled: 'error',
    reject: 'error',
    expired: 'error',
    failed: 'error',
    creditOut: 'error',
    creditIn: 'success',
  }

  return color[status] || 'default'
}

export const removeSpace = (value: string) => value.replaceAll(' ', '')

export const attrDoubleQuoteToSingle = (value: string) => {
  return value
    .split('="')
    .map((item, index) => {
      if (index === 0) return item
      const attrEndDoubleQuoteIndex = item.indexOf('"')
      let temArray = item.split('')
      temArray[attrEndDoubleQuoteIndex] = "'"
      item = temArray.join('')
      return item
    })
    .join(`='`)
}

export const htmlToText = (html: string): string => {
  const tempElement = document.createElement('div')
  tempElement.innerHTML = html
  return (tempElement.textContent || tempElement.innerText || '').trim()
}
