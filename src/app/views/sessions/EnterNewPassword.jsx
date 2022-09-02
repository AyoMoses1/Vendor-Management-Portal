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
import { withRouter } from "react-router-dom";
import { resetPassword } from "../../redux/actions/LoginActions";
import afrimash2 from "./assets/svg/afrimash2.0.svg";
import "./Forgotpassword.scss";
import {Link} from "react-router-dom"



class EnterNewPassword extends Component {
  state = {
    password: "Enter password here",
  };
  handleChange = (event) => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleFormSubmit = () => {
    this.props.resetPassword({ ...this.state });
  };
  render() {
    let { password } = this.state;

    return (
      <div>
        <div className="logo__container ">
          <img height={200} width={120} src={afrimash2} alt="afrimash-logo" />
        </div>
        <h2 className="main-header">Afrimash Admin</h2>
        <Container maxWidth="sm" className="flex flex-middle contain">
          <div className="container">
            <h3 className="reset"> Reset your Password </h3>
            <p className="reset-word">Enter your new password below.</p>
            <p className="new-password">Enter new password</p>
            <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
              <TextValidator
                className="mb-24 w-100"
                variant="outlined"
                onChange={this.handleChange}
                type="password"
                name="password"
                value={password}
                validators={["required", "isPassword"]}
                errorMessages={["this field is required", "password is not valid"]}
              />
              <p className="new-password">Re-enter new password </p>
              <TextValidator
                className="mb-24 w-100 "
                variant="outlined"
                onChange={this.handleChange}
                type="password"
                name="password"
                value={password}
                validators={["required", "isPassword"]}
                errorMessages={["this field is required", "password is not valid"]}
              />
              <div className="flex flex-middle">
                <Link to="/enter-new-password">
                  <Button
                    variant="outlined"
                    disabled
                    className="button"
                    type="submit"
                  >
                    Reset Password
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

const mapStateToProps = (state) => ({
  resetPassword: PropTypes.func.isRequired,
  login: state.login,
});
export default withRouter(
  connect(mapStateToProps, { resetPassword })(EnterNewPassword)
);

