import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'matx';
import MUIDataTable from 'mui-datatables';
import { Grow, Icon, IconButton, TextField, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useDialog } from 'muibox';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { deleteProduct, getAllResults } from '../../products/ProductService';
import Loading from 'matx/components/MatxLoadable/Loading';
import { useDispatch } from 'react-redux';
import { updateProductFeature } from '../../../redux/actions/ussd-action';
import CircleIcon from '@mui/icons-material/Circle';
import '../../products/products-view.css'
import { debounce } from "lodash";


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
            <div className='flex-featured'>
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
                  {product?.name}
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
            <div className='flex-featured'>
              <div className='ml-3'>
                <Link
                  to={{
                    pathname: "/product/details",
                    state: {
                      id: product?.id,
                    },
                  }}
                >
                  {product && n.join(',').slice(0, 20) + "..."}
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
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex];
          return (
            <div className='flex-featured product__date'>
              <div className='ml-3'>
                <Link
                  to={{
                    pathname: "/product/details",
                    state: {
                      id: product.id,
                    },
                  }}
                  className="ml-3 mr-4"
                >
                  <div>27/01/2022</div>
                  <span className='my-0 time-muted'> {product?.dateAdded || '10:29:30'}</span>
                </Link>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: 'status',
      label: 'Featured Status',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex];
          return (
            <div className='flex-featured'>
              <div className={`ml-3`}>
                <Link
                  to={{
                    pathname: "/product/details",
                    state: {
                      id: product?.id,
                    },
                  }}
                >
                  <div className={ product?.isFeaturedOnUssd ? "not-featured": "featured"}></div>
                </Link>
              </div>
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
            // <div className='flex-featured'>
            <Button
              onClick={() => handleFeaturedOnUSSD(product)}
              variant='text'
              className='flex-featured'
            >
              {product.isFeaturedOnUssd ? 'Remove from USSD' : 'Add to USSD'}
            </Button>
            // </div>
          );
        },
      },
    },
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

  const getMuiTheme = () => createMuiTheme({
    overrides: {
      MuiTableCell: {
        head: {
            textAlign: "center",
        },
        body:{
          textAlign:"center !important"
        }
        
    }
    }
});
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
              <MuiThemeProvider theme={getMuiTheme()}>   
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
                      </>
                    );
                  },
                }}
              />
              </MuiThemeProvider>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
