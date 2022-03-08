import React, { useState, useEffect } from 'react'
import {
  Button,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { getInvoiceById, updateInvoice } from './OrderService'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { useCallback } from 'react'
import { errorState } from '../helpers/error-state'
import Notification from 'app/components/Notification'

const useStyles = makeStyles(({ palette, ...theme }) => ({
  invoiceEditor: {
    '& h5': {
      fontSize: 15,
    },
  },
  viewerAction: {
    justifyContent: 'space-between !important',
    display: 'flex',
    marginTop: '10px',
    marginBottom: '2px',
    paddingLeft: '4px',
    paddingRight: '4px',
  },
}))

const orderStatus = [
  {
    label: 'Processing',
    value: 'PROCESSING',
  },
  {
    label: 'Pending',
    value: 'PENDING',
  },
  {
    label: 'Completed',
    value: 'COMPLETED',
  },
  {
    label: 'Delivered',
    value: 'DELIVERED',
  },
  {
    label: 'On Hold',
    value: 'ON_HOLD',
  },
  {
    label: 'Disputed',
    value: 'DISPUTED',
  },
  {
    label: 'Awaiting Payment',
    value: 'AWAITING_PAYMENT',
  },
  {
    label: 'Awaiting Fulfilment',
    value: 'AWAITING_FULFILMENT',
  },
  {
    label: 'Manual Verification Required',
    value: 'MANUAL_VERIFICATION_RQUIRED',
  },
  {
    label: 'Paid',
    value: 'PAID',
  },
]

const OrderEditor = ({ isNewInvoice, toggleOrderEditor, id }) => {
  const [isAlive, setIsAlive] = useState(true)
  const [state, setState] = useState(initialValues)
  const [invoiceStatus, setInvoiceStatus] = useState('')
  const [error, setError] = React.useState('')
  const [severity, setSeverity] = React.useState('')

  const history = useHistory()

  const classes = useStyles()

  const generateRandomId = useCallback(() => {
    let tempId = Math.random().toString()
    let id = tempId.substr(2, tempId.length - 1)
    setState((state) => ({ ...state, id }))
  }, [])

  const handleChange = (event) => {
    event.persist()
    setInvoiceStatus(event.target.value)
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const handleDateChange = (date) => {
    setState({ ...state, date })
  }

  const handleSubmit = () => {
    const auth = JSON.parse(localStorage.getItem('auth_user'))
    if (auth.role.name === 'ROLE_ADMIN' || auth.role.name === 'ROLE_MANAGER') {
      let tempState = { status: invoiceStatus, id: id }
      updateInvoice(tempState).then((res) => {
        console.log(res)
        if (res.status === 200) {
          history.push('/orders')
        }
      })
    } else {
      let msg = 'You dont have enough permission to perform action'
      errorState(setError, setSeverity, msg)
      return
    }
  }

  useEffect(() => {
    if (!isNewInvoice) {
      getInvoiceById(id).then(({ data }) => {
        if (isAlive) setState({ ...data.object })
      })
    } else {
      generateRandomId()
    }
  }, [id, isNewInvoice, isAlive, generateRandomId])

  useEffect(() => {
    return () => setIsAlive(false)
  }, [])
  let { referenceNo, status, createDate, loading } = state

  return (
    <ValidatorForm onSubmit={handleSubmit} onError={(errors) => null}>
      <Notification alert={error} severity={severity || ''} />
      <div className={clsx('invoice-viewer py-4', classes.invoiceEditor)}>
        <>
          <div
            className='viewer_actions px-4'
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <div className='mb-6'>
              <Button
                type='button'
                className='mr-4 py-2'
                variant='text'
                onClick={() => toggleOrderEditor()}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                className='py-2'
                variant='contained'
                color='primary'
                disabled={loading}
              >
                Save
              </Button>
            </div>
          </div>
          <div
            className={clsx(
              'viewer__order-info px-4 mb-4 flex justify-between',
              classes.viewerAction
            )}
          >
            <div>
              <h5 className='mb-2'>Order Info</h5>
              <p className='mb-4'>Order Number</p>
              <TextValidator
                label='Reference No.'
                type='text'
                fullWidth
                name='referenceNo'
                value={referenceNo}
                disabled
                errorMessages={['this field is required']}
              />
            </div>
            <div>
              <FormControl component='fieldset' className='w-full mb-4'>
                <RadioGroup
                  aria-label='status'
                  name='status'
                  value={status}
                  onChange={handleChange}
                >
                  {orderStatus.map((value) => (
                    <FormControlLabel
                      className='h-32'
                      value={value.value}
                      control={<Radio color='secondary' />}
                      label={value.label}
                      labelPlacement='start'
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              <div className='text-right'>
                <h5 className='font-normal'>
                  <strong>Order date: </strong>
                </h5>
              </div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin='none'
                  id='mui-pickers-date'
                  label='Order Date'
                  inputVariant='standard'
                  type='text'
                  autoOk={true}
                  value={createDate}
                  fullWidth
                  format='MMMM dd, yyyy'
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
        </>
      </div>
    </ValidatorForm>
  )
}

const initialValues = {
  id: '',
  referenceNo: '',
  customerId: {
    firstName: '',
    lastName: '',
    email: '',
  },
  deliveryAddress: '',
  // orderItems: [],
  status: '',
  totalDiscount: '',
  createDate: new Date(),
  currency: '₦',
  loading: false,
}

export default OrderEditor
