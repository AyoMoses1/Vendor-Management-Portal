import {MatxLoadable} from "matx";

const Withdrawal = MatxLoadable({
  loader: () => import("./Withdrawal")
});

const Coupons = MatxLoadable({
  loader: () => import("./Coupons")
});

const Refunds = MatxLoadable({
    loader: () => import("./Refunds")
})

const NewCoupon =MatxLoadable({
    loader: () => import("./NewCoupons")
})

const EditCoupon = MatxLoadable({
  loader: ()=> import("./EditCoupon")
})

const paymentAndFulfilmentRoutes = [
  {
    path: "/withdrawal",
    component: Withdrawal
  },
  {
    path: "/coupons",
    component: Coupons
  },
  {
      path: "/refund_requests",
      component: Refunds
  },
  {
      path: "/coupon/new",
      component: NewCoupon
  },
  {
      path: '/coupon/edit',
      component: EditCoupon
  }
  
];

export default paymentAndFulfilmentRoutes;
