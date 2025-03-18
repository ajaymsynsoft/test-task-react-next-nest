import { Theme } from '@mui/material'
import { GridOverlay } from '@mui/x-data-grid'

export const overridesComponent = (theme: Theme) => {
  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: 'outlined',
      },
      styleOverrides: {
        root: ({ ownerState }) =>
          theme.unstable_sx({
            textTransform: 'unset',
            ...(ownerState.variant === 'contained' && {
              fontWeight: 400,
            }),
          }),
        sizeLarge: theme.unstable_sx({
          py: 1.25,
          fontSize: 'body1.fontSize',
        }),
        contained: theme.unstable_sx({
          wordSpacing: 2,
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: theme.unstable_sx({
          borderColor: 'dividerDark',
        }),
      },
    },
    MuiFormControl: {
      defaultProps: {
        fullWidth: true,
      },
      styleOverrides: {
        root: theme.unstable_sx({
          '& > .MuiInputLabel-outlined': {
            '&.MuiInputLabel-shrink, &.MuiInputLabel-shrink ~ div > fieldset.MuiOutlinedInput-notchedOutline': {
              fontSize: `calc(${theme.typography.body1.fontSize} + 2px) !important`,
            },
          },
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: { cursor: 'pointer' },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: theme.unstable_sx({
          ':empty': {
            mt: 0,
          },
          mx: 1.75,
          '&:not(.Mui-error)': {
            fontWeight: 500,
          },
        }),
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: theme.unstable_sx({
          fontSize: '1.375rem',
        }),
      },
    },
    MuiPagination: {
      defaultProps: {
        shape: 'rounded',
        color: 'primary',
      },
      styleOverrides: {
        root: theme.unstable_sx({
          '.MuiPaginationItem-page': {
            fontSize: 'body1.fontSize',
          },
        }),
      },
    },
    MuiDataGrid: {
      defaultProps: {
        // TODO: test it
        autoHeight: true,
        row: [],
        rowCount: 0,
        rowHeight: 53,
        columnHeaderHeight: 40,
        disableRowSelectionOnClick: true,
        disableColumnMenu: true,
        paginationMode: 'server',
        pageSizeOptions: [10, 25, 50, 100],
        showCellVerticalBorder: true,
        showColumnVerticalBorder: true,
        // TODO: update it
        slots: {
          noRowsOverlay: () => <GridOverlay sx={{ color: 'text.secondary' }}>No record found</GridOverlay>,
        },
        slotProps: {
          loadingOverlay: {
            variant: 'skeleton',
            noRowsVariant: 'skeleton',
          },
        },
      },
      styleOverrides: {
        root: theme.unstable_sx({
          '--DataGrid-rowBorderColor': theme.palette.divider,
          color: 'text.primary',
          overflowWrap: 'anywhere',
          display: 'grid',
          animation: 'fadeIn 0.5s forwards',
          '&.MuiDataGrid-withBorderColor, .MuiDataGrid-withBorderColor': {
            borderColor: 'var(--DataGrid-rowBorderColor)',
          },
          '.MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
            outline: 'unset !important',
          },
          '.MuiDataGrid-columnHeaderTitle': {
            fontWeight: 600,
            fontSize: 'body1.fontSize',
          },
          '.MuiDataGrid-row--dynamicHeight': {
            '.MuiDataGrid-cell': {
              py: 1.25,
              display: 'flex',
              alignItems: 'center',
              minHeight: 40,
            },
          },
          '.MuiDataGrid-row > .MuiDataGrid-cell.MuiDataGrid-cell--withRightBorder:nth-last-of-type(2), .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader.MuiDataGrid-columnHeader--withRightBorder:nth-last-of-type(3)': {
            borderRightWidth: '0 !important',
          },
        }),
      },
    },
  } as Theme['components']
}
