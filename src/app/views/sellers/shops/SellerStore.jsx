import React from 'react'
import { Grid } from '@material-ui/core'
import './sellerStore.css'
import Box from 'app/components/Box';
import SellerChart from './SellerChart';
import SellerGraph from './SellerGraph';
import StoreProducts from './StoreProducts';


function SellerStore() {
  return (
    <>
        <div className='container'>
            <div className='title'>Vendor Store</div>
            <div className="stats-section">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6}>
                        <div className='stats-card'>
                            <div className='stats'>
                                <h5>Earning Statistics</h5>
                                <div className='stats-value'>5,987,625</div>
                                <p>Total amount of earnings per month</p>
                            </div>
                        <div className='divider'></div>
                        <div className='graph-container'>
                            <SellerGraph/>
                        </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <div className='stats-card'>
                            <div className="stats">
                            <h5>Top selling <br/> products</h5>
                                <p>High performing products per month</p>
                            </div>
                            <div className='divider'></div>
                            <div className='pie-graph-container'>
                                <SellerChart/>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>  
        </div>
        <StoreProducts/>
     </>
  )
}

export default SellerStore