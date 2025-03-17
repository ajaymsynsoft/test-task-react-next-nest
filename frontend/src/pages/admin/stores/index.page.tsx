import Link from 'next/link'
import { Button, Container } from '@mui/material'
import { MdAdd } from 'react-icons/md'
import { DataGrid } from '@mui/x-data-grid'

import PageHeader from '@/components/pageHeader/PageHeader.component'
import RenderContent from '@/components/renderContent/RenderContent.component'
import { Page } from '@/types'
import { useColumns } from './Staff.hook'
import { useGetStaffListQuery } from '@/redux/api/admin/stores.api'
import { usePagination, useReduxSelector } from '@/hooks'

const Staff: Page = () => {
  const columns = useColumns()
  const { modules } = useReduxSelector((state) => state.layout.profile)
  const { paginationModel, setPaginationModel, page, pageSize } = usePagination()
  const { data, isFetching, isError, isLoading } = useGetStaffListQuery({ pageNo: page, pageSize })

  return (
    <>
      <PageHeader
        heading="Staff"
        count={data?.totalCount}
        actions={
          modules[2].permissions.add && (
            <Button href="/dashboard/staff/add" variant="contained" startIcon={<MdAdd />} LinkComponent={Link}>
              Add Staff
            </Button>
          )
        }
      />

      <Container>
        <RenderContent loading={isLoading} error={isError}>
          <DataGrid loading={isFetching} columns={columns} rowCount={data?.totalCount || 0} rows={data?.list || []} paginationModel={paginationModel} onPaginationModelChange={setPaginationModel} />
        </RenderContent>
      </Container>
    </>
  )
}

Staff.rootLayoutProps = {
  title: 'Staff',
  pageType: 'protected',
  module: {
    id: 2,
    permission: 'view',
  },
}

export default Staff
