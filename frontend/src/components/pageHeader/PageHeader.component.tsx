import Link from 'next/link'
import { Container, IconButton, Stack, SxProps, Typography, alpha, useScrollTrigger, useMediaQuery, Theme } from '@mui/material'
import { MdNotificationsNone, MdOutlineArrowBack } from 'react-icons/md'

import { PageHeaderProps } from './PageHeader.type'
import { usePage } from '@/hooks'
import { style } from './PageHeader.style'

export default function PageHeader(props: PageHeaderProps) {
  let { actions, heading, sx = {}, size = 'medium', count, backUrl, variant = 'border' } = props
  const { isAdminDashboard } = usePage()
  const trigger = useScrollTrigger({ threshold: 24, disableHysteresis: true })
  const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  if (variant === 'border') {
    sx = {
      '--border-color': (theme) => theme.palette.dividerDark,
      height: 74,
      borderBottom: isMdUp ? 1 : '',
      borderColor: 'transparent',
      backdropFilter: 'blur(8px)',
      position: { xs: 'unset', md: 'sticky' },
      bgcolor: (theme) => alpha(theme.palette.background.default, 0.8),
      zIndex: (theme) => (isMdUp ? theme.zIndex.appBar : ''),
      top: 0,
      ...(trigger && {
        transition: (theme) => theme.transitions.create(['border-color']),
        borderColor: 'var(--border-color)',
      }),
      ...sx,
    }
  } else {
    sx = { ...sx }
  }

  return (
    <Stack sx={{ ...style.root, ...sx } as SxProps}>
      <Container sx={style.container}>
        {/* Back */}
        {backUrl && (
          <IconButton edge="start" href={backUrl} component={Link}>
            <MdOutlineArrowBack />
          </IconButton>
        )}

        {/* Heading */}
        <Typography variant="h1" fontSize={size === 'small' || !isMdUp ? '1.25rem' : undefined} sx={style.heading} noWrap>
          {heading}
        </Typography>

        {/* Count */}
        {count !== undefined ? <Typography>{count}</Typography> : null}

        {/* Actions */}
        <Stack sx={style.actionContainer}>
          {actions}
          {isAdminDashboard && isMdUp && (
            <Stack direction="row">
              <IconButton edge="end" LinkComponent={Link} href="/dashboard/notifications">
                <MdNotificationsNone className="icon-xl" />
              </IconButton>
            </Stack>
          )}
        </Stack>
      </Container>
    </Stack>
  )
}
