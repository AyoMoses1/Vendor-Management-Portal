import {MatxLoadable} from "matx";

const Customers = MatxLoadable({
  loader: () => import("./CustomerList")
})
const NewCustomer = MatxLoadable({
  loader: () => import("./NewCustomer")
});

const CustomerDetails = MatxLoadable({
  loader: () =>  import("./CustomerInfo")
})

const EditCustomer = MatxLoadable({
  loader: () =>  import("./EditCustomer")
})

const customerRoutes = [
  {
    path: "/customers",
    component: Customers
  },
  {
    path: "/customer/new",
    component: NewCustomer
  },
  {
    path: "/customer/details",
    component: CustomerDetails
  },
  {
    path: "/customer/edit",
    component: EditCustomer
  }
];

export default customerRoutes;
