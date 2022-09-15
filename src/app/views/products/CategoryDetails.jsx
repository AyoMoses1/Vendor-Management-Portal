import React, { useEffect } from 'react'
import './product-details.css'
import "./common.css"
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Box,
  Grid,
  Button,
} from '@material-ui/core'
import { SimpleCard, Breadcrumb } from 'matx'
import Loading from 'matx/components/MatxLoadable/Loading'
import http from '../../services/api';
import { useState } from 'react';
import ProductSubcategories from './components/ProductSubcategories'
import CategoryProducts from './components/CategoryProducts'
import AddProduct from './components/AddProduct'
import Alert from 'app/components/Alert'

const CategoryDetails = ({ location }) => {
  const [loading, setLoading] = React.useState(false)
  const [alertData, setAlertData] = React.useState({ success: false, text: '', title: '' });
  const [category, setCategory] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState(null);
  const [open, setOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const State = location.state
  const { id } = State

  const getCategory = () => {
    setLoading(true);
    http.get(`/afrimash/product-categories/${id}`).then((response) => {
      setLoading(false);
      let { data } = response;
      setCategory(data?.object);
      setSubCategories(data?.object?.subCategories);
    }).catch(err => {
      setLoading(false);
    });
  }

  const getCategoryProducts = () => {
    http.get(`/afrimash/product-categories/${id}/products`).then((response) => {
      let { data } = response;
      setCategoryProducts(data?.object);
    }).catch(err => { });
  }

  useEffect(() => {
    getCategory();
    getCategoryProducts();
  }, [])

  const handleModal = () => {
    setOpen(!open)
  }

  const handleAlertModal = () => {
    setAlertOpen(prev => !prev)
  }

  const refresh = () => {
    setAlertData({ success: true, text: "Product added to category successfully", title: 'Product Added' })
    handleAlertModal();
    getCategory();
    getCategoryProducts();
  }

  return (
    <div className='m-sm-30'>
      <div className='mb-sm-30'>
        <Breadcrumb
          routeSegments={[
            { name: 'Categories', path: '/product-categories' },
            { name: 'Category' },
          ]}
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <SimpleCard>
            <div className='flex flex-space-between flex-middle'>
              <h5 className='text-left'>Product Category Details</h5>
              <Button
                variant='contained'
                color='primary'
                onClick={() => {
                  handleModal()
                }}
              >
                Associate Product
              </Button>
            </div>
            <AddProduct
              name={"Add Product to Category"}
              isOpen={open}
              handleClose={handleModal}
              refresh={() => refresh()}
              categoryId={id} />
            <Alert
              isOpen={alertOpen}
              handleModal={handleAlertModal}
              alertData={alertData}
              handleOK={handleAlertModal}
            />
            <Divider className='mt-4' />
            <Table className='mb-4'>
              <TableBody>
                <TableRow>
                  <TableCell className='pl-4'>Category Name</TableCell>
                  <TableCell>
                    <h5 className='m-0'>{category?.name ?? "---"}</h5>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-4'>Commission</TableCell>
                  <TableCell>
                    <div>{category?.commission ?? "---"}</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-4'>Is Category Featured</TableCell>
                  <TableCell>
                    <div>{category?.isFeatured ? "Yes" : "No"}</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-4'>Is Category Featured on USSD</TableCell>
                  <TableCell>
                    <div>{category?.isFeaturedOnUssd ? "Yes" : "No"}</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-4'>Category Images</TableCell>
                  <TableCell>
                    <Grid container spacing={2} className='category-images'>
                      {
                        category?.productCategoryImages?.length ? category?.productCategoryImages?.map((img, idx) => <Grid key={idx + 'cat'} item lg={3} md={3} sm={6} xs={12}>
                          <div>
                            <img src={img?.imageUrl} />
                          </div>
                        </Grid>) : <div>No image</div>
                      }
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </SimpleCard>
          <Box mt={5}>
            <ProductSubcategories subCategories={subCategories} />
          </Box>
          <Box mt={5}>
            <CategoryProducts categoryProducts={categoryProducts} />
          </Box>
        </>
      )}
    </div>
  )
}

export default CategoryDetails
