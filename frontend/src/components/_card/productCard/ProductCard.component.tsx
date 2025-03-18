import Image from 'next/image'
import Link from 'next/link'
import { Button, Card, Grid, Stack, Typography, Link as MuiLink, CardContent, Box } from '@mui/material'
import { GrLocation } from 'react-icons/gr'
import DisplayPrice from '@/components/displayPrice/DisplayPrice.component'
import { FiArrowRight } from 'react-icons/fi'
import { style } from './ProductCard.style'
import { ProductCardProps } from './ProductCard.type'
import { useAddOrderMutation } from '@/redux/api/customer.api'

function ProductCard(props: ProductCardProps) {
  const { data } = props
  const [addOrder] = useAddOrderMutation()

  const placeOrder = async (data) => {
    await addOrder({ name:data.name,productId:data.id }).unwrap()
  }

  return (
    <Card sx={style.root}>      
        <Grid container height={1} flexWrap="wrap-reverse">
          <Grid item xs={12} sm={6}>
            <Stack sx={style.contentBox}>
              <Stack gap={0.75}>
                <Typography variant="h2" component="h3">
                  {data.name}
                </Typography>  
                <DisplayPrice price={data.price} />   
                <Typography sx={style.listItemLabel}>Qty: {data.stock}</Typography>                          
              </Stack>                    

              <Button onClick={()=>{placeOrder(data)}} variant="rounded" color="inherit" disableRipple sx={style.bookingButton}>
                Buy Now
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>            
            <Stack sx={style.thumbnailBox}>
              <Image src={data.image_url} fill alt="Product banner" />
            </Stack>
          </Grid>
        </Grid>     
    </Card>
  )
}




export default ProductCard
