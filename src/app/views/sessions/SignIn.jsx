import React, { Component } from "react";
import { withStyles, CircularProgress, Container } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import Notification from "app/components/Notification";
import InputLabel from "@mui/material/InputLabel";
import "./style.scss";
import afrimash2 from "./assets/svg/afrimash2.0.svg";
import { loginWithEmailAndPassword } from "../../redux/actions/LoginActions";
import history from "history.js";

const styles = (theme) => ({
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
});

class SignIn extends Component {
  state = {
    username: "",
    password: "",
  };
  handleChange = (event) => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  componentDidMount() {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      history.push("/dashboard/analytics");
    } else {
      history.push("/signin");
    }
  }
  handleFormSubmit = (event) => {
    this.props.loginWithEmailAndPassword({ ...this.state });
  };
  render() {
    let { username, password } = this.state;
    let { classes } = this.props;
    return (
      <div>
        <Container className="flex flex-middle contains">
          <div className="flex flex-middle flex-space-between brand-area">
            <div className="flex flex-middle brand">
              <img src="/assets/images/Afrimash.svg" alt="company-logo" />
              <span className="brand__text">Afrimash</span>
            </div>
            {this.props.children}
          </div>
          
          <p className="main__header">Sign in to your workspace.</p>
          <p className="sub__header">Welcome back </p>
          <p className="sub__header">Enter your details below to continue</p>
          {this.props.login.error.errorCode && (
            <Notification
              alert={"Invalid email or password."}
              severity="error"
            />
          )}
          <div className="container">
            <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
              <InputLabel htmlFor="email" className="title">
                Email
              </InputLabel>
              <TextValidator
                className="mt-20 mb-24 w-100 input"
                variant="outlined"
                onChange={this.handleChange}
                type="email"
                name="username"
                placeholder="E.g Taiwo4real"
                value={username}
                disabled={this.props.login.loading}
                validators={["required", "isEmail"]}
                errorMessages={["this field is required", "User is not valid"]}
              />

              <InputLabel htmlFor="password" className="title">
                Password
              </InputLabel>
              <TextValidator
                className="mb-16 w-100 input"
                variant="outlined"
                onChange={this.handleChange}
                name="password"
                placeholder="*******"
                disabled={this.props.login.loading}
                type="password"
                value={password}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <div className="wrapper__buttons w-100">
                <button
                  className="button__signin"
                  disabled={this.props.login.loading}
                  type="submit"
                >
                  Continue to Workspace
                  {this.props.login.loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </button>
                <button
                  className="outlined__button mt-10"
                  onClick={() => this.props.history.push("/forgot-password")}
                >
                  Forgot password ?
                </button>
              </div>
            </ValidatorForm>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginWithEmailAndPassword: PropTypes.func.isRequired,
  login: state.login,
});
export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapStateToProps, { loginWithEmailAndPassword })(SignIn))
);
