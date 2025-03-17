import { useRouter } from 'next/router'

type TUpdateUrlParamsProps = {
  params: Record<string, string | number | undefined>
  options?: { shallow?: boolean; scroll?: boolean }
}

export const useUrlParams = () => {
  const router = useRouter()

  const setUrlParams = ({ params, options }: TUpdateUrlParamsProps) => {
    const newQuery = { ...router.query }

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === '') delete newQuery[key]
      else newQuery[key] = value as string
    })

    router.replace({ query: newQuery }, undefined, {
      shallow: options?.shallow ?? true,
      scroll: options?.scroll ?? false,
    })
  }

  return { setUrlParams }
}
