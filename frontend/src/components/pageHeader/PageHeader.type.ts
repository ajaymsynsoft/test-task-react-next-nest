import { SxProps, Theme } from '@mui/material'

export type PageHeaderProps = {
  sx?: SxProps<Theme>
  actions?: React.ReactNode
  heading: React.ReactNode
  count?: number
  backUrl?: string
  variant?: 'border' | 'no-border'
  size?: 'small' | 'medium'
}
