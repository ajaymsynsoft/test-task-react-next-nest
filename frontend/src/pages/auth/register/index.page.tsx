import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { Link as MuiLink, IconButton, Stack, Typography, Container, Grid2 } from '@mui/material'

import InputField from '@/components/_ui/inputField/InputField.component'
import { style } from './Register.style'
import { TPage } from '@/types'
import { schema, TSchema } from './Register.config'
import { setUser } from '../Auth.util'
import { useRegisterMutation } from '@/redux/api/auth.api'

const Register: TPage = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [register] = useRegisterMutation()

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { isSubmitting },
  } = useForm<TSchema>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (formData: TSchema) => {
    const profile = await register({ ...formData }).unwrap()
    // setUser(profile)
    reset()
    router.push(`/auth/login`)
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
              Register Buyer
            </Typography>
            <Typography textAlign="center">
              Already have an account? &nbsp;{' '}
              <MuiLink underline="hover" component={Link} href="/auth/login">
                Log In
              </MuiLink>
            </Typography>
          </Stack>

          <Grid2 container spacing={2}>
            {/* Full name */}
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <InputField name="fullName" label="Full name *" control={control} />
            </Grid2>

            {/* Email */}
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <InputField name="email" label="Email *" control={control} />
            </Grid2>

            {/* Password */}
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <InputField
                name="password"
                label="Password *"
                type={showPassword ? 'text' : 'password'}
                control={control}
                slotProps={{ input: { endAdornment: <IconButton onClick={() => setShowPassword((v) => !v)}>{showPassword ? <MdVisibility /> : <MdVisibilityOff />}</IconButton> } }}
              />
            </Grid2>

            {/* Confirm Password */}
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <InputField
                name="confirmPassword"
                label="Confirm password *"
                type={showConfirmPassword ? 'text' : 'password'}
                control={control}
                slotProps={{ input: { autoComplete: 'new-password', endAdornment: <IconButton onClick={() => setShowConfirmPassword((v) => !v)}>{showConfirmPassword ? <MdVisibility /> : <MdVisibilityOff />}</IconButton> } }}
              />
            </Grid2>
          </Grid2>

          {/* Action */}
          <LoadingButton variant="contained" size="large" type="submit" loading={isSubmitting} sx={style.submitBtn}>
            Register
          </LoadingButton>
        </Stack>
      </Container>
    </>
  )
}

Register.rootLayoutProps = {
  pageType: 'auth',
  title: 'Register Buyer',
}

export default Register
