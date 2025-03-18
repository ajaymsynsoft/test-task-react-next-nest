import { useReduxSelector } from '@/hooks'
import { DisplayPriceProps } from './DisplayPrice.type'
import { formatNumber } from '@/utils'

export default function DisplayPrice({ price, code }: DisplayPriceProps) {
  const { displayCurrency } = useReduxSelector((state) => state.organization)

  return `${formatNumber(price)} ${code || displayCurrency?.code}`
}
