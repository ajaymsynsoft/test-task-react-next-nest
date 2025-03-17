import { MenuItemProps } from '@mui/material'
import { MenuOption } from '@/types'

export type NavItemProps = MenuItemProps & {
  data: MenuOption
  isChildren?: boolean
  size?: 'small' | 'large'
}
