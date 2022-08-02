import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Formik } from 'formik'
import * as yup from 'yup'
import { TextField} from '@material-ui/core'



export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Send Note to customer
        </Typography>
        <Formik
                // initialValues={values}
                // onSubmit={handleSubmit}
                enableReinitialize={true}
                // validationSchema={customerValidations}
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
                                // onChange={handleChange}
                                // onBlur={handleBlur}
                                // value={values.address}
                                name='address'
                                fullWidth
                                margin='normal'
                                label='Enter Message Here......'
                                type='textarea'
                                variant='outlined'
                                className='textarea'
                                // error={Boolean(touched.address && errors.address)}
                                // helperText={touched.address && errors.address}
                            />
                        </div>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className='mt-4'
                            // disabled={loading}
                        >
                          Send
                            {/* {buttonState} */}
                        </Button>
                    </form>
                )}
            </Formik>
      </CardContent>
    </Card>
  );
}
