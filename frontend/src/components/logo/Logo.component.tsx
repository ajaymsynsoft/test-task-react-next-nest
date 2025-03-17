import Link from 'next/link'
import Image from 'next/image'
import { Stack } from '@mui/material'

import logo from '@/../public/images/logo.svg'
import { LogoProps } from './Logo.type'

export default function Logo(props: LogoProps) {
  const { sx = {}, disableLink } = props

  return (
    <Stack className="logo-box" sx={{ width: 'max-content', ...sx }} {...(!disableLink ? { component: Link, href: '/' } : {})}>
      <Image src={logo} alt="logo" priority />
    </Stack>
  )
}
