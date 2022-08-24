import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@material-ui/core/Box'
import { Formik } from 'formik'
import * as yup from 'yup'
import { CircularProgress, TextField } from '@material-ui/core'


export default function MediaCard({ handleSendCustomerNote, sending }) {
  const initialValues = {
    note: '',
  }

  const [values, setValues] = React.useState(initialValues)

  const handleSubmit = (value, { resetForm }) => {
    handleSendCustomerNote(value.note)
    resetForm(initialValues);
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom className='notice-header' component="div">
          Send Note to customer
        </Typography>
        <Formik
          initialValues={values}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          validationSchema={customValidations}
          className="mt-20"
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleSubmit,
            handleChange,
          }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <TextField
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.note}
                  name='note'
                  fullWidth
                  margin='normal'
                  label='Enter Message Here......'
                  type='textarea'
                  variant='outlined'
                  className='textarea'
                  error={Boolean(touched.note && errors.note)}
                  helperText={touched.note && errors.note}
                />
              </div>
              <Box display="flex" justifyContent="flex-end">
                <Button disabled={sending} type='submit' className='mt-4 notice-btn'>Send {sending ? <CircularProgress size={15} className={"ml-2"} /> : <></>}</Button>
              </Box>
            </form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

const customValidations = yup.object().shape({
  note: yup.string().required('Message cannot be empty'),
})