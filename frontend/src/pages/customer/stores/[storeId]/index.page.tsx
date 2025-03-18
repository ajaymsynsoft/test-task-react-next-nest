import Head from 'next/head'
import Link from 'next/link'
import moment from 'moment'
import Image from 'next/image'
import { GrLocation } from 'react-icons/gr'
import { MdOutlineCalendarToday } from 'react-icons/md'
import { InferGetStaticPropsType, GetServerSideProps } from 'next'
import { Box, Button, Container, FormHelperText, Grid, Stack, Typography, Card, CardContent } from '@mui/material'

import DisplayPrice from '@/components/displayPrice/DisplayPrice.component'
import { Page } from '@/types'
import { eventService } from '@/services/event.service'
import { makeEventUrl } from '@/utils'
import { style } from './EventDetails.style'
import { useReduxSelector } from '@/hooks'

const EventDetails: Page = (props: InferGetStaticPropsType<typeof getServerSideProps>) => {
  const { event, eventId } = props
  const {
    isLoggedIn,
    profile: { role },
  } = useReduxSelector((state) => state.layout)
  const canBookEvent = isLoggedIn ? role === 'customer' : true

  const prices = event.roleWiseData.map((item) => item.price)
  const lowestPrice = Math.min(...prices)
  const highestPrice = Math.max(...prices)

  const LIST = [
    {
      Icon: MdOutlineCalendarToday,
      label: (
        <>
          {moment(event.startDate).format()} &nbsp;-&nbsp; {moment(event.endDate).format()}
        </>
      ),
    },
    {
      Icon: GrLocation,
      label: (
        <>
          {event.address}, {event.city}, {event.state}, {event?.country}
        </>
      ),
    },
  ]

  return (
    <>
      <Head>
        <title>{event.name}</title>
      </Head>

      <Stack>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Stack gap={3}>
                <Stack sx={style.bannerBox}>
                  <Image src={event.bannerImage} width={760} height={417} alt="banner image" />
                </Stack>
                <Typography variant="h1" fontWeight={800}>
                  {event.name}
                </Typography>
                <Stack gap={2}>
                  <Typography variant="h2" fontWeight={800}>
                    Description
                  </Typography>
                  <Box className="text-editor-content" dangerouslySetInnerHTML={{ __html: event.description }} />
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={style.bookingCard}>
                <CardContent sx={style.bookingCardContent}>
                  <Stack gap={1.25}>
                    {LIST.map((item, index) => (
                      <Stack sx={style.listItem} key={index}>
                        <item.Icon />
                        <Typography sx={style.listItemLabel}>{item.label}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Stack sx={style.priceContainer}>
                    <DisplayPrice price={lowestPrice} />
                    {highestPrice > lowestPrice && (
                      <>
                        {' '}
                        - <DisplayPrice price={highestPrice} />
                      </>
                    )}
                    <Typography>&nbsp; / guest</Typography>
                  </Stack>
                  <Stack alignItems="center">
                    <Button fullWidth size="large" variant="contained" disabled={!canBookEvent} component={Link} href={`${makeEventUrl(event.name, event.id)}/booking`}>
                      Book Event
                    </Button>
                    <FormHelperText>{!canBookEvent && 'Oops! Only customer can book event'}</FormHelperText>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Stack>
    </>
  )
}

export const getServerSideProps = (async ({ params }) => {
  const eventId = params?.eventId as string
  const event = await eventService.getEvent(eventId)

  return {
    props: { event, eventId },
    notFound: !event,
  }
}) satisfies GetServerSideProps

EventDetails.rootLayoutProps = {
  title: 'Event Details',
  pageType: 'public',
}

export default EventDetails
