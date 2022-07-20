import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'matx'
import MUIDataTable from 'mui-datatables'
import { useDialog } from 'muibox'
import "../../orders/order-view.css"
import {
  Grow,
  Icon,
  IconButton,
  TextField,
  Button,
  MenuItem,
  TableCell
} from '@material-ui/core'
import './special-orders.css';
import { getSpecialOrders } from '../../../redux/actions/ussd-action';
import CircularProgress from '@material-ui/core/CircularProgress';
import Notification from '../../../components/Notification';

import { useDispatch, useSelector } from 'react-redux'
import './special-orders.css'



const USSDSpecialOrdersComponent = () => {

  const [isLoading, setIsLoading] = React.useState(false);
  const [severity, setSeverity] = React.useState('')
  const [alert, setAlert] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [size, setSize] = React.useState(10)
  const [page, setPage] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const { loading, specialOrders, error } = useSelector(
    (state) => state.getSpecialOrders,
  );
  const dispatcher = useDispatch();

  const handleModal = () => {
    setOpen(!open)
  }

  const onPageChange = (page) => {

    getSpecialOrders({page: page, size: size, setCount:setCount})
    
    setPage(page)
  }
  const refresh = () => {
    dispatcher(getSpecialOrders({}));
  }

  useEffect(() => {
    dispatcher(getSpecialOrders({page: page, size: size, setCount: setCount}));
  }, [size, page])

  useEffect(() => {
  }, [specialOrders])

const columns = [
  {
    name: 'specialOrderNo',
    label: 'Order',
    options: {
      filter: false,
      customBodyRenderLite: (dataIndex) => {
        const specialOrder = specialOrders[dataIndex];
        return (
          <Link
            to={{
              pathname: `/special-order/${specialOrder.id}`,
              state: {
                id: specialOrder.id,
                specialOrder,
              },
            }}
            className='flex items-center'
          >
            <div className='ml-3'>
              <span className='my-0 text-15'>{specialOrder.specialOrderNo ? specialOrder.specialOrderNo: "No reference"}</span>
              <br />
              <small className='text-muted'>
                {specialOrder?.customerName}
              </small>
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
    name: 'status',
    label: 'Status',
    options: {
      filter: false,
      customBodyRenderLite: (dataIndex) => {
        const specialOrder = specialOrders[dataIndex];
        return (
          <div className={`items-center ORDER ${specialOrder.status}`}>
              <Link
                to={{
                  pathname: `/special-order/${specialOrder.id}`,
                  state: {
                    id: specialOrder.id,
                    specialOrder,
                  },
                }}
                className='ml-3'
              >
                <span className={`my-0 text-15 ORDER ${specialOrder.status}`}>
                  {' '}
                  {`${specialOrder.status}` || '-----'}
                </span>
              </Link>
            </div>
        );
      },
    },
  },
  {
    name: 'location',
    label: 'Location',
    options: {
      filter: true,
      customBodyRenderLite: (dataIndex) => {
        const specialOrder = specialOrders[dataIndex];
        return (
          <Link
            to={{
              pathname: `/special-order/${specialOrder.id}`,
              state: {
                id: specialOrder.id,
                specialOrder,
              },
            }}
            className='flex items-center'
          >
            <div className='ml-3'>
              <p className='my-0 text-10'>{`${specialOrder?.location}`}</p>
            </div>
          </Link>
        );
      },
    },
  },
  {
    name: 'data',
    label: 'Date',
    options: {
      filter: false,
      customBodyRenderLite: (dataIndex) => {
        const specialOrder = specialOrders[dataIndex];
        return (
          <Link
            to={{
              pathname: `/special-order/${specialOrder.id}`,
              state: {
                id: specialOrder.id,
                specialOrder,
              },
            }}
            className='flex items-center'
          >
            <div className='ml-3'>
              <p className='my-0 text-10'>{`${specialOrder?.dateCreated}`}</p>
            </div>
          </Link>
        );
      },
    },
  },
  {
    name: 'mobile',
    label: 'Mobile',
    options: {
      filter: true,
      customBodyRenderLite: (dataIndex) => {
        const specialOrder = specialOrders[dataIndex];
        return (
          <Link
            to={{
              pathname: `/special-order/${specialOrder.id}`,
              state: {
                id: specialOrder.id,
                specialOrder,
              },
            }}
            className='flex items-center'
          >
            <div className='ml-3'>
              <p className='my-0 text-10'>{`${specialOrder?.mobileNo}`}</p>
            </div>
          </Link>
        );
      },
    },
  },
  {
    name: 'id', // field name in the row object
    label: '', // column title that will be shown in table
    options: {
      filter: false,
      customBodyRenderLite: (dataIndex) => {
        let specialOrder = specialOrders[dataIndex]
        return (
          <div>
            <h5 className='my-0 text-15'>{`${specialOrder?.id}`}</h5>
          </div>
        )
      },
    },
  },
  
];

  return (
    <div className='m-sm-30'>
      <div className='mb-sm-30'>
        <Breadcrumb
          routeSegments={[
            {
              name: 'USSD Special Orders',
              path: '/special-orders',
            },
          ]}
        />
      </div>
      <div className='overflow-auto'>
        <div className='min-w-750'>
          {(loading || isLoading) && <CircularProgress size={20} />}
          {severity === 'error' && (
            <Notification alert={alert} severity={severity || ''} />
          )}
          <MUIDataTable
            title={'USSD Special Orders'}
            data={specialOrders}
            columns={columns}
            options={{
              setTableProps: () => ({ className: "special-order-table" }),
              selectableRows: false,
              filter: true,
              sort: true,
              sortOrder: { name: 'id', direction: 'ascending' },
              filterType: 'dropdown',
              responsive: 'standard',
              serverSide: true,
              count,
              elevation: 0,
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
                options,
              ) => {
                return (
                  <Grow appear in={true} timeout={300}>
                    <TextField
                      variant='outlined'
                      size='small'
                      select
                      fullWidth
                      // onChange={({ target: { value } }) => handleCustomSearch(value)}
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
                      {specialOrders.map((order, idx) => (
                        <MenuItem key={idx} value={order?.id}>
                          {order?.customerName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grow>
                );
              },
              // customToolbar: () => {
              //   return (
              //     <>
              //       <IconButton>
              //         <Button
              //           variant='contained'
              //           color='primary'
              //           /*onClick={() => {
              //             setPickupCenter(null)
              //             handleModal()
              //           }}*/>
              //           Add Special Order
              //         </Button>
              //       </IconButton>
              //       {/* <NewPickupCenter
              //         name={pickupCenter ? "Edit Pickup Center" : "Add New Pickup Center"}
              //         isOpen={open}
              //         pickupCenter={pickupCenter}
              //         handleClose={handleModal}
              //         refresh={() => refresh()} /> */}
              //     </>
              //   )
              // },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default USSDSpecialOrdersComponent