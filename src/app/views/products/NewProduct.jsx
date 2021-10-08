import React, { useState } from "react";
import { Breadcrumb, SimpleCard } from "matx";
import ProductForm from "./ProductForm";

function NewProduct({ location }) {
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Products", path: "/products" },
            { name: "New Product" },
          ]}
        />
      </div>
      <SimpleCard title="Add New Product">
        <ProductForm isNewProduct={true} />
      </SimpleCard>
    </div>
  );
}

export default NewProduct;
