import { TRoles } from './Roles.type'
import { IconType } from 'react-icons'

export type MenuOption = {
  label: string
  Icon?: IconType
} & ({ link?: never; children: Omit<MenuOption, 'Icon'>[]; target?: never } | { link: string; children?: never; target?: '_blank' | '_self' }) &
  (
    | ({ id: number; roles?: TRoles[]; exludedRoles?: never } | { id: number; roles?: never; exludedRoles?: TRoles[] })
    | ({ id?: never; roles?: TRoles[]; exludedRoles?: never } | { id?: never; roles?: never; exludedRoles?: TRoles[] })
  )
