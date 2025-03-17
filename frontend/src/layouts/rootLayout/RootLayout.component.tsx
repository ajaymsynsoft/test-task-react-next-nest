import Head from 'next/head'
import { Stack } from '@mui/material'

import Header from './components/header/Header.component'
import Sidebar from './components/sidebar/Sidebar.component'
import FullPageLoader from '@/components/fullPageLoader/FullPageLoader.component'
import ErrorBoundary from '@/components/errorBoundary/ErrorBoundary.component'
import FullPageMessage from '@/components/fullPageMessage/FullPageMessage.component'
import Footer from './components/footer/Footer.component'
import { RootLayoutProps } from './RootLayout.type'
import { SIDEBAR_WIDTH } from './RootLayout.config'
import { usePage } from '@/hooks'
import { getCookie } from '@/utils'
import { useAuth } from './RootLayout.hook'

export default function RootLayout(props: RootLayoutProps & { children: React.ReactNode }) {
  let { children, title, header, sidebar, footer } = props
  const { isLoading, isError, isPermission } = useAuth(props)
  const { isCustomerDashboard, isAdminDashboard } = usePage()

  if (!isAdminDashboard) sidebar = false
  if (isAdminDashboard) (footer = false), (header = false)
  if (isCustomerDashboard) footer = false

  const token = getCookie('token')
  const contentWidth = sidebar !== false ? `calc(100vw - ${SIDEBAR_WIDTH}px)` : undefined

  const renderChildren = () => {
    if (!isPermission) return <FullPageMessage heading="404: Page Not Found" hideButton />
    if (!token && props.pageType === 'protected') return null
    return children
  }

  return (
    <>
      <Head>{title && <title>{`${title} | Store`}</title>}</Head>

      {isLoading ? (
        <FullPageLoader />
      ) : (
        <ErrorBoundary error={isError}>
          Sidebar
          sidebar === {JSON.stringify(sidebar)}
          header === {JSON.stringify(header)}
          {<Sidebar />}
          <Stack flex={1} width={contentWidth} maxWidth={1}>
            {<Header />}
            <Stack component="main" flex={1} mb={isAdminDashboard ? 4 : 0}>
              {renderChildren()}
            </Stack>
            {/* {footer !== false && <Footer />} */}
          </Stack>
        </ErrorBoundary>
      )}
    </>
  )
}
