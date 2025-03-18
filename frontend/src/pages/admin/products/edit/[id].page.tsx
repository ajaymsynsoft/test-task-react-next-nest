import { useRouter } from 'next/router'
import { Container } from '@mui/material'

import PageHeader from '@/components/pageHeader/PageHeader.component'
import RenderContent from '@/components/renderContent/RenderContent.component'
import ProductForm from '../components/productForm/ProductForm.component'
import { TPage } from '@/types'
import { useGetProductQuery } from '@/redux/api/admin/products.api'

const EditProduct: TPage = () => {
  const router = useRouter()
  const { isFetching, isError, data, isSuccess } = useGetProductQuery(Number(router.query.id))

  return (
    <>
      <PageHeader heading="Edit Product" backUrl="/admin/products" />

      <Container>
        <RenderContent loading={isFetching} error={isError}>
          {isSuccess && <ProductForm isEditMode data={data} />}
        </RenderContent>
      </Container>
    </>
  )
}

EditProduct.rootLayoutProps = {
  title: 'Edit Product',
  pageType: 'protected',
}

export default EditProduct
