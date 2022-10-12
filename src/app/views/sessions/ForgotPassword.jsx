import React, { Component } from "react";
import {
  Button,
  withStyles,
  CircularProgress,
  Container,
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { resetPassword } from "../../redux/actions/LoginActions";
import afrimash2 from "./assets/svg/afrimash2.0.svg";
import "./Forgotpassword.css";
import service from "./reset";



class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
    };
  }


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFormSubmit = async () => {
    //this.props.resetPassword({ ...this.state })
    console.log('HERE')
    try{
      await service.resetUserPassword({ email: this.state.email });
      alert("Check your email for reset link")
    }catch(e){
      console.log(e)
    }
  };

  render() {
    let { email } = this.state;
    console.log({email})
    
    return (
      <div>
        <div className="logo__container ">
          <img height={200} width={120} src={afrimash2} alt="afrimash-logo" />
        </div>
        <h2 className="main-header">Afrimash Admin</h2>
        <Container maxWidth="sm" className="flex flex-middle contain">
          <div className="box">
            <h3 className="reset"> Reset your Password </h3>
            <p className="reset-text">
              Enter the email address associated with your account and we’ll
              send you a link to reset your password
            </p>
            <h6 className="mail">Email</h6>
            <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
              <TextValidator
                value={email}
                className="mb-20 w-100"
                variant="outlined"
                onChange={this.handleChange}
                type="email"
                name="email"
                placeholder='Enter your email'
                validators={["required", "isEmail"]}
                errorMessages={["this field is required", "email is not valid"]}
              />
              <div className="flex flex-middle">
                <Button
                  variant="outlined"
                  className="button"
                  type="submit"
                 
                >
                  Send Link
                </Button>
              </div>
            </ValidatorForm>
            ;
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resetPassword: PropTypes.func.isRequired,
  login: state.login,
});
export default (
  connect(mapStateToProps, { resetPassword })(ForgotPassword)
);
