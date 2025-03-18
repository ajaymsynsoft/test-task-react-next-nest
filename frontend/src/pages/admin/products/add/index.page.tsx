import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Container } from '@mui/material'

import PageHeader from '@/components/pageHeader/PageHeader.component'
import ProductForm from '../components/productForm/ProductForm.component'
import RenderContent from '@/components/renderContent/RenderContent.component'
import { TPage } from '@/types'
import { useGetProductListQuery } from '@/redux/api/admin/products.api'

const AddProduct: TPage = () => {
  const router = useRouter()
  const { data, isFetching, isError, isSuccess } = useGetProductListQuery({ pageNo: 1, pageSize: 10 })

  return (
    <>
      <PageHeader heading="Add Product" backUrl="/admin/products" />
      <Container>
        <RenderContent loading={isFetching} error={isError}>
          <ProductForm isEditMode={false} />
        </RenderContent>
      </Container>
    </>
  )
}

AddProduct.rootLayoutProps = {
  title: 'Add Product',
  pageType: 'protected',
}

export default AddProduct
