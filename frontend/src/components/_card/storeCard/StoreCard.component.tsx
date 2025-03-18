import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment'
import { Button, ButtonBase, Card, Grid, Stack, Typography, Link as MuiLink, CardContent, Box } from '@mui/material'
import { FiArrowRight } from 'react-icons/fi'

import { style } from './StoreCard.style'
import { EventCardProps } from './StoreCard.type'
import { htmlToText, makeEventUrl } from '@/utils'

function StoreCard(props: EventCardProps) {
  const { data } = props

  return (
    <Card sx={style.root}>
      <ButtonBase component={Link} href={makeEventUrl(data.name, data.id)} sx={style.box}>
        <Typography variant="h2" component="h3">
          {data.name}
        </Typography>

        <Button endIcon={<FiArrowRight />}>View Store</Button>
      </ButtonBase>
    </Card>
  )
}

export default StoreCard
