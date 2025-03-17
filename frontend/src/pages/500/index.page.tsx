import FullPageMessage from '@/components/fullPageMessage/FullPageMessage.component'
import { Page } from '@/types'

const PageNotFound: Page = () => {
  return <FullPageMessage heading="500: Server-side error occurred" />
}

PageNotFound.rootLayoutProps = {
  title: 'Server-side error occurred',
  pageType: 'public',
}

export default PageNotFound
