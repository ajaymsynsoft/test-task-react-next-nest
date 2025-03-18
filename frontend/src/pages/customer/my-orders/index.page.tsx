import { Container } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import PageHeader from '@/components/pageHeader/PageHeader.component'
import RenderContent from '@/components/renderContent/RenderContent.component'
import { TPage } from '@/types'
import { useColumns } from './Order.hook'
import { useGetOrderListQuery } from '@/redux/api/customer.api'
import { usePagination } from '@/hooks'

const MyOrders: TPage = () => {
  const columns = useColumns()
  const { paginationModel, setPaginationModel, page, pageSize } = usePagination()
  const { data, isFetching, isError, isLoading } = useGetOrderListQuery({ pageNo: page, pageSize })

  return (
    <>
      <PageHeader heading="My orders" count={data?.totalCount} />

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
  pageType: 'protected',
}

export default MyOrders
