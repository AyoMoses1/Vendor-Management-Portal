import React, { useState, useEffect } from 'react'
import {
  Button,
  Radio,
  FormControl,
  FormControlLabel,
  Divider,
  RadioGroup,
  Grid,
  TextField,
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

const OrderEditor = ({ isNewInvoice, toggleOrderEditor, id }) => {
  const [isAlive, setIsAlive] = useState(true)
  const [state, setState] = useState(initialValues)

  const history = useHistory()

  const classes = useStyles()

  const generateRandomId = useCallback(() => {
    let tempId = Math.random().toString()
    let id = tempId.substr(2, tempId.length - 1)
    setState((state) => ({ ...state, id }))
  }, [])

  const handleChange = (event) => {
    event.persist()
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const handleSellerBuyerChange = (event, fieldName) => {
    event.persist()
    setState({
      ...state,
      [fieldName]: {
        ...state[fieldName],
        [event.target.name]: event.target.value,
      },
    })
  }

  const handleIvoiceListChange = (event, index) => {
    let tempItemList = [...state.item]
    tempItemList.map((element, i) => {
      if (index === i) element[event.target.name] = event.target.value
      return element
    })

    setState({
      ...state,
      item: tempItemList,
    })
  }

  // const addItemToInvoiceList = () => {
  //   let tempItemList = [...state.orderItems];
  //   tempItemList.push({
  //     name: "",
  //     unit: "",
  //     price: "",
  //   });
  //   setState({
  //     ...state,
  //     item: tempItemList,
  //   });
  // };

  const deleteItemFromInvoiceList = (index) => {
    let tempItemList = [...state.item]
    tempItemList.splice(index, 1)

    setState({
      ...state,
      item: tempItemList,
    })
  }

  const handleDateChange = (date) => {
    setState({ ...state, date })
  }

  const handleSubmit = () => {
    setState({ ...state, loading: true })
    let tempState = { ...state }
    delete tempState.loading
    updateInvoice(tempState).then(() => {
      setState({ ...state, loading: false })
      toggleOrderEditor()
    })
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
  let {
    referenceNo,
    customerId,
    deliveryAddress,
    // orderItems,
    status,
    createDate,
    loading,
  } = state

  return (
    <>
      <div className={clsx('invoice-viewer py-4', classes.invoiceEditor)}>
        <ValidatorForm onSubmit={handleSubmit} onError={(errors) => null}>
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
                  <FormControlLabel
                    className='h-32'
                    value='PENDING'
                    control={<Radio color='secondary' />}
                    label='Pending'
                    labelPlacement='start'
                  />
                  <FormControlLabel
                    className='h-32'
                    value='PROCESSING'
                    control={<Radio color='secondary' />}
                    label='Processing'
                    labelPlacement='start'
                  />
                  <FormControlLabel
                    className='h-32'
                    value='ON_HOLD'
                    control={<Radio color='secondary' />}
                    label='ON HOLD'
                    labelPlacement='start'
                  />
                  <FormControlLabel
                    className='h-32'
                    value='DELIVERED'
                    control={<Radio color='secondary' />}
                    label='Delivered'
                    labelPlacement='start'
                  />
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

          <Divider />
          <br />
          <Grid
            className='px-4 py-5'
            container
            justify='space-between'
            spacing={4}
          >
            <Grid item>
              <div>
                <h5 className='mb-5'>Bill From</h5>
                <TextValidator
                  className='mb-5'
                  label='Customer Name'
                  disabled
                  type='text'
                  name='name'
                  fullWidth
                  value={
                    customerId
                      ? `${customerId.firstName} ${customerId.lastName}`
                      : null
                  }
                  errorMessages={['this field is required']}
                />
                <TextValidator
                  type='text'
                  label='Delivery Address'
                  onChange={(event) =>
                    handleSellerBuyerChange(event, 'deliveryAddress')
                  }
                  name='address'
                  fullWidth
                  multiline={true}
                  rowsMax={4}
                  value={deliveryAddress ? deliveryAddress?.address : null}
                />
              </div>
            </Grid>
          </Grid>

          {/* Item list for editing */}
          {/* <Table className="mb-4">
            <TableHead>
              <TableRow className="bg-default">
                <TableCell className="pl-sm-24">#</TableCell>
                <TableCell className="px-0">Item Name</TableCell>
                <TableCell className="px-0">Unit Price</TableCell>
                <TableCell className="px-0">Unit</TableCell>
                <TableCell className="px-0">Cost</TableCell>
                <TableCell className="px-0">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orderItems.map((item, index) => {
                subTotalCost += item.itemPrice * item.itemQuantity;
                return (
                  <TableRow key={index}>
                    <TableCell className="pl-sm-24 capitalize" align="left">
                      {index + 1}
                    </TableCell>

                    <TableCell className="pl-0 capitalize" align="left">
                      <TextValidator
                        label="Item Name"
                        // onChange={(event) =>
                        //     handleIvoiceListChange(
                        //         event,
                        //         index
                        //     )
                        // }
                        disabled
                        type="text"
                        name="name"
                        fullWidth
                        value={item ? item.productId.name : null}
                      />
                    </TableCell>

                    <TableCell className="pl-0 capitalize" align="left">
                      <TextValidator
                        label="Item Price"
                        // onChange={(event) =>
                        //     handleIvoiceListChange(
                        //         event,
                        //         index
                        //     )
                        // }
                        disabled
                        type="number"
                        name="price"
                        fullWidth
                        value={item ? item.itemPrice : null}
                      />
                    </TableCell>

                    <TableCell className="pl-0 capitalize" align="left">
                      <TextValidator
                        label="Item Unit"
                        onChange={(event) =>
                          handleIvoiceListChange(event, index)
                        }
                        type="number"
                        name="unit"
                        fullWidth
                        value={item ? item.itemQuantity : null}
      
                        errorMessages={["this field is required"]}
                      />
                    </TableCell>

                    <TableCell className="pl-0 capitalize" align="left">
                      {item.itemQuantity * item.itemPrice}
                    </TableCell>

                    <TableCell className="pl-0 capitalize" align="left">
                      <Button onClick={() => deleteItemFromInvoiceList(index)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table> */}

          {/* total cost calculation */}
          {/* <div
            className="px-4"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <div className="flex">
              <div className="pr-12">
                <strong>
                  <p>Grand Total: {subTotal}</p>
                </strong>
              </div>
            </div>
          </div> */}
        </ValidatorForm>
      </div>

      <Divider />
      <br />
      <div>
        <FormControl component='fieldset' className='w-full  mb-4'>
          <h4>Add Note</h4>
          <TextField
            className='mb-4'
            variant='outlined'
            margin='dense'
            name=''
            rows={4}
            multiline
            rowsMax={8}
            placeholder='Add Note Customer '
          />

          <h4>Add Private Note</h4>
          <TextField
            className='mb-4'
            variant='outlined'
            margin='dense'
            name=''
            rows={4}
            multiline
            rowsMax={8}
            placeholder=''
          />
        </FormControl>
      </div>
    </>
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
