import { useReduxSelector } from '@/hooks'
import { DisplayPriceProps } from './DisplayPrice.type'
import { formatNumber } from '@/utils'

export default function DisplayPrice({ price, code }: DisplayPriceProps) {
  return `Price: $${formatNumber(price)}`
}
