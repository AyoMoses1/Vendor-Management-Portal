import React, { useState, useEffect } from 'react'
import { FormControl, Card, TextField, Button } from '@material-ui/core'
import { getCustomerById, addCustomer, updateCustomer } from './CustomerService'
import { makeStyles } from '@material-ui/core/styles'
import Notification from '../../components/Notification'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '63ch',
    },
  },
}))

function NewCustomer({ isNewCustomer, id, Customer }) {
  console.log(Customer)
  const values = {
    email: '',
    country: '',
    password: '',
    lastName: '',
    firstName: '',
    mobileNo: '',
    state: '',
    zipCode: '',
    address: '',
    password: 'password',
    secretAnswer: 'secret',
  }
  const classes = useStyles()
  const [state, setState] = useState(values)
  const [customer, setCustomer] = useState(Customer)
  const history = useHistory()

  const handleChange = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
    setCustomer({ ...customer, [name]: value })
  }

  const handleSubmit = (event) => {
    let tempState = { ...state }
    if (isNewCustomer)
      addCustomer(tempState).then(() => {
        setState({ ...state })
        history.push(`/customers`)
      })
    else
      updateCustomer(customer).then(() => {
        setState({ ...state })
      })
  }

  useEffect(() => {
    if (!isNewCustomer) {
      getCustomerById(id).then(({ data }) => {
        console.log(data.object)
        setState(data.object)
        console.log(state)
      })
    }
  }, [id, isNewCustomer])

  return (
    <div className='w-100 overflow-auto'>
      <Card>
        <FormControl className={classes.root}>
          <div>
            <TextField
              onChange={handleChange}
              value={state.firstName}
              name='firstName'
              margin='dense'
              label='First Name'
              type='text'
              fullWidth
              variant='outlined'
            />
            <TextField
              onChange={handleChange}
              value={state.lastName}
              name='lastName'
              margin='dense'
              label='Last Name'
              type='text'
              fullWidth
              variant='outlined'
            />
          </div>
          <div>
            <TextField
              onChange={handleChange}
              value={state.email}
              name='email'
              margin='dense'
              label='Email'
              type='text'
              fullWidth
              variant='outlined'
            />

            <TextField
              onChange={handleChange}
              value={state.mobileNo}
              name='mobileNo'
              margin='dense'
              label='Phone Number'
              type='text'
              fullWidth
              variant='outlined'
            />
          </div>
          <div>
            <TextField
              onChange={handleChange}
              value={state.address}
              name='address'
              margin='dense'
              label='Address '
              type='text'
              fullWidth
              variant='outlined'
            />

            <TextField
              onChange={handleChange}
              value={state.city}
              name='city'
              margin='dense'
              label='City/Town'
              type='text'
              fullWidth
              variant='outlined'
            />
          </div>
          <div>
            <TextField
              onChange={handleChange}
              value={state.state}
              name='state'
              margin='dense'
              label='State'
              type='text'
              fullWidth
              variant='outlined'
            />

            <TextField
              onChange={handleChange}
              value={state.country}
              name='country'
              margin='dense'
              label='Country'
              type='text'
              fullWidth
              variant='outlined'
            />
          </div>
          <div>
            <TextField
              onChange={handleChange}
              value={state.zipCode}
              name='zipCode'
              margin='dense'
              label='Postcode/ZipCode'
              type='text'
              fullWidth
              variant='outlined'
            />
          </div>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </FormControl>
      </Card>
    </div>
  )
}

export default NewCustomer
