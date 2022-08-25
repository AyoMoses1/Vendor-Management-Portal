import React, { Component, Fragment } from 'react'
import { Grid } from '@material-ui/core'
import Overview from './shared/Overview'
import MostViewed from './shared/MostViewed'
import { withStyles } from '@material-ui/styles'
import SalesFunnel from './shared/SalesFunnel'
import Audience from './shared/Audience'
import UsersCard from './shared/UsersCard'
import PageViews from './shared/PageViews'

class Dashboard1 extends Component {
  state = {}

  render() {
    let { theme } = this.props

    return (
      <Fragment>
        <div className='analytics m-sm-30'>
          <Grid container spacing={3}>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <Overview theme={theme} />
              <SalesFunnel theme={theme} />
              <Audience />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <div className='mb-16'>
                <MostViewed />
              </div>
              <div className='mb-16'>
                <UsersCard />
              </div>
              <PageViews />
            </Grid>
          </Grid>
        </div>
      </Fragment>
    )
  }
}

export default withStyles({}, { withTheme: true })(Dashboard1)
