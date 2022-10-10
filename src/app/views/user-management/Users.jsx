import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'matx'
import MUIDataTable from 'mui-datatables'
import { Grow, Icon, IconButton, TextField, Button, MenuItem, Typography, Select } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Notification from '../../components/Notification'
import { getAllRoles, getAllUser, deleteUser, filterAllUser } from './UserService'
import Loading from 'matx/components/MatxLoadable/Loading'
import { useDialog } from 'muibox'
import Alert from 'app/components/Alert';

import './user.css';
import { getUserStatistics } from '../dashboard/DashboardService'
import { debounce } from "lodash";

const Users = () => {
  const [isAlive, setIsAlive] = useState(true)
  const [userList, setUserList] = useState([])
  const [loading, isLoading] = useState()
  const [alert, setAlert] = useState('')
  const [severity, setSeverity] = useState('')
  const [page, setPage] = useState(0)
  const [count, setCount] = useState(0)
  const [roles, setRoles] = useState([])
  const [role, setRole] = useState(0)
  const [size, setSize] = useState(10);
  const dialog = useDialog();
  const [alertData, setAlertData] = useState({ success: false, text: '', title: '' });
  const [alertOpen, setAlertOpen] = React.useState(false)
  const [title, setTitle] = useState('All Users');
  const [statistics, setStatistics] = useState([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getAllUser(setUserList, isLoading, setAlert, setSeverity, setCount, page, size, role, query)
    return () => setIsAlive(false)
  }, [isAlive, page, size])

  const onPageChange = (page) => {
    getAllUser(setUserList, isLoading, setAlert, setSeverity, setCount, page, size, role, query)
    setPage(page)
  }

  const handleCustomSearch = (value) => {
    setRole(value);
    getAllUser(setUserList, isLoading, setAlert, setSeverity, setCount, page, size, value, query)
    if (value === 0) {
      setTitle('All Users')
    } else {
      let tempRole = roles.find(r => r.id === value).name.substr(5).split("_").join(" ");
      setTitle(tempRole);
    }
  }

  useEffect(() => {
    getRoles();
    getUserStatistics(setStatistics);
  }, [])

  useEffect(() => {
    if (statistics.length) {
      if (role === 0) {
        setTotal(count);
      } else {
        const tempTotal = statistics.find(s => s.role.id === role)?.total ?? 0;
        setTotal(tempTotal);
      }
    }
  }, [statistics, role, count])

  const getRoles = () => {
    getAllRoles().then(({ data }) => {
      setRoles(data.object)
    })
  }

  const refresh = () => {
    getAllUser(setUserList, isLoading, setAlert, setSeverity, setCount, page, size, role, query);
  }

  const handleAlertModal = () => {
    setAlertOpen(prev => !prev)
  }

  const handleAlertOK = () => {
    handleAlertModal();
  }

  const columns = [
    {
      name: 'firstname', // field name in the row object
      label: 'Name', // column title that will be shown in table
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex]
          return (
            <Link
              to={{
                pathname: '/user/details',
                state: {
                  id: user.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3 users__name'>
                <h5 className='my-0 text-15'>{`${user?.firstName || 'N/A'} ${user?.lastName || 'N/A'
                  }`}</h5>
                <small className='text-muted'>{user?.email}</small>
              </div>
            </Link>
          )
        },
      },
    },
    {
      name: 'phoneNo',
      label: 'Phone Number',
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex]
          return (
            <div className='flex items-center user__phone'>
              <Link
                to={{
                  pathname: '/user/details',
                  state: {
                    id: user.id,
                  },
                }}
                className='ml-13'
              >
                  <spam className='my-0 text-15'>{user.phoneNo || '-----'}</spam>
              </Link>
            </div>
          )
        },
      },
    },
    {
      name: 'role',
      label: 'Role',
      options: {
        filter: true,
        filterType: 'custom',
        filterOptions: {
          name: roles,
          display: () => {
            return (
              <Grow appear in={true} timeout={300}>
                <Select
                  size='small'
                  fullWidth
                  variant='outlined'
                  displayEmpty={true}
                  renderValue={value => value?.length ? Array.isArray(value) ? value.join(', ') : value : 'Select Role'}
                  onChange={({ target: { value } }) => handleCustomSearch(value)}
                  style={{ width: "260px" }}
                >
                  <MenuItem key={"null"} value={0}>
                    All
                  </MenuItem>
                  {roles.map((role, idx) => (
                    <MenuItem key={idx} value={role?.id}>
                      {role.name.substr(5)}
                    </MenuItem>
                  ))}
                </Select>
              </Grow>
            )
          }
        },
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex]
          let role = user.role?.name
          return (
            <Link
              to={{
                pathname: '/user/details',
                state: {
                  id: user.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <h5 className='my-0 text-muted'>
                  {' '}
                  {role?.substr(5) || '-----'}
                </h5>
              </div>
            </Link>
          )
        },
      },
    },
    {
      name: 'action',
      label: ' ',
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex]
          return (
            <div className='flex items-center'>
              <Link
                to={{
                  pathname: '/user/edit',
                  state: {
                    id: user.id,
                    user,
                  },
                }}
              >
                <IconButton>
                  <Icon>edit</Icon>
                </IconButton>
              </Link>
            </div>
          )
        },
      },
    },
    {
      name: 'delete',
      label: ' ',
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex]
          return (
            <div className='flex items-center'>
              <div>
                <IconButton
                  onClick={() =>
                    dialog
                      .confirm(`Are you sure you want to delete ${user?.firstName || 'N/A'} ${user?.lastName || 'N/A'
                        }?`)
                      .then(async (value) => {
                        const result = await deleteUser(
                          user?.id,
                          isLoading,
                        ).then((res) => {
                          refresh();
                          setAlertData({ success: true, text: 'User has been deleted successfully', title: 'User Deleted' })
                          handleAlertModal();
                        }).catch((err) => {
                          setAlertData({ success: false, text: 'Unable to delete user. Please try again', title: 'User Deleted' })
                          handleAlertModal();
                        });
                      })
                      .catch(() => {
                        return false;
                      })
                  }
                >
                  <Icon>delete</Icon>
                </IconButton>
              </div>
            </div>
          )
        },
      },
    },
  ]

  const debouncedUsers = debounce((value) => {
    console.log(value);
    if (value.length > 0) {
      filterAllUser(setUserList, setAlert, setSeverity, setCount, page, size, role, value);
      setQuery(value);
    } else {
      filterAllUser(setUserList, setAlert, setSeverity, setCount, page, size, role, '');
      setQuery('');
    }
  }, 700);

  const performSearch = (value) => {
    debouncedUsers(value);
  };



  return (
    <div className='m-sm-30'>
      <Alert
        isOpen={alertOpen}
        handleModal={handleAlertModal}
        alertData={alertData}
        handleOK={handleAlertOK}
      />
      {severity === 'error' && (
        <Notification severity={severity} alert={alert} />
      )}
      <div className='mb-sm-30'>
        <Breadcrumb
          routeSegments={[{ name: 'Users', path: '/users' }, { name: 'Users' }]}
        />
      </div>
      <div className='overflow-auto'>
        <div className='min-w-750 all-users-table'>
          {loading ? (
            <Loading />
          ) : (
            <MUIDataTable
              title={<div>
                <h4 className='mt-4 mb-0'>{title}</h4>
                <div className='w-full flex'>
                  <div className='w-220 flex-end mt-4 user-roles'>
                    <Grow appear in={true} timeout={300}>
                      <Select
                        size='small'
                        fullWidth
                        variant='outlined'
                        displayEmpty={true}
                        renderValue={value => value?.length ? Array.isArray(value) ? value.join(', ') : value : 'Select Role'}
                        onChange={({ target: { value } }) => handleCustomSearch(value)}
                        style={{ width: "260px" }}
                      >
                        <MenuItem key={"null"} value={0}>
                          All
                        </MenuItem>
                        {roles.map((role, idx) => (
                          <MenuItem key={idx} value={role?.id}>
                            {role.name.substr(5)}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grow>
                  </div>
                </div>
              </div>}
              data={userList}
              columns={columns}
              options={{
                setTableProps: () => ({ className: "user-table" }),
                selectableRows: false,
                filter: false,
                filterType: 'textField',
                responsive: 'standard',
                elevation: 0,
                serverSide: true,
                count,
                sort: true,
                sortOrder: { name: 'id', direction: 'desc' },
                page,
                onTableChange: (action, tableState) => {
                  if (action === 'changePage') {
                    onPageChange(tableState.page)
                  }
                },
                rowsPerPageOptions: [10, 20, 40, 80, 100],
                rowsPerPage: size,
                onChangeRowsPerPage: (x) => {
                  setSize(x)
                },
                customSearchRender: (
                  searchText,
                  handleSearch,
                  hideSearch,
                  options
                ) => {
                  return (
                    <Grow appear in={true} timeout={300}>
                      <TextField
                        variant='outlined'
                        size='small'
                        fullWidth
                        onChange={({ target: { value } }) => {
                          handleSearch(value);
                          performSearch(value)
                        }
                        }
                        InputProps={{
                          style: {
                            paddingRight: 0,
                          },
                          startAdornment: (
                            <Icon className='mr-2' fontSize='small'>
                              search
                            </Icon>
                          ),
                          endAdornment: (
                            <IconButton onClick={() => {
                              hideSearch();
                              filterAllUser(setUserList, setAlert, setSeverity, setCount, page, size, role, '');
                              setQuery('');
                            }}>
                              <Icon fontSize='small'>clear</Icon>
                            </IconButton>
                          ),
                        }}
                      />
                    </Grow>
                  )
                },
                customToolbar: () => {
                  return (
                    <Link
                      to={{
                        pathname: '/user/new',
                        state: {},
                      }}
                    >
                      <IconButton>
                        <Button variant='contained' color='primary'>
                          <Icon>add</Icon>Add New
                        </Button>
                      </IconButton>
                      <div className='w-full pr-20 flex justify-end items-center'>
                        <p className='pr-10'>Total: </p>
                        <h6 className='mb-0'>{total}</h6>
                      </div>
                    </Link>
                  )
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Users
