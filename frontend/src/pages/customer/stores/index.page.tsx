import { Alert, Container, Stack, Pagination, Grid2 } from '@mui/material'

import RenderContent from '@/components/renderContent/RenderContent.component'
import StoreCard from '@/components/_card/storeCard/StoreCard.component'
import PageHeader from '@/components/pageHeader/PageHeader.component'
import { TPage } from '@/types'
import { useGetStoreListQuery } from '@/redux/api/customer.api'
import { usePagination } from '@/hooks'

const StoreList: TPage = () => {
  const { page, pageSize, setPaginationModel } = usePagination()
  const { data: stores, isLoading, isError, isUninitialized, isSuccess } = useGetStoreListQuery({ pageNo: page, pageSize })
  console.log(stores)

  return (
    <>
      {/* Page Header */}
      <PageHeader heading="Store List" variant="no-border" count={stores?.totalCount} />

      {/* Store */}
      <Container>
        <RenderContent error={isError} loading={isUninitialized || isLoading}>
          {stores?.list.length ? (
            <Grid2 container spacing={3}>
              {stores.list.map((item, index) => (
                <Grid2 size={{ xs: 12, sm: 6 }} key={index}>
                  <StoreCard data={item} />
                </Grid2>
              ))}
            </Grid2>
          ) : (
            <Alert variant="outlined" severity="info">
              No stores available at the moment
            </Alert>
          )}
        </RenderContent>
        {isSuccess && stores.totalCount > 10 && (
          <Stack alignItems="center" justifyContent="flex-end" mt={4}>
            <Pagination page={page} count={stores.totalPages} onChange={(_, page) => setPaginationModel({ page: page - 1, pageSize })} />
          </Stack>
        )}
      </Container>
    </>
  )
}

StoreList.rootLayoutProps = {
  title: 'Store List',
  pageType: 'public',
}

export default StoreList
