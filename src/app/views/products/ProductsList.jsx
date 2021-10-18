import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'matx'
import MUIDataTable from 'mui-datatables'
import { Grow, Icon, IconButton, TextField, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import http from '../../services/api'
import { useDialog } from 'muibox'
import { deleteProduct } from './ProductService'

const Products = () => {
  const [isAlive, setIsAlive] = useState(true)
  const [products, setProducts] = useState([])
  const dialog = useDialog()

  useEffect(() => {
    http.get(`/afrimash/products/`).then((response) => {
      let { data } = response
      if (isAlive) setProducts(data.object)
    })
    return () => setIsAlive(false)
  }, [isAlive])

  const columns = [
    {
      name: 'name', // field name in the row object
      label: 'Name', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex]
          return (
            <div className='flex items-center'>
              <Link
                to={{
                  pathname: '/product/details',
                  state: {
                    id: product.id,
                  },
                }}
                className='ml-3 mr-4'
              >
                <span className='my-0 text-15'>{product?.name}</span>
              </Link>
            </div>
          )
        },
      },
    },
    // {
    //   name: "sku",
    //   label: "Sku",
    //   options: {
    //     filter: true,
    //     customBodyRenderLite: (dataIndex) => {
    //       let product = products[dataIndex];
    //       return (
    //         <div className="flex items-center">
    //           <div className="ml-3">
    //             <span className="my-0 text-15"> {product?.sku || "-----"}</span>
    //           </div>
    //         </div>
    //       );
    //     },
    //   },
    // },
    {
      name: 'price',
      label: 'Price',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex]
          return (
            <div className='flex items-center'>
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
                  {' '}
                  {`₦${product.price}` || '-----'}
                </span>
              </Link>
            </div>
          )
        },
      },
    },
    {
      name: 'categories',
      label: 'Categories',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex]
          let n = product.productCategories.map((name) => name.name)
          return (
            <div className='flex items-center'>
              <div className='ml-3'>
                <span className='my-0 text-15'>{product && n.join(',')}</span>
              </div>
            </div>
          )
        },
      },
    },
    {
      name: 'tags',
      label: 'Tags',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex]
          let n = product.tags.map((name) => name.name)
          return (
            <div className='flex items-center'>
              <div className='ml-4'>
                <span className='my-0 text-15'>
                  {n.length > 0 ? n.join(',') : ' ----'}
                </span>
              </div>
            </div>
          )
        },
      },
    },
    {
      name: 'brand',
      label: 'Brand',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex]
          return (
            <div className='flex items-center'>
              <Link
                to={{
                  pathname: '/product/details',
                  state: {
                    id: product.id,
                  },
                }}
                className='ml-4'
              >
                <span className='my-0 text-15'>{product.brandId?.name}</span>
              </Link>
            </div>
          )
        },
      },
    },
    {
      name: 'seller',
      label: 'Seller',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex]
          return (
            <div className='flex items-center'>
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
                  {product.storeId.sellerId.name || '-----'}
                </span>
              </Link>
            </div>
          )
        },
      },
    },
    {
      name: 'sku',
      label: 'Sku',
      options: {
        innerWidth: '30px',
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex]
          return (
            <div className='flex items-center'>
              <Link
                to={{
                  pathname: '/product/details',
                  state: {
                    id: product.id,
                  },
                }}
                className='ml-4'
              >
                <span className='my-0 text-15'>{product.sku || '-----'}</span>
              </Link>
            </div>
          )
        },
      },
    },
    {
      name: 'action',
      label: ' ',
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          let product = products[dataIndex]
          return (
            <div className='flex items-center'>
              <div className='flex-grow'></div>
              <Link
                to={{
                  pathname: '/product/edit',
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
          )
        },
      },
    },
  ]

  return (
    <div className='m-sm-30'>
      <div className='mb-sm-30'>
        <Breadcrumb routeSegments={[{ name: 'Products', path: '/products' }]} />
      </div>
      <div className='overflow-auto'>
        <div className='min-w-750'>
          <MUIDataTable
            title={'All Products'}
            data={products}
            columns={columns}
            options={{
              onRowsDelete: (data) =>
                dialog
                  .confirm('Are you sure you want to delete?')
                  .then((value) => deleteProduct(data.data))
                  .catch(() => {
                    return false
                  }),
              filterType: 'textField',
              responsive: 'standard',
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
                      variant='outlined'
                      size='small'
                      fullWidth
                      onChange={({ target: { value } }) => handleSearch(value)}
                      InputProps={{
                        style: {
                          paddingRight: 0,
                        },
                        startAdornment: (
                          <Icon className='mr-2' fontSize='small'>
                            search
                          </Icon>
                        ),
                        endAdornment: (
                          <IconButton onClick={hideSearch}>
                            <Icon fontSize='small'>clear</Icon>
                          </IconButton>
                        ),
                      }}
                    />
                  </Grow>
                )
              },
              customToolbar: () => {
                return (
                  <Link
                    to={{
                      pathname: '/product/new',
                      state: {},
                    }}
                  >
                    <Button variant='contained' color='primary'>
                      <Icon>add</Icon>Add New
                    </Button>
                  </Link>
                )
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Products
