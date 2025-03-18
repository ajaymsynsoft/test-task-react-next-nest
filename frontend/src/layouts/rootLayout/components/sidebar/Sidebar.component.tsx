import { MdCorporateFare, MdOutlineLogout } from 'react-icons/md'
import { Avatar, List, Stack, Typography, Button, Divider } from '@mui/material'

import Logo from '@/components/logo/Logo.component'
import NavItem from '@/components/navItem/NavItem.component'
import Scrollbar from '@/components/scrollbar/Scrollbar.component'
import { style } from './Sidebar.style'
import { useSidebarOptions } from './Sidebar.hook'
import { useReduxDispatch, useReduxSelector } from '@/hooks/redux.hook'
import { formatToTitleCase } from '@/utils'
import { handleLogout } from '@/redux/slice/layout.slice'

export default function Sidebar() {
  const sidebarOptions = useSidebarOptions()
  const dispatch = useReduxDispatch()
  const profile = useReduxSelector((state) => state.layout.profile)
 
  // const name = profile.role === 'admin' ? organization.organizationName : `${profile.firstName} ${profile.lastName}`

  return (
    <Stack component="aside" sx={style.root}>   
      {/* LOGO */}
      <Stack sx={style.logoContainer}>
        <Logo />
      </Stack>

      {/* MENUS */}
      <Stack sx={style.menuContainer} component={Scrollbar}>
        <Typography sx={style.menuHeading}>MAIN MENU</Typography>
        <List component="nav" disablePadding sx={style.menuList}>
          {sidebarOptions.map((item, index) => (
            <NavItem size="large" data={item} key={index} />
          ))}
        </List>
      </Stack>

      {/* PROFILE */}
      <Stack sx={style.profileContainer}>
        <Stack sx={style.profileBox}>
          <Avatar sx={style.circleSize}>{profile.role === 'admin' && <MdCorporateFare className="icon-xl" />}</Avatar>
          <Stack overflow="hidden" gap="1px">
            <Typography color="text.primary" className="line-1" fontWeight={500} title={profile.name}>
              {profile.name}
            </Typography>
            <Typography variant="body2">{formatToTitleCase(profile.role)}</Typography>
          </Stack>
        </Stack>
        <Button sx={style.logoutBtn} endIcon={<MdOutlineLogout />} onClick={() => dispatch(handleLogout())}>
          Logout
        </Button>
      </Stack>
    </Stack>
  )
}
