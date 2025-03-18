import Image from 'next/image'
import { Box, Button, Card, Stack, Typography } from '@mui/material'

import DisplayPrice from '@/components/displayPrice/DisplayPrice.component'
import { style } from './ProductCard.style'
import { ProductCardProps } from './ProductCard.type'
import { useAddOrderMutation } from '@/redux/api/customer.api'
import { ProductDTO } from '@/dto'

function ProductCard(props: ProductCardProps) {
  const { data } = props
  const [addOrder, { isLoading }] = useAddOrderMutation()

  const placeOrder = async (data: ProductDTO) => {
    await addOrder({ name: data.name, productId: data.id }).unwrap()
  }

  return (
    <Card sx={style.root}>
      <Stack>
        <Stack sx={style.thumbnailBox}>{data.imageUrl && <Box component="img" src={data.imageUrl} alt="Product banner" sx={style.thumbnailImg} />}</Stack>
        <Stack sx={style.contentBox}>
          <Stack gap={0.75}>
            <Typography variant="h2" component="h3">
              {data.name}
            </Typography>
            <DisplayPrice price={data.price} />
            <Typography sx={style.listItemLabel}>Qty: {data.stock}</Typography>
          </Stack>

          <Button fullWidth loading={isLoading} disableRipple variant="outlined" size="large" color="success" onClick={() => placeOrder(data)} sx={style.buyButton}>
            Buy Now
          </Button>
        </Stack>
      </Stack>
    </Card>
  )
}

export default ProductCard
