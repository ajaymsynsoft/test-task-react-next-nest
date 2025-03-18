export type ConfirmationPopupProps = {
  heading: React.ReactNode
  subheading: React.ReactNode
  loading?: boolean
  open?: boolean
  cancelButtonText?: string
  acceptButtonText: string
  onCancel: () => void
  onAccept: () => void
}
