import Link from 'next/link'
import { Button, Container } from '@mui/material'
import { MdAdd } from 'react-icons/md'
import { DataGrid } from '@mui/x-data-grid'

import PageHeader from '@/components/pageHeader/PageHeader.component'
import RenderContent from '@/components/renderContent/RenderContent.component'
import { TPage } from '@/types'
import { useColumns } from './Store.hook'
import { useGetStoreListQuery } from '@/redux/api/admin/stores.api'
import { usePagination, useReduxSelector } from '@/hooks'

const Stores: TPage = () => {
  const columns = useColumns()
  const { paginationModel, setPaginationModel, page, pageSize } = usePagination()
  const { data, isFetching, isError, isLoading } = useGetStoreListQuery({ pageNo: page, pageSize })

  return (
    <>
      <PageHeader
        heading="Stores"
        count={data?.totalCount}
        actions={
          <Button href="/admin/stores/add" variant="contained" startIcon={<MdAdd />} LinkComponent={Link}>
            Add Store
          </Button>
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

Stores.rootLayoutProps = {
  title: 'Stores',
  pageType: 'protected',
}

export default Stores
