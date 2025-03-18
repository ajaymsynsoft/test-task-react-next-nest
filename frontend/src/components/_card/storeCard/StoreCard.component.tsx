import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment'
import { Button, ButtonBase, Card, Grid, Stack, Typography, Link as MuiLink, CardContent, Box } from '@mui/material'
import { GrLocation } from 'react-icons/gr'
import { MdOutlineCalendarToday } from 'react-icons/md'
import { FiArrowRight } from 'react-icons/fi'

import { style } from './StoreCard.style'
import { EventCardProps } from './StoreCard.type'
import { htmlToText, makeEventUrl } from '@/utils'

function StoreCard(props: EventCardProps) {
  const { data } = props

  return (
    <Card sx={style.root}>
      <ButtonBase component={Link} href={makeEventUrl(data.name, data.id)} sx={style.box}>
        <Grid container height={1} flexWrap="wrap-reverse">
          <Grid item xs={12} sm={6}>
            <Stack sx={style.contentBox}>
              <Stack gap={0.75}>
                <Typography variant="h2" component="h3">
                  {data.name}
                </Typography>               
              </Stack>   
             

              <Button variant="rounded" color="inherit" disableRipple endIcon={<FiArrowRight />} sx={style.bookingButton}>
                View Store
              </Button>
            </Stack>
          </Grid>
          {/* <Grid item xs={12} sm={6}>            
            <Stack sx={style.thumbnailBox}>
              <Image src={data.bannerImage} fill alt="Event banner" />
            </Stack>
          </Grid> */}
        </Grid>
      </ButtonBase>
    </Card>
  )
}




export default StoreCard
