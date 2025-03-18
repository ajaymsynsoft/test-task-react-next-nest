import { useRouter } from 'next/router'
import { LoadingButton } from '@mui/lab'
import { Grid2, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import InputField from '@/components/_ui/inputField/InputField.component'
import RenderContent from '@/components/renderContent/RenderContent.component'
import { TSchema, schema } from './StoreForm.config'
import { useAddStoreMutation, useUpdateStoreMutation } from '@/redux/api/admin/stores.api'
import { StoreFormProps } from './StoreForm.type'

export default function StoreForm({ isEditMode, data }: StoreFormProps) {
  const router = useRouter()

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
        name: data.name,
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
      {
        <Grid2 container component="form" noValidate onSubmit={handleSubmit(onSubmit)} spacing={2}>
          {/* First Name  */}
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <InputField name="name" label="Store name *" control={control} />
          </Grid2>

          {/* Footer */}
          <Grid2 size={{ xs: 12 }}>
            <Stack direction="row" justifyContent="end" gap={1}>
              <LoadingButton variant="text" disabled={isSubmitting} onClick={() => router.push('/admin/stores')}>
                Cancel
              </LoadingButton>
              <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
                {isEditMode ? 'Update' : 'Save'}
              </LoadingButton>
            </Stack>
          </Grid2>
        </Grid2>
      }
    </RenderContent>
  )
}
