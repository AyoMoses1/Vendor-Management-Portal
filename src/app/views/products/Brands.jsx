import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import MUIDataTable from "mui-datatables";
import { Grow, Icon, IconButton, TextField, Button } from "@material-ui/core";
import http from "../../services/api";
import CreateNew from "./CreateNew";
import Loading from "matx/components/MatxLoadable/Loading";
import "./product-details.css";
import { capitalize } from "lodash";

const fields = ["name", "description"];

const Brands = () => {
  const [isAlive, setIsAlive] = useState(true);
  const [loading, setLoading] = React.useState(false);
  const [brands, setBrands] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    http.get(`/afrimash/brands/`).then((response) => {
      setLoading(true);
      let { data } = response;
      if (data instanceof Object) {
        setBrands(data);
        setLoading(false);
      }
    });
    return () => setIsAlive(false);
  }, [isAlive]);

  const handleModal = () => {
    setOpen(!open);
  };

  const submit = (state) => {
    return http.post("/afrimash/brands", state);
  };

  const columns = [
    {
      name: "name", // field name in the row object
      label: "Name", // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let brand = brands[dataIndex];

          return (
            <div className="flex items-center">
              <div className="ml-3 BRAND">
                <span className="my-0 text-15">{capitalize(brand?.name)}</span>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "description",
      label: "Description",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let brand = brands[dataIndex];
          return (
            <div className="flex items-center">
              <div className="ml-3">
                <span className="my-0 text-15">
                  {" "}
                  {brand.description || "-----"}
                </span>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "action",
      label: "Actions ",
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          return (
            <div className="flex items-center">
              <div className="flex-grow">
                <IconButton>
                  <Icon>delete</Icon>
                </IconButton>
              </div>
              {/* { <IconButton
                variant="contained"
                color="primary"
                onClick={() => {
                  handleModal();
                }}
              >
                <Icon>edit</Icon>
              </IconButton> } */}
            </div>
          );
        },
      },
    },
  ];

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb routeSegments={[{ name: "Brands", path: "/brands" }]} />
      </div>
      <div className="overflow-auto">
        <div className="min-w-750 brand-table">
          {loading ? (
            <Loading />
          ) : (
            <MUIDataTable
              title={<h5 className='mt-4 mb-0 brands-table'>All Brands</h5>}
              data={brands}
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
                    <>
                      <IconButton>
                        <Button
                          variant="contained"
                          color="primary"
                          className="addnew"
                          onClick={() => {
                            handleModal();
                          }}
                        >
                          <Icon>add</Icon>Add New
                        </Button>
                      </IconButton>
                      <CreateNew
                        states={brands}
                        isOpen={open}
                        handleClose={handleModal}
                        name="Create Brand"
                        fields={fields}
                        onSubmit={submit}
                      />
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

export default Brands;
