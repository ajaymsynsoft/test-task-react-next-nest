import { useRouter } from 'next/router'
import { Container } from '@mui/material'

import PageHeader from '@/components/pageHeader/PageHeader.component'
import RenderContent from '@/components/renderContent/RenderContent.component'
import ProductForm from '../components/ProductForm/ProductForm.component'
import { Page } from '@/types'
import { useGetProductQuery } from '@/redux/api/admin/products.api'

const EditProduct: Page = () => {
  const router = useRouter()
  const { isFetching, isError, data } = useGetProductQuery(Number(router.query.id))

  return (
    <>
      <PageHeader heading="Edit Product" backUrl="/admin/products" />

      <Container>
        <RenderContent loading={isFetching} error={isError}>
          {data && <ProductForm isEditMode data={data} />}
        </RenderContent>
      </Container>
    </>
  )
}

EditProduct.rootLayoutProps = {
  title: 'Edit Product',
  pageType: 'protected' 
}

export default EditProduct
