import React from 'react'
import { TextField, Modal, Button, Grid, InputLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import "./customer-view.css";
import http from '../../services/api';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

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
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[2],
        padding: theme.spacing(5, 4, 3),
    },
}))

function BulkCreate({
    name,
    isOpen,
    handleClose,
}) {
    const classes = useStyles()
    const [modalStyle] = React.useState(getModalStyle)
    const [file, setFile] = React.useState(null);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const history = useHistory();
    const [errorMessage, setErrorMessage] = React.useState('Field cannot be empty')

    const handleSubmit = async () => {
        if (!file) {
            setError(true);
            return;
        }
        setError(false);
        setLoading(true);
        const formData = new FormData();
        formData.append('csvfile', file);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        try {
            const res = await http.post_new(`/afrimash/customers/bulkcreate`, formData, config);
            setLoading(false);
            handleClose();
            history.push('/customers')
        } catch (err) {
            setLoading(false);
            if (err.response) {
                console.log(err.response.data);
                setError(true);
                setErrorMessage(err.response.data.error)
            }
        }
    }

    const fileUploadHandler = async (e) => {
        setError(false);
        const file = e.target.files[0];
        setFile(file);
    };
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <Grid container spacing={3}>
                <h4 id='simple-modal-title'>{name}</h4>
                <p>Upload a csv file that contains the following columns firstname, surname, gender, phonenumber, email.</p>
                <Grid container spacing={3}>
                    <Grid item sm={12} xs={12}>
                        <InputLabel htmlFor='bootstrap-input'>
                            Choose a CSV file
                        </InputLabel>
                        <TextField
                            className='mb-4 mr-4'
                            name='csvfile'
                            type='file'
                            fullWidth
                            variant='outlined'
                            margin='normal'
                            required
                            inputProps={{
                                accept: ".csv"
                            }}
                            aria-required='true'
                            onChange={fileUploadHandler}
                        />
                        {error ? <p class="m-0 custom-danger">{errorMessage}</p> : <></>}

                    </Grid>
                    <Grid item container justifyContent='center' alignItems='center'>
                        <Button
                            className='w-220 mt-40'
                            disabled={loading}
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                handleSubmit()
                            }}
                        >
                            Upload
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

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

export default BulkCreate;
