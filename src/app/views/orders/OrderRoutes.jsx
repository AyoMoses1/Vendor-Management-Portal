import {MatxLoadable} from "matx";

const Orders = MatxLoadable({
  loader: () => import("./Orders")
});
const OrderDetails = MatxLoadable({
  loader: () => import("./OrderDetails")
});
const NewOrder = MatxLoadable({
  loader: () => import("./NewOrder")
})
const AbadonedOrders = MatxLoadable({
  loader: () => import("./AbadonedOrder")
})

const orderRoutes = [
  {
    path: "/orders",
    component: Orders
  },
  {
    path: "/order/details",
    component: OrderDetails
  }, 
  {
    path: "/order/new",
    component: NewOrder,
  },
  {
    path: "/abadoned-orders",
    component: AbadonedOrders
  },
  {
    path: "/abadoned-order/details",
    component: OrderDetails
  }, 
];

export default orderRoutes;
