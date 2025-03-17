import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Container } from '@mui/material'

import PageHeader from '@/components/pageHeader/PageHeader.component'
import StaffForm from '../components/staffForm/StaffForm.component'
import RenderContent from '@/components/renderContent/RenderContent.component'
import { Page } from '@/types'
import { useGetStaffListQuery } from '@/redux/api/staff.api'
import { useReduxSelector } from '@/hooks'

const AddStaff: Page = () => {
  const router = useRouter()
  const { plan } = useReduxSelector((state) => state.subscription)
  const { data, isFetching, isError, isSuccess } = useGetStaffListQuery({ pageNo: 1, pageSize: 10 })

  if (isSuccess && data?.totalRecords >= plan.noOfStaffs) {
    toast.error(`You can add upto ${plan.noOfStaffs} staff or upgrade your subscription plan`, {
      duration: 6000,
      position: 'top-center',
    })
    router.replace('/dashboard/staff')
    return null
  }

  return (
    <>
      <PageHeader heading="Add Staff" backUrl="/dashboard/staff" />

      <Container>
        <RenderContent loading={isFetching} error={isError}>
          <StaffForm isEditMode={false} />
        </RenderContent>
      </Container>
    </>
  )
}

AddStaff.rootLayoutProps = {
  title: 'Add Staff',
  pageType: 'protected',
  module: {
    id: 2,
    permission: 'add',
  },
}

export default AddStaff
