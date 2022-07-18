import React, { useState, useEffect } from 'react'
import { Icon, Button, Divider, IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import { getPickupCenter, deletePickupCenter } from '../USSDService';
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import "./index.css";
import { errorState } from '../../helpers/error-state';
import Notification from '../../../components/Notification';
import { useDialog } from 'muibox';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import NewPickupCenter from '../DOCPickupCenters/NewPickupCenter';
import { useDispatch } from 'react-redux';
import { getShippingStates } from '../../../redux/actions/ussd-action';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    '@global': {
        '@media print': {
            'body, *, html': {
                visibility: 'hidden',
            },
            '#print-area': {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '100%',
                '& *': {
                    visibility: 'visible',
                },
            },
        },
    },
    viewer: {
        '& h5': {
            fontSize: 15,
        },
        paddingBottom: '4px',
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

const PickupCenter = ({ location }) => {
    const dialog = useDialog();
    const { id } = location.state;
    const [alert, setAlert] = React.useState('')
    const [severity, setSeverity] = React.useState('')
    const [loading, setLoading] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [pickupCenter, setPickupCenter] = React.useState();
    const history = useHistory();
    const [open, setOpen] = useState(false)
    const dispatcher = useDispatch();

    const classes = useStyles()

    useEffect(() => {
        if (id) {
            getCenter();
        }
    }, [id])

    const getCenter = async () => {
        const result = await getPickupCenter(
            id,
            setLoading,
            setAlert,
            setSeverity
        ).then((res) => res)
        if (result) {
            setPickupCenter(result);
            dispatcher(getShippingStates());
        } else if (!result) {
            errorState(setAlert, setSeverity)
        }
    }

    const refresh = async () => {
        getCenter();
    }

    const handleModal = () => {
        setOpen(!open);
    }

    return (
        <>
            <div className={clsx('invoice-viewer py-4 px-20', classes.viewer)}>
                {isLoading && <CircularProgress size={20} />}
                {severity === 'error' && (
                    <Notification alert={alert} severity={severity || ''} />
                )}
                <div
                    className={clsx(
                        'viewer_actions px-4 mb-5 flex items-center',
                        classes.viewerAction
                    )}
                >

                    <IconButton onClick={() => {
                        history.goBack()
                    }}>
                        <Icon>arrow_back</Icon>
                    </IconButton>

                    <div>
                        <Button
                            className='mr-4 py-2'
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                handleModal()
                            }}>
                            Edit Pickup Center
                        </Button>
                        <NewPickupCenter
                            name={"Edit Pickup Center"}
                            isOpen={open}
                            pickupCenter={pickupCenter}
                            handleClose={handleModal}
                            refresh={() => refresh()} />
                    </div>
                </div>

                <div id='print-area' className='px-10'>
                    <div
                        className={clsx(
                            'viewer_actions px-4 mb-5 flex items-center justify-between',
                            classes.viewerAction
                        )}
                    >
                        <div>
                            <h5 className='mb-4'>State</h5>
                            <h5 className='mb-4'>City</h5>
                            <h5 className='mb-4'>Address</h5>
                        </div>
                        <div className={`text-right`}>
                            {loading ? <div><CircularProgress size={20} /></div> : <p className='mb-4'>{pickupCenter?.state?.name}</p>}
                            {loading ? <div><CircularProgress size={20} /></div> : <p className='mb-4'>{pickupCenter?.city}</p>}
                            {loading ? <div><CircularProgress size={20} /></div> : <p className='mb-4'>{pickupCenter?.address}</p>}
                        </div>
                    </div>

                    <Divider />

                    <div
                        className={' py-5 flex justify-end mt-4'}
                    >
                        <Button
                            className='mr-4 py-2'
                            variant='contained'
                            onClick={() =>
                                dialog
                                    .confirm('Are you sure you want to delete?')
                                    .then(async (value) => {
                                        const result = await deletePickupCenter(
                                            id,
                                            setIsLoading,
                                            setAlert,
                                            setSeverity
                                        ).then((res) => res)
                                        if (result) {
                                            history.goBack();
                                        } else if (!result) {
                                            errorState(setAlert, setSeverity);
                                        }
                                    })
                                    .catch(() => {
                                        return false;
                                    })
                            }
                        >
                            Delete Pickup Center
                        </Button>
                        <div />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PickupCenter
