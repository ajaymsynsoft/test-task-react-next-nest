import { useRouter } from 'next/router'
import { Container } from '@mui/material'

import PageHeader from '@/components/pageHeader/PageHeader.component'
import RenderContent from '@/components/renderContent/RenderContent.component'
import StaffForm from '../components/staffForm/StaffForm.component'
import { TPage } from '@/types'
import { useGetStaffQuery } from '@/redux/api/staff.api'

const EditStaff: TPage = () => {
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

EditStaff.rootLayoutProps = {
  title: 'Edit Staff',
  pageType: 'protected',
}

export default EditStore
