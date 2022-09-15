import React, { useState, useEffect, useCallback } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Checkbox,
  Icon,
} from '@material-ui/core';
import {
  getProductById,
  createProduct,
  updateProduct,
  getData,
  getBrands,
} from './ProductService';
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';
import { Formik } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Notification from '../../components/Notification';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import http from '../../services/api';
import Alert from 'app/components/Alert';
const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const usestyles = makeStyles(({ palette, ...theme }) => ({
  dropZone: {
    border: '2px dashed rgba(var(--body),0.3)',
    '&:hover': {
      background: 'rgba(var(--body), 0.2) !important',
    },
    borderRadius: ' 4px !important',
    borderStyle: 'dashed',
    borderColor: '#DCDCDC',
    height: '190px',
    overflow: ' hidden',
    marginBottom: '1rem !important',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    color: 'rgba(52, 49, 76, 1)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    backgroundColor: '#fff',
    display: 'flex',
    boxSizing: 'inherit',
    marginTop: '2px',
  },
}));

const productTypes = ['EXTERNAL', 'GROUPED', 'SIMPLE', 'VARIANT'];

function NewProduct({ isNewProduct, id, Product }) {
  const initialState = {
    brandId: null,
    rating: null,
    translatedName: null,
    productCode: null,
    shippingClass: {}
  };
  const initialValues = {
    productType: '',
    discountRate: '',
    tags: [],
    productCategories: [],
    price: '',
    sku: '',
    name: '',
    description: '',
    brandId:{},
    storeId:{}

  };

  const history = useHistory();

  const classes = usestyles();
  const [state, setState] = useState(initialState);
  const [values, setValues] = useState(initialValues);
  const [brands, setBrands] = useState([]);
  const [tags, setTags] = useState([]);
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [alert, setAlert] = useState('');
  const [severity, setSeverity] = useState('');
  const [shippinClasses, setShippingClasses] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([])
  const [shippingC, setShippingC]= useState("")

  const [alertData, setAlertData] = useState({ success: false, text: '', title: '' });
  const [isOpen, setIsOpen] = React.useState(false)



  const handleDisplayModal = () => {
    setIsOpen(!isOpen)
  }

  // const [product, setProduct] = useState(Product);

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

  const onDrop = useCallback((acceptedFiles) => {}, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ accept: 'image/*', onDrop });

  /**
   * maps through a list of urls and callbacks
   * @returns void
   * @set the data returned to state variables
   */
  const getRessult = () => {
    urls.map((val) => getData(val.url, val.set, setAlert, setSeverity));
  };

  useEffect(() => {
    getBrands(setAlert, setSeverity, setBrands);
    getRessult();
    setImageList(acceptedFiles);
    if (!isNewProduct) {
      getProductById(id).then(({ data }) => {
        setState(data.object);
        setValues(data.object);
        console.log(data.object, "test shipping class")
        setShippingC(data.object.status)
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedFiles, id, isNewProduct, shippingC]);

  const handleSelect = (newValue, fieldName) => {
    const { id } = newValue;
    setState({ ...state, [fieldName]: id });
  };


  const handleSubmit = (values, { setSubmitting }) => {
    const payload = { ...state, ...values };
    const data = new FormData();
    const updateData = {
      id: state.id,
      name: values?.name || state.name,
      description: values?.description || state.description,
      sku: values?.sku || state.sku,
      translatedName: state.translatedName,
      productCode: state.productCode,
      // brandId: state.brandId,
      buyPrice: state.buyPrice,
      rating: state.rating,
      price: values?.price || state.price,
      discountRate: values?.discountRate || state.discountRate,
      tags: values?.tags || state.tags,
      shippingClass: state.shippingClass,
      brandId: values?.brandId || state.brandId,
      storeId: values?.storeId || state.storeId
    };
    // delete payload.shippingClass;
    data.append('product', JSON.stringify(payload));

    imageList.forEach((file, imageFile) => {
      data.append('imageFile', file);
    });

    if (!isNewProduct) {
      updateProduct(updateData)
        .then((res) => {
          if (res.status === 200) {
            setAlertData({ success: true, text: "Product created sucessfully", title: 'Product Created' })
            handleDisplayModal();
            // history.push('/products');
          }
          else{
            setAlertData({ success: false, text: 'Invalid details provided', title: 'Unable to create product' })
            handleDisplayModal();
            // return 
          };
        })
        .catch((err) => console.error(err));
    }else {
      createProduct(data)
      .then((res) => {
        if (res.status === 200) {
          setAlertData({ success: true, text: "Product created sucessfully", title: 'Product Created' })
          handleDisplayModal();
          // history.push('/products')
        }
        else {
          setAlertData({ success: false, text: 'Invalid details provided', title: 'Unable to create product' })
          handleDisplayModal();
          // return 
        };
      })
      .then((err) => console.error(err));
    }
   
  };

  
  console.log(state, "state test")

  return (
    <div className='m-sm-30'>
      <Notification alert={alert} severity={severity || ''} />
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
          <form className='px-4' onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField
                  className='mb-4'
                  name='productType'
                  label='Select Product Type'
                  variant='outlined'
                  fullWidth
                  select
                  margin='normal'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.productType || ''}
                  error={Boolean(touched.productType && errors.productType)}
                  helperText={touched.productType && errors.productType}
                >
                  {productTypes.sort().map((productType) => (
                    <MenuItem value={productType} key={productType}>
                      {productType}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  className='mb-4'
                  name='price'
                  label='Product Price(₦)'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.price || ''}
                  error={Boolean(touched.price && errors.price)}
                  helperText={touched.price && errors.price}
                />
                <TextField
                  className='mb-4'
                  name='discountRate'
                  label='Discount Rate (%)'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.discountRate || ''}
                  helperText={touched.discountRate && errors.discountRate}
                />

                <div
                  className={clsx({
                    [classes.dropZone]: true,
                    'bg-light-gray': !isDragActive,
                    'bg-gray': isDragActive,
                  })}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <div
                    className='flex-column items-center'
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Icon
                      className='text-muted text-48'
                      style={{ fontSize: '48px' }}
                    >
                      publish
                    </Icon>
                    {imageList.length ? (
                      <span>{imageList.length} images were selected</span>
                    ) : (
                      <span>Drop product images</span>
                    )}
                  </div>
                </div>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  className='mb-4'
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
                <TextField
                  className='mb-4'
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
                <TextField
                  className='mb-4'
                  name='description'
                  label='Description'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  multiline
                  // rows={8}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description || ''}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />

                <Autocomplete
                  id='storeId'
                  name='storeId'
                  value={values.storeId}
                  options={stores}
                  getOptionLabel={(option) => option.name}
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
                {/* <TextField
                  className='mb-4'
                  name='shippingClass'
                  label='Select Shipping Class'
                  variant='outlined'
                  value = {values.status}
                  fullWidth
                  select
                  margin='normal'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.productType && errors.productType)}
                  helperText={touched.productType && errors.productType}
                >
                  {productTypes.sort().map((productType) => (
                    <MenuItem value={productType} key={productType}>
                      {productType}
                    </MenuItem>
                  ))}
                </TextField> */}
                <Autocomplete
                  id='shippingClass'
                  name='shippingClass'
                  options={shippinClasses}
                  value={state.shippingClass}
                  getOptionLabel={(option) => option.name}
                  getOptionSelected={(option, value) => option.id === value.id}
                  onChange={(event, newValue) =>
                    handleSelect(newValue, 'shippingClass')
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Select Shipping Class'
                      variant='outlined'
                      margin='normal'
                    />
                  )}
                />

                <Autocomplete
                  multiple
                  id='tags'
                  options={tags}
                  value={values.tags}
                  getOptionLabel={(option) => option.name}
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

                <Autocomplete
                  id='brands'
                  options={brands}
                  value={values.brandId}
                  getOptionLabel={(option) => option.name || ''}
                  getOptionSelected={(option, value) => option.id === value.id}
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
                <Autocomplete
                  multiple
                  id='categories'
                  options={categories}
                  value={values.productCategories}
                  onChange={(event, newValue) => {
                    setValues({...values, productCategories:newValue})
                  }}
                  getOptionLabel={(option) => option.name}
                  getOptionSelected={(option, value) => option.id === value.id}
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
                      label='Select Categories'
                      placeholder='Category'
                      fullWidth
                      margin='normal'
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button
              className='mb-4 px-12'
              variant='contained'
              color='primary'
              type='submit'
            >
              Add Product
            </Button>
          </form>
        )}
      </Formik>
      <Alert
        isOpen={isOpen}
        handleModal={handleDisplayModal}
        alertData={alertData}
        handleOK={() => {
          history.push('/products')
        }}
      />
    </div>
  );
}

const productSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  price: yup.number().required('Price is required'),
  description: yup
    .string()
    .min(10)
    .required('Please enter a description of atleast 10 chars long'),
});

export default NewProduct;
