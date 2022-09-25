import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Grid, TextField, Checkbox, Button, CircularProgress } from '@material-ui/core'
import http from '../../services/api'
import './product-details.css'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import * as yup from 'yup';
import FormControl from '@mui/material/FormControl';
import JoditEditor from 'jodit-react'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ProductType from './components/ProductType'
import ProductSpecification from './components/ProductSpecification'
import ProductGallery from './components/ProductGallery'
import ProductShipping from './components/ProductShipping'
import ProductStatus from './components/ProductStatus'
import ProductCategory from './components/ProductCategory'
import Autocomplete from '@material-ui/lab/Autocomplete';
import "./common.css"
import {
  getProductById,
  updateProduct,
  getData,
  getBrands,
} from './ProductService';
import { Formik } from 'formik'
import Alert from 'app/components/Alert'
const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),

  color: theme.palette.text.secondary,
}));

const ProductDetails = ({ location, placeholder }) => {
  const State = location.state
  const { id } = State;
  const [alertData, setAlertData] = useState({ success: false, text: '', title: '' });
  const [shippinClasses, setShippingClasses] = React.useState([]);
  const [description, setDescription] = useState()
  const [planeDesc, setPlaneDesc] = useState('')
  const [alert, setAlert] = useState('');
  const [severity, setSeverity] = useState('');
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [brands, setBrands] = useState([]);
  const [tags, setTags] = useState([]);
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);
  const [values, setValues] = React.useState({
    brandId: {},
    rating: null,
    translatedName: null,
    productCode: null,
    shippingClass: {},
    storeId: {},
    productType: '',
    discountRate: '',
    tags: [],
    productCategories: [],
    price: '',
    sku: '',
    name: '',
    description: '',
  });
  const editor = useRef(null)
  const [desc, setDesc] = useState('')
  const [isOpen, setIsOpen] = React.useState(false)

  const handleDisplayModal = () => {
    setIsOpen(!isOpen)
  }


  const getAllShippingClasses = () => {
    setLoading(true);
    http.get('/afrimash/shipping-class').then((res) => {
      setShippingClasses(res?.data?.object);
      setLoading(false);
    });
  };

  useEffect(() => {
    getAllShippingClasses();
  }, []);

  const config = useMemo(() => ({
    readonly: false,
    toolbarButtonSize: 'middle',
    placeholder: placeholder || 'Start typings...'
  }), [placeholder])

  const urls = [
    {
      url: `afrimash/stores?page=1&size=100&search=search`,
      set: setStores,
    },
    {
      url: `/afrimash/product-categories/search?`,
      set: setCategories,
    },
    {
      url: `/afrimash/product-categories/search?`,
      set: setCategories,
    },
    {
      url: `/afrimash/tags/`,
      set: setTags,
    },
  ];


  const getResult = () => {
    urls.map((val) => getData(val.url, val.set, setAlert, setSeverity));
  };

  useEffect(() => {
    getBrands(setAlert, setSeverity, setBrands);
    getResult();
    getProductById(id).then(({ data }) => {
      setValues(data?.object);
    });
  }, [id]);

  const handleSelect = (newValue, fieldName) => {
    console.log({ newValue, fieldName })
    if (Object.keys(values).some(key => key === fieldName)) {
      console.log(fieldName);
      console.log(newValue);
      setValues({ ...values, [fieldName]: newValue });
    }
    console.log(values);

  };

  const handleSubmit = (items, { setSubmitting }) => {
    if (planeDesc.length >= 10) {
      const payload = { ...values, ...items, description };
      setUpdating(true)
      updateProduct({ ...payload })
        .then((res) => {
          if (res.status === 200) {
            setValues(res?.data?.object);
            setUpdating(false)
            setAlertData({ success: true, text: "Product updated sucessfully", title: 'Product Updated' })
            handleDisplayModal();
          }
          else {
            setUpdating(false)
            setAlertData({ success: false, text: 'Invalid details provided', title: 'Unable to update product' })
            handleDisplayModal();
          };
        })
        .catch((err) => console.error(err));
    }
  };

  const descOnChange = (value) => {
    setDescription(value);
    console.log(value);
    var html = value;
    var div = document.createElement("div");
    div.innerHTML = html;
    console.log(div.innerText);
    setPlaneDesc(div.innerText)
  }

  const invoke = () => {
    getProductById(id).then(({ data }) => {
      setValues(data?.object);
    });
  }
  
  return (
    <div className='m-sm-30'>
      <div className='mb-sm-30'>
        <Grid container spacing={2}>
          <Grid container spacing={2} item xs={12}>
            <Grid item xs={12}>
              <div className='page-title'>Edit Product</div>
            </Grid>
          </Grid>
          <Grid container spacing={2} item xs={8}>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Item className='no-shadow'>
                  <Box
                    component="form"
                    className='product--form'
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div className="product-details-title">Product Details</div>
                    <Formik
                      initialValues={values}
                      onSubmit={handleSubmit}
                      enableReinitialize={true}
                      validationSchema={productSchema}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                      }) => (
                        <form onSubmit={handleSubmit}>
                          <FormControl variant="outlined" className='w-100'>
                            <TextField
                              className='mb-4 mx-0'
                              name='name'
                              label='Product Name'
                              variant='outlined'
                              margin='normal'
                              fullWidth
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.name || ''}
                              error={Boolean(touched.name && errors.name)}
                              helperText={touched.name && errors.name}
                            />
                          </FormControl>
                          <FormControl sx={{ width: '100%' }} variant="outlined">
                            <label className='section-title'>Description</label>
                            <JoditEditor
                              ref={editor}
                              value={values.description}
                              config={config}
                              tabIndex={1} // tabIndex of textarea
                              onBlur={newContent => setDesc(newContent)} // preferred to use only this option to update the content for performance reasons
                              onChange={descOnChange}
                            />
                            {!loading && planeDesc.length < 10 ? <div style={{ color: '#EB6464', fontSize: '12px' }}>Please enter a description of at least 10 chars long</div> : <></>}
                          </FormControl>
                          <div className='form-flex'>
                            <FormControl sx={{ width: '48%' }} variant="outlined" className='mt-4'>
                              <TextField
                                className='mb-4 mx-0'
                                name='sku'
                                label='SKU'
                                variant='outlined'
                                margin='normal'
                                fullWidth
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.sku || ''}
                                error={Boolean(touched.sku && errors.sku)}
                                helperText={touched.sku && errors.sku}
                              />
                            </FormControl>
                            <FormControl sx={{ width: '48%' }} variant="outlined" className='mt-4'>
                              <Autocomplete
                                className='mx-0'
                                multiple
                                id='tags'
                                name='tags'
                                options={tags}
                                value={values.tags}
                                getOptionLabel={(option) => option?.name ?? ""}
                                getOptionSelected={(option, value) => option.id === value.id}
                                onChange={(event, newValue) => {
                                  setValues({ ...values, tags: newValue });
                                }}
                                renderOption={(option, { selected }) => (
                                  <React.Fragment>
                                    <Checkbox
                                      icon={icon}
                                      checkedIcon={checkedIcon}
                                      style={{ marginRight: 8 }}
                                      checked={selected}
                                    />
                                    {option.name}
                                  </React.Fragment>
                                )}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    className='mx-0'
                                    variant='outlined'
                                    label='Select Tags'
                                    placeholder='Tag'
                                    fullWidth
                                    margin='normal'
                                  />
                                )}
                              />
                            </FormControl>
                            <FormControl sx={{ width: '48%' }} variant="outlined">
                              <Autocomplete
                                id='storeId'
                                name='storeId'
                                value={values.storeId}
                                options={stores}
                                getOptionLabel={(option) => option?.name ?? ""}
                                getOptionSelected={(option, value) => option.id === value.id}
                                onChange={(event, newValue) =>
                                  handleSelect(newValue, 'storeId')
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    className='mx-0'
                                    label='Select Store'
                                    variant='outlined'
                                    margin='normal'
                                  />
                                )}
                              />
                            </FormControl>
                            <FormControl sx={{ width: '48%' }} variant="outlined">
                              <Autocomplete
                                id='brands'
                                options={brands.filter(item => item?.name)}
                                name='brands'
                                value={values.brandId}
                                getOptionLabel={(option) => {
                                  return option?.name ?? ""
                                }}
                                getOptionSelected={(option, value) => {
                                  return option.id === value
                                }}
                                onChange={(event, newValue) =>
                                  handleSelect(newValue, 'brandId')
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    className='mx-0'
                                    variant='outlined'
                                    label='Select Brand'
                                    margin='normal'
                                  />
                                )}
                              />
                            </FormControl>
                          </div>
                          <div className='button-flex'>
                            <Button
                              variant='contained'
                              color='primary'
                              className='product-gallery-save-btn'
                              type='submit'
                              disabled={updating}
                            >
                              {updating ? <CircularProgress size={14} className='mr-10' /> : ''}
                              {updating ? "Please wait..." : "Save"}
                            </Button>
                          </div>
                        </form>
                      )}
                    </Formik>
                    <Alert
                      isOpen={isOpen}
                      handleModal={handleDisplayModal}
                      alertData={alertData}
                      handleOK={handleDisplayModal}
                    />
                  </Box>
                </Item>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Item className='no-shadow'>
                <ProductType product={values} />
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item className='no-shadow'>
                <ProductSpecification />
              </Item>
            </Grid>
          </Grid>
          <Grid container spacing={2} item xs={4} style={{ display: 'initial' }}>
            <Grid item xs={12}>
              <Item className='no-shadow'>
                <ProductStatus product={values} />
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item className='no-shadow'>
                <ProductShipping product={values} />
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item className='no-shadow'>
                <ProductGallery product={values} invoke={invoke} />
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item className='no-shadow'>
                <ProductCategory product={values} />
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

const productSchema = yup.object().shape({
  name: yup.string().required('Product Name is required'),
  sku: yup.string().required('SKU is required'),
});

export default ProductDetails
