import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link as MuiLink, IconButton, Stack, Typography, Container, Grid } from '@mui/material'

import InputField from '@/components/_ui/inputField/InputField.component'
import { style } from './Register.style'
import { TPage } from '@/types'
import { schema, TSchema } from './Register.config'
import { setUser } from '../Auth.util'
import { jsonToFormData } from '@/utils'
import { useRegisterMutation } from '@/redux/api/auth.api'

const Register: TPage = () => {
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

  const onSubmit = async () => {
    // TODO: update it
    const formData = schema.validateSync(getValues())
    const profile = await register(jsonToFormData(formData)).unwrap()
    // setUser(profile)
    reset()
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
            <Typography variant="display2" textAlign="center" fontWeight={700}>
              Register Buyer
            </Typography>
            <Typography textAlign="center">
              Already have an account? &nbsp;{' '}
              <MuiLink underline="hover" component={Link} href="/auth/login">
                Log In
              </MuiLink>
            </Typography>
          </Stack>

          <Grid container spacing={2}>
         
            {/* Email */}
            <Grid item xs={12} sm={6}>
              <InputField name="email" label="Email *" control={control} />
            </Grid>


            <Grid container item spacing={2} xs={12} sm={8} alignContent="start">
             
              {/* Password */}
              <Grid item xs={12}>
                <InputField
                  name="password"
                  label="Password *"
                  type={showPassword ? 'text' : 'password'}
                  control={control}
                  InputProps={{
                    endAdornment: <IconButton onClick={() => setShowPassword((v) => !v)}>{showPassword ? <MdVisibility /> : <MdVisibilityOff />}</IconButton>,
                  }}
                />
              </Grid>

              {/* Confirm Password */}
              <Grid item xs={12}>
                <InputField
                  name="confirmPassword"
                  label="Confirm password *"
                  type={showConfirmPassword ? 'text' : 'password'}
                  control={control}
                  inputProps={{ autoComplete: 'new-password' }}
                  InputProps={{
                    endAdornment: <IconButton onClick={() => setShowConfirmPassword((v) => !v)}>{showConfirmPassword ? <MdVisibility /> : <MdVisibilityOff />}</IconButton>,
                  }}
                />
              </Grid>
            </Grid>        

          </Grid>

          {/* Action */}
          <LoadingButton variant="contained" size="large" type="submit" loading={isSubmitting} sx={style.submitBtn}>
            Create Account
          </LoadingButton>
        </Stack>
      </Container>
    </>
  )
}

Register.rootLayoutProps = {
  pageType: 'auth',
  title: 'Register Organization',
}

export default Register
