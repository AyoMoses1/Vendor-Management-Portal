import { MatxLoadable } from "matx";

const Products = MatxLoadable({
  loader: () => import("./ProductsList"),
});
const ProductDetails = MatxLoadable({
  loader: () => import("./ProductDetails"),
});
const NewProduct = MatxLoadable({
  loader: () => import("./NewProduct"),
});
const EditProduct = MatxLoadable({
  loader: () => import("./EditProduct"),
});
const Tag = MatxLoadable({
  loader: () => import("./Tags"),
});

const Brand = MatxLoadable({
  loader: () => import("./Brands"),
});

const Category = MatxLoadable({
  loader: () => import("./CategoriesList"),
});

const NewCategory = MatxLoadable({
  loader: () => import("./CreateCategory"),
});

const Features = MatxLoadable({
  loader: () => import("./Features"),
});

const CatergoryDetails = MatxLoadable({
  loader: () => import("./CategoryDetails"),
});

const CategoryUpdate = MatxLoadable({
  loader: () => import("./CategoryUpdate"),
});

const productRoutes = [
  {
    path: "/products",
    component: Products,
  },
  {
    path: "/product/details",
    component: ProductDetails,
  },
  {
    path: "/product/new",
    component: NewProduct,
  },
  {
    path: "/product/edit",
    component: EditProduct,
  },
  {
    path: "/tags",
    component: Tag,
  },
  {
    path: "/brands",
    component: Brand,
  },
  {
    path: "/product-categories",
    component: Category,
  },
  {
    path: "/product-category/new",
    component: NewCategory,
  },
  {
    path: "/features",
    component: Features,
  },
  {
    path: "/product-category/details",
    component: CatergoryDetails,
  },
  {
    path: "/product-category/update",
    component: CategoryUpdate,
  },
];

export default productRoutes;
