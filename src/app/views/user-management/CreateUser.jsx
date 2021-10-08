import React, { useState } from "react";
import { Breadcrumb, SimpleCard } from "matx";
import UserForm from "./UserForm";

function NewUser() {
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "User", path: "/users" },
            { name: "New User" },
          ]}
        />
      </div>
      <SimpleCard title="Create New User">
        <UserForm isNewUser={true} />
      </SimpleCard>
    </div>
  );
}

export default NewUser;
