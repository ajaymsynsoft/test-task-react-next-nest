
import { InferGetStaticPropsType, GetServerSideProps } from 'next'
import { Alert, Button, Container, Pagination, Grid, Stack, Typography, Card, CardContent } from '@mui/material'
import PageHeader from '@/components/pageHeader/PageHeader.component'
import { Page } from '@/types'
import { useGetProductListQuery } from '@/redux/api/customer.api'
import { usePagination } from '@/hooks'
import ProductCard from '@/components/_card/productCard/ProductCard.component'
import RenderContent from '@/components/renderContent/RenderContent.component'

const ProductList: Page = (props: InferGetStaticPropsType<typeof getServerSideProps>) => {
  const { storeId } = props
  const { page, pageSize, setPaginationModel } = usePagination()
   const { data: products, isLoading, isError, isUninitialized, isSuccess } = useGetProductListQuery({ pageNo: page, pageSize,storeId })
 

  return (
    <>
      {/* Page Header */}
        <PageHeader heading="Produt List" variant="no-border" count={products?.totalCount} />
         <Container>
          <RenderContent error={isError} loading={isUninitialized || isLoading}>
            {products?.list.length ? (
              <Grid container spacing={3}>
                {products.list.map((item, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <ProductCard data={item} />
                  </Grid>
                ))}
              </Grid>
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
    props: {  storeId }
   
  }
}) satisfies GetServerSideProps

ProductList.rootLayoutProps = {
  title: 'Product List',
  pageType: 'public',
}

export default ProductList
