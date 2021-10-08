import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import MUIDataTable from "mui-datatables";
import { Grow, Icon, IconButton, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import http from "../../../services/api";
import ShopForm from "./ShopForm";

const SellerShop = ({ id }) => {
  const [isAlive, setIsAlive] = useState(true);
  const [userList, setUserList] = useState([]);
  const [shop, setShops] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    http.get(`/afrimash/stores/search`).then((response) => {
      let { data } = response;
      let shops = data.object.content;
      if (isAlive) setUserList(data.object.content);
      let sellerShop = shops.filter((shop) => {
        return shop.sellerId.id === id;
      });
      setShops(sellerShop);
      console.log(shop);
    });
    return () => setIsAlive(false);
  }, [isAlive]);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const columns = [
    {
      name: "name", // field name in the row object
      label: "Name", // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let Shop = shop[dataIndex];

          return (
            <div className="flex items-center">
              <div className="ml-3">
                <h5 className="my-0 text-15">{`${Shop?.name}`}</h5>
                <small className="text-muted">{Shop?.email}</small>
                <br />
                <small className="text-muted">{Shop?.mobileNo}</small>
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
          let Shop = shop[dataIndex];
          return (
            <div className="flex items-center">
              <div className="ml-3">
                <h5 className="my-0 text-muted"> {Shop.name || "-----"}</h5>
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
          let Shop = shop[dataIndex];
          return (
            <div className="flex items-center">
              <div className="ml-3">
                <h5 className="my-0 text-muted">{Shop.state || "-----"}</h5>
              </div>
            </div>
          );
        },
      },
    },
    // {
    //   name: "action",
    //   label: " ",
    //   options: {
    //     filter: false,
    //     customBodyRenderLite: (dataIndex) => {
    //       let Shop = shop[dataIndex];
    //       return (
    //         <div className="flex items-center">
    //           <div className="flex-grow"></div>
    //           <Link
    //             to={{
    //               pathname: "/vendor/shop/edit",
    //               state: {
    //                 id: Shop.id,
    //                 Shop,
    //               },
    //             }}
    //           >
    //             <IconButton>
    //               <Icon>edit</Icon>
    //             </IconButton>
    //           </Link>
    //           <Link
    //             to={{
    //               pathname: "/vendor/shop/details",
    //               state: {
    //                 id: Shop.id,
    //               },
    //             }}
    //           >
    //             <IconButton>
    //               <Icon>arrow_right_alt</Icon>
    //             </IconButton>
    //           </Link>
    //         </div>
    //       );
    //     },
    //   },
    // },
  ];

  return (
    <div className="m-sm-30">
      <div className="overflow-auto">
        <div className="min-w-750">
          <MUIDataTable
            title={"Shops"}
            data={shop}
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
                  <>
                    <IconButton>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleModal();
                        }}
                      >
                        <Icon>add</Icon>Add New
                      </Button>
                    </IconButton>
                    <ShopForm
                      states={shop}
                      isOpen={isOpen}
                      handleClose={handleModal}
                      name="Create Shop"
                      id={id}
                    />
                  </>
                );
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SellerShop;
