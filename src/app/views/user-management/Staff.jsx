import React, { Component } from "react";
import { Breadcrumb, SimpleCard } from "matx";
import StaffList from "./StaffList";
import http from "../../services/api";
import {
  IconButton,
  Icon,
  Button
} from "@material-ui/core";
import CreateNew from "./CreateNew";

const fields = [
  "username",
  "email",
]

class Staff extends Component {
   constructor(props) {
        super(props);
        this.state = {
            staff : [],
            isOpen: false,
            vendor: {
              username: "",
              firstName: "",
              lastName: "",
              password: "password",
              phoneNo: "",

            }

        }

       this.getStaff()
       
    }
    handleOpen = () => {
    this.setState({
      isOpen: true
    })
  }

  handleClose = () => {
    this.setState({
      isOpen: false
    })
  }
    getStaff = () =>{
      http
      .get(`/afrimash/users/search`)
      .then((response) => {
        console.log(response.data.object)
        this.setState({
          staff: response.data.object.content,
        })
      })
      .catch((err) => alert(err.response.data))
    }

    submit = (state) => {
       http
      .post(`/afrimash/users/`, state)
      .then((response) => {
        console.log(response.data.object)
        this.props.history.push("/staff")
      })
      .catch((err) => alert(err.response.data))
    }
  render() {
    return (
      <div className="m-sm-30">
        <div  className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Staff", path: "/staff" },
              { name: "Staff" }
            ]}
          />
        </div>
        <SimpleCard title="Staff">
        <IconButton><Button variant="contained" color="primary" onClick={()=>{this.handleOpen()}}><Icon>add</Icon>Add New</Button></IconButton>
        <StaffList staff={this.state.staff}/>
        <CreateNew states={this.state.vendor} onSubmit={this.submit} isOpen={this.state.isOpen} handleClose={this.handleClose} name="Create Staff" fields={fields}/> 
        </SimpleCard>
      </div>
    );
  }
}

export default Staff;
