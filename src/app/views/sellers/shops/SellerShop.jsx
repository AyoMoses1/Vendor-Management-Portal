import React, { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import { Grow, Icon, IconButton, TextField, Button } from '@material-ui/core'
import ShopForm from './ShopForm'
import { useDialog } from 'muibox'
import { getShops } from './shop-service'
import Loading from 'matx/components/MatxLoadable/Loading'

const SellerShop = ({ id }) => {
  const [isAlive, setIsAlive] = useState(true)
  const [loading, isLoading] = useState(false)
  const [shop, setShops] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const dialog = useDialog()

  useEffect(() => {
    getShops(id, isLoading, setShops)
    return () => setIsAlive(false)
  }, [id])

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  const columns = [
    {
      name: 'name', // field name in the row object
      label: 'Name', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let Shop = shop[dataIndex]

          return (
            <div className='flex items-center'>
              <div className='ml-3'>
                <h5 className='my-0 text-15'>{`${Shop?.name}`}</h5>
                <small className='text-muted'>{Shop?.email}</small>
                <br />
                <small className='text-muted'>{Shop?.mobileNo}</small>
              </div>
            </div>
          )
        },
      },
    },
    {
      name: 'store',
      label: 'Store',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let Shop = shop[dataIndex]
          return (
            <div className='flex items-center'>
              <div className='ml-3'>
                <h5 className='my-0 text-muted'> {Shop.name || '-----'}</h5>
              </div>
            </div>
          )
        },
      },
    },
    {
      name: 'address',
      label: 'Address',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let Shop = shop[dataIndex]
          return (
            <div className='flex items-center'>
              <div className='ml-3'>
                <h5 className='my-0 text-muted'>{Shop.state || '-----'}</h5>
              </div>
            </div>
          )
        },
      },
    },
  ]

  return (
    <div className='m-sm-30'>
      <div className='overflow-auto'>
        <div className='min-w-750'>
          {loading ? (
            <Loading />
          ) : (
            <MUIDataTable
              title={'Shops'}
              data={shop}
              columns={columns}
              options={{
                onRowsDelete: (data) =>
                  dialog
                    .confirm('Are you sure you want to delete?')
                    .then((value) => value)
                    .catch(() => {
                      return false
                    }),
                filterType: 'textField',
                responsive: 'standard',
                elevation: 0,
                rowsPerPageOptions: [10, 20, 40, 80, 100],
                customSearchRender: (
                  searchText,
                  handleSearch,
                  hideSearch,
                  options
                ) => {
                  return (
                    <Grow appear in={true} timeout={300}>
                      <TextField
                        variant='outlined'
                        size='small'
                        fullWidth
                        onChange={({ target: { value } }) =>
                          handleSearch(value)
                        }
                        InputProps={{
                          style: {
                            paddingRight: 0,
                          },
                          startAdornment: (
                            <Icon className='mr-2' fontSize='small'>
                              search
                            </Icon>
                          ),
                          endAdornment: (
                            <IconButton onClick={hideSearch}>
                              <Icon fontSize='small'>clear</Icon>
                            </IconButton>
                          ),
                        }}
                      />
                    </Grow>
                  )
                },
                customToolbar: () => {
                  return (
                    <>
                      <IconButton
                        onClick={() => {
                          handleModal()
                        }}
                      >
                        <Button variant='contained' color='primary'>
                          <Icon>add</Icon>Add New
                        </Button>
                      </IconButton>
                      <ShopForm
                        states={shop}
                        isOpen={isOpen}
                        handleClose={handleModal}
                        name='Create Shop'
                        id={id}
                      />
                    </>
                  )
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default SellerShop
