import React, { useEffect } from 'react'
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from '@material-ui/core'

import http from '../../../services/api'

import { SimpleCard, Breadcrumb } from 'matx'

import Loading from 'matx/components/MatxLoadable/Loading'
import StatesModal from './AddStateModal'

const ShippingZoneDetails = ({ location, match }) => {
  const [loading, setLoading] = React.useState(false)
  const [shippingZone, setShippingZone] = React.useState([])
  const [open, setOpen] = React.useState(false)

  const { id } = location.state
  const getShippingZoneDetails = (zoneId) => {
    setLoading(true)
    http.get(`/afrimash/shipping-zone/${zoneId}`).then((res) => {
      setShippingZone(res?.data.object)
      setLoading(false)
    })
  }

  const handleModal = () => {
    setOpen(!open)
  }

  useEffect(() => {
    getShippingZoneDetails(id)
  }, [id])

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
        </>
      )}
    </div>
  )
}

export default ShippingZoneDetails
