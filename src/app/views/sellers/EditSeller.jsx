import React, { useState } from "react";
import { Breadcrumb, SimpleCard } from "matx";
import SellerForm from "./SellerForm";

function EditSeller({location}) {
    let {id, user} = location.state
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Seller", path: "/vendors" },
            { name: "Edit Seller" },
          ]}
        />
      </div>
      <SimpleCard title={`Edit ${user.name}`}>
        <SellerForm isNewSeller={false} id={id} Seller={user}/>
      </SimpleCard>
    </div>
  );
}

export default EditSeller;
