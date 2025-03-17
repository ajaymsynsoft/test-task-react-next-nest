import SimpleBar from 'simplebar-react'
import { styled } from '@mui/material'
import 'simplebar-react/dist/simplebar.min.css'

const Scrollbar = styled(SimpleBar)(({ theme }) =>
  theme.unstable_sx({
    '.simplebar-content-wrapper': {
      outline: 'unset',
    },
    '.simplebar-scrollbar:before': {
      bgcolor: '#8b8b8b',
    },
    '.simplebar-track.simplebar-vertical': {
      width: 10,
    },
  }),
)

export default Scrollbar
