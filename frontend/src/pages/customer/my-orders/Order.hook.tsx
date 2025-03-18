import { useState } from 'react'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { Chip } from '@mui/material'
import { MdDelete } from 'react-icons/md'
import { useRouter } from 'next/router'

import ConfirmationPopup from '@/components/confirmationPopup/ConfirmationPopup.component'
import { formatToTitleCase, getStatusColor } from '@/utils'
import { OrderDTO } from '@/dto'
import { useReduxSelector } from '@/hooks'
import { useUpdateOrderMutation } from '@/redux/api/customer.api'

export const useColumns = () => {
  const router = useRouter()
  const [returnItemId, setReturnItemId] = useState<number | null>(null)
  const [updateOrderStatus, { isLoading }] = useUpdateOrderMutation()

  const columns: GridColDef<OrderDTO>[] = [
    {
      field: 'id',
      headerName: 'ID',
      sortable: false,
      minWidth: 85,
      width: 85,
      renderCell: ({ row }) => `#${row.id}`,
    },
    {
      field: 'product',
      headerName: 'Product',
      sortable: false,
      flex: 1,
      minWidth: 200,
      renderCell: ({ row }) => `${row.name}`,
    },
    {
      field: 'storeName',
      headerName: 'Store Name',
      sortable: false,
      flex: 1,
      minWidth: 180,
      renderCell: ({ row }) => formatToTitleCase(row.store.name),
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      sortable: false,
      minWidth: 100,
      width: 100,
    },
    {
      field: 'status',
      headerName: 'Status',
      sortable: false,
      minWidth: 150,
      renderCell: (params) => {
        return <Chip label={formatToTitleCase(params.value)} variant="outlined" color={getStatusColor(params.value)} />
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      minWidth: 80,
      width: 80,
      align: 'center',
      type: 'actions',
      getActions: (params) => {
        const actions = []
        if (params.row.status == 'completed') {
          actions.push(
            <GridActionsCellItem showInMenu key="return" label="Return" icon={<MdDelete />} onClick={() => setReturnItemId(params.row.id)} />,
            <ConfirmationPopup
              key="deletePopup"
              heading="Delete product"
              subheading={`Sure to return "${params.row.name}" order?`}
              acceptButtonText="Return"
              loading={isLoading}
              open={params.id === returnItemId}
              onCancel={() => setReturnItemId(null)}
              onAccept={() =>
                updateOrderStatus({ id: params.row.id })
                  .unwrap()
                  .then((_) => setReturnItemId(null))
              }
            />,
          )
        }
        return actions
      },
    },
  ]

  return columns
}
