import React, { useState } from "react";
import { Breadcrumb, SimpleCard } from "matx";
import CategoryForm from "./CategoryForm";

function EditCategory({location}) {
    let {id, category} = location.state
  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Product Categories", path: "/product-categories" },
            { name: "Edit Product Category" },
          ]}
        />
      </div>
      <SimpleCard title={`Edit ${category.name}`}>
        <CategoryForm isNewCategory={false} id={id} Category={category}/>
      </SimpleCard>
    </div>
  );
}

export default EditCategory;
