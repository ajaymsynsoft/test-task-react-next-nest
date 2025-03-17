import { useState } from 'react'
import { useRouter } from 'next/router'
import { LoadingButton } from '@mui/lab'
import { FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import InputField from '@/components/_ui/inputField/InputField.component'
import RenderContent from '@/components/renderContent/RenderContent.component'
import { TSchema, schema } from './StoreForm.config'
import { useAddStoreMutation, useUpdateStoreMutation } from '@/redux/api/admin/stores.api'
import { StoreFormProps } from './StoreForm.type'
import { formatToTitleCase } from '@/utils'

export default function StoreForm({ isEditMode, data }: StoreFormProps) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const [addStore] = useAddStoreMutation()
  const [updateStore] = useUpdateStoreMutation()

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<TSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      isEditMode,
      ...(isEditMode && {
        name: data.name      
      }),
    },
  })

  const onSubmit = async ({ ...formData }: TSchema) => {
    if (isEditMode) await updateStore({ ...formData, id: Number(router.query.id) }).unwrap()
    else await addStore({ ...formData }).unwrap()
    router.push('/admin/stores')
  }

  return (
    <RenderContent loading={false} error={false}>
      {(
        <Grid container component="form" noValidate onSubmit={handleSubmit(onSubmit)} spacing={2}>
          {/* First Name  */}
          <Grid item xs={12} sm={6}>
            <InputField name="name" label="name *" control={control} />
          </Grid>    


          {/* Footer */}
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="end" gap={1}>
              <LoadingButton variant="text" disabled={isSubmitting} onClick={() => router.push('/admin/stores')}>
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
