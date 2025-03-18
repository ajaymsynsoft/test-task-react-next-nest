import Link from 'next/link'
import { Button, Container } from '@mui/material'
import { MdAdd } from 'react-icons/md'
import { DataGrid } from '@mui/x-data-grid'

import PageHeader from '@/components/pageHeader/PageHeader.component'
import RenderContent from '@/components/renderContent/RenderContent.component'
import { TPage } from '@/types'
import { useColumns } from './Produt.hook'
import { useGetProductListQuery } from '@/redux/api/admin/products.api'
import { usePagination, useReduxSelector } from '@/hooks'

const Products: TPage = () => {
  const columns = useColumns()
  // const { modules } = useReduxSelector((state) => state.layout.profile)
  const { paginationModel, setPaginationModel, page, pageSize } = usePagination()
  const { data, isFetching, isError, isLoading } = useGetProductListQuery({ pageNo: page, pageSize })

  return (
    <>
      <PageHeader
        heading="Products"
        count={data?.totalCount}
        actions={
          <Button href="/admin/products/add" variant="contained" startIcon={<MdAdd />} LinkComponent={Link}>
            Add Product
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

Products.rootLayoutProps = {
  title: 'Products',
  pageType: 'protected',
}

export default Products
