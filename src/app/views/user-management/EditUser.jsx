import React, { useState } from "react";
import { Breadcrumb, SimpleCard } from "matx";
import UpdateUserForm from "./UpdateUserForm";

function EditUser({ location }) {
  let { id, user } = location.state
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "User", path: "/users" },
            { name: "Edit User" },
          ]}
        />
      </div>
      <SimpleCard title={`Edit User`}>
        <UpdateUserForm id={id} />
      </SimpleCard>
    </div>
  );
}

export default EditUser;
