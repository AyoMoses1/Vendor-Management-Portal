import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import MUIDataTable from "mui-datatables";
import { Grow, Icon, IconButton, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import http from "../../services/api";

const AbadonedOrders = () => {
  const [isAlive, setIsAlive] = useState(true);
  const [orders, setAbadonedOrders] = useState([]);

  useEffect(() => {
    http.get(`/afrimash/abadoned-orders/`).then((response) => {
      let { data } = response;
      if (data) setAbadonedOrders(data.object.content);
    });
    return () => setIsAlive(false);
  }, [isAlive]);

  const columns = [
    {
      name: "referenceNo", // field name in the row object
      label: "Order", // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let order = orders[dataIndex];
          console.log(typeof order)
          return (
            <div className="flex items-center">
              <div className="ml-3">
                <span className="my-0 text-15">{order?.referenceNo}</span>
              </div>
            </div>
          );
        },
      },
    },
    // {
    //   name: "orderItems",
    //   label: "Purchased",
    //   options: {
    //     filter: true,
    //     customBodyRenderLite: (dataIndex) => {
    //       let order = orders[dataIndex];
    //       return (
    //         <div className="flex items-center">
    //           <div className="ml-3">
    //             <span className="my-0">
    //             {order.orderItems.length ? `${order.orderItems.length} items` : "------"}
    //             {/* { `${order.orderItems?.length} items` || "------"} */}
    //             </span>
    //           </div>
    //         </div>
    //       );
    //     },
    //   },
    // },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let order = orders[dataIndex];
          return (
            <div className="flex items-center">
              <div className="ml-3">
                <span className="my-0 text-15"> {`${order.status}` || "-----"}</span>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "deliveryAddress",
      label: "Billing Address",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let order = orders[dataIndex];
          return (
            <div className="flex items-center">
              <div className="ml-3">
              <span className="my-0">{order?.deliveryAddress?.address || "-----" }</span>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "totalPrice",
      label: "Gross Sales",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let order = orders[dataIndex];
          return (
            <div className="flex items-center">
              <div className="ml-3">
              <span className="my-0">
                ₦{ order?.totalPrice }
                </span>
              </div>
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
              <div className="ml-3">
                <span className="my-0 text-15">{order?.createDate}</span>
              </div>
            </div>
          );
        },
      },
    },
    // {
    //   name: "seller",
    //   label: "Seller",
    //   options: {
    //     filter: true,
    //     customBodyRenderLite: (dataIndex) => {
    //       let order = orders[dataIndex];
    //       return (
    //         <div className="flex items-center">
    //           <div className="ml-3">
    //             <span className="my-0 text-15">
    //               {order.storeId.sellerId.name || "-----"}
    //             </span>
    //           </div>
    //         </div>
    //       );
    //     },
    //   },
    // },
    {
      name: "action",
      label: " ",
      options: {
        filter: false,
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
              >
                <IconButton>
                  <Icon>arrow_right_alt</Icon>
                </IconButton>
              </Link>
            </div>
          );
        },
      },
    },
  ];

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
      <Breadcrumb
          routeSegments={[
            { name: "Abadoned Orders", path: "/abandoned-orders" },
            { name: "Abadoned Orders" },
          ]}
        />
      </div>
      <div className="overflow-auto">
        <div className="min-w-750">
          <MUIDataTable
            title={"All Abadoned Orders"}
            data={orders}
            columns={columns}
            options={{
              filterType: "textField",
              responsive: "standard",
              //   selectableRows: "none", // set checkbox for each row
              //   search: false, // set search option
              //   filter: false, // set data filter option
              //   download: false, // set download option
              //   print: false, // set print option
              //   pagination: true, //set pagination option
              //   viewColumns: false, // set column option
              elevation: 0,
              rowsPerPageOptions: [10, 20, 40, 80, 100],
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
                      onChange={({ target: { value } }) => handleSearch(value)}
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
                          <IconButton onClick={hideSearch}>
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
                  <Link
                    to={{
                      pathname: "/order/new",
                      state: {},
                    }}
                  >
                    <Button variant="contained" color="primary">
                      <Icon>add</Icon>Add New
                    </Button>
                  </Link>
                );
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AbadonedOrders;
