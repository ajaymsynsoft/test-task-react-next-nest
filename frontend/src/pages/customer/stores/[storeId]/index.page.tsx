import { InferGetStaticPropsType, GetServerSideProps } from 'next'
import { Alert, Container, Pagination, Stack, Grid2 } from '@mui/material'

import PageHeader from '@/components/pageHeader/PageHeader.component'
import ProductCard from '@/components/_card/productCard/ProductCard.component'
import RenderContent from '@/components/renderContent/RenderContent.component'
import { TPage } from '@/types'
import { useGetProductListQuery } from '@/redux/api/customer.api'
import { usePagination } from '@/hooks'

const ProductList: TPage = (props: InferGetStaticPropsType<typeof getServerSideProps>) => {
  const { storeId } = props
  const { page, pageSize, setPaginationModel } = usePagination()
  const { data: products, isLoading, isError, isUninitialized, isSuccess } = useGetProductListQuery({ pageNo: page, pageSize, storeId })

  return (
    <>
      {/* Page Header */}
      <PageHeader heading="Produt List" variant="no-border" count={products?.totalCount} />
      <Container>
        <RenderContent error={isError} loading={isUninitialized || isLoading}>
          {products?.list.length ? (
            <Grid2 container spacing={3}>
              {products.list.map((item, index) => (
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <ProductCard data={item} />
                </Grid2>
              ))}
            </Grid2>
          ) : (
            <Alert variant="outlined" severity="info">
              No products available at the moment
            </Alert>
          )}
        </RenderContent>
        {isSuccess && products.totalCount > 10 && (
          <Stack alignItems="center" justifyContent="flex-end" mt={4}>
            <Pagination page={page} count={products.totalCount / pageSize <= 1 ? 1 : products.totalCount / pageSize} onChange={(_, page) => setPaginationModel({ page: page - 1, pageSize })} />
          </Stack>
        )}
      </Container>
    </>
  )
}

export const getServerSideProps = (async ({ params }) => {
  const storeId = params?.storeId as string
  return {
    props: { storeId },
  }
}) satisfies GetServerSideProps

ProductList.rootLayoutProps = {
  title: 'Product List',
  pageType: 'public',
}

export default ProductList
