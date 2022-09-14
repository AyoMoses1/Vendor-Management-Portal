import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import './product-details.css'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CategoryEdit from './components/CategoryEdit'
import CategoryStatus from './components/CategoryStatus'
import CategoryImage from './components/CategoryImage'
import CategorySelect from './components/CategorySelect';
import "./common.css"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),

  color: theme.palette.text.secondary,
}));

const CategoryDetails = ({ location, placeholder }) => {
  const State = location.state
  const { id } = State
  const getCategory = () => { }

  useEffect(() => {
    getCategory()
  }, [])

  return (
    <div className='m-sm-30'>
      <div className='mb-sm-30'>
        <Grid container spacing={2}>
          <Grid container spacing={2} item xs={12}>
            <Grid item xs={12}>
              <div className='page-title'>Edit Category</div>
            </Grid>
          </Grid>

          <Grid container spacing={2} item xs={8}>
            <Grid item xs={12}>
              <Item className='no-shadow'>
                <CategoryEdit />
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Item className='no-shadow'>
                  <CategorySelect />
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

export default CategoryDetails
