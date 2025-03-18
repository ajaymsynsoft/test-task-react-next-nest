import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import { yupResolver } from '@hookform/resolvers/yup'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { Link as MuiLink, IconButton, Stack, Typography, Container } from '@mui/material'

import InputField from '@/components/_ui/inputField/InputField.component'
import { style } from './Login.style'
import { TPage } from '@/types'
import { schema, TSchema } from './Login.config'
import { useLoginMutation } from '@/redux/api/auth.api'
import { setUser } from '../Auth.util'

const Login: TPage = () => {
  const [login] = useLoginMutation()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TSchema>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (formData: TSchema) => {
    const profile = await login({ ...formData }).unwrap()
    setUser(profile)
  }

  return (
    <>
      <style global jsx>{`
        main {
          display: flex;
          justify-content: center;
        }
      `}</style>

      <Container className="section-spacing-my">
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={style.box}>
          <Stack gap={1.5}>
            <Typography variant="h1" textAlign="center" fontWeight={700}>
              Log In
            </Typography>
            <Typography textAlign="center">
              Don't have an account? &nbsp;{' '}
              <MuiLink component={Link} underline="hover" href="/auth/register">
                Register
              </MuiLink>
            </Typography>
          </Stack>

          <Stack gap={2}>
            <InputField name="email" label="Email" control={control} />
            <InputField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              control={control}
              slotProps={{ input: { endAdornment: <IconButton onClick={() => setShowPassword((v) => !v)}>{showPassword ? <MdVisibility /> : <MdVisibilityOff />}</IconButton> } }}
            />
          </Stack>

          <LoadingButton variant="contained" size="large" type="submit" loading={isSubmitting}>
            Log In
          </LoadingButton>
        </Stack>
      </Container>
    </>
  )
}

Login.rootLayoutProps = {
  pageType: 'auth',
  title: 'Login',
}

export default Login
