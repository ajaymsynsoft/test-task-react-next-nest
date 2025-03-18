import Link from 'next/link'
import { useState } from 'react'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { Chip, Link as MuiLink } from '@mui/material'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useRouter } from 'next/router'

import ConfirmationPopup from '@/components/confirmationPopup/ConfirmationPopup.component'
import { formatToTitleCase, getStatusColor } from '@/utils'
import { OrderDTO } from '@/dto'
import { useDeleteStaffMutation } from '@/redux/api/customer.api'
import { useReduxSelector } from '@/hooks'

export const useColumns = () => {
  const router = useRouter()
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null)
  const [deleteStaff, { isLoading }] = useDeleteStaffMutation()
  const { modules } = useReduxSelector((state) => state.layout.profile)

  const columns: GridColDef<OrderDTO>[] = [
    {
      field: 'id',
      headerName: 'ID',
      sortable: false,
      minWidth: 85,
      width: 85,
      renderCell: ({ row }) => (
        <MuiLink component={Link} href={`/customer/staff/edit/${row.id}`}>
          #{row.id}
        </MuiLink>
      ),
    },
    {
      field: 'name',
      headerName: 'Full Name',
      sortable: false,
      minWidth: 200,
      renderCell: ({ row }) => `${row.firstName} ${row.lastName}`,
    },
    {
      field: 'email',
      headerName: 'Email',
      sortable: false,
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'role',
      headerName: 'Role',
      sortable: false,
      minWidth: 180,
      renderCell: ({ row }) => formatToTitleCase(row.role!),
    },
    {
      field: 'phone',
      headerName: 'Phone',
      sortable: false,
      minWidth: 140,
    },
    {
      field: 'status',
      headerName: 'Status',
      sortable: false,
      minWidth: 100,
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

        return []
      },
    },
  ]

  return columns
}
