import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Container } from '@mui/material'

import PageHeader from '@/components/pageHeader/PageHeader.component'
import StoreForm from '../components/storeForm/StoreForm.component'
import RenderContent from '@/components/renderContent/RenderContent.component'
import { TPage } from '@/types'
import { useGetStoreListQuery } from '@/redux/api/admin/stores.api'
import { useReduxSelector } from '@/hooks'

const AddStore: TPage = () => {
  const router = useRouter()
  const { data, isFetching, isError, isSuccess } = useGetStoreListQuery({ pageNo: 1, pageSize: 10 })

  return (
    <>
      <PageHeader heading="Add Store" backUrl="/admin/stores" />

      <Container>
        <RenderContent loading={isFetching} error={isError}>
          <StoreForm isEditMode={false} />
        </RenderContent>
      </Container>
    </>
  )
}

AddStore.rootLayoutProps = {
  title: 'Add Store',
  pageType: 'protected',
}

export default AddStore
