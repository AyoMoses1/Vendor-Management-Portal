import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'matx'
import MUIDataTable from 'mui-datatables'


import {
    Grow, 
    Icon,
    IconButton,
    TextField,
    Button,
    Box
} from '@material-ui/core'

import { Link } from 'react-router-dom'

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


const ShippingOptionByGroup = ({group}) => {
    const [loading, setLoading] = React.useState(false)
    const dialog = useDialog()
    const [{ shippinOptions, totalCount, size }, setShippingOptions] = useState({
      size: 10,
    });
    const [page, setPage] = useState(0);


    const getShippingOptionsByGroup = async (params) => {
      setLoading(true);
        http
          .get(`/afrimash/shipping-option?shippingOptionGroupId=${params.groupId}&size=${params.size}&page=${params.page}`)
          .then((res) => {
            setShippingOptions({
              shippinOptions: res?.data.object.content,
              totalCount: res?.data.object.totalElements,
              size: res?.data.object.size,
            });
            setLoading(false);
          })
          .catch((e) => {
            setLoading(false);
            console.log(e)
          });
    };


    const handleChangePage = (newPage) => {
      setPage(newPage);
      getShippingOptionsByGroup({ page: newPage, size: size , groupId: group});
    };
  
    const handleChangeRowsPerPage = (value) => {
      getShippingOptionsByGroup({ page: 0, size: parseInt(value, 10), groupId: group });
    };


    useEffect(() => {
      getShippingOptionsByGroup({groupId: group, page: 0, size})
      setPage(0)
    }, [group])


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
    

    return (

        <>
            <div className='overflow-auto'>
                <div className='min-w-750'>
                    {loading ? (
                        <loading/>
                    ): (
                        <>
                           
                            <MUIDataTable
                                title={'Shipping Options'}
                                data={shippinOptions}
                                columns={columns}
                                options={{
                                filter: true,
                                sort: true,
                                serverSide: true,
                                count: totalCount,
                                page: page,
                                onChangePage: (value) => handleChangePage(value),
                                onChangeRowsPerPage: handleChangeRowsPerPage,
                                rowsPerPage: size,
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
        
    )
}



export default ShippingOptionByGroup