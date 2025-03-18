import Link from 'next/link'
import { Button, Container } from '@mui/material'
import { MdAdd } from 'react-icons/md'
import { DataGrid } from '@mui/x-data-grid'

import PageHeader from '@/components/pageHeader/PageHeader.component'
import RenderContent from '@/components/renderContent/RenderContent.component'
import { Page } from '@/types'
import { useColumns } from './Order.hook'
import { useGetProductListQuery } from '@/redux/api/customer.api'
import { usePagination, useReduxSelector } from '@/hooks'

const MyOrders: Page = () => {
  const columns = useColumns()
  // const { modules } = useReduxSelector((state) => state.layout.profile)
  const { paginationModel, setPaginationModel, page, pageSize } = usePagination()
  const { data, isFetching, isError, isLoading } = useGetProductListQuery({ pageNo: page, pageSize })

  return (
    <>
      <PageHeader
        heading="My orders"
        count={data?.totalCount}
        actions={ }
      />
         
      <Container>
        <RenderContent loading={isLoading} error={isError}>
          <DataGrid loading={isFetching} columns={columns} rowCount={data?.totalCount || 0} rows={data?.list || []} paginationModel={paginationModel} onPaginationModelChange={setPaginationModel} />
        </RenderContent>
      </Container>
    </>
  )
}

MyOrders.rootLayoutProps = {
  title: 'My Orders',
  pageType: 'protected'
}

export default MyOrders
