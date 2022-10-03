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
import "./Forgotpassword.scss";
import service from "./reset";
import queryString from 'query-string'


class EnterNewPassword extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      repeatPassword: "",
      otp: "",
    };

  }

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule('isPasswordMatch');
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleFormSubmit = async () => {
    try {
      if (this.state.password !== this.state.repeatPassword) { throw new Error('invalid password') }
      await service.userChangePassword({ data: { password: this.state.password }, otp: this.state.otp });
      this.props.history.push("/password-created")
    } catch (e) {
      alert("error")
    }
  };

  render() {
    const { password } = this.state;
    const { repeatPassword } = this.state;
    const params = queryString.parse(this.props.location.search);
    this.state.otp = params?.otp;

    return (
      <div>
        <div className="logo__container ">
          <img height={200} width={120} src={afrimash2} alt="afrimash-logo" />
        </div>
        <h2 className="main-header">Afrimash Admin</h2>
        <Container maxWidth="sm" className="flex flex-middle contain">
          <div className="box">
            <h3 className="reset"> Reset your Password </h3>
            <p className="reword">Enter your new password below.</p>
            <h6 className="new-password">Enter new password</h6>

            <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
              <TextValidator
                className="mb-24 w-100 input"
                variant="outlined"
                onChange={this.handleChange}
                type="password"
                name="password"
                placeholder="********"
                size="small"
                value={password}
                validators={["required"]}
                errorMessages={["this field is required", "password is not valid"]}
              />
              <p className="new-password">Re-enter new password </p>
              <TextValidator
                className="mb-24 w-100"
                variant="outlined"
                onChange={this.handleChange}
                type="password"
                name="repeatPassword"
                placeholder="********"
                size="small"
                value={repeatPassword}
                validators={["required", "isPasswordMatch"]}
                errorMessages={["this field is required", "password mismatch",]}
              />

              <p className="new-password">One Time Password (OTP) </p>
              <TextValidator
                className="mb-24 w-100"
                variant="outlined"
                onChange={this.handleChange}
                type="password"
                name="number"
                size="small"
                value="params"
                validators={["required"]}
              />

              <div className="flex flex-middle">
                <Button
                  variant="outlined"
                  className="button"
                  type="submit"
                >
                  Reset Password
                </Button>
              </div>
            </ValidatorForm>
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
  connect(mapStateToProps, { resetPassword })(EnterNewPassword)
);

