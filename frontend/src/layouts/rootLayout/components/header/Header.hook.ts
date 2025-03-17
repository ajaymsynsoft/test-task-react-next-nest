import { MdOutlineEventAvailable, MdOutlineDashboard, MdCorporateFare, MdOutlinePersonOutline, MdOutlineSettings, MdOutlineLogout, MdSupportAgent, MdOutlineAccountBalanceWallet, MdKey } from 'react-icons/md'

import { MenuOption } from '@/types'
import { useReduxSelector } from '@/hooks'

export const useOptions = () => {
 

  const PROFILE_OPTIONS_1: MenuOption[] = [
    { id: 6, label: 'Dashboard', link: '/dashboard/home', Icon: MdOutlineDashboard, roles: ['admin', 'superAdmin'] },
    { id: 12, label: 'My bookings', link: '/customer/my-bookings', Icon: MdOutlineEventAvailable, roles: ['customer'] },
    { id: 19, label: 'My wallet', link: '/customer/my-wallet', Icon: MdOutlineAccountBalanceWallet, roles: ['customer'] },
    { id: 15, label: 'My profile', link: '/customer/my-profile', Icon: MdOutlinePersonOutline, roles: ['customer'] },
    { id: 15, label: 'My profile', link: '/dashboard/settings?tab=15', Icon: MdOutlinePersonOutline, exludedRoles: ['customer'] },
    { id: 16, label: 'My Organization', link: '/dashboard/settings?tab=16', Icon: MdCorporateFare },
  ]

  const PROFILE_OPTIONS_2: MenuOption[] = [
    { id: 11, label: 'Settings', link: '/dashboard/settings', Icon: MdOutlineSettings, exludedRoles: ['customer'] },   
    { id: 14, label: 'Password', link: '/customer/change-password', Icon: MdKey, roles: ['customer'] },
    { label: 'Logout', link: '#', Icon: MdOutlineLogout },
  ]

  return { PROFILE_OPTIONS_1, PROFILE_OPTIONS_2 }
}
