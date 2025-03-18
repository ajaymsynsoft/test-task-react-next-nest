import { useRouter } from 'next/router'

export const usePage = () => {
  const { pathname } = useRouter()

  const isAdminDashboard = pathname.startsWith('/admin/') && !pathname.startsWith('/admin/login')
  const isCustomerDashboard = pathname.startsWith('/customer/')
  const isAuthPage = pathname.startsWith('/auth/')
  const isDashboard = isAdminDashboard || isCustomerDashboard

  return { isAdminDashboard, isCustomerDashboard, isAuthPage, isDashboard }
}
