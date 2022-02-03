import React, { useEffect } from 'react'
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  TextField,
  Grow,
  Box,
} from '@material-ui/core'
import MUIDataTable from 'mui-datatables'

import http from '../../../services/api'

import { SimpleCard, Breadcrumb } from 'matx'

import Loading from 'matx/components/MatxLoadable/Loading'
import AddProductToClass from './AddProductToClass'
import { Link } from 'react-router-dom'

const ShippingClassDetails = ({ location, match }) => {
  const [loading, setLoading] = React.useState(false)
  const [shippingClass, setShippingClass] = React.useState([])
  const [open, setOpen] = React.useState(false)

  const { id } = location.state

  const getShippingClassDetails = (classId) => {
    setLoading(true)
    http.get(`/afrimash/shipping-class/${classId}`).then((res) => {
      setShippingClass(res?.data.object)
      setLoading(false)
    })
  }

  const handleModal = () => {
    setOpen(!open)
  }

  const columns = [
    {
      name: 'name', // field name in the row object
      label: 'Name', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = shippingClass?.productList[dataIndex]
          return (
            <Link
              to={{
                pathname: `/product/details/${user.id}`,
                state: {
                  id: user.id,
                },
              }}
              className='flex items-center'
            >
              <div>
                <h5 className='my-0'>{user?.name}</h5>
              </div>
            </Link>
          )
        },
      },
    },
  ]

  useEffect(() => {
    getShippingClassDetails(id)
  }, [id])

  return (
    <div className='m-sm-30'>
      <div className='mb-sm-30'>
        <Breadcrumb
          routeSegments={[
            { name: 'Shipping Class', path: '/shipping-classes' },
            { name: 'Shipping Class Details' },
          ]}
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <SimpleCard>
            <div className='flex flex-space-between flex-middle'>
              <h5 className='pl-4 text-left'>Shipping Class Details</h5>
              <Button
                variant='contained'
                color='primary'
                onClick={() => {
                  handleModal()
                }}
              >
                Add product to class
              </Button>
            </div>
            <AddProductToClass
              isOpen={open}
              handleClose={handleModal}
              id={id}
            />
            <Divider className='mt-4' />
            <Table className='mb-4'>
              <TableBody>
                <TableRow>
                  <TableCell className='pl-4'>Class Name</TableCell>
                  <TableCell>
                    <h5 className='mt-4 mb-2'>{shippingClass.name}</h5>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-4'>Description</TableCell>
                  <TableCell>
                    <div>{shippingClass.description}</div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </SimpleCard>
          <Divider />
          <Box mt={5}>
            <SimpleCard>
              <MUIDataTable
                title={'Class Products'}
                data={shippingClass?.productList}
                columns={columns}
                options={{
                  filterType: 'textField',
                  responsive: 'standard',
                  elevation: 5,
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
                        />
                      </Grow>
                    )
                  },
                }}
              />
            </SimpleCard>
          </Box>
        </>
      )}
    </div>
  )
}

export default ShippingClassDetails
