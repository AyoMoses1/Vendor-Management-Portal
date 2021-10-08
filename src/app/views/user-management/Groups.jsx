import React, { Component } from "react";
import { Breadcrumb, SimpleCard } from "matx";
import GroupList from "./GroupList";
import {
  IconButton,
  Icon,
  Button
} from "@material-ui/core"

class Groups extends Component {
  render() {
    return (
      <div className="m-sm-30">
        <div  className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Groups", path: "/groups" },
              { name: "Groups" }
            ]}
          />
        </div>
        <SimpleCard title="Groups">
         <IconButton><Button variant="contained" color="primary" onClick={()=>{this.toggleModal()}}><Icon>add</Icon>Add New</Button></IconButton>
        <GroupList/>
        </SimpleCard>
      </div>
    );
  }
}

export default Groups;
