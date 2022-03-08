import React from "react";
import { Breadcrumb, SimpleCard } from "matx";
import CustomerForm from "./CustomerForm";

function EditCustomer({location}) {
    let {id, user} = location.state
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Customer", path: "/customers" },
            { name: "Edit Customer" },
          ]}
        />
      </div>
      <SimpleCard title={` Edit ${user.firstName} ${user.lastName}`}>
        <CustomerForm isNewCustomer={false} id={id} Customer={user}/>
      </SimpleCard>
    </div>
  );
}

export default EditCustomer;
