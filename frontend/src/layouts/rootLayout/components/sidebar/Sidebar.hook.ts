import { HiOutlineBuildingOffice } from 'react-icons/hi2'
import { RiListUnordered } from 'react-icons/ri'
import { PiIdentificationBadge } from 'react-icons/pi'
import { MdOutlineSettings, MdOutlineEventAvailable, MdSupportAgent, MdOutlineConfirmationNumber, MdOutlineDashboard, MdOutlineGroups } from 'react-icons/md'
import { MdCorporateFare, MdOutlineCommute, MdOutlineBadge, MdOutlinePeopleAlt, MdOutlineFolderShared } from 'react-icons/md'

import { MenuOption } from '@/types'
import { useReduxSelector } from '@/hooks'

export const useSidebarOptions = () => {
  const SIDEBAR_OPTIONS: MenuOption[] = [
    { id: 6, label: 'Dashboard', link: '/admin/home', Icon: MdOutlineDashboard },
    { id: 1, label: 'Stores', link: '/admin/stores', Icon: MdCorporateFare },
    { id: 5, label: 'Products', link: '/admin/products', Icon: RiListUnordered },
  ]

  return SIDEBAR_OPTIONS
}
