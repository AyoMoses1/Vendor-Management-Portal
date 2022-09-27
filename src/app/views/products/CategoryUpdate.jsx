import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import './product-details.css'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CategoryEdit from './components/CategoryEdit'
import CategoryStatus from './components/CategoryStatus'
import CategoryImage from './components/CategoryImage'
import CategorySelect from './components/CategorySelect';
import http from '../../services/api';
import "./common.css"
import { getData } from './ProductService';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),

  color: theme.palette.text.secondary,
}));

const CategoryUpdate = ({ location, placeholder }) => {
  const [loading, setLoading] = React.useState(false)
  const [category, setCategory] = React.useState(null);
  const [subCategories, setSubCategories] = React.useState(null);
  const [categories, setCategories] = React.useState([]);
  const [alert, setAlert] = React.useState('');
  const [severity, setSeverity] = React.useState('');
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

  const urls = [
    {
      url: `/afrimash/product-categories/search?`,
      set: setCategories,
    },
  ];

  const getResult = () => {
    urls.map((val) => getData(val.url, val.set, setAlert, setSeverity));
  };

  useEffect(() => {
    if (id) {
      getCategory()
      getResult();
    }
  }, [id])

  return (
    <div className='m-sm-30'>
      <div className='mb-sm-30'>
        <Grid container spacing={2}>
          <Grid container spacing={2} item xs={12}>
            <Grid item xs={12}>
              <div className='page-title'>Edit Category</div>
            </Grid>
          </Grid>

          <Grid container spacing={2} item xs={8} style={{display: 'block'}}>
            <Grid item xs={12}>
              <Item className='no-shadow'>
                <CategoryEdit catergory={category} />
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Item className='no-shadow'>
                  <CategorySelect category={category} categories={categories} />
                </Item>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} item xs={4} style={{ display: 'initial' }}>
            <Grid item xs={12}>
              <Item className='no-shadow'>
                <CategoryStatus />
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item className='no-shadow'>
                <CategoryImage />
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default CategoryUpdate
