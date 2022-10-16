import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import MUIDataTable from "mui-datatables";
import {
  Grow,
  Icon,
  IconButton,
  TextField,
  Button,
  MenuItem,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDialog } from "muibox";
import "./Sellerform.css";
import Notification from "../../components/Notification";
import { getAllSeller } from "./SellerService";
import Loading from "matx/components/MatxLoadable/Loading";
import { capitalize } from "utils";
// states.unshift("All");






const SellerList = () => {
  const [isAlive, setIsAlive] = useState(true);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState("");
  // const [title, setTitle] = useState("All Vendors");

  const [alert, setAlert] = useState("");
  const dialog = useDialog();
  const [state, setState] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [statusOption, setStatusOption] = useState("ALL");
  const [title, setTitle] = useState("All Vendors");

  const statusList = [
    {
      type: "ALL",
      value: "ALL",
      name: "All Vendors",
    },
    {
      type: "PENDING",
      value: "PENDING",
      name: "Pending Vendors",
    },
    {
      type: "ACTIVE",
      value: "ACTIVE",
      name: "Active Vendors",
    },
    {
      type: "SUSPENDED",
      value: "SUSPENDED",
      name: "Suspended Vendors",
    },
    {
      type: "IN ACTIVE",
      value: "IN_ACTIVE",
      name: "INACTIVE Vendors",
    },
  ];

  useEffect(() => {
    getAllSeller(
      setLoading,
      setUserList,
      setAlert,
      setSeverity,
      state,
      statusOption
    );
    return () => setIsAlive(false);
  }, [isAlive, state, statusOption]);

  

  const columns = [
    {
      name: "id", // field name in the row object
      label: "Order Id", // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex];

          return (
            <div className="flex items-center vendor__id">
              <div className="ml-3">
                <span className="my-0 text-15">{`${
                  user?.id || "-------"
                }`}</span>
              </div>
            </div>
          );
        },
      },
    },

    {
      name: "date", // field name in the row object
      label: "Date", // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex];

          return (
            <div className="flex items-center vendor__date">
              <div className="ml-3">
                <span className="my-0 text-15">{`${
                  user?.dateregistered || "-------"
                }`}</span>
              </div>
            </div>
          );
        },
      },
    },

    {
      name: "name", // field name in the row object
      label: "Name", // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex];

          return (
            <div className="flex items-center vendor__name">
              <div className="ml-3">
                <span className="my-0 text-15">{`${
                  user?.name || "-------"
                }`}</span>
              </div>
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
          let user = userList[dataIndex];
          return (
            <div className={`flex`}>
              <div className={`ml-3 VENDOR ${user?.status}`}>
                <Link
                  to={{
                    pathname: "/vendor/details",
                    state: {
                      id: user.id,
                    },
                  }}
                >
                  {capitalize(user?.status || "-----")}
                </Link>
              </div>
            </div>
          );
        },
      },
    },

   
    {
      name: "amount",
      label: "Amount",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex];
          return (
            <div className="flex items-center vendor__amount">
              <div
                className="ml-3"
              >
                <span className="my-0 text-15"> {user.amount || "-----"}</span>
              </div>
            </div>
          );
        },
      },
    },

    {
      name: "product",
      label: "Product",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex];
          return (
            <div className="flex items-center vendor__product">
              <div
                className="ml-3"
              >
                <span className="my-0 text-15">
                  {" "}
                  {user.product || "-----"}
                </span>
              </div>
            </div>
          );
        },
      },
    },

    {
      name: "seller",
      label: "Seller",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex];
          return (
            <div className="flex items-center vendor__store">
              <div
                className="ml-3"
              >
                <span className="my-0 text-15"> {user.selller || "-----"}</span>
              </div>
            </div>
          );
        },
      },
    },

    
  ];
  const notification = () => {
    return <Notification alert={alert} severity={severity && severity} />;
  };

  return (
  

    
    <div className="m-sm-30">
      <div className="details">
        <div>
          <h5>Ben Poultry farms</h5>
          <p> Store Id: 123456789</p>
          <Link className="store-link" to="" >Visit Store </Link>
        </div>
        {/* <div className="border-line"></div> */}
        <div>
          <h5>Contact</h5>
          <p>Ben Ameh</p>
          <p>Bennyfarms@gmail.com</p>
          <p> 5, benny highway, ibadan, Oyo state </p>
        </div>
        {/* <div className="border-line"></div> */}
        <div>
          <h5> Status </h5>
          <p>Active</p>
        </div>
     </div>
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Vendors", path: "/vendors" },
            { name: "Vendors" },
          ]}
        />
      </div>
      {severity === "error" && notification()}
      <div className="overflow-auto">
        <div className="min-w-750 vendor-table">
          {loading ? (
            <Loading />
          ) : (
            <MUIDataTable
              title="Recent Orders"
              data={userList}
              columns={columns}
              options={{
                onRowsDelete: (data) =>
                  dialog
                    .confirm("Are you sure you want to delete?")
                    .then((value) => value)
                    .catch(() => {
                      return false;
                    }),
                filterType: "textField",
                responsive: "standard",
                elevation: 0,
                search:false,
                download:false,
                print:false,
                filter:false,
                viewColumns:false,
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
                        onChange={({ target: { value } }) =>
                          handleSearch(value)
                        }
                        InputProps={{
                          style: {
                            paddingRight: 0,
                          },
                          
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
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerList;
