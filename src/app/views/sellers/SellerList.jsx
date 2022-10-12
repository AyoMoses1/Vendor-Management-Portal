import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import MUIDataTable from "mui-datatables";
import { Grow, Icon, IconButton, TextField, Button, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import http from "../../services/api";
import { useDialog } from "muibox";
import "./Sellerform.css";
import Notification from "../../components/Notification";
import { getAllSeller } from "./SellerService";
import Loading from "matx/components/MatxLoadable/Loading";
import { debounce } from "lodash";
import { states } from "../../../utils/states";
import { capitalize } from "utils";
const [title, setTitle] = useState("All Vendors");
states.unshift("All");


const SellerList = () => {
  const [isAlive, setIsAlive] = useState(true);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState("");
  const [alert, setAlert] = useState("");
  const dialog = useDialog();
  const [statusOption, setStatusOption] = useState("All");
  const [state, setState] = useState("ALL")
  const [status, setStatus] = useState("ALL");
 

  const statusList = [
    {
      type: "ALL",
      value: "ALL",
      name: "All Users",
    },
    {
      type: "PENDING",
      value: "PENDING",
      name: "Pending Users",
    },
    {
      type: "ACTIVE",
      value: "ACTIVE",
      name: "Active Users",
    },
    {
      type: "SUSPENDED",
      value: "SUSPENDED",
      name: "Suspended Users",
    },
    {
      type: "IN ACTIVE",
      value: "IN_ACTIVE",
      name: "INACTIVE Users",
    },
  ];
  

  useEffect(() => {
    getAllSeller(setLoading, setUserList, setAlert, setSeverity, state, statusOption);
    console.log(state, statusOption, "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
    return () => setIsAlive(false);
  }, [isAlive, state, statusOption]);

  const columns = [
    {
      name: "name", // field name in the row object
      label: "Name", // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex];

          return (
            <div className="flex items-center vendor__name">
              <Link
                to={{
                  pathname: "/vendor/details",
                  state: {
                    id: user.id,
                  },
                }}
                className="ml-3"
              >
                <span className="my-0 text-15">{`${
                  user?.name || "-------"
                }`}</span>
              </Link>
            </div>
          );
        },
      },
    },

    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex];
          return (
            <div className="flex items-center vendor__email">
              <Link
                to={{
                  pathname: "/vendor/details",
                  state: {
                    id: user.id,
                  },
                }}
                className="ml-3"
              >
                <span className="my-0 text-15"> {user.email || "-----"}</span>
              </Link>
            </div>
          );
        },
      },
    },

    {
      name: "phoneno",
      label: "Phone Number",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex];
          return (
            <div className="flex items-center vendor__number">
              <Link
                to={{
                  pathname: "/vendor/details",
                  state: {
                    id: user.id,
                  },
                }}
                className="ml-3"
              >
                <span className="my-0 text-15">
                  {" "}
                  {user.mobileNo || "-----"}
                </span>
              </Link>
            </div>
          );
        },
      },
    },

    {
      name: "store",
      label: "Store",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex];
          return (
            <div className="flex items-center vendor__store">
              <Link
                to={{
                  pathname: "/vendor/details",
                  state: {
                    id: user.id,
                  },
                }}
                className="ml-3"
              >
                <span className="my-0 text-15"> {user.name || "-----"}</span>
              </Link>
            </div>
          );
        },
      },
    },

    {
      name: "address",
      label: "Address",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex];
          return (
            <div className="flex items-center vendor__address">
              <Link
                to={{
                  pathname: "/vendor/details",
                  state: {
                    id: user.id,
                  },
                }}
                className="ml-3"
              >
                <span className="my-0 text-15">{user.state || "-----"}</span>
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

    // {
    //   name: 'action',
    //   label: ' ',
    //   options: {
    //     filter: false,
    //     customBodyRenderLite: (dataIndex) => {
    //       let user = userList[dataIndex]
    //       return (
    //         <div className='flex items-center'>
    //           <Link
    //             to={{
    //               pathname: '/vendor/edit',
    //               state: {
    //                 id: user.id,
    //                 user,
    //               },
    //             }}
    //           >
    //             <IconButton>
    //               <Icon>edit</Icon>
    //             </IconButton>
    //           </Link>
    //         </div>
    //       )
    //     },
    //   },
    // },
  ];
  const notification = () => {
    return <Notification alert={alert} severity={severity && severity} />;
  };

  const handleTitle = (value) => {
    const v = statusList.find((s) => s.value === value).name;
    setTitle(v);
  };

  return (
    <div className="m-sm-30">
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
              title={
                <div>
                  <h4 className="mt-4 mb-0">{title}</h4>    
                  <div className="w-full flex">
                    <div className="w-220 flex-end sources">
                      <TextField
                        className="mb-4"
                        name="mobileNo"
                        label="Filter by status"
                        variant="outlined"
                        margin="normal"
                        select
                        fullWidth
                        value={status}
                        onChange={(e) => {
                          setStatusOption(e.target.value);
                          handleTitle(e.target.value);
                          
                        }}
                       >
                        {statusList.map((s, idx) => (
                          <MenuItem key={idx} value={s.value}>
                            {s.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div className="w-220 flex-end sources ml-4">
                      <TextField
                        className="mb-4"
                        name="statusFilter"
                        label="Filter by location"
                        variant="outlined"
                        margin="normal"
                        select
                        fullWidth
                        value={state}
                        onChange={(e) => {
                          setState(e.target.value);
                        }}
                       >
                        {states.map((s, idx) => (
                          <MenuItem key={idx} value={s}>
                            {s}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                </div>
            }
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
                        pathname: "/vendor/new",
                        state: {},
                      }}
                    >
                      <IconButton>
                        <Button
                          variant="contained"
                          color="primary"
                          className="icon"
                        >
                          <Icon>add</Icon>Add New
                        </Button>
                      </IconButton>
                    </Link>
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
