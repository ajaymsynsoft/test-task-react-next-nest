import Link from 'next/link'
import { Container, Stack, Typography, Link as MuiLink } from '@mui/material'

import { style } from './Footer.style'
import { useReduxSelector } from '@/hooks'

export default function Footer() {
  const organization = useReduxSelector((state) => state.organization)

  return (
    <Stack component="footer" sx={style.root}>
      <Container sx={style.container}>
        {/* Links */}
        {/* TODO: pass page link and remove "scroll" prop */}
        <MuiLink component={Link} href="#" scroll={false} underline="hover" color="inherit">
          Privacy Notice
        </MuiLink>

        {/* Copyright */}
        <Typography>
          &copy;{new Date().getFullYear()} {organization.organizationName}. All right reserved
        </Typography>
      </Container>
    </Stack>
  )
}
