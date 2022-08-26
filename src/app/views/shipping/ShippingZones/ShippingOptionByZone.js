import React, { useEffect } from 'react';
import { Breadcrumb } from 'matx';
import MUIDataTable from 'mui-datatables';
import {
  /*  MenuItem, */
  Grow,
  Icon,
  IconButton,
  TextField,
  Button,
  Box
  /*  FormControl,
  InputLabel,
  Select, */
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDialog } from 'muibox';

import http from '../../../services/api';

import Loading from 'matx/components/MatxLoadable/Loading';
import Notification from 'app/components/Notification';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector, useDispatch } from 'react-redux';
import { getShippingOptionGroup } from 'app/redux/actions/shippingActions'



const ShippingOptionByZone = ({ id }) => {
const shippingOptionGroupList = useSelector((state) => state.shippingOptionGroupList)
const {loading:shippingGroupLoading, shipping:  shippingGroups, error:shippingGroupError} = shippingOptionGroupList
  const [shippinOptions, setShippingOptions] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [severity, setSeverirty] = React.useState('');
  const dialog = useDialog();
  const dispatch = useDispatch()

  console.log({ shippingGroups })

  useEffect(() => {
    dispatch(getShippingOptionGroup({}))
  }, [])

  const getAllShippingOptions = async (zoneId) => {

    
    setLoading(true);
    http
      .get(`/afrimash/shipping-option?shippingZoneId=${zoneId}`)
      .then((res) => {
           
        setShippingOptions(res?.data.object.content);
        setLoading(false);
      })
      .catch((e) => {
        
        console.log(e)
      });
  };

  const getAllShippingOptionsByGroup = async (groupId) => {
    setLoading(true);
    http
      .get(`/afrimash/shipping-option?shippingOptionGroupId=${groupId}&shippingZoneId=${id}`)
      .then((res) => {
        setShippingOptions(res?.data.object.content);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (id) {
      getAllShippingOptions(id);
    }
  }, [id]);

  const columns = [
    {
      name: 'name', // field name in the row object
      label: 'Name', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          const shippingZone = shippinOptions[dataIndex];
          return (
            <Link
              to={{
                pathname: `/shipping-option/details/${shippingZone.id}`,
                state: {
                  id: shippingZone.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <p className='my-0 text-10'>{`${shippingZone?.name}`}</p>
              </div>
            </Link>
          );
        },
      },
    },

    {
      name: 'Shipping Group', // field name in the row object
      label: 'shippingGroup', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          const shippingOption = shippinOptions[dataIndex];
          return (
            <Link
              to={{
                pathname: `/shipping-option/details/${shippingOption.id}`,
                state: {
                  id: shippingOption.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <p className='my-0 text-10'>{`${shippingOption?.shippingOptionGroup?.name}`}</p>
              </div>
            </Link>
          );
        },
      },
    },
    {
      name: 'Shipping Zone', // field name in the row object
      label: 'shippingZone', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          const shippingZone = shippinOptions[dataIndex];
          return (
            <Link
              to={{
                pathname: `/shipping-option/details/${shippingZone.id}`,
                state: {
                  id: shippingZone.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <p className='my-0 text-10'>{`${shippingZone?.shippingZone?.name}`}</p>
              </div>
            </Link>
          );
        },
      },
    },
    {
      name: 'calculationUnit', // field name in the row object
      label: 'Calculation Unit', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          const shippingZone = shippinOptions[dataIndex];
          return (
            <Link
              to={{
                pathname: `/shipping-option/details/${shippingZone.id}`,
                state: {
                  id: shippingZone.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <p className='my-0 text-10'>{`${shippingZone?.calculationUnit}`}</p>
              </div>
            </Link>
          );
        },
      },
    },
    {
      name: 'id', // field name in the row object
      label: 'ID', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          const shippingZone = shippinOptions[dataIndex];
          return (
            <Link
              to={{
                pathname: `/shipping-option/details/${shippingZone.id}`,
                state: {
                  id: shippingZone.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'></div>
            </Link>
          );
        },
      },
    },
    {
      name: 'action',
      label: ' ',
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          let shippingZone = shippinOptions[dataIndex];
          return (
            <div className='flex items-center'>
              <div>
                <IconButton
                  onClick={() =>
                    dialog
                      .confirm('Are you sure you want to delete?')
                      .then((value) => {
                        http
                          .delete(`afrimash/shipping-option/${shippingZone.id}`)
                          .then(() => window.location.reload());
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
          );
        },
      },
    },
    {
      name: 'action',
      label: ' ',
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          let shippingOption = shippinOptions[dataIndex];
          return (
            <div className='flex items-center ml-10'>
              <Link
                to={{
                  pathname: `/shipping-option/new`,
                  state: {
                    id: shippingOption.id,
                  },
                }}
              >
                <IconButton>
                  <Icon>edit</Icon>
                </IconButton>
              </Link>
            </div>
          );
        },
      },
    },
  ];

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
    (() => {
        getAllShippingOptionsByGroup(event.target.value)
    })()
  };

  return (
    <>
      <div className='overflow-auto'>
        <div className='min-w-750'>
          {loading ? (
            <Loading />
          ) : (
            <>
              <Box mt={4} sx={{ minWidth: '50%' }}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>Filter by Shipping Option Group</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={age}
                    label='Filter by Shipping Option Group'
                    onChange={handleChange}
                  >

                    {shippingGroups.map(option => {
                        return (<MenuItem key={option?.id} value={option?.id}>{option?.name}</MenuItem>)
                    })}
                  </Select>
                </FormControl>
              </Box>
              <MUIDataTable
                title={'Shipping Options'}
                data={shippinOptions}
                columns={columns}
                options={{
                  filter: true,
                  sort: true,
                  sortOrder: { name: 'id', direction: 'desc' },
                  filterType: 'dropdown',
                  responsive: 'standard',
                  elevation: 0,
                  rowsPerPageOptions: [10, 20, 40, 80, 100],
                  customSearchRender: (
                    searchText,
                    handleSearch,
                    hideSearch,
                    options,
                  ) => {
                    return (
                      <Grow appear in={true} timeout={300}>
                        <TextField
                          variant='outlined'
                          size='small'
                          fullWidth
                          onChange={({ target: { value } }) =>
                            handleSearch(value)
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
                              <IconButton onClick={hideSearch}>
                                <Icon fontSize='small'>clear</Icon>
                              </IconButton>
                            ),
                          }}
                        />
                      </Grow>
                    );
                  },
                  customToolbar: () => {
                    return (
                      <Link
                        to={{
                          pathname: '/shipping-option/new',
                          state: {},
                        }}
                      >
                        <Button variant='contained' color='primary'>
                          Create new shipping option
                        </Button>
                      </Link>
                    );
                  },
                }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ShippingOptionByZone;
