import { useState } from 'react'
import { useRouter } from 'next/router'
import { LoadingButton } from '@mui/lab'
import { FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import InputField from '@/components/_ui/inputField/InputField.component'

import RenderContent from '@/components/renderContent/RenderContent.component'
import { TSchema, schema } from './ProductForm.config'
import { useAddProductMutation, useUpdateProductMutation } from '@/redux/api/admin/products.api'
import { ProductFormProps } from './ProductForm.type'
import { formatToTitleCase } from '@/utils'

export default function ProductForm({ isEditMode, data }: ProductFormProps) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const [addProduct] = useAddProductMutation()
  const [updateProduct] = useUpdateProductMutation()
  const { data: staffRoleList, isLoading, isError } = useGetStoreListQuery()

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<TSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      isEditMode,
      ...(isEditMode && {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        status: data.status,
        roleId: data.roleId,
      }),
    },
  })

  const onSubmit = async ({ ...formData }: TSchema) => {
    if (isEditMode) await updateProduct({ ...formData, id: Number(router.query.id) }).unwrap()
    else await addProduct({ ...formData }).unwrap()
    router.push('/admin/products')
  }

  return (
    <RenderContent loading={isLoading} error={isError}>
      {staffRoleList && (
        <Grid container component="form" noValidate onSubmit={handleSubmit(onSubmit)} spacing={2}>
          {/* First Name  */}
          <Grid item xs={12} sm={6}>
            <InputField name="firstName" label="First name *" control={control} />
          </Grid>

          {/* Last Name */}
          <Grid item xs={12} sm={6}>
            <InputField name="lastName" label="Last name *" control={control} />
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6}>
            <InputField name="email" label="Email *" control={control} disabled={isEditMode} />
          </Grid>

          {/* Phone */}
          <Grid item xs={12} sm={6}>
          <InputField name="email" label="Email *" control={control} disabled={isEditMode} />
          </Grid>

          {/* Role */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="roleId"
              control={control}
              defaultValue={'' as any}
              render={({ fieldState: { error }, field: { ref, ...restField } }) => (
                <FormControl error={!!error}>
                  <InputLabel>Role *</InputLabel>
                  <Select {...restField} inputRef={ref} label="Role *">
                    {staffRoleList.map((item, index) => (
                      <MenuItem value={item.id} key={index}>
                        {formatToTitleCase(item.name)}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{error?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>   

          {/* Footer */}
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="end" gap={1}>
              <LoadingButton variant="text" disabled={isSubmitting} onClick={() => router.push('/dashboard/staff')}>
                Cancel
              </LoadingButton>
              <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
                {isEditMode ? 'Update' : 'Save'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      )}
    </RenderContent>
  )
}
