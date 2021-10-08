import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import MUIDataTable from "mui-datatables";
import { Grow, Icon, IconButton, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import http from "../../services/api";

const Users = () => {
  const [isAlive, setIsAlive] = useState(true);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    http.get(`/afrimash/users/search`).then((response) => {
      let { data } = response;
      if (isAlive) setUserList(data.object.content);
    });
    return () => setIsAlive(false);
  }, [isAlive]);

  const columns = [
    {
      name: "firstname", // field name in the row object
      label: "Name", // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex];

          return (
            <div className="flex items-center">
              <div className="ml-3">
                <h5 className="my-0 text-15">{`${user?.firstName || "N/A"} ${user?.lastName || "N/A"}`}</h5>
                <small className="text-muted">{user?.email}</small>
              </div>
            </div>
          );
        },
      },
    },
    {
        name: "username",
        label: "Username",
        options: {
          filter: true,
          customBodyRenderLite: (dataIndex) => {
            let user = userList[dataIndex];
            return (
              <div className="flex items-center">
                <div className="ml-3">
                  <h5 className="my-0 text-muted">{user?.username || "-----"}</h5>
                </div>
              </div>
            );
          },
        },
      },
    {
      name: "phoneNo",
      label: "Phone Number",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex];
          return (
            <div className="flex items-center">
              <div className="ml-3">
                <h5 className="my-0 text-muted">{user.phoneNo || "-----"}</h5>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "role",
      label: "Role",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex];
          let role = user.role.name;
          return (
            <div className="flex items-center">
              <div className="ml-3">
                <h5 className="my-0 text-muted">
                  {" "}
                  {role.substr(5) || "-----"}
                </h5>
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
                  pathname: "/user/edit",
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
                  pathname: "/user/details",
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
          routeSegments={[{ name: "Users", path: "/users" }, { name: "Users" }]}
        />
      </div>
      <div className="overflow-auto">
        <div className="min-w-750">
          <MUIDataTable
            title={"All Users"}
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
                      pathname: "/user/new",
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

export default Users;
