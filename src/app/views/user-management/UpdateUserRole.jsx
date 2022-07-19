import React, { useEffect, useState } from 'react'
import { Modal, Button, Grid, InputLabel, MenuItem, Select, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import http from '../../services/api';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import Alert from 'app/components/Alert';
import { updateUser } from './UserService';

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

const initialValues = {
    role: 3,
    lastName: ''
}

const UpdateUserRole = ({
    name,
    openState,
    roles,
    user,
    handleClose,
    refresh,
}) => {
    const classes = useStyles()
    const [modalStyle] = React.useState(getModalStyle)
    const [values, setValues] = useState(initialValues)
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false)
    const [alertData, setAlertData] = useState({ success: false, text: '', title: '' });
    const [errorMessage, setErrorMessage] = React.useState('Field cannot be empty');

    const handleModal = () => {
        setAlertOpen(prev => !prev)
    }

    const handleSubmit = () => {
        if (!values?.role) {
            setError(true);
            return;
        }
        setError(false);
        setLoading(true);
        let tempState = { ...values }
        updateUser(tempState)
            .then((response) => {
                if (response.status == '200') {
                    setAlertData({ success: true, text: "Role updated sucessfully", title: 'Role Updated' })
                    handleModal();
                    setLoading(false);
                } else {
                    setAlertData({ success: false, text: response?.errorMsg ?? 'Invalid details provided', title: 'Unable to update user role' })
                    handleModal();
                    setLoading(false);
                    return
                }
            })
            .catch((err) => console.error(err))
    }

    useEffect(() => {
        if (user) {
            setValues({ ...values, ...user, role: user?.role?.id, })
        }
    }, [user])

    const handleGroupChange = (e) => {
        setValues({ ...values, role: e.target.value })
    }

    const handleOK = () => {
        handleModal();
        refresh();
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <Grid container spacing={3}>
                <h4 id='simple-modal-title'>{name}</h4>
                <div>

                </div>
                <Grid container spacing={3}>
                    <Grid item sm={12} xs={12}>
                        <div className='mt-20'></div>
                        <InputLabel htmlFor='bootstrap-input'>
                            Choose a Role
                        </InputLabel>
                        <div className='mt-10'></div>
                        <div className='mt-5'>
                            <div className='mt-5'>
                                <Select
                                    className='mb-4'
                                    label='Select User Role'
                                    variant='outlined'
                                    fullWidth
                                    value={values.role}
                                    onChange={handleGroupChange}
                                >
                                    {roles.sort().map((role) => (
                                        <MenuItem value={role.id} key={role.id}>
                                            {role.name.substr(5)}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {error ? <p className="m-0 custom-danger">{errorMessage}</p> : <></>}
                            </div>
                            <Button
                                variant='contained'
                                color='primary'
                                className='w-full mt-10'
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={14} className='mr-10' /> : ''}
                                {loading ? 'Please wait' : 'Submit'}
                            </Button>
                            <Alert
                                isOpen={alertOpen}
                                handleModal={handleModal}
                                alertData={alertData}
                                handleOK={handleOK}
                            />
                        </div>
                    </Grid>
                </Grid>
            </Grid>

        </div>
    )
    return (
        <div>
            <Modal open={openState} onClose={handleClose}>
                {body}
            </Modal>
        </div>
    )
}

export default UpdateUserRole;
