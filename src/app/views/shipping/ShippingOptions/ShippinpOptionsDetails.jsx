import React, { useEffect } from 'react'
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core'

import http from '../../../services/api'

import { SimpleCard, Breadcrumb } from 'matx'

import Loading from 'matx/components/MatxLoadable/Loading'

const ShippingOptionDetails = ({ location, match }) => {
  const [loading, setLoading] = React.useState(false)
  const [shippingOptions, setShippingOptionDetails] = React.useState([])

  const { id } = location.state
  const getShippingOptionDetails = (optionId) => {
    setLoading(true)
    http.get(`/afrimash/shipping-option/${optionId}`).then((res) => {
      setShippingOptionDetails(res?.data.object)
      setLoading(false)
    })
  }

  useEffect(() => {
    getShippingOptionDetails(id)
  }, [id])

  return (
    <div className='m-sm-30'>
      <div className='mb-sm-30'>
        <Breadcrumb
          routeSegments={[
            { name: 'Shipping Option', path: '/shipping-options' },
            { name: 'Shipping Option' },
          ]}
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <SimpleCard>
            <div className='flex flex-space-between flex-middle'>
              <h5 className='pl-4 text-left'>Shipping Option Details</h5>
            </div>
            <Divider className='mt-4' />
            <Table className='mb-4'>
              <TableBody>
                <TableRow>
                  <TableCell className='pl-4'>Option Name</TableCell>
                  <TableCell>
                    <h5 className='mt-4 mb-2'>{shippingOptions.name}</h5>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-4'>Description</TableCell>
                  <TableCell>
                    <div>{shippingOptions.description}</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-4'>Method Condition</TableCell>
                  <TableCell>
                    <div>{shippingOptions.methodCondition}</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-4'>Shipping Class</TableCell>
                  <TableCell>
                    <div>
                      {shippingOptions && shippingOptions.shippingClass?.name}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-4'>Shipping Zone</TableCell>
                  <TableCell>
                    <div>
                      {shippingOptions && shippingOptions.shippingZone?.name}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-4'>Base Cost</TableCell>
                  <TableCell>
                    <div>{shippingOptions.baseCost}</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-4'>Criteria Value</TableCell>
                  <TableCell>
                    <div>{shippingOptions.criteriaValue}</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-4'>Additional Cost</TableCell>
                  <TableCell>
                    <div>{shippingOptions.additionalCost}</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-4'>
                    Additional Cost On Every
                  </TableCell>
                  <TableCell>
                    <div>{shippingOptions.additionalCostOnEvery}</div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </SimpleCard>
        </>
      )}
    </div>
  )
}

export default ShippingOptionDetails
