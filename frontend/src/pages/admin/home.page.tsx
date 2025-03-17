import Link from 'next/link'
import { Button, Container } from '@mui/material'
import { MdAdd } from 'react-icons/md'
import { DataGrid } from '@mui/x-data-grid'

import PageHeader from '@/components/pageHeader/PageHeader.component'
import RenderContent from '@/components/renderContent/RenderContent.component'
import { Page } from '@/types'
import { useGetProductListQuery } from '@/redux/api/admin/products.api'
import { usePagination, useReduxSelector } from '@/hooks'

const Home: Page = () => {  
  return (
    <>
      
    
    
      <Container>       
         Home Page...
      </Container>
    </>
  )
}

Home.rootLayoutProps = {
  title: 'Home',
  pageType: 'protected',
  module: {
    id: 2,
    permission: 'view',
  },
}

export default Home
