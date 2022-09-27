import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'matx';
import MUIDataTable from 'mui-datatables';
import {
  Grow,
  Icon,
  IconButton,
  TextField,
  Button,
  TableCell,
  MenuItem
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDialog } from 'muibox';
import {
  getPickupCenters,
  getShippingStates,
  getFilteredPickupCenters
} from '../../../redux/actions/ussd-action';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import './index.css';
import NewPickupCenter from './NewPickupCenter';
import { deletePickupCenter } from '../USSDService';
import Notification from '../../../components/Notification';
import { errorState } from '../../helpers/error-state';

const DOCPickupCenters = () => {
  const dialog = useDialog();
  const { loading, pickupCenters, error } = useSelector(
    (state) => state.getPickupCenters,
  );
  const { shippingStates } = useSelector(
    (state) => state.getShippingStates,
  );
  const dispatcher = useDispatch();
  const [open, setOpen] = useState(false)
  const [pickupCenter, setPickupCenter] = useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [alert, setAlert] = React.useState('')
  const [severity, setSeverity] = React.useState('')

  const handleModal = () => {
    setOpen(!open)
  }

  useEffect(() => {
    dispatcher(getPickupCenters({}));
  }, []);

  useEffect(() => {
    if (pickupCenters && pickupCenters?.length) {
      dispatcher(getShippingStates());
    }
  }, [pickupCenters])

  const refresh = () => {
    dispatcher(getPickupCenters({}));
  }

  const handleCustomSearch = (value) => {
    if (value) {
      dispatcher(getFilteredPickupCenters({
        params: {
          stateId: value
        }
      }));
    }
  }

  const columns = [
    {
      name: 'address',
      label: 'Address',
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          const doc = pickupCenters[dataIndex];
          return (
            <Link
              to={{
                pathname: `/pickup-center/${doc.id}`,
                state: {
                  id: doc.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <p className='my-0 text-10'>{`${doc?.address}`}</p>
              </div>
            </Link>
          );
        },
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ width: "300px", }}>
              <div>{column.label}</div>
            </TableCell>
          )
        }
      },
    },
    {
      name: 'city',
      label: 'City',
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          const doc = pickupCenters[dataIndex];
          return (
            <Link
              to={{
                pathname: `/pickup-center/${doc.id}`,
                state: {
                  id: doc.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <p className='my-0 text-10'>{`${doc?.city}`}</p>
              </div>
            </Link>
          );
        },
      },
    },
    {
      name: 'state',
      label: 'State',
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          const doc = pickupCenters[dataIndex];
          return (
            <Link
              to={{
                pathname: `/pickup-center/${doc.id}`,
                state: {
                  id: doc.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <p className='my-0 text-10'>{`${doc?.state?.name}`}</p>
              </div>
            </Link>
          );
        },
      },
    },
    {
      name: 'edit',
      label: ' ',
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          let doc = pickupCenters[dataIndex];
          return (
            <div className='flex items-center'>
              <div>
                <IconButton
                  onClick={() => {
                    setPickupCenter(doc)
                    handleModal()
                  }}>
                  <Icon>edit</Icon>
                </IconButton>
              </div>
            </div>
          );
        },
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ width: "50px", }}>
              <div>{column.label}</div>
            </TableCell>
          )
        }
      },
    },
    {
      name: 'action',
      label: ' ',
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          let doc = pickupCenters[dataIndex];
          return (
            <div className='flex items-center'>
              <div>
                <IconButton
                  onClick={() =>
                    dialog
                      .confirm('Are you sure you want to delete?')
                      .then(async (value) => {
                        const result = await deletePickupCenter(
                          doc?.id,
                          setIsLoading,
                          setAlert,
                          setSeverity
                        ).then((res) => res)
                        if (result) {
                          refresh();
                        } else if (!result) {
                          errorState(setAlert, setSeverity)
                        }
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
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ width: "50px", }}>
              <div>{column.label}</div>
            </TableCell>
          )
        }
      },
    },
  ];

  return (
    <div className='m-sm-30'>
      <div className='mb-sm-30'>
        <Breadcrumb
          routeSegments={[
            {
              name: 'DOC Pickup Centers',
              path: '/doc-pickup-centers',
            },
          ]}
        />
      </div>
      <div className='overflow-auto'>
        <div className='min-w-750 all-centres-table'>
          {(loading || isLoading) && <CircularProgress size={20} />}
          {severity === 'error' && (
            <Notification alert={alert} severity={severity || ''} />
          )}
          <MUIDataTable
            title={'DOC Pickup Centers'}
            data={pickupCenters}
            columns={columns}
            options={{
              setTableProps: () => ({ className: "doc-table" }),
              selectableRows: false,
              filter: false,
              sort: true,
              sortOrder: { name: 'id', direction: 'desc' },
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
                      select
                      fullWidth
                      onChange={({ target: { value } }) => handleCustomSearch(value)}
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
                    >
                      {shippingStates.map((state, idx) => (
                        <MenuItem key={idx} value={state?.id}>
                          {state?.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grow>
                );
              },
              customToolbar: () => {
                return (
                  <>
                    <IconButton>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={() => {
                          setPickupCenter(null)
                          handleModal()
                        }}>
                        Add Pickup Center
                      </Button>
                    </IconButton>
                    <NewPickupCenter
                      name={pickupCenter ? "Edit Pickup Center" : "Add New Pickup Center"}
                      isOpen={open}
                      pickupCenter={pickupCenter}
                      handleClose={handleModal}
                      refresh={() => refresh()} />
                  </>
                )
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DOCPickupCenters;
