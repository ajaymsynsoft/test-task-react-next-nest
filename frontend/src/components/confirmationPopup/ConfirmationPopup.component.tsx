import { Dialog, DialogActions, DialogContent, DialogTitle, Grid2, Typography, Button } from '@mui/material'

import { ConfirmationPopupProps } from './ConfirmationPopup.type'

export default function ConfirmationPopup(props: ConfirmationPopupProps) {
  const { heading, subheading, loading, acceptButtonText, cancelButtonText, onAccept, onCancel } = props

  return (
    <Dialog open fullWidth onClose={() => !loading && onCancel()}>
      <DialogTitle>{heading}</DialogTitle>
      <DialogContent>
        <Typography variant="h4">{subheading}</Typography>
      </DialogContent>
      <DialogActions sx={{ color: 'text.secondary' }}>
        <Grid2 container width={1} justifyContent="end">
          <Grid2 size={{ xs: 6, sm: 'auto' }}>
            <Button variant="outlined" color="inherit" fullWidth disabled={loading} onClick={onCancel}>
              {cancelButtonText || 'Cancel'}
            </Button>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 'auto' }}>
            <Button variant="gradient" fullWidth loading={loading} onClick={onAccept}>
              {acceptButtonText}
            </Button>
          </Grid2>
        </Grid2>
      </DialogActions>
    </Dialog>
  )
}
