import { useRouter } from 'next/router'
import { Container } from '@mui/material'

import PageHeader from '@/components/pageHeader/PageHeader.component'
import RenderContent from '@/components/renderContent/RenderContent.component'
import StaffForm from '../components/staffForm/StaffForm.component'
import { Page } from '@/types'
import { useGetStaffQuery } from '@/redux/api/staff.api'

const EditStaff: Page = () => {
  const router = useRouter()
  const { isFetching, isError, data } = useGetStaffQuery(Number(router.query.id))

  return (
    <>
      <PageHeader heading="Edit Staff" backUrl="/dashboard/staff" />

      <Container>
        <RenderContent loading={isFetching} error={isError}>
          {data && <StaffForm isEditMode data={data} />}
        </RenderContent>
      </Container>
    </>
  )
}

EditStaff.rootLayoutProps = {
  title: 'Edit Staff',
  pageType: 'protected',
  module: {
    id: 2,
    permission: 'edit',
  },
}

export default EditStaff
