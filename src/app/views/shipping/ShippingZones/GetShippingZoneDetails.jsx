import React, { useEffect } from 'react'
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Box,
  TextField,
  Grow,
} from '@material-ui/core'

import http from '../../../services/api'
import MUIDataTable from 'mui-datatables'
import { SimpleCard, Breadcrumb } from 'matx'

import Loading from 'matx/components/MatxLoadable/Loading'
import StatesModal from './AddStateModal'
import ShippingOptionByZone from './ShippingOptionByZone';

const ShippingZoneDetails = ({ location, match }) => {
  const [loading, setLoading] = React.useState(false)
  const [shippingZone, setShippingZone] = React.useState([])
  const [open, setOpen] = React.useState(false)

  const { id } = location.state

  console.log({id})

  const getShippingZoneDetails = (zoneId) => {
    setLoading(true)
    http.get(`/afrimash/shipping-zone/${zoneId}`).then((res) => {
      setShippingZone(res?.data.object)
      console.log(res?.data.object)
      setLoading(false)
    })
  }

  const handleModal = () => {
    setOpen(!open)
  }

  useEffect(() => {
    if(id){
      getShippingZoneDetails(id)
    }
  }, [id])

  const columns = [
    {
      name: 'name', // field name in the row object
      label: 'Name', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let state = shippingZone?.stateList[dataIndex]
          return (
            <dix className='flex items-center'>
              <div>
                <h5 className='my-0'>{state?.name}</h5>
              </div>
            </dix>
          )
        },
      },
    },
  ]

  return (
    <div className='m-sm-30'>
      <div className='mb-sm-30'>
        <Breadcrumb
          routeSegments={[
            { name: 'Shipping Zone', path: '/shipping-zones' },
            { name: 'Shipping Zone' },
          ]}
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <SimpleCard>
            <div className='flex flex-space-between flex-middle'>
              <h5 className='pl-4 text-left'>Shipping Zone Details</h5>
              <Button
                variant='contained'
                color='primary'
                onClick={() => {
                  handleModal()
                }}
              >
                Add States
              </Button>
            </div>
            <StatesModal
              isOpen={open}
              handleClose={handleModal}
              id={id}
              name='Create Tag'
            />
            <Divider className='mt-4' />
            <Table className='mb-4'>
              <TableBody>
                <TableRow>
                  <TableCell className='pl-4'>Zone Name</TableCell>
                  <TableCell>
                    <h5 className='mt-4 mb-2'>{shippingZone.name}</h5>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-4'>Description</TableCell>
                  <TableCell>
                    <div>{shippingZone.description}</div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </SimpleCard>
          <Divider />
          <Box mt={5}>
                <ShippingOptionByZone id={id}/>
          </Box>
          <Divider />
          <Box mt={5}>
            <SimpleCard>
              <MUIDataTable
                title={'Zone States'}
                data={shippingZone?.stateList}
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

export default ShippingZoneDetails
