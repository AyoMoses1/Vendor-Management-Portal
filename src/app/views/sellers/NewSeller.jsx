import React, { useState } from "react";
import { Breadcrumb, SimpleCard } from "matx";
import SellerForm from "./SellerForm";

function NewSeller() {
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
              { name: 'Vendors', path: '/vendors' },
              { name: 'View Vendor' },
          ]}
      />
      </div>
      <SimpleCard title="">
        <SellerForm isNewSeller={true} />
      </SimpleCard>
    </div>
  );
}

export default NewSeller;
