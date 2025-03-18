import { Page } from '@/types'

const Home: Page = () => {
  return 'Home'
}

Home.rootLayoutProps = {
  pageType: 'public',
  title: 'Home',
}

export default Home
