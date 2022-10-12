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
import "./Forgotpassword.css";
import {Link} from "react-router-dom"




function PasswordCreated (){

    return (
      <div>
        <div className="logo__container ">
          <img height={200} width={120} src={afrimash2} alt="afrimash-logo" />
        </div>
        <h2 className="main-header">Afrimash Admin</h2>
        <Container maxWidth="sm" className="flex flex-middle contain">
          <div className="count">
            <h3 className="reset "> Password Created </h3>
            <p className="reset-word">Your password has been reset and you will be redirected to the log in page.</p>
            <p className="word">Follow this <Link className="text-link" to="/SignIn" >Link </Link> to be redirected manually.</p>
            
          </div>
        </Container>
      </div>
    );
  
}

const mapStateToProps = (state) => ({
  resetPassword: PropTypes.func.isRequired,
  login: state.login,
});
export default withRouter(
  connect(mapStateToProps, { resetPassword })(PasswordCreated)
);

