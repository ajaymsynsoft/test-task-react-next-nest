import { Stack, SxProps, Typography } from '@mui/material'

import { style } from './Logo.style'
import { LogoProps } from './Logo.type'

export default function Logo({ sx = {} }: LogoProps) {
  return (
    <Stack sx={{ ...style.root, ...sx } as SxProps}>
      <Stack sx={style.logo}>
        <Stack sx={style.iconBox}>S</Stack>
        <Typography sx={style.name}>SnapBuy</Typography>
      </Stack>
    </Stack>
  )
}
