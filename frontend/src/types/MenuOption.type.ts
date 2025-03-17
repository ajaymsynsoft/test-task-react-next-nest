import { Roles } from './Roles.type'
import { IconType } from 'react-icons'

export type MenuOption = {
  label: string
  Icon?: IconType
} & ({ link?: never; children: Omit<MenuOption, 'Icon'>[]; target?: never } | { link: string; children?: never; target?: '_blank' | '_self' }) &
  (
    | ({ id: number; roles?: Roles[]; exludedRoles?: never } | { id: number; roles?: never; exludedRoles?: Roles[] })
    | ({ id?: never; roles?: Roles[]; exludedRoles?: never } | { id?: never; roles?: never; exludedRoles?: Roles[] })
  )
