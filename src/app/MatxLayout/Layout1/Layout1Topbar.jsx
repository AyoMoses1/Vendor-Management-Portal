import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Icon,
  IconButton,
  Badge,
  MenuItem,
  withStyles,
  MuiThemeProvider,
} from '@material-ui/core'
import { connect } from 'react-redux'
import { setLayoutSettings } from 'app/redux/actions/LayoutActions'
import { logoutUser } from 'app/redux/actions/UserActions'
import { PropTypes } from 'prop-types'
import { MatxMenu, MatxSearchBox } from 'matx'
import { isMdScreen } from 'utils'
import NotificationBar from '../SharedCompoents/NotificationBar'
import { Link } from 'react-router-dom'
import ShoppingCart from '../SharedCompoents/ShoppingCart'
import './topbar.css'

const IconButtonWhite = withStyles((theme) => ({
  root: {
    // color: theme.palette.getContrastText(purple[500]),
    backgroundColor: 'transparent',
    padding: '5px',
  },
}))(IconButton)

const IconSmall = withStyles(() => ({
  root: {
    fontSize: '1rem',
  },
}))(Icon)

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
})

class Layout1Topbar extends Component {
  state = {}

  updateSidebarMode = (sidebarSettings) => {
    let { settings, setLayoutSettings } = this.props

    setLayoutSettings({
      ...settings,
      layout1Settings: {
        ...settings.layout1Settings,
        leftSidebar: {
          ...settings.layout1Settings.leftSidebar,
          ...sidebarSettings,
        },
      },
    })
  }

  handleSidebarToggle = () => {
    let { settings } = this.props
    let { layout1Settings } = settings

    let mode
    if (isMdScreen()) {
      mode = layout1Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close'
    } else {
      mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full'
    }
    this.updateSidebarMode({ mode })
  }

  handleSignOut = () => {
    this.props.logoutUser()
  }

  render() {
    let { theme, settings, className, style } = this.props
    const topbarTheme = settings.themes[settings.layout1Settings.topbar.theme] || theme
    const username = JSON.parse(localStorage.getItem("auth_user"))

    const date = new Date();
    const hour = date.getHours();
    const greeting = "Good" +" " + (hour >= 12 ? hour >= 16 ?" Evening," : " Afternoon," : "Morning,");


    return (
      <MuiThemeProvider theme={topbarTheme}>
        <div className="topbar">
          <div
            style={Object.assign({}, { backgroundColor: " #0F4E08" }, style)}
          >
            <div className="flex flex-space-between flex-middle h-100">
              <div className="flex">
                <IconButton
                  onClick={this.handleSidebarToggle}
                  className="hide-on-lg"
                >
                  <Icon>menu</Icon>
                </IconButton>
              </div>
              <div className="flex flex-middle">
                <div className="username" style={{ color: "#fff" }}>
                  {`${greeting} ${username?.firstName}`}
                </div>
                <MatxMenu
                  menuButton={
                    <IconButtonWhite
                      aria-label="Delete"
                      className="mx-8 text-middle circular-image-small cursor-pointer"
                      size="small"
                    >
                      <IconSmall>person</IconSmall>
                    </IconButtonWhite>
                    // <img
                    //   className="mx-8 text-middle circular-image-small cursor-pointer"
                    //   src=""
                    //   alt="user"
                    // />
                  }
                >
                  <MenuItem style={{ minWidth: 185}}>
                    <Link className="flex flex-middle" to="/">
                      <Icon> home </Icon>
                      <span className="pl-16 "> Home </span>
                    </Link>
                  </MenuItem>
                  <MenuItem style={{ minWidth: 185 }}>
                    <Link className="flex flex-middle" to="/user-profile">
                      <Icon> person </Icon>
                      <span className="pl-16"> Profile </span>
                    </Link>
                  </MenuItem>
                  <MenuItem
                    className="flex flex-middle"
                    style={{ minWidth: 185 }}
                  >
                    <Icon> settings </Icon>
                    <span className="pl-16"> Settings </span>
                  </MenuItem>
                  <MenuItem
                    onClick={this.handleSignOut}
                    className="flex flex-middle"
                    style={{ minWidth: 185 }}
                  >
                    <Icon> power_settings_new </Icon>
                    <span className="pl-16"> Logout </span>
                  </MenuItem>
                </MatxMenu>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Layout1Topbar.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  settings: state.layout.settings,
})

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(mapStateToProps, { setLayoutSettings, logoutUser })(Layout1Topbar)
  )
)
