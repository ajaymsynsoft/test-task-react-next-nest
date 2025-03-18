import FullPageMessage from '@/components/fullPageMessage/FullPageMessage.component'
import { TPage } from '@/types'

const PageNotFound: TPage = () => {
  return <FullPageMessage heading="500: Server-side error occurred" />
}

PageNotFound.rootLayoutProps = {
  title: 'Server-side error occurred',
  pageType: 'public',
}

export default PageNotFound
