import React, { useState } from "react";
import { Breadcrumb, SimpleCard } from "matx";
import CategoryForm from "./CategoryForm";

function NewCategory() {
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Product Categories", path: "/product-categories" },
            { name: "New Product Category" },
          ]}
        />
      </div>
      <SimpleCard title="New Product Category">
        <CategoryForm isNewCategory={true} />
      </SimpleCard>
    </div>
  );
}

export default NewCategory;
