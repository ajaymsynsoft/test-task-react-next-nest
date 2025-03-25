import { TestConfig } from 'yup'

export const stringTest: TestConfig<string | null | undefined> = {
  name: 'validate',
  test: (value) => (value ? /[a-zA-Z]/.test(value) : true),
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



