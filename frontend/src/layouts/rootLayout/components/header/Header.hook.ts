import { MdOutlineEventAvailable, MdOutlineDashboard, MdCorporateFare, MdOutlinePersonOutline, MdOutlineSettings, MdOutlineLogout, MdSupportAgent, MdOutlineAccountBalanceWallet, MdKey } from 'react-icons/md'

import { MenuOption } from '@/types'
import { useReduxSelector } from '@/hooks'

export const useOptions = () => {
 

  const PROFILE_OPTIONS_1: MenuOption[] = [
    { id: 6, label: 'Stores', link: '/customer/home', Icon: MdOutlineDashboard, roles: ['customer'] },
    { id: 12, label: 'My Orders', link: '/customer/my-orders', Icon: MdOutlineEventAvailable, roles: ['customer'] },   
  ]
  const PROFILE_OPTIONS_2: MenuOption[] = [   
    { label: 'Logout', link: '#', Icon: MdOutlineLogout },
  ]

  return { PROFILE_OPTIONS_1, PROFILE_OPTIONS_2 }
}
