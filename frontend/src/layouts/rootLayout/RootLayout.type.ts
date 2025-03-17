import { TRoles } from '@/types'

export type RootLayoutProps = {
  title: string
} & (
  | {
      pageType: 'public' | 'auth'
      sidebar?: void
      header?: boolean
      footer?: boolean
      roles?: void
    }
  | {
      pageType: 'protected'
      sidebar?: boolean
      header?: void
      footer?: void
      roles?: TRoles[]
    }
)
