import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { getCookie, removeCookie } from '@/utils'
import { useReduxDispatch, useReduxSelector } from '@/hooks'
import { setWebsiteLoader, updateLoggedIn } from '@/redux/slice/layout.slice'
import { RootLayoutProps } from '@/layouts/rootLayout/RootLayout.type'
import { useLazyProfileQuery } from '@/redux/api/user.api'

export const useAuth = ({ pageType, roles }: RootLayoutProps) => {
  const router = useRouter()
  const token = getCookie('token')
  const dispatch = useReduxDispatch()
  const [loading, setLoading] = useState(pageType === 'public' ? false : true)
  const [error, setError] = useState(false)
  const [getProfile] = useLazyProfileQuery()
  const { isLoggedIn, profile } = useReduxSelector((state) => state.layout)

  useEffect(() => {
    dispatch(setWebsiteLoader(loading))
  }, [loading])

  useEffect(() => {
    ;(async () => {
      try {
        if (!token) return
        // TODO: update it
        const response = await getProfile(undefined, true).unwrap()
        dispatch(updateLoggedIn(true))
        setLoading(false)
      } catch (e) {
        setError(true), setLoading(false)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      if (!token && pageType === 'protected') await router.replace(`/auth/login?returnTo=${location.pathname}${location.search}${location.hash}`)
      else if (!token) setLoading(false)
      else if (token && pageType === 'auth' && isLoggedIn) await router.replace('/admin/home')
      else if (pageType === 'protected' && isLoggedIn) {
        setLoading(false)
      }
    })()
  }, [router.pathname, isLoggedIn])

  return {
    isLoading: loading,
    isPermission: true,
    isError: error,
  }
}
