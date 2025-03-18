import { TPage } from '@/types'
import { Container, Typography } from '@mui/material'

const Home: TPage = () => {
  return (
    <Container>
      <Typography mt={5}>Home</Typography>
    </Container>
  )
}

Home.rootLayoutProps = {
  pageType: 'protected',
  title: '',
}

export default Home
