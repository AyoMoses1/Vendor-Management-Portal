import React from "react";
import { Breadcrumb, SimpleCard } from "matx";
import CustomerForm from "./CustomerForm";

function NewCustomer() {
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Customer", path: "/customers" },
            { name: "New Customer" },
          ]}
        />
      </div>
      <SimpleCard title="Create New Customer">
        <CustomerForm isNewCustomer={true}/>
      </SimpleCard>
    </div>
  );
}

export default NewCustomer;
