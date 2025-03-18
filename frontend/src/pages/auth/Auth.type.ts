import { ProfileDTO } from '@/dto'

export type AuthApiResponse = ProfileDTO & { token: string; isAdmin: string }
