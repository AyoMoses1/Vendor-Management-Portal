import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import MUIDataTable from "mui-datatables";
import { useDialog } from "muibox";
import {
  Grow,
  Icon,
  IconButton,
  TextField,
  Button,
  MenuItem,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./order-view.css";
import { deleteInvoice, getAllInvoice, getOrderStatus } from "./OrderService";
import Loading from "matx/components/MatxLoadable/Loading";

import { GET_ALL_ORDERS } from "../../redux/actions/EcommerceActions";
import { useDispatch } from "react-redux";
import { capitalize, formatDate, formatToCurrency } from "utils";
import { debounce } from "lodash";

const Orders = (props) => {
  const [size, setSize] = useState(10);
  const [isAlive, setIsAlive] = useState(true);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const dialog = useDialog();
  const dispatch = useDispatch();
  const [source, setSource] = useState("ALL");

  const [title, setTitle] = useState("ALL ORDERS");
  const [orderStatus, setOrderStatus] = useState([]);
  const [value, setValue] = React.useState(0);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('')

  const fetchOrderStatus = async (event, newValue) => {
    setValue(newValue);
    const response = await getOrderStatus(setLoading);
    setOrderStatus(response);
  };

  const sourceTypes = [
    {
      type: "ALL ORDERS",
      value: "ALL",
    },
    {
      type: "USSD",
      value: "USSD",
    },
    {
      type: "ADMIN",
      value: "ADMIN",
    },
    {
      type: "AGENT APP",
      value: "AGENT_APP",
    },
    {
      type: "CUSTOMER APP",
      value: "CUSTOMER_APP",
    },
    {
      type: "MARKET PLACE",
      value: "MARKET_PLACE",
    },
  ];
  useEffect(() => {
    setLoading(true);
    const _source = source === "ALL" ? "" : source;

    const fetchAllOrders = async () => {
      const response = await getAllInvoice(setLoading, page, size, _source, query);
      setOrders(response?.content);
      setCount(response?.totalElements);
    };

    fetchAllOrders();
    dispatch({ type: GET_ALL_ORDERS });
    fetchOrderStatus();
    return () => setIsAlive(false);
  }, [dispatch, isAlive, page, source, size]);

  const onChangePage = (page) => {
    setPage(page);
  };

  const handleActiveLink = async (orderStats, e) => {
    setLoading(true);
    const _source = source === "ALL" ? "" : source;
    
    const response = await getAllInvoice(setLoading, page, size, _source, query);
    setLoading(false);
    // console.log(orderStats, "order status");
    setActive(orderStatus)

    

    setOrders(
      response?.content.filter((res) => {
        return res.status === orderStats;
      })
    );
  };

  const handleTitle = (string) => {
    string.includes("_")
      ? setTitle(string.split("_").shift() + " " + string.split("_").pop())
      : setTitle(string);
  };

  const listProducts = (orderItems) => {
    return <>
      {orderItems?.map((o, index) => <p className={index === orderItems.length - 1 ? "mb-0" : "mt-0"} style={{ lineHeight: "unset" }} key={o?.id + index}>{o?.productId?.name}</p>)}
    </>
  }

  const listSellers = (orderItems) => {
    return <>
      {orderItems?.map((o, index) => <p className={index === orderItems.length - 1 ? "mb-0" : "mt-0"} style={{ lineHeight: "unset" }} key={o?.id + index}>{o?.productId?.storeId?.sellerId?.name}</p>)}
    </>
  }

  const columns = [
    {
      name: "referenceNo", // field name in the row object
      label: "Order ID", // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let order = orders[dataIndex];
          return (
            <div className="flex items-center">
              <Link
                to={{
                  pathname: "/order/details",
                  state: {
                    id: order.id,
                    order,
                  },
                }}
                className="ml-3"
              >
                <span className="my-0 text-15">{order?.referenceNo}</span>
              </Link>
            </div>
          );
        },
      },
    },
    {
      name: "createDate",
      label: "Date",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let order = orders[dataIndex];
          return (
            <div className="flex items-center">
              <Link
                to={{
                  pathname: "/order/details",
                  state: {
                    id: order.id,
                    order,
                  },
                }}
                className="ml-3"
              >
                <span className="my-0 text-15">
                  {formatDate(order?.createDate)?.dates}
                </span>
                <br />
                <small className="text-muted">
                  {formatDate(order?.createDate)?.time}
                </small>
              </Link>
            </div>
          );
        },
      },
    },
    {
      name: "",
      label: "Name",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let order = orders[dataIndex];
          return (
            <div className="flex items-center">
              <Link
                to={{
                  pathname: "/order/details",
                  state: {
                    id: order.id,
                    order,
                  },
                }}
                className="ml-3"
              >
                <span className="my-0 text-15">
                  {capitalize(order?.customerId?.firstName)}{" "}
                  {capitalize(order?.customerId?.lastName)}
                </span>
                <br />
                <small className="text-muted">
                  {order?.customerId?.email ?? ""}
                </small>
              </Link>
            </div>
          );
        },
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let order = orders[dataIndex];
          return (
            <div className={`items-center ORDER ${order.status}`}>
              <Link
                to={{
                  pathname: "/order/details",
                  state: {
                    id: order.id,
                    order,
                  },
                }}
                className="ml-3"
              >
                <span>{capitalize(order.status ?? "---")}</span>
              </Link>
            </div>
          );
        },
      },
    },
    {
      name: "totalPrice",
      label: "Amount",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let order = orders[dataIndex];
          return (
            <div className="flex items-center">
              <Link
                to={{
                  pathname: "/order/details",
                  state: {
                    id: order.id,
                    order,
                  },
                }}
                className="ml-3"
              >
                <span className="my-0">
                  ₦ {formatToCurrency(order?.totalPrice, 2)}
                </span>
              </Link>
            </div>
          );
        },
      },
    },
    {
      name: "",
      label: "Product",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let order = orders[dataIndex];
          return (
            <div className="flex items-center">
              <Link
                to={{
                  pathname: "/order/details",
                  state: {
                    id: order.id,
                    order,
                  },
                }}
                className="ml-3"
              >
                <div className="my-0">{listProducts(order?.orderItems)}</div>
              </Link>
            </div>
          );
        },
      },
    },
    {
      name: "",
      label: "Seller",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let order = orders[dataIndex];
          return (
            <div className="flex items-center">
              <Link
                to={{
                  pathname: "/order/details",
                  state: {
                    id: order.id,
                    order,
                  },
                }}
                className="ml-3"
              >
                <div className="my-0">{listSellers(order?.orderItems)}</div>
              </Link>
            </div>
          );
        },
      },
    },
  ];

  const debouncedOrders = debounce(async (value) => {
    const _source = source === "ALL" ? "" : source;
    if (value.length > 0) {
      const response = await getAllInvoice(setLoading, page, size, _source, value);
      setOrders(response?.content);
      setCount(response?.totalElements);
      setQuery(value);
    } else {
      const response = await getAllInvoice(setLoading, page, size, _source, '');
      setOrders(response?.content);
      setCount(response?.totalElements);
      setQuery('');
    }
  }, 700);

  const performSearch = (value) => {
    debouncedOrders(value);
  };

  const refresh = async () => {
    const _source = source === "ALL" ? "" : source;
    const response = await getAllInvoice(setLoading, page, size, _source, '');
    setOrders(response?.content);
    setCount(response?.totalElements);
    setQuery('');
  }

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb routeSegments={[{ name: "Orders", path: "/orders" }]} />
      </div>
      <div className="overflow-auto">
        <div className="min-w-750 all-order-table">
          {loading ? (
            <Loading />
          ) : (
            <MUIDataTable
              title={
                <div>
                  <h5 className="mt-4 mb-0">{title}</h5>
                  <div className="w-full flex">
                    <div className="w-220 flex-end order-sources">
                      <TextField
                        className="mb-4 filter-area"
                        name="mobileNo"
                        label="Filter by source"
                        variant="outlined"
                        margin="normal"
                        select
                        value={source}
                        onChange={(e) => {
                          setSource(e.target.value);
                          e.target.value == "ALL"
                            ? setTitle("ALL ORDERS")
                            : handleTitle(e.target.value);
                        }}
                      >
                        {sourceTypes.map((sourceType, idx) => (
                          <MenuItem key={idx} value={sourceType.value}>
                            {sourceType.type}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <ul className="stats-nav">
                      <span>STATUS:</span> 
                      {orderStatus.map((stats) => {
                        return (
                          <li
                            key={stats.orderStatus}
                            onClick={(e) =>
                              handleActiveLink(stats.orderStatus, e)
                            }
                            id={stats.orderStatus}
                            className = {active === stats.orderStatus ? 'active':'test-class'}
                          >
                            {stats.orderStatus}({stats.total})
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              }
              data={orders}
              columns={columns}
              options={{
                onRowsDelete: (data) =>
                  dialog
                    .confirm("Are you sure you want to delete?")
                    .then((value) => deleteInvoice(data.data))
                    .catch(() => {
                      return false;
                    }),
                sort: true,
                filter: true,
                sortOrder: { name: "id", direction: "desc" },
                filterType: "textField",
                responsive: "standard",
                serverSide: true,
                fixedHeader: true,
                selectableRows: false,
                rowsPerPageOptions: [10, 20, 40, 80, 100],
                rowsPerPage: size,
                onChangeRowsPerPage: (x) => {
                  setSize(x);
                },
                count,
                page,
                onTableChange: (action, tableState) => {
                  if (action === "changePage") {
                    onChangePage(tableState.page);
                  }
                },
                elevation: 0,
                customSearchRender: (
                  searchText,
                  handleSearch,
                  hideSearch,
                  options
                ) => {
                  return (
                    <Grow appear in={true} timeout={300}>
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Search"
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
                            <Icon className="mr-2" fontSize="small">
                              search
                            </Icon>
                          ),
                          endAdornment: (
                            <IconButton onClick={() => {
                              hideSearch();
                              refresh()
                            }}>
                              <Icon fontSize="small">clear</Icon>
                            </IconButton>
                          ),
                        }}
                      />
                    </Grow>
                  );
                },
                customToolbar: () => {
                  return (
                    <>
                      <Link
                        to={{
                          pathname: "/order/new",
                          state: {},
                        }}
                      >
                        <Button variant="contained" color="primary">
                          Add New
                        </Button>
                      </Link>
                    </>
                  );
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Orders;
