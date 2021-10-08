import React, { Component } from "react";
import { Breadcrumb, SimpleCard } from "matx";
import MembershipList from "./MembershipList";

class Membership extends Component {
  render() {
    return (
      <div className="m-sm-30">
        <div  className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Membership", path: "/membership" },
              { name: "Membership" }
            ]}
          />
        </div>
        <SimpleCard title="Memberships">
        <MembershipList/>
        </SimpleCard>
      </div>
    );
  }
}

export default Membership;
