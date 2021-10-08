import React, { useState } from "react";
import { Breadcrumb, SimpleCard } from "matx";
import SellerForm from "./SellerForm";

function NewSeller() {
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Seller", path: "/vendor" },
            { name: "New Seller" },
          ]}
        />
      </div>
      <SimpleCard title="Create New Seller">
        <SellerForm isNewSeller={true} />
      </SimpleCard>
    </div>
  );
}

export default NewSeller;
