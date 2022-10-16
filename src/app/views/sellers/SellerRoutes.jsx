import { MatxLoadable } from "matx";

const Sellers = MatxLoadable({
  loader: () => import("./SellerList"),
});

const CreateSeller = MatxLoadable({
  loader: () => import("./NewSeller"),
});

const EditSeller = MatxLoadable({
  loader: () => import("./EditSeller"),
});

const SellerViewer = MatxLoadable({
  loader: () => import("./SellerViewer"),
});

const SellerStore = MatxLoadable({
  loader: () =>  import("./shops/SellerStore")
})
const sellerRoutes = [
  {
    path: "/vendors",
    component: Sellers,
  },
  {
    path: "/vendor/new",
    component: CreateSeller,
  },
  {
    path: "/vendor/edit",
    component: EditSeller,
  },
  {
    path: "/vendor/details",
    component: SellerViewer,
  },
  {
    path: "/vendor/store",
    component: SellerStore,
  }
];

export default sellerRoutes;
