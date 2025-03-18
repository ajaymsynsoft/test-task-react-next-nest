import { useRouter } from 'next/router'
import { Container } from '@mui/material'

import PageHeader from '@/components/pageHeader/PageHeader.component'
import RenderContent from '@/components/renderContent/RenderContent.component'
import StoreForm from '../components/storeForm/StoreForm.component'
import { Page } from '@/types'
import { useGetStoreQuery } from '@/redux/api/admin/stores.api'

const EditStore: Page = () => {
  const router = useRouter()
  const { isFetching, isError, data } = useGetStoreQuery(Number(router.query.id))

  return (
    <>
      <PageHeader heading="Edit Store" backUrl="/admin/stores" />

      <Container>
        <RenderContent loading={isFetching} error={isError}>
          {data && <StoreForm isEditMode data={data} />}
        </RenderContent>
      </Container>
    </>
  )
}

EditStore.rootLayoutProps = {
  title: 'Edit Store',
  pageType: 'protected'  
}

export default EditStore
