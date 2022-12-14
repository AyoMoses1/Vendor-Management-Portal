import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'matx'
import MUIDataTable from 'mui-datatables'
import { Grow, Icon, IconButton, TextField, Button, MenuItem } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Loading from 'matx/components/MatxLoadable/Loading'
import './customer-view.css'
import { states } from '../../../utils/states';
import Notification from '../../components/Notification'
import { filterAllCustomer, getAllCustomer } from './CustomerService';
import { getCustomerStatistics } from '../dashboard/DashboardService'
import { debounce } from 'lodash'
import Select from '@mui/material/Select';
states.unshift('All');

const filterTypes = ['Source', 'Location',]

const sourceTypes = [
  {
    type: 'ALL CUSTOMERS',
    value: 'ALL',
    name: 'All Customers'
  },
  {
    type: 'USSD',
    value: 'USSD',
    name: 'USSD'
  },
  {
    type: 'ADMIN',
    value: 'ADMIN',
    name: 'Admin'
  },
  {
    type: 'AGENT APP',
    value: 'AGENT_APP',
    name: 'Agent App'
  },
  {
    type: 'CUSTOMER APP',
    value: 'CUSTOMER_APP',
    name: 'Customer App'
  },
  {
    type: 'MARKET PLACE',
    value: 'MARKET_PLACE',
    name: 'Market Place'
  },
  {
    type: 'IVR',
    value: 'IVR',
    name: 'IVR'
  },
  {
    type: 'SMS',
    value: 'SMS',
    name: 'SMS'
  },
]

const CustomerList = () => {
  const [isAlive, setIsAlive] = useState(true)
  const [userList, setUserList] = useState([])
  const [loading, isLoading] = useState(false)
  const [alert, setAlert] = useState('')
  const [severity, setSeverity] = useState('')
  const [source, setSource] = useState('ALL')
  const [filter, setFilter] = useState('')
  const [filters, setFilters] = useState(filterTypes)
  const [filterList, setFilterList] = useState([])
  const [state, setState] = useState('All')
  const [title, setTitle] = useState('All Customers')
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10);
  const [statistics, setStatistics] = useState([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState('');

  const filterOptions = [{ name: "Source" }, { name: "Location", }]

  const handleTitle = (value) => {
    const v = sourceTypes.find(s => s.value === value).name;
    setTitle(v);
  }

  useEffect(() => {
    const _source = source === 'ALL' ? '' : source;
    const _state = state === 'All' ? '' : state;
    getAllCustomer(setUserList, setCount, isLoading, setAlert, setSeverity, size, page, _source, query, _state)

    return () => setIsAlive(false)
  }, [isAlive, source, size, state]);

  useEffect(() => {
    getCustomerStatistics(setStatistics);
  }, [])

  useEffect(() => {
    if (statistics.length) {
      if (source === 'ALL') {
        setTotal(count);
      } else {
        const tempTotal = statistics.find(s => s.source === source)?.total ?? 0;
        setTotal(tempTotal);
      }
    }
  }, [statistics, source, state])

  const onPageChange = (page) => {
    const _source = source === 'ALL' ? '' : source;
    const _state = state === 'All' ? '' : state;
    getAllCustomer(setUserList, setCount, isLoading, setAlert, setSeverity, size, page, _source, query, _state)
    setPage(page)
  }

  const performSearch = (value) => {
    debouncedCustomers(value)
  }

  const handleFilter = (value) => {
    const newFilters = filters.filter(f => f !== value)
    const option = filterOptions.find(o => o.name === value);
    setFilters(newFilters);
    setFilterList([...filterList, option]);
  }

  const removeFilter = (value) => {
    if (value === 'Source') {
      setSource('ALL')
      handleTitle('ALL')
    };
    if (value === 'Location') setState('All');
    const options = filterList.filter(l => l.name !== value)
    setFilters([...filters, value]);
    setFilterList(options);
  }

  const columns = [
    {
      name: 'fullName', // field name in the row object
      label: 'Name', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex]
          return (
            <div className='flex items-center customer__name'>
              <Link
                to={{
                  pathname: '/customer/details',
                  state: {
                    id: user.id,
                  },
                }}
                className='ml-3'
              >
                <span className='my-0 text-15'>{`${user?.fullName}`}</span>
              </Link>
            </div>
          )
        },
      },
    },

    {
      name: 'mobileNo',
      label: 'Phone Number',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex]
          return (
            <div className='flex items-center customer__email'>
              <Link
                to={{
                  pathname: '/customer/details',
                  state: {
                    id: user.id,
                  },
                }}
                className='ml-3'
              >
                <span className='my-0 text-15'> {user.mobileNo || '-----'}</span>
              </Link>
            </div>
          )
        },
      },
    },

    {
      name: 'email',
      label: 'Email',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex]
          return (
            <div className='flex items-center customer__phone'>
              <Link
                to={{
                  pathname: '/customer/details',
                  state: {
                    id: user.id,
                  },
                }}
                className='ml-3'
              >
                <span className='my-0 text-15'>{user.email || '-----'}</span>
              </Link>
            </div>
          )
        },
      },
    },

    {
      name: 'dateRegistered',
      label: 'Date Registered',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex]
          return (
            <div className='flex items-center date__registered'>
              <Link
                to={{
                  pathname: '/customer/details',
                  state: {
                    id: user.id,
                  },
                }}
                className='ml-3'
              >
                <span className='my-0 text-15'>
                  {' '}
                  {user.dateRegistered.split(" ")[0] || '-----'}
                </span> <br />
                <span className='date'>
                  {user.dateRegistered.split(" ")[1] || '-----'}
                </span>
              </Link>
            </div>
          )
        },
      },
    },

    {
      name: 'lastActivity',
      label: 'Last Active',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex]
          return (
            <div className='flex items-center customer__activity'>
              <Link
                to={{
                  pathname: '/customer/details',
                  state: {
                    id: user.id,
                  },
                }}
                className='ml-3'
              >
                <span className='my-0 text-15'>
                  {' '}
                  {user.lastActivity || '------'}
                </span>
              </Link>
            </div>
          )
        },
      },
    },

    {
      name: 'creditSpent',
      label: 'Total Spend',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex]
          return (
            <div className='flex items-center total__spend'>
              <Link
                to={{
                  pathname: '/customer/details',
                  state: {
                    id: user.id,
                  },
                }}
                className='ml-3'
              >
                <span className='my-0 text-15'>{user.creditSpent || '----------'}</span>
              </Link>
            </div>
          )
        },
      },
    },

    {
      name: 'creditLimit',
      label: 'AOV',
      options: {
        filter: true,
        download:true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex]
          return (
            <div className='flex items-center credit__limit'>
              <Link
                to={{
                  pathname: '/customer/details',
                  state: {
                    id: user.id,
                  },
                }}
                className='ml-3'
              >
                <span className='my-0 text-15'>{user.creditLimit || '#5,023,500.00'}</span>
              </Link>
            </div>
          )
        },
      },
    },
  ]

  const debouncedCustomers = debounce(value => {
    const _source = source === 'ALL' ? '' : source;
    const _state = state === 'All' ? '' : state;
    if (value.length > 0) {
      filterAllCustomer(setUserList, setCount, setAlert, setSeverity, size, page, _source, value, _state);
      setQuery(value);
    } else {
      filterAllCustomer(setUserList, setCount, setAlert, setSeverity, size, page, _source, '', _state);
      setQuery('');
    }
  }, 700);

  return (
    <div className='m-sm-30'>
      <div className='mb-sm-30'>
        <Breadcrumb
          routeSegments={[
            { name: 'Customers', path: '/customers' },
            { name: 'Customer' },
          ]}
        />
      </div>
      <div className='overflow-auto'>
        {severity === 'error' && (
          <Notification alert={alert} severity={severity || ''} />
        )}
        <div className='min-w-750 customer-table'>
          {loading ? (
            <Loading />
          ) : (
            <MUIDataTable
              title={<div>
                <h4 className='mt-4 mb-0'>{title}</h4>
                <div className='w-full flex' style={{ height: "70px" }}>
                  {filterList.map(({ name }) =>
                    <React.Fragment key={"" + Math.random()}>
                      {name === "Source" ? <div className='w-180 flex-end sources mr-4'>
                        <Icon className='close-icon' onClick={() => removeFilter("Source")}>close</Icon>
                        <TextField
                          className='mb-4'
                          name='mobileNo'
                          label='Filter by source'
                          variant='outlined'
                          margin='normal'
                          select
                          fullWidth
                          value={source}
                          onChange={(e) => { setSource(e.target.value); handleTitle(e.target.value) }}
                        >
                          {sourceTypes.map((sourceType, idx) => (
                            <MenuItem key={idx} value={sourceType.value}>
                              {sourceType.type}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div> : <></>}
                      {name === "Location" ? <div className='w-150 flex-end sources mr-4'>
                        <Icon className='close-icon' onClick={() => removeFilter("Location")}>close</Icon>
                        <TextField
                          className='mb-4'
                          name='mobileNo'
                          label='Filter by location'
                          variant='outlined'
                          margin='normal'
                          select
                          fullWidth
                          value={state}
                          onChange={(e) => { setState(e.target.value) }}
                        >
                          {states.map((s, idx) => (
                            <MenuItem key={idx} value={s}>
                              {s}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div> : <></>}
                    </React.Fragment>)}
                  {
                    filters?.length ? <div className='w-150 flex-end filters mr-4'>
                      <Select
                        size='small'
                        fullWidth
                        variant='outlined'
                        displayEmpty={true}
                        value={filter}
                        renderValue={value => value?.length ? Array.isArray(value) ? value.join(', ') : value : 'Add filter condition'}
                        onChange={({ target: { value } }) => handleFilter(value)}
                        style={{ width: "220px", fontSize: "12px", height: "40px" }}
                      >
                        {filters.map((f) => {
                          return (
                            <MenuItem key={f} value={f}>{f}</MenuItem>
                          );
                        })}
                      </Select>
                    </div> : <></>
                  }
                </div>
              </div>}
              data={userList}
              columns={columns}
              options={{
                filter: false,
                responsive: 'standard',
                serverSide: true,
                count,
                sort: true,
                setTableProps: () => ({ className: "customer-table" }),
                selectableRows: false,
                sortOrder: { name: 'id', direction: 'desc' },
                elevation: 0,
                page,
                onTableChange: (action, tableState) => {
                  if (action === 'changePage') {
                    onPageChange(tableState.page)
                  }
                },
                rowsPerPageOptions: [20, 40, 60, 80, 100],
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
                              const _source = source === 'ALL' ? '' : source;
                              const _state = state === 'All' ? '' : state;
                              filterAllCustomer(setUserList, setCount, setAlert, setSeverity, size, page, _source, '', _state);
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
                    <>
                      <Link
                        to={{
                          pathname: '/customer/new',
                          state: {},
                        }}
                      >
                        <IconButton>
                          <Button variant='contained' color='primary'>
                            Add New
                          </Button>
                        </IconButton>
                        <div className='w-full pr-20 flex justify-end items-center'>
                          <p className='pr-10'>Total: </p>
                          <h6 className='mb-0'>{count}</h6>
                          {/* <h6 className='mb-0'>{total}</h6> */}
                        </div>
                      </Link>
                    </>
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

export default CustomerList