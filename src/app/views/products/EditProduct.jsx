import React, { useState } from "react";
import { Breadcrumb, SimpleCard } from "matx";
import ProductForm from "./ProductForm";

function EditProduct({location}) {
    let {id, product} = location.state
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Product", path: "/products" },
            { name: "Edit Product" },
          ]}
        />
      </div>
      <SimpleCard title={`Edit ${product.name}`}>
        <ProductForm isNewProduct={false} id={id} Product={product}/>
      </SimpleCard>
    </div>
  );
}

export default EditProduct;
