import Head from 'next/head'
import { Provider } from 'react-redux'
import { IconContext } from 'react-icons/lib'
import { CssBaseline, ThemeProvider } from '@mui/material'

import ReactHotToast from '@/components/reactHotToast/ReactHotToast.component'
import NProgress from '@/components/nProgress/NProgress.component'
import RootLayout from '@/layouts/rootLayout/RootLayout.component'
import { store } from '@/redux/store/store'
import { theme } from '@/styles/theme'
import { AppProps } from './_app.type'
import '@/styles/globals.css'
import '@/lib/moment'
import '@/lib/yup'

export default function App({ Component, pageProps }: AppProps) {
  const rootLayoutProps = Component.rootLayoutProps

  return (
    <>
      <Head>
        <title>SnapBuy - Click, Buy, Smile!</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <IconContext.Provider value={{ className: 'icon' }}>
            <ReactHotToast />
            <NProgress />
            <CssBaseline enableColorScheme />
            <RootLayout {...rootLayoutProps}>
              <Component {...pageProps} />
            </RootLayout>
          </IconContext.Provider>
        </ThemeProvider>
      </Provider>
    </>
  )
}
