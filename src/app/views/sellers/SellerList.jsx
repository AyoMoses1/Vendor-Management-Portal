import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import MUIDataTable from "mui-datatables";
import { Grow, Icon, IconButton, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import http from "../../services/api";

const SellerList = () => {
  const [isAlive, setIsAlive] = useState(true);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    http.get(`/afrimash/sellers/search`).then((response) => {
      let { data } = response;
      if (isAlive) setUserList(data.object.content);
    });
    return () => setIsAlive(false);
  }, [isAlive]);

  const columns = [
    {
      name: "name", // field name in the row object
      label: "Name", // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex];

          return (
            <div className="flex items-center">
              <div className="ml-3">
                <h5 className="my-0 text-15">{`${user?.name}`}</h5>
                <small className="text-muted">{user?.email}</small>
                <br />
                <small className="text-muted">{user?.mobileNo}</small>
              </div>
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
            <div className="flex items-center">
              <div className="ml-3">
                <h5 className="my-0 text-muted"> {user.name || "-----"}</h5>
              </div>
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
            <div className="flex items-center">
              <div className="ml-3">
                <h5 className="my-0 text-muted">{user.state || "-----"}</h5>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "action",
      label: " ",
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex];
          return (
            <div className="flex items-center">
              <div className="flex-grow"></div>
              <Link
                to={{
                  pathname: "/vendor/edit",
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
              <Link
                to={{
                  pathname: "/vendor/details",
                  state: {
                    id: user.id,
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
            { name: "Sellers", path: "/vendors" },
            { name: "Sellers" },
          ]}
        />
      </div>
      <div className="overflow-auto">
        <div className="min-w-750">
          <MUIDataTable
            title={"All Sellers"}
            data={userList}
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
                      pathname: "/vendor/new",
                      state: {},
                    }}
                  >
                    <IconButton>
                      <Button variant="contained" color="primary">
                        <Icon>add</Icon>Add New
                      </Button>
                    </IconButton>
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

export default SellerList;
