import React from 'react'
import { TextField, Modal, Button, Checkbox } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Formik } from 'formik'

import Autocomplete from '@material-ui/lab/Autocomplete'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import { statesWithIds } from '../../../../utils/states'
import http from '../../../services/api'

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />
function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2, 4, 3),
  },
}))

function StatesModal({ isOpen, handleClose, id }) {
  const classes = useStyles()
  const [modalStyle] = React.useState(getModalStyle)
  const [values, setValues] = React.useState({})

  const handleSubmit = (value, { setSubmitting }) => {
    const payload = value.states.toString()
    http
      .patch(`/afrimash/shipping-zone/${id}/states?ids=${payload}`)
      .then((res) => {
        if (res.status === 200) {
          handleClose()
        }
      })
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h4 id='simple-modal-title'>Add States To Zone</h4>
      <Formik
        initialValues={values}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values, handleSubmit, isSubmitting, setSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Autocomplete
                multiple
                id='categoried'
                options={statesWithIds}
                onChange={(event, val) => {
                  let v = []
                  val.forEach((el) => {
                    v.push(el.id)
                  })
                  setValues({ ...values, states: v })
                }}
                getOptionLabel={(option) => option.name}
                getOptionSelected={(option, value) => option.id === value.id}
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='outlined'
                    label='Select State'
                    placeholder='States'
                    fullWidth
                    margin='normal'
                  />
                )}
              />
              <Button type='submit' variant='contained' color='primary'>
                Add State
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
  return (
    <div>
      <Modal open={isOpen} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  )
}

export default StatesModal
