import { Page } from '@/types'

const Home: Page = () => {
  return 'Home'
}

Home.rootLayoutProps = {
  pageType: 'protected',
  title: 'Home',
}

export default Home
