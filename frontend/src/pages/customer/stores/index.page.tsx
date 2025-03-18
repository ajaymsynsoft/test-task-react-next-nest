import { Alert, Container, Grid, Stack, Pagination } from '@mui/material'

import RenderContent from '@/components/renderContent/RenderContent.component'
import StoreCard from '@/components/_card/storeCard/StoreCard.component'
import PageHeader from '@/components/pageHeader/PageHeader.component'
import { Page } from '@/types'
import { useGetStoreListQuery } from '@/redux/api/customer.api'
import { usePagination } from '@/hooks'

const StoreList: Page = () => {
  const { page, pageSize, setPaginationModel } = usePagination()
  const { data: events, isLoading, isError, isUninitialized, isSuccess } = useGetStoreListQuery({ pageNo: page, pageSize })

  return (
    <>
      {/* Page Header */}
      <PageHeader heading="Events" variant="no-border" count={events?.totalCount} />

      {/* Events */}
      <Container>
        <RenderContent error={isError} loading={isUninitialized || isLoading}>
          {events?.list.length ? (
            <Grid container spacing={3}>
              {events.list.map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <StoreCard data={item} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Alert variant="outlined" severity="info">
              No stores available at the moment
            </Alert>
          )}
        </RenderContent>
        {isSuccess && events.totalCount > 10 && (
          <Stack alignItems="center" justifyContent="flex-end" mt={4}>
            <Pagination page={page} count={events.totalCount / pageSize <= 1 ? 1 : events.totalCount / pageSize} onChange={(_, page) => setPaginationModel({ page: page - 1, pageSize })} />
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
