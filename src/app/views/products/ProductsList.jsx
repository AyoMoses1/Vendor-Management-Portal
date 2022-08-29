import React, { useState, useEffect } from "react";
import { Breadcrumb } from "matx";
import MUIDataTable from "mui-datatables";
import { Grow, Icon, IconButton, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDialog } from "muibox";
import { deleteProduct, getAllResults } from "./ProductService";
import Loading from "matx/components/MatxLoadable/Loading";
import { useDispatch } from "react-redux";
import { updateProductFeature } from "../../redux/actions/ussd-action";
import { debounce } from "lodash";

const Products = () => {
  const [isAlive, setIsAlive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPageNo] = useState(0);
  const dialog = useDialog();
  const dispatcher = useDispatch();
  const [count, setCount] = useState(0);
  const [size, setSize] = useState(10);
  const [statistics, setStatistics] = useState([]);
  const [severity, setSeverity] = useState("");
  const [userList, setUserList] = useState([]);
  const [alert, setAlert] = useState("");
  const [source, setSource] = useState("ALL");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchAllProducts = async () => {
      const response = await getAllResults(page, size);
      console.log(response, "answer");
      setProducts(response?.content);
      setCount(response?.totalElements);
    };

    fetchAllProducts();
    return () => setIsAlive(false);
  }, [isAlive, page, size]);

  const handleFeaturedOnUSSD = (product) => {
    const confirmMessage = product.isFeaturedOnUssd
      ? `Do you want to remove ${product.name} from USSD menu?`
      : `Do you want to feature ${product.name} on USSD menu?`;
    dialog
      .confirm(confirmMessage)
      .then(() => {
        dispatcher(
          updateProductFeature({
            data: {
              id: product.id,
              isFeaturedOnUssd: !product.isFeaturedOnUssd,
            },
          })
        );
      })
      .then(() => {
        getAllResults(setProducts, setLoading, "/afrimash/products/");
      })
      .catch((error) => console.error(error));
  };

  const onChangePage = async (page) => {
    console.log(page, "checl");
    const response = await getAllResults(page, size);
    setProducts(response.content);
    setPageNo(page);
    console.log(response, "check response after page change");
    console.log(products, "check products and compare with response");
  };
  const columns = [
    {
      name: "name", // field name in the row object
      label: "Name", // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex];
          return (
            <div className="flex items-center">
              <Link
                to={{
                  pathname: "/product/details",
                  state: {
                    id: product.id,
                  },
                }}
                className="ml-3 mr-4"
              >
                <span className="my-0 text-15">{product?.name}</span>
              </Link>
            </div>
          );
        },
      },
    },
    {
      name: "sku",
      label: "Sku",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex];
          return (
            <div className="flex items-center">
              <div className="ml-3">
                <span className="my-0 text-15"> {product?.sku || "-----"}</span>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "price",
      label: "Price",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex];
          return (
            <div className="flex items-center">
              <Link
                to={{
                  pathname: "/product/details",
                  state: {
                    id: product.id,
                  },
                }}
                className="ml-4"
              >
                <span className="my-0 text-15">
                  {" "}
                  {`₦${product.price}` || "-----"}
                </span>
              </Link>
            </div>
          );
        },
      },
    },
    {
      name: "categories",
      label: "Categories",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex];
          let n = product.productCategories.map((name) => name.name);
          return (
            <div className="flex items-center">
              <div className="ml-3">
                <span className="my-0 text-15">{product && n.join(",")}</span>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "tags",
      label: "Tags",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex];
          let n = product.tags.map((name) => name.name);
          return (
            <div className="flex items-center">
              <div className="ml-4">
                <span className="my-0 text-15">
                  {n.length > 0 ? n.join(",") : " ----"}
                </span>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "brand",
      label: "Brand",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex];
          return (
            <div className="flex items-center">
              <Link
                to={{
                  pathname: "/product/details",
                  state: {
                    id: product.id,
                  },
                }}
                className="ml-4"
              >
                <span className="my-0 text-15">{product.brandId?.name}</span>
              </Link>
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
          let product = products[dataIndex];
          return (
            <div className="flex items-center">
              <Link
                to={{
                  pathname: "/product/details",
                  state: {
                    id: product.id,
                  },
                }}
                className="ml-4"
              >
                <span className="my-0 text-15">
                  {product.storeId.sellerId.name || "-----"}
                </span>
              </Link>
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
          let product = products[dataIndex];
          return (
            <Button
              onClick={() => handleFeaturedOnUSSD(product)}
              variant="text"
            >
              {product.isFeaturedOnUssd ? "Remove from USSD" : "Add to USSD"}
            </Button>
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
          let product = products[dataIndex];
          return (
            <div className="flex items-center">
              <div className="flex-grow"></div>
              <Link
                to={{
                  pathname: "/product/edit",
                  state: {
                    id: product.id,
                    product,
                  },
                }}
              >
                <IconButton>
                  <Icon>edit</Icon>
                </IconButton>
              </Link>
            </div>
          );
        },
      },
    },
    {
      name: "id", // field name in the row object
      label: "", // column title that will be shown in table
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex];
          return (
            <Link
              to={{
                pathname: `/agent/details/${product.id}`,
                state: {
                  id: product.id,
                  agentCode: product.agentCode,
                },
              }}
            >
              <div>
                {/* <h5 className='my-0 text-15'>{`${user?.id}`}</h5> */}
              </div>
            </Link>
          );
        },
      },
    },
  ];

  const debouncedProducts = debounce((value) => {
    console.log(value);
  }, 700);

  const performSearch = (value) => {
    debouncedProducts(value);
  };

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb routeSegments={[{ name: "Products", path: "/products" }]} />
      </div>
      <div className="overflow-auto">
        <div className="min-w-750">
          {loading ? (
            <Loading />
          ) : (
            <div>
              <MUIDataTable
                title={"All Products"}
                data={products}
                columns={columns}
                options={{
                  onRowsDelete: (data) =>
                    dialog
                      .confirm("Are you sure you want to delete?")
                      .then((value) => deleteProduct(data.data))
                      .catch(() => {
                        return false;
                      }),
                  sort: true,
                  serverSide: true,
                  filter: true,
                  sortOrder: { name: "id", direction: "desc" },
                  filterType: "textField",
                  responsive: "standard",
                  elevation: 0,
                  serverSide: true,
                  rowsPerPage: size,
                  rowsPerPageOptions: [10, 20, 30, 40, 50],
                  count,
                  page,
                  onChangeRowsPerPage: (x) => {
                    setSize(x);
                  },
                  onTableChange: (action, tableState) => {
                    if (action === "changePage") {
                      console.log(tableState, "this is it");

                      onChangePage(tableState.page + 1);
                    } else {
                      console.log(action);
                    }
                  },
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
                          pathname: "/product/new",
                          state: {},
                        }}
                      >
                        <Button variant="contained" color="primary">
                          Add New
                        </Button>
                      </Link>
                    );
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
