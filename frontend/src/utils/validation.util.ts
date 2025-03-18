import { TestConfig } from 'yup'
import { htmlToText } from './string.util'

export const stringTest: TestConfig<string | null | undefined> = {
  name: 'validate',
  test: (value) => (value ? /[a-zA-Z]/.test(value) : true),
  message: 'Enter valid value',
}

export const onlyNumberTest: TestConfig<string | number | undefined | null> = {
  name: 'validate',
  test: (value) => (value ? /^[0-9]+$/.test(String(value)) : true),
  message: 'Enter valid value',
}

export const emailTest: TestConfig<string | undefined | null> = {
  name: 'validate',
  test: (value) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return value ? emailRegex.test(value) : true
  },
  message: 'Enter valid email',
}

export const passwordTest: TestConfig<string> = {
  name: 'validate',
  test: (value) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{6,}$/
    return value ? passwordRegex.test(value) : true
  },
  message: 'It must have at least 6 characters, 1 uppercase, 1 digit and 1 special character.',
}

type TFileTestParams = {
  size?: number
  extensions?: string[]
  required?: boolean
  message?: { extensions?: string; size?: string; required?: string }
}

export const fileTest = ({ size, extensions = [], required, message }: TFileTestParams): TestConfig<string | File | undefined> => ({
  name: 'validate',
  test(value, ctx) {
    // Required
    if (required && !value) return ctx.createError({ message: message?.required || `Required *` })
    if (!value) return true

    // Extension
    if (extensions.length) {
      const fileName = value instanceof File ? value.name : new URL(value).pathname
      const validExtensionsRegex = new RegExp('\\.(' + extensions.join('|') + ')$', 'i')
      if (!validExtensionsRegex.test(fileName)) return ctx.createError({ message: message?.extensions || `Only ${extensions.join(', ')} ${extensions.length > 1 ? 'files are' : 'file is'} accepted` })
    }

    // Size
    if (value instanceof File) {
      if (size && value.size > size * 1024 * 1024) return ctx.createError({ message: message?.size || `File size limit is ${size} MB` })
      if (!value.size) return ctx.createError({ message: `Invalid file` })
    }

    return true
  },
})

export const textEditorRequiredTest: TestConfig<string | undefined | null> = {
  name: 'required',
  test: (value) => (value ? !!htmlToText(value).length : true),
  message: 'Required *',
}

export const passportNumberTest: TestConfig<string> = {
  name: 'validate',
  test: (value) => {
    if (value.length < 6 || value.length > 12) return false
    if (!/^[a-zA-Z0-9]+$/.test(value)) return false
    if (!/[a-zA-Z]/.test(value) || !/[0-9]/.test(value)) return false
    return true
  },
  message: 'Enter valid passport number',
}
