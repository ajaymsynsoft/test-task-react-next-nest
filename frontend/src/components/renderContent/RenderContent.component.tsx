import { Alert, Button, CircularProgress, Stack } from '@mui/material'
import { RenderContentProps } from './RenderContent.type'

export default function RenderContent(props: RenderContentProps) {
  const { loading, error, children, errorMessage } = props

  return error ? (
    <Alert
      severity="error"
      // TODO: update it
      sx={{ width: 1, alignItems: 'center', flexWrap: 'wrap' }}
      action={
        <Button color="inherit" size="small" onClick={() => location.reload()}>
          Try again
        </Button>
      }
    >
      {errorMessage || 'Sorry! Something went wrong'}
    </Alert>
  ) : loading ? (
    <Stack component={CircularProgress} mx="auto" />
  ) : (
    children
  )
}
