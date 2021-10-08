import React, { Component } from "react";
import { Breadcrumb, SimpleCard } from "matx";
import ManagerList from "./ManagerList";
import {
  IconButton,
  Button,
  Icon,
} from "@material-ui/core";
import CreateNew from "./CreateNew"

const fields = [
    "Username",
    "Email",
    "First Name",
    "Last Name"
  ]
class Manager extends Component {
   constructor(props) {
        super(props);
        this.state = {
            isOpen : false
        }
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
 
  render() {
    return (
      <div className="m-sm-30">
        <div  className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Manager", path: "/manager" },
              { name: "Manager" }
            ]}
          />
        </div>
        <SimpleCard title="Managers">
        <IconButton><Button variant="contained" color="primary" onClick={()=>{this.handleOpen()}}>Add Manager<Icon>add</Icon></Button></IconButton>
        <ManagerList/>
         <CreateNew isOpen={this.state.isOpen} handleClose={this.handleClose} name="Create Manager" fields={fields}/> 
        </SimpleCard>
      </div>
    );
  }
}

export default Manager;
