import { TestConfig } from 'yup'

export const stringTest: TestConfig<string | undefined | null> = {
  name: 'validate',
  test: (value) => (value ? value.match(/\d+/g)?.join('') !== value.replace(/\s/g, '') : true),
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

export const passwordTest: TestConfig<string | undefined | null> = {
  name: 'validate',
  test: (value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W_]{10,}$/
    return value ? passwordRegex.test(value) : true
  },
  message: 'It must have at least 10 characters, 1 uppercase, 1 lowercase, and 1 digit.',
}

export const fileTest = ({ size, extensions = [], required = true }: { size?: number; extensions?: string[]; required?: boolean }): TestConfig<string | File | undefined> => ({
  name: 'validate',
  test(value, ctx) {
    // Required
    if (required && !value) return ctx.createError({ message: `Required *` })
    if (!value) return true

    // Extension
    if (extensions.length) {
      const fileName = value instanceof File ? value.name : new URL(value).pathname
      const validExtensionsRegex = new RegExp('\\.(' + extensions.map((item) => item.substring(1)).join('|') + ')$', 'i')
      if (!validExtensionsRegex.test(fileName)) return ctx.createError({ message: `Only ${extensions.join(', ')} ${extensions.length > 1 ? 'files are' : 'file is'} accepted` })
    }

    // Size
    if (value instanceof File) {
      if (size && value.size > size * 1024 * 1024) return ctx.createError({ message: `File size limit is ${size} MB` })
      if (!value.size) return ctx.createError({ message: `Invalid file` })
    }

    return true
  },
})
