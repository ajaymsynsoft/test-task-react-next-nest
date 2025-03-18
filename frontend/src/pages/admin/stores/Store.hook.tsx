import Link from 'next/link'
import { useState } from 'react'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { Chip, Link as MuiLink } from '@mui/material'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useRouter } from 'next/router'

import ConfirmationPopup from '@/components/confirmationPopup/ConfirmationPopup.component'
import { formatToTitleCase, getStatusColor } from '@/utils'
import { StoreDTO } from '@/dto'
import { useDeleteStoreMutation } from '@/redux/api/admin/stores.api'
import { useReduxSelector } from '@/hooks'
import moment from 'moment'

export const useColumns = () => {
  const router = useRouter()
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null)
  const [deleteStaff, { isLoading }] = useDeleteStoreMutation()

  const columns: GridColDef<StoreDTO>[] = [
    {
      field: 'id',
      headerName: 'ID',
      sortable: false,
      minWidth: 85,
      width: 85,
      renderCell: ({ row }) => (
        <MuiLink component={Link} href={`/admin/stores/edit/${row.id}`}>
          #{row.id}
        </MuiLink>
      ),
    },
    {
      field: 'name',
      headerName: 'Store Name',
      sortable: false,
      minWidth: 200,
      flex: 1,
      renderCell: ({ row }) => `${row.name}`,
    },
    {
      field: 'date',
      headerName: 'Create Date',
      sortable: false,
      minWidth: 200,
      renderCell: ({ row }) => moment(row.createdAt).format('ll'),
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
        actions.push(<GridActionsCellItem key="edit" label="Edit" onClick={(_) => router.push(`/admin/stores/edit/${params.id}`)} icon={<MdEdit />} />)

        return actions
      },
    },
  ]

  return columns
}
