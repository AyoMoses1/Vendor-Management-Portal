import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Grid, TextField, Checkbox, Icon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import http from '../../services/api'
import './product-details.css'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
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
  createProduct,
  updateProduct,
  getData,
  getBrands,
} from './ProductService';
const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),

  color: theme.palette.text.secondary,
}));

const usestyles = makeStyles(({ palette, ...theme }) => ({
  imageBorder: {
    border: '2px solid rgba(var(--primary), 0.67)',
  },
}))

const ProductDetails = ({ location, placeholder }) => {
  const State = location.state
  const { id } = State;
  const [selectedImage, setSelectedImage] = useState('')
  const classes = usestyles()
  const [product, setProduct] = useState([])
  // const [brand, setBrand] = useState([])
  const [imageList, setImageList] = useState([])
  // const [store, setStore] = useState([])
  const [shippinClasses, setShippingClasses] = React.useState([]);
  const [seller, setSeller] = useState([])
  const [alert, setAlert] = useState('');
  const [severity, setSeverity] = useState('');
  const [loading, setLoading] = useState(false);
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
  const [longDesc, setLongDesc] = useState('')


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
      setValues(data.object);
      // setShippingC(data.object.status)
    });
  }, [ id]);
  const handleChange = (event) => {
    // setValue(event.target.value);
  };

  const handleSelect = (newValue, fieldName) => {
    console.log({ newValue, fieldName })
    if (Object.keys(values).some(key => key === fieldName)) {
      console.log(fieldName);
      console.log(newValue);
      setValues({ ...values, [fieldName]: newValue });
    }
    console.log(values);

  };



  // const getProduct = () => {
  //   http
  //     .get(`/afrimash/products/${id}`)
  //     .then((response) => {
  //       if (response.data) {
  //         const { brandId, storeId, productImages } = response.data.object
  //         setProduct(response.data?.object)
  //         setBrands(brandId)
  //         setStores(storeId)
  //         setSeller(storeId.sellerId)
  //         if (productImages.length === 0) {
  //           setImageList([])
  //           setSelectedImage('')
  //           return
  //         } else {
  //           setImageList(productImages)
  //           setSelectedImage(productImages[0].imageUrl)
  //         }
  //       }
  //     })
  //     .catch((err) => alert(err.response.data))
  // }

  // useEffect(() => {
  //   getProduct()
  // }, [])
  console.log(values, "******TEST VALUES**********")
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
                    <FormControl sx={{ width: '50%' }} variant="outlined">
                      <TextField
                        className='mb-4'
                        name='name'
                        label='Product Name'
                        variant='outlined'
                        margin='normal'
                        fullWidth
                        // onBlur={handleBlur}
                        // onChange={handleChange}
                        value={values.name || ''}
                        // error={Boolean(touched.name && errors.name)}
                        // helperText={touched.name && errors.name}
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
                        onChange={newContent => { }}
                      />
                    </FormControl>
                    <div className='form-flex'>
                      <FormControl sx={{ width: '48%' }} variant="outlined">
                        <TextField
                          className='mb-4'
                          name='sku'
                          label='SKU'
                          variant='outlined'
                          margin='normal'
                          fullWidth
                          // onBlur={handleBlur}
                          // onChange={handleChange}
                          value={values.sku || ''}
                          // error={Boolean(touched.sku && errors.sku)}
                          // helperText={touched.sku && errors.sku}
                        />
                      </FormControl>
                      <FormControl sx={{ width: '48%' }} variant="outlined">
                      <Autocomplete
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
                              variant='outlined'
                              label='Select Brand'
                              margin='normal'
                            />
                          )}
                        />
                      </FormControl>
                    </div>
                  </Box>
                </Item>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Item className='no-shadow'>
                <ProductType />
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
                <ProductStatus />
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item className='no-shadow'>
                <ProductShipping />
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item className='no-shadow'>
                <ProductGallery />
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item className='no-shadow'>
                <ProductCategory />
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default ProductDetails
