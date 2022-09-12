import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Divider, Grid, Icon } from '@material-ui/core'
import { Breadcrumb, SimpleCard } from 'matx'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import http from '../../services/api'
import './product-details.css'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import JoditEditor from 'jodit-react'
import ProductType from './components/ProductType'
import ProductSpecification from './components/ProductSpecification'
import ProductGallery from './components/ProductGallery'
import ProductShipping from './components/ProductShipping'
import ProductStatus from './components/ProductStatus'
import ProductCategory from './components/ProductCategory'





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
  const { id } = State
  const [selectedImage, setSelectedImage] = useState('')
  const classes = usestyles()
  const [product, setProduct] = useState([])
  const [brand, setBrand] = useState([])
  const [imageList, setImageList] = useState([])
  const [store, setStore] = useState([])
  const [seller, setSeller] = useState([])


  const [value, setValue] = React.useState('Controlled');
  const [values, setValues] = React.useState({
    name: '',
    shortDescription: '',
    longDescription: '',
    weightRange: '',
    showPassword: false,
  });

  const editor = useRef(null)
  const [shortDesc, setShortDesc] = useState('')
  const [longDesc, setLongDesc] = useState('')


  const config = useMemo(() =>({
    readonly: false,
    toolbarButtonSize: 'middle',
    placeholder: placeholder || 'Start typings...'
  }), [placeholder])



  const handleChange = (event) => {
    // setValue(event.target.value);
  };


  const getProduct = () => {
    http
      .get(`/afrimash/products/${id}`)
      .then((response) => {
        if (response.data) {
          const { brandId, storeId, productImages } = response.data.object
          setProduct(response.data?.object)
          setBrand(brandId)
          setStore(storeId)
          setSeller(storeId.sellerId)
          if (productImages.length === 0) {
            setImageList([])
            setSelectedImage('')
            return
          } else {
            setImageList(productImages)
            setSelectedImage(productImages[0].imageUrl)
          }
        }
      })
      .catch((err) => alert(err.response.data))
  }

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <div className='m-sm-30'>
      <div className='mb-sm-30'>
        <Grid container spacing={2}>
          <Grid container spacing={2} item xs = {8}>
            <Grid item xs = {12}>
              <Grid item xs={12}>
                <Item>
                  <Box
                    component="form"
                    className='product--form'
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                      <FormControl sx={{  width: '100%' }} variant="outlined">
                        <label className='section-title'>Product Name</label>
                        <OutlinedInput
                          id="outlined-adornment-weight"
                          value={values.weight}
                          className="form-border"
                          onChange={() => handleChange()}
                          aria-describedby="outlined-weight-helper-text"
                          inputProps={{
                            'aria-label': 'weight',
                          }}
                        />
                      </FormControl>
                      <FormControl sx={{ width: '100%' }} variant="outlined">
                        <label className='section-title'>Short Description</label>
                        <JoditEditor
                          ref={editor}
                          value={shortDesc}
                          config={config}
                          tabIndex={1} // tabIndex of textarea
                          onBlur={newContent => setShortDesc(newContent)} // preferred to use only this option to update the content for performance reasons
                          onChange={newContent => {}}
                        />
                      </FormControl>
                      <FormControl sx={{ width: '100%' }} variant="outlined">
                        <label className='section-title'>Long Description</label>
                        <JoditEditor
                          ref={editor}
                          value={longDesc}
                          config={config}
                          tabIndex={0} // tabIndex of textarea
                          onBlur={newContent => setLongDesc(newContent)} // preferred to use only this option to update the content for performance reasons
                          onChange={newContent => {}}
                        />
                      </FormControl>
                  </Box>
                </Item>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Item>
                <ProductType/>
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item>
                <ProductSpecification/>
              </Item>
            </Grid>
          </Grid>
          <Grid container spacing={2} item xs={4}>
            <Grid item xs={12}>
              <Item>
                <ProductStatus />
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item>
                <ProductShipping />
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item>
                <ProductGallery />
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item>
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
