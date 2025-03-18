import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment'
import { Button, ButtonBase, Card, Grid, Stack, Typography, Link as MuiLink, CardContent, Box } from '@mui/material'
import { GrLocation } from 'react-icons/gr'
import { MdOutlineCalendarToday } from 'react-icons/md'
import { FiArrowRight } from 'react-icons/fi'

import { style } from './EventCard.style'
import { EventCardDashboardProps, EventCardProps } from './EventCard.type'
import { htmlToText, makeEventUrl } from '@/utils'

function EventCard(props: EventCardProps) {
  const { data } = props

  const LIST = [
    {
      Icon: MdOutlineCalendarToday,
      label: (
        <>
          {moment(data.startDate).format()} &nbsp;-&nbsp; {moment(data.endDate).format()}
        </>
      ),
    },
    { Icon: GrLocation, label: data.address },
  ]

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
                <Typography className="line-2">{htmlToText(data.description).slice(0, 110)}</Typography>
              </Stack>

              {/* Info List */}
              <Stack gap={1.5}>
                {LIST.map((item, index) => (
                  <Stack sx={style.listItem} key={index}>
                    <item.Icon />
                    <Typography sx={style.listItemLabel}>{item.label}</Typography>
                  </Stack>
                ))}
              </Stack>

              <Button variant="rounded" color="inherit" disableRipple endIcon={<FiArrowRight />} sx={style.bookingButton}>
                Booking
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* TODO: add size attribute */}
            <Stack sx={style.thumbnailBox}>
              <Image src={data.bannerImage} fill alt="Event banner" />
            </Stack>
          </Grid>
        </Grid>
      </ButtonBase>
    </Card>
  )
}

function EventCardDashboard({ data }: EventCardDashboardProps) {
  const LIST = [
    {
      Icon: MdOutlineCalendarToday,
      label: (
        <>
          {moment(data.startDate).format()} &nbsp;-&nbsp; {moment(data.endDate).format()}
        </>
      ),
    },
    { Icon: GrLocation, label: `${data.address}, ${data.city}, ${data.state}, ${data!.country}` },
  ]

  return (
    <Card variant="outlined" sx={{ bgcolor: 'transparent' }}>
      <CardContent component={Stack} gap={2}>
        <Typography variant="h2" component="h3">
          {data.name}
        </Typography>

        {/* Info List */}
        <Stack gap={1.25}>
          {LIST.map((item, index) => (
            <Stack direction="row" gap={1.5} key={index}>
              <Box component={item.Icon} color="text.disabled" />
              <Typography>{item.label}</Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}

EventCard.dashboard = EventCardDashboard
export default EventCard
