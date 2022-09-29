import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'matx';
import MUIDataTable from 'mui-datatables';
import { Grow, Icon, IconButton, TextField, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useDialog } from 'muibox';
import { deleteProduct, getAllResults } from './ProductService';
import Loading from 'matx/components/MatxLoadable/Loading';
import { useDispatch } from 'react-redux';
import { updateProductFeature } from '../../redux/actions/ussd-action';
import CircleIcon from '@mui/icons-material/Circle';
import './products-view.css'
import { debounce } from "lodash";
import NewProduct from './NewProduct';
import Alert from 'app/components/Alert';
import { capitalize } from 'utils';

const Products = () => {
  const [isAlive, setIsAlive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [count, setCount] = useState(0)
  const dialog = useDialog();
  const dispatcher = useDispatch();
  const [query, setQuery] = useState("");
  // const [open, setOpen] = useState(false)
  const history = useHistory();
  const [alertData, setAlertData] = React.useState({ success: false, text: '', title: '' });
  const [alertOpen, setAlertOpen] = React.useState(false)
  const [createdId, setCreatedId] = React.useState(null);

  const handleDisplayModal = () => {
    setAlertOpen(!alertOpen)
  }

  const created = (id) => {
    setCreatedId(id);
    setAlertData({ success: true, text: "Product created sucessfully", title: 'Product Created' })
    handleDisplayModal();
  }

  const handleOK = () => {
    handleDisplayModal();
    history.push({
      pathname: '/product/details',
      state: { id: createdId }
    })
  }

  useEffect(() => {
    const fetchAllProducts = async () => {
      const response = await getAllResults(page, size, query)
      setProducts(response?.content)
      setCount(response?.totalElements)
    }

    fetchAllProducts()
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
        getAllResults(setProducts, setLoading, '/afrimash/products/');
        refresh() /* Please remember to work on this line and turn it to an async function*/
      })
      .catch((error) => console.error(error));
  };

  const onChangePage = async (page) => {
    setPage(page)
  }

  // const handleModal = () => {
  //   setOpen(!open)
  // }

  const columns = [
    {
      name: "name", // field name in the row object
      label: "Name", // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex];
          return (
            <div className='flex'>
              <div className='ml-3'>
                <Link
                  to={{
                    pathname: "/product/details",
                    state: {
                      id: product?.id,
                    },
                  }}
                  className="ml-3 mr-4"
                >
                  {product?.name.slice(0, 10) + "..."}
                </Link>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: 'categories',
      label: 'Category',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex];
          let n = product?.productCategories?.map((name) => name.name);
          return (
            <div className='flex'>
              <div className='ml-3'>
                <Link
                  to={{
                    pathname: "/product/details",
                    state: {
                      id: product?.id,
                    },
                  }}
                >
                  {product && n.join(',').slice(0, 8) + "..."}
                </Link>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex];
          return (
            <div className={`flex`}>
              <div className={`ml-3 PRODUCT ${product?.status}`}>
                <Link
                  to={{
                    pathname: "/product/details",
                    state: {
                      id: product?.id,
                    },
                  }}
                >
                  {capitalize(product?.status ?? "---")}
                </Link>
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
            <div className='flex'>
              <div className='ml-3'>
                <Link
                  to={{
                    pathname: "/product/details",
                    state: {
                      id: product?.id,
                    },
                  }}

                >

                  {" "}
                  {`₦${product?.price}` || "---"}
                </Link>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: 'sku',
      label: 'Sku',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex];
          return (
            <div className='flex'>
              <div className='ml-3'>
                <Link
                  to={{
                    pathname: "/product/details",
                    state: {
                      id: product?.id,
                    },
                  }}
                >
                  {product?.sku || '---'}
                </Link>
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
            <div className='flex items-center product__tags'>
              <div className='ml-4'>
                <Link
                  to={{
                    pathname: "/product/details",
                    state: {
                      id: product.id,
                    },
                  }}
                  className="ml-3 mr-4"
                >
                  <span className='my-0 text-15'>
                    {n.length > 0 ? n.join(',').slice(0, 8) + "..." : ' ----'}
                  </span>
                </Link>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: 'dateAdded',
      label: 'Date Created',
      options: {
        filter: true,
        setCellHeaderProps: () => { return { width: "130px" } },
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex];
          return (
            <div className='flex'>
              <div className='ml-3'>
                <Link
                  to={{
                    pathname: "/product/details",
                    state: {
                      id: product?.id,
                    },
                  }}
                >
                  {product?.dateAdded || '10:29:30'}
                </Link>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex];
          return (
            <div className='flex items-center product__seo'>
              <div className='ml-3'>
                <Link
                  to={{
                    pathname: "/product/details",
                    state: {
                      id: product.id,
                    },
                  }}
                  className="ml-3 mr-4 seo__flex"
                >
                  <CircleIcon className='seo-icon' />
                  <span className='my-0 text-15'> {product?.seo || '70%'}</span>
                </Link>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: 'seller',
      label: 'Seller',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex];
          return (
            <div className='flex items-center product__seller'>
              <Link
                to={{
                  pathname: '/product/details',
                  state: {
                    id: product.id,
                  },
                }}
                className='ml-4'
              >
                <span className='my-0 text-15'>
                  {product.storeId.sellerId.name.slice(0, 10) + "..." || '-----'}
                </span>
              </Link>
            </div>
          );
        },
      },
    },
    {
      name: 'action',
      label: 'Action',
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex];
          return (
            <Button
              onClick={() => handleFeaturedOnUSSD(product)}
              variant='text'
            >
              {product.isFeaturedOnUssd ? 'Remove from USSD' : 'Add to USSD'}
            </Button>
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
    //       let product = products[dataIndex];
    //       return (
    //         <div className='flex items-center'>
    //           <div className='flex-grow'></div>
    //           <Link
    //             to={{
    //               pathname: '/product/edit',
    //               state: {
    //                 id: product.id,
    //                 product,
    //               },
    //             }}
    //           >
    //             <IconButton>
    //               <Icon>edit</Icon>
    //             </IconButton>
    //           </Link>
    //         </div>
    //       );
    //     },
    //   },
    // },
    // {
    //   name: 'id', // field name in the row object
    //   label: '', // column title that will be shown in table
    //   options: {
    //     filter: false,
    //     customBodyRenderLite: (dataIndex) => {
    //       let product = products[dataIndex];
    //       return (
    //         <Link
    //           to={{
    //             pathname: `/agent/details/${product.id}`,
    //             state: {
    //               id: product.id,
    //               agentCode: product.agentCode,
    //             },
    //           }}
    //         >
    //           <div>
    //             {/* <h5 className='my-0 text-15'>{`${user?.id}`}</h5> */}
    //           </div>
    //         </Link>
    //       );
    //     },
    //   },
    // },
  ];

  const debouncedProducts = debounce(async (value) => {
    if (value.length > 0) {
      const response = await getAllResults(page, size, value)
      setProducts(response?.content)
      setCount(response?.totalElements)
      setQuery(value);
    } else {
      const response = await getAllResults(page, size, '')
      setProducts(response?.content)
      setCount(response?.totalElements)
      setQuery('');
    }
  }, 700);

  const performSearch = (value) => {
    debouncedProducts(value);
  };

  const refresh = async () => {
    const response = await getAllResults(page, size, '')
    setProducts(response?.content)
    setCount(response?.totalElements)
    setQuery('');
  }

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb routeSegments={[{ name: "Products", path: "/products" }]} />
      </div>
      <div className='overflow-auto'>
        <div className='min-w-750 all-products-table'>
          {loading ? (
            <Loading />
          ) : (
            <div>
              <MUIDataTable
                title={<h5 className='mt-4 mb-0 product-table'>All Products</h5>}
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
                  selectableRows: false,
                  rowsPerPageOptions: [10, 20, 30, 40, 50],
                  count,
                  page,
                  onChangeRowsPerPage: (x) => {
                    setSize(x);
                  },
                  onTableChange: (action, tableState) => {
                    if (action === 'changePage') {
                      onChangePage(tableState.page)
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
                              <IconButton onClick={() => { hideSearch(); refresh() }}>
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
                            pathname: "/product/new",
                            state: {},
                          }}
                        >
                        <Button
                          variant="contained"
                          color="primary"
                          // onClick={() => handleModal()}
                        >
                          Add New
                        </Button>
                        </Link>
                        {/* <NewPickupCenter
                      name={pickupCenter ? "Edit Pickup Center" : "Add New Pickup Center"}
                      isOpen={open}
                      pickupCenter={pickupCenter}
                      handleClose={handleModal}
                      refresh={() => refresh()} /> */}

                        {/* <NewProduct
                          isOpen={open}
                          handleClose={handleModal}
                          created={created}
                        /> */}
                        {/* <Alert
                          isOpen={alertOpen}
                          handleModal={handleDisplayModal}
                          alertData={alertData}
                          handleOK={handleOK}
                        /> */}
                      </>
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
