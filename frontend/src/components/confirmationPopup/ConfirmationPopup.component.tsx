import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogContent, Stack, Typography } from '@mui/material'

import { ConfirmationPopupProps } from './ConfirmationPopup.type'

export default function ConfirmationPopup(props: ConfirmationPopupProps) {
  const { heading, subheading, loading, open = true, acceptButtonText, cancelButtonText, onAccept, onCancel } = props

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={() => !loading && onCancel()}>
      <DialogContent>
        <Stack gap={2}>
          <Stack gap={1}>
            <Typography variant="h2" fontWeight={600}>
              {heading}
            </Typography>
            <Typography component="div">{subheading}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="end" gap={1}>
            <Button variant="text" disabled={loading} onClick={onCancel}>
              {cancelButtonText || 'Cancel'}
            </Button>
            <LoadingButton variant="contained" loading={loading} onClick={onAccept}>
              {acceptButtonText}
            </LoadingButton>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
