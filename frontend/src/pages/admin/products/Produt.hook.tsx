import Link from 'next/link'
import { useState } from 'react'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { Chip, Link as MuiLink } from '@mui/material'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useRouter } from 'next/router'

import ConfirmationPopup from '@/components/confirmationPopup/ConfirmationPopup.component'
import { formatToTitleCase, getStatusColor } from '@/utils'
import { ProductDTO } from '@/dto'
import { useDeleteProductMutation, useUpdateProductMutation } from '@/redux/api/admin/products.api'
import { IoMdRefresh } from 'react-icons/io'

export const useColumns = () => {
  const router = useRouter()
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null)
  const [updateItemId, setUpdateItemId] = useState<number | null>(null)
  const [deleteProduct, { isLoading }] = useDeleteProductMutation()
  const [updateProduct, updateProductApiState] = useUpdateProductMutation()

  const columns: GridColDef<ProductDTO>[] = [
    {
      field: 'id',
      headerName: 'ID',
      sortable: false,
      minWidth: 85,
      width: 85,
      renderCell: ({ row }) => (
        <MuiLink component={Link} href={`/admin/products/edit/${row.id}`}>
          #{row.id}
        </MuiLink>
      ),
    },
    {
      field: 'name',
      headerName: 'Product Name',
      sortable: false,
      flex: 1,
      minWidth: 200,
      renderCell: ({ row }) => `${row.name}`,
    },
    {
      field: 'storeName',
      headerName: 'Store Name',
      sortable: false,
      minWidth: 200,
      renderCell: ({ row }) => `${row.store.name}`,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      sortable: false,
      minWidth: 100,
    },
    {
      field: 'price',
      headerName: 'Price',
      sortable: false,
      minWidth: 100,
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
        const actions = []
        actions.push(<GridActionsCellItem showInMenu key="edit" label="Edit" onClick={(_) => router.push(`/admin/products/edit/${params.id}`)} icon={<MdEdit />} />)

        actions.push(
          <GridActionsCellItem showInMenu key="delete" label="Delete" icon={<MdDelete />} onClick={() => setDeleteItemId(params.row.id)} />,
          <ConfirmationPopup
            key="deletePopup"
            heading="Delete product"
            subheading={`Sure to delete "${params.row.name}" product?`}
            acceptButtonText="Delete"
            loading={isLoading}
            open={params.id === deleteItemId}
            onCancel={() => setDeleteItemId(null)}
            onAccept={() =>
              deleteProduct(params.row.id)
                .unwrap()
                .then((_) => setDeleteItemId(null))
            }
          />,
        )
        if (params.row.status == 'active') {
          actions.push(
            <GridActionsCellItem showInMenu key="update" label="Change Status" icon={<IoMdRefresh />} onClick={() => setUpdateItemId(params.row.id)} />,
            <ConfirmationPopup
              key="updatePopup"
              heading="Update product"
              subheading={`Sure to mark as phase out "${params.row.name}" product?`}
              acceptButtonText="Done"
              loading={updateProductApiState.isLoading}
              open={params.id === updateItemId}
              onCancel={() => setUpdateItemId(null)}
              onAccept={() =>
                updateProduct({ id: params.row.id, status: 'inActive' })
                  .unwrap()
                  .then((_) => setUpdateItemId(null))
              }
            />,
          )
        } else {
          actions.push(
            <GridActionsCellItem showInMenu key="update" label="Change Status" icon={<IoMdRefresh />} onClick={() => setUpdateItemId(params.row.id)} />,
            <ConfirmationPopup
              key="updatePopup"
              heading="Update product"
              subheading={`Sure to mark as active "${params.row.name}" product?`}
              acceptButtonText="Done"
              loading={updateProductApiState.isLoading}
              open={params.id === updateItemId}
              onCancel={() => setUpdateItemId(null)}
              onAccept={() =>
                updateProduct({ id: params.row.id, status: 'active' })
                  .unwrap()
                  .then((_) => setUpdateItemId(null))
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
