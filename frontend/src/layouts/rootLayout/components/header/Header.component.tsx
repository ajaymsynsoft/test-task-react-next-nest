import Link from 'next/link'
import { useState } from 'react'
import { Avatar, Box, Button, ButtonBase, Container, Divider, IconButton, Menu, Skeleton, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import { MdOutlineKeyboardArrowDown, MdCorporateFare, MdNotificationsNone } from 'react-icons/md'

import Logo from '@/components/logo/Logo.component'
import NavItem from '@/components/navItem/NavItem.component'
import { style } from './Header.style'
import { useReduxDispatch, useReduxSelector } from '@/hooks/redux.hook'
import { useOptions } from './Header.hook'
import { handleLogout } from '@/redux/slice/layout.slice'

export default function Header() {
  const { isLoggedIn, isWebsiteLoading } = useReduxSelector((state) => state.layout)
  const { PROFILE_OPTIONS_1, PROFILE_OPTIONS_2 } = useOptions()
  const [profileAnchorEl, setProfileAnchorEl] = useState<HTMLElement | null>(null)

  const dispatch = useReduxDispatch()
  const profile = useReduxSelector((state) => state.layout.profile)
  const organization = useReduxSelector((state) => state.organization)
  const name = profile.role === 'admin' ? organization.organizationName : `${profile.firstName} ${profile.lastName}`
  const isSmUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))

  const handleCloseProfileMenu = () => {
    setProfileAnchorEl(null)
  }

  return (
    <Stack component="header" sx={style.root}>
      <Container sx={style.container}>
        {/* Logo */}
        <Stack sx={style.logoContainer}>
          <Logo sx={style.logo} disableLink={false} />
        </Stack>

        {/* Profile */}
        <Stack direction="row" alignItems="center" gap={1.5}>
          {isWebsiteLoading ? (
            <Skeleton variant="rounded" width={150} height={43} />
          ) : isLoggedIn ? (
            <>
              <IconButton LinkComponent={Link} href="/customer/notifications">
                <MdNotificationsNone className="icon-xl" />
              </IconButton>
              <Divider orientation="vertical" sx={style.divider} />
              <Stack component={ButtonBase} sx={style.profileBox} onClick={(e) => setProfileAnchorEl(e.currentTarget)}>
                <Avatar sx={style.avatar}>{profile.role === 'admin' && <MdCorporateFare />}</Avatar>
                {isSmUp && (
                  <>
                    <Typography sx={style.profileName} noWrap>
                      {name}
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
            {PROFILE_OPTIONS_1.map((item, index) => (
              <NavItem data={item} key={index} onClick={handleCloseProfileMenu} />
            ))}
            <Divider />
            {PROFILE_OPTIONS_2.map((item, index) => (
              <NavItem data={item} key={index} onClick={() => (item.label === 'Logout' ? dispatch(handleLogout()) : handleCloseProfileMenu())} />
            ))}
          </Menu>
        )}
      </Container>
    </Stack>
  )
}
