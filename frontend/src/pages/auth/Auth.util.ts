import { setCookie } from '@/utils'
import { AuthApiResponse } from './Auth.type'

export const setUser = (profile: AuthApiResponse) => {
  setCookie('token', profile.token, 30)

  const urlParams = new URLSearchParams(window.location.search)
  const returnTo = urlParams.get('returnTo')
  const redirectUrl = returnTo ?? (profile.isAdmin === 'customer' ? '/' : '/admin/home')

  window.location.replace(redirectUrl)
}
