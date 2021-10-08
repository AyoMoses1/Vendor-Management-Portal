import {MatxLoadable} from "matx";

const ProductReview = MatxLoadable({
  loader: () => import("./ProductReview")
});

const StoreReview = MatxLoadable({
  loader: () => import("./StoreReview")
});


const paymentAndFulfilmentRoutes = [
  {
    path: "/product-reviews",
    component: ProductReview
  },
  {
    path: "/store-reviews",
    component: StoreReview
  },
  
  
];

export default paymentAndFulfilmentRoutes;
