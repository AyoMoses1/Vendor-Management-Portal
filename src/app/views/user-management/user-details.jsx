import React, { useState, useEffect } from 'react'
import { Icon, Button, Divider, IconButton, CircularProgress } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import './user.css'
import { getAllRoles, getUserById, updateUser } from './UserService'
import { SimpleCard } from 'matx'
import UpdateUserRole from './UpdateUserRole'
import Alert from 'app/components/Alert'

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
  orderViewer: {
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
  tableBottom: {
    display: 'flex',
    justifyContent: 'flex-end !important',
  },
}))

const UserInfo = ({ location }) => {
  const { id } = location.state
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = useState(false)
  const [openRoleUpdate, setOpenRoleUpdate] = useState(false)
  const [roles, setRoles] = useState([])
  const [user, setUser] = useState([])
  const classes = useStyles();
  const history = useHistory();
  const [alertData, setAlertData] = useState({ success: false, text: '', title: '' });
  const [alertOpen, setAlertOpen] = React.useState(false)

  const getUser = () => {
    getUserById(id).then(({ data }) => {
      setUser(data.object)
      console.log(data.object);
    })
  }

  useEffect(() => {
    if (id) {
      getRoles();
      getUser();
    }
  }, [id])

  const parseRole = (userRole) => {
    if (userRole) {
      return userRole.split("ROLE_").join("").split('_').join(" ")
    }
    return "-"
  }

  const handleRoleUpdateModal = () => {
    setOpenRoleUpdate(!openRoleUpdate)
  }

  const getRoles = () => {
    getAllRoles().then(({ data }) => {
      setRoles(data.object)
    })
  }

  const refresh = async () => {
    handleRoleUpdateModal();
    getUser();
  }

  const handleAlertModal = () => {
    setAlertOpen(prev => !prev)
  }

  const handleAlertOK = () => {
    handleAlertModal();
    getUser();
  }

  const handleUserStatus = (status) => {
    const data = { ...user, role: user?.role?.id, isDisabled: status }
    setLoading(true);
    updateUser(data)
      .then((response) => {
        if (response.status == '200') {
          setAlertData({ success: true, text: status ? "User has been deactivated" : "User has been activated", title: 'Status Update' })
          setLoading(false);
          handleAlertModal();
        } else {
          setAlertData({ success: false, text: response?.errorMsg ?? 'Invalid details provided', title: 'Unable to status' })
          setLoading(false);
          handleAlertModal();
          return
        }
      })
      .catch((err) => console.error(err))
  }

  return (
    <SimpleCard className='m-sm-30'>
      <Alert
        isOpen={alertOpen}
        handleModal={handleAlertModal}
        alertData={alertData}
        handleOK={handleAlertOK}
      />
      <UpdateUserRole
        name={"Update User Role"}
        openState={openRoleUpdate}
        roles={roles}
        user={user}
        handleClose={handleRoleUpdateModal}
        refresh={refresh} />

      <div className={clsx('invoice-viewer py-4', classes.orderViewer)}>
        <div
          className={clsx(
            'viewer_actions px-4 mb-5 flex items-center',
            classes.viewerAction
          )}
        >
          <IconButton className='pl-0' onClick={() => {
            history.goBack()
          }}>
            <Icon>arrow_back</Icon>
          </IconButton>
          <div>
            <Button
              onClick={() => handleUserStatus(user?.isDisabled ? false : true)}
              className='mr-4 py-2'
              variant='contained'
              color='primary'
              disabled={loading}
            >
              {loading ? <CircularProgress size={14} className='mr-10' /> : ''}
              {user?.isDisabled ? "Activate User" : "Deactivate User"}
            </Button>
            <Button
              onClick={() => {
                handleRoleUpdateModal()
              }}
              className='mr-4 py-2'
              variant='contained'
              color='primary'
            >
              Update Role
            </Button>
            <Link to={{
              pathname: '/user/edit',
              state: {
                id: user.id,
                user,
              },
            }}>
              <Button
                className='mr-4 py-2'
                variant='contained'
                color='primary'
              >
                Edit
              </Button>
            </Link>
          </div>
        </div>
        <div className='px-4 mb-5 mt-10'><h4 className='mb-2'>User Details</h4></div>
        <div id='print-area'>
          <div
            className={clsx(
              'viewer_actions px-4 mb-5 flex items-center justify-between',
              classes.viewerAction
            )}
          >

            <div>
              <p className='mb-4'>First Name:</p>
              <p className='mb-4'>Last Name:</p>
              <p className='mb-4'>Email Address: </p>
              <p className='mb-4'>Username: </p>
              <p className='mb-4'>Phone Number: </p>
              <p className='mb-4'>Active: </p>
            </div>


            <div className={`text-right`}>
              <p className='mb-4 font-weight-bold capitalize'>{user?.firstName ?? '-'}</p>
              <p className='mb-4 font-weight-bold capitalize'>{user?.lastName ?? '-'}</p>
              <p className='mb-4 font-weight-bold'>{user?.email ?? '-'}</p>
              <p className='mb-4 font-weight-bold'>{user?.username ?? '-'}</p>
              <p className='mb-4 font-weight-bold'>{user?.phoneNo ?? '-'}</p>
              <p className='mb-4 font-weight-bold capitalize'>{user?.isDisabled ? "No" : "Yes"}</p>
            </div>
          </div>
          <Divider />

          <div
            className={clsx(
              'viewer__billing-info px-4 py-5 flex justify-between',
              classes.viewerAction
            )}
          >
            <div className='w-full'>
              <h5 className='mb-2'>Role</h5>
            </div>

            <div className='text-right'>
              <h5 className='mb-2 ROLE'>{parseRole(user?.role?.name)}</h5>
            </div>
            <div />
          </div>
        </div>
      </div>
    </SimpleCard>
  )
}

export default UserInfo