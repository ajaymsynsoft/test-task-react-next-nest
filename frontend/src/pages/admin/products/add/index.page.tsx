import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Container } from '@mui/material'

import PageHeader from '@/components/pageHeader/PageHeader.component'
import ProductForm from '../components/productForm/ProductForm.component'
import RenderContent from '@/components/renderContent/RenderContent.component'
import { Page } from '@/types'
import { useGetProductListQuery } from '@/redux/api/admin/products.api'
import { useReduxSelector } from '@/hooks'

const AddProduct: Page = () => {
  const router = useRouter()
  // const { plan } = useReduxSelector((state) => state.subscription)
  const { data, isFetching, isError, isSuccess } = useGetProductListQuery({ pageNo: 1, pageSize: 10 })

  // if (isSuccess && data?.totalRecords >= plan.noOfStaffs) {
  //   toast.error(`You can add upto ${plan.noOfStaffs} staff or upgrade your subscription plan`, {
  //     duration: 6000,
  //     position: 'top-center',
  //   })
  //   router.replace('/dashboard/staff')
  //   return null
  // }

  return (
    <>
      <PageHeader heading="Add Staff" backUrl="/dashboard/staff" />

      <Container>
        <RenderContent loading={isFetching} error={isError}>
          <ProductForm isEditMode={false} />
        </RenderContent>
      </Container>
    </>
  )
}

AddProduct.rootLayoutProps = {
  title: 'Add Staff',
  pageType: 'protected',
  module: {
    id: 2,
    permission: 'add',
  },
}

export default AddProduct
