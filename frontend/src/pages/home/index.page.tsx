import { TPage } from '@/types'

const Home: TPage = () => {
  return 'Home'
}

Home.rootLayoutProps = {
  pageType: 'public',
  title: 'Home',
}

export default Home
