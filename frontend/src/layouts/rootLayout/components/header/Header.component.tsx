import Link from 'next/link'
import { useState } from 'react'
import { Avatar, Box, Button, ButtonBase, Chip, Container, Divider, ListItemIcon, ListItemText, Menu, MenuItem, Skeleton, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import { MdLogout, MdOutlineKeyboardArrowDown, MdOutlineLogout } from 'react-icons/md'

import Logo from '@/components/logo/Logo.component'
import { style } from './Header.style'
import { useReduxSelector } from '@/hooks/redux.hook'
import { handleLogout } from '@/utils'

export default function Header() {
  const [profileAnchorEl, setProfileAnchorEl] = useState<HTMLElement | null>(null)

  const { isLoggedIn, isWebsiteLoading } = useReduxSelector((state) => state.layout)
  const isSmUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))
  const profile = useReduxSelector((state) => state.layout.profile)

  const handleCloseProfileMenu = () => {
    setProfileAnchorEl(null)
  }

  return (
    <Stack component="header" sx={style.root}>
      <Container sx={style.container}>
        {/* Logo */}
        <Stack component={Link} href="/" sx={style.logoContainer}>
          <Logo />
        </Stack>

        {/* Profile */}
        <Stack direction="row" alignItems="center" gap={1.5}>
          {isWebsiteLoading ? (
            <Skeleton variant="rounded" width={150} height={43} />
          ) : isLoggedIn ? (
            <>
              <Stack direction="row" height={1}>
                <ButtonBase href="/customer/stores" LinkComponent={Link} sx={style.navItem}>
                  Stores
                </ButtonBase>
                <ButtonBase href="/customer/my-orders" LinkComponent={Link} sx={style.navItem}>
                  My Order
                </ButtonBase>
              </Stack>
              <Divider orientation="vertical" sx={style.divider} />
              <Stack component={ButtonBase} sx={style.profileBox} onClick={(e) => setProfileAnchorEl(e.currentTarget)}>
                <Avatar sx={style.avatar} />
                {isSmUp && (
                  <>
                    <Typography sx={style.profileName} noWrap>
                      {profile.name}
                    </Typography>
                    <Box component={MdOutlineKeyboardArrowDown} color="text.disabled" />
                  </>
                )}
              </Stack>
            </>
          ) : (
            <>
              <Button variant="outlined" href="/auth/login" LinkComponent={Link} sx={style.button}>
                Login
              </Button>
              {isSmUp && (
                <Button variant="contained" href="/auth/register" LinkComponent={Link} sx={style.button}>
                  Register
                </Button>
              )}
            </>
          )}
        </Stack>

        {/* Profile Menu */}
        {isLoggedIn && (
          <Menu
            anchorEl={profileAnchorEl}
            open={!!profileAnchorEl}
            onClose={handleCloseProfileMenu}
            keepMounted
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <MdOutlineLogout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </Menu>
        )}
      </Container>
    </Stack>
  )
}
