import React, { Component } from "react";
import {
  Button,
  withStyles,
  CircularProgress, Container
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import {  withRouter  } from "react-router-dom";
import { resetPassword } from "../../redux/actions/LoginActions";
import afrimash2 from "./assets/svg/afrimash2.0.svg";
import "./Forgotpassword.scss";
import {Link} from "react-router-dom"





class ForgotPassword extends Component {
  state = {
    email: "Enter email here", 
  };
  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleFormSubmit = () => {
    this.props.resetPassword({ ...this.state });
  };

  render() {
    let { email } = this.state;


    


    return (
      <div>
        <div className="logo__container ">
          <img height={200} width={120} src={afrimash2} alt="afrimash-logo" />
        </div>
        <h2 className="main-header">Afrimash Admin</h2>
        <Container maxWidth="sm" className="flex flex-middle contain">
          <div className="container">
            <h3 className="reset"> Reset your Password </h3>
            <p className="reset-text">
              Enter the email address associated with your account and we’ll
              send you a link to reset your password
            </p>
            <h6 className="mail">Email</h6>
            <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
              <TextValidator
                className="mb-20 w-100"
                variant="outlined"
                onChange={this.handleChange}
                type="email"
                name="email"
                placeholder={email}
                validators={["required", "isEmail"]}
                errorMessages={["this field is required", "email is not valid"]}
              />
              <div className="flex flex-middle">
                <Link to="">
                  <Button
                    variant="outlined"
                    disabled
                    className="button"
                    type="submit"
                  >
                    Send Link
                  </Button>
                </Link>
              </div>
            </ValidatorForm>
            ;
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  resetPassword: PropTypes.func.isRequired,
  login: state.login
});
export default withRouter(
  connect(
    mapStateToProps,
    { resetPassword }
  )(ForgotPassword)
);



/*
<ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
  <TextValidator
    className="mb-24 w-100"
    variant="outlined"
    label="Email"
    onChange={this.handleChange}
    type="email"
    name="email"
    value={email}
    validators={["required", "isEmail"]}
    errorMessages={["this field is required", "email is not valid"]}
  />
  <div className="flex flex-middle">
    <Button variant="contained" color="primary" type="submit">
      Reset Password
    </Button>
    <span className="ml-16 mr-8">or</span>
    <Button
      className="capitalize"
      onClick={() => this.props.history.push("/signin")}
    >
      Sign in
    </Button>
  </div>
</ValidatorForm>; */