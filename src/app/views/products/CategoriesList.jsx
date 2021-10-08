import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import MUIDataTable from "mui-datatables";
import { Grow, Icon, IconButton, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import http from "../../services/api";

const CategoriesList = () => {
  const [isAlive, setIsAlive] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    http
      .get(`/afrimash/product-categories/search?`)
      .then((response) => {
        let { data } = response;
        if (isAlive) setCategories(data.object);
        console.log(data.object);
        console.log(categories);
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
          let category = categories[dataIndex];

          return (
            <div className="flex items-center">
              <div className="ml-3">
                <h5 className="my-0 text-15">{category?.name}</h5>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "translatedName",
      label: "Translated Name",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let category = categories[dataIndex];
          return (
            <div className="flex items-center">
              <div className="ml-3">
                <h5 className="my-0 text-15">
                  {" "}
                  {category.translatedName || "-----"}
                </h5>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "parentCategory",
      label: "Parent Category",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let category = categories[dataIndex];
          return (
            <div className="flex items-center">
              <div className="ml-3">
                <h5 className="my-0 text-15">
                  {category.parentCategoryId?.name}
                </h5>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "subCategories",
      label: "Sub Categories",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let category = categories[dataIndex];
          let subCategories = category.subCategories;
          return (
            <div className="flex items-center">
              <div className="ml-3">
                {subCategories.map((subcategory) => {
                 return `${subcategory.name}, `
                })}
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
          let category = categories[dataIndex];
          return (
            <div className="flex items-center">
              <div className="flex-grow items-center"></div>
              {/* <Link
                to={{
                  pathname: "/category/edit",
                  state: {
                    id: category.id,
                    category,
                  },
                }}
              >
                <IconButton>
                  <Icon>edit</Icon>
                </IconButton>
              </Link> */}
                <IconButton>
                  <Icon>delete</Icon>
                </IconButton>
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
            { name: "Product Categories", path: "/product-categories" },
          ]}
        />
      </div>
      <div className="overflow-auto">
        <div className="min-w-750">
          <MUIDataTable
            title={"Product Categories"}
            data={categories}
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
                      pathname: "/product-category/new",
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

export default CategoriesList;
