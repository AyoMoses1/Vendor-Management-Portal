import React, { useState, useEffect } from 'react'
import {
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core'
import { SimpleCard, Breadcrumb } from 'matx'
import { getCustomerById } from './CustomerService'
import GenerateAccountNumber from '../shared/GenerateAccountNumber'
import Alert from 'app/components/Alert'

const CustomerInfo = ({ location }) => {
  const { id } = location.state
  const [customer, setCustomer] = useState(null)
  const [customerInfo, setCustomerInfo] = useState([])
  const [open, setOpen] = useState(false)
  const [alertData, setAlertData] = useState({ success: false, text: '', title: '' });
  const [alertOpen, setAlertOpen] = useState(false)


  const handleModal = () => {
    setOpen(!open)
  }

  const handleAlertModal = () => {
    setAlertOpen(prev => !prev)
  }

  const completed = () => {
    handleModal();
    handleAlertModal();
  }

  useEffect(() => {
    getCustomerById(id).then(({ data }) => {
      setCustomer(data.object)
      setCustomerInfo(data.object.deliveryAddresses)
      console.log(data.object)
    })
  }, [id])

  return (
    <div className='m-sm-30'>
      <div className='mb-sm-30'>
        <Breadcrumb
          routeSegments={[
            { name: 'Customers', path: '/customers' },
            { name: 'View Customer' },
          ]}
        />
      </div>

      <Alert
        isOpen={alertOpen}
        handleModal={handleAlertModal}
        alertData={alertData}
        handleOK={handleAlertModal}
      />

      <GenerateAccountNumber
        customer={customer}
        name={"Generate Account Number"}
        isOpen={open}
        handleClose={handleModal}
        completed={completed}
        setSuccessData={(data) => setAlertData(data)}
      />

      <SimpleCard>
        <div className='flex w-full justify-between items-center mb-20'>
          <h5 className='pl-4 text-left'>Customer Details</h5>
          <div>
            {customer ? <Button
              onClick={handleModal}
              variant='contained'
              color='primary'
              className='mr-4'
            >
              Generate Account Number
            </Button> : <></>}
          </div>
        </div>

        <Divider />
        <Table className='mb-4'>
          <TableBody>
            <TableRow>
              <TableCell className='pl-4'>Name</TableCell>
              <TableCell>
                <h5>{customer?.firstName} {customer?.lastName}</h5>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='pl-4'>Email</TableCell>
              <TableCell>
                <h5>{customer?.email}</h5>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='pl-4'>Phone Number</TableCell>
              <TableCell>
                <h5>{customer?.mobileNo}</h5>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='pl-4'>State</TableCell>
              <TableCell>
                <h5>{customer?.state}</h5>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='pl-4'>Country</TableCell>
              <TableCell>
                <h5>{customer?.country}</h5>
              </TableCell>
            </TableRow>
            {customerInfo.map((item, ind) => (
              <TableRow key={ind}>
                <TableCell className='pl-4'>{`Address ${ind + 1}`}</TableCell>
                <TableCell>{item.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SimpleCard>
    </div>
  )
}

export default CustomerInfo
