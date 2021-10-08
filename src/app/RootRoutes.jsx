import React from "react";
import { Redirect } from "react-router-dom";

import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import utilitiesRoutes from "./views/utilities/UtilitiesRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";

import orderRoutes from "./views/orders/OrderRoutes";

import productRoutes from "./views/products/ProductRoutes";

import customerRoutes from "./views/customers/CustomerRoutes"

import paymentAndFulfilmentRoutes from "./views/Payment&Fulfilment/PaymentAndFulfilmentRoutes"

import userRoutes from "./views/user-management/UserRoutes"

import materialRoutes from "./views/material-kit/MaterialRoutes";
import dragAndDropRoute from "./views/Drag&Drop/DragAndDropRoute";

import formsRoutes from "./views/forms/FormsRoutes";
import mapRoutes from "./views/map/MapRoutes";

import reviewRoutes from "./views/reviews/ReviewRoutes";

import sellerRoutes from "./views/sellers/SellerRoutes"

const redirectRoute = [
  {
    path: "/dashboard/analytics",
    exact: true,
    component: () => <Redirect to="/dashboard/analytics" />
  }
];

const mainRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/signin" />
  }
];

const errorRoute = [
  {
    component: () => <Redirect to="/404" />
  }
];

const routes = [
  ...sessionRoutes,
  ...dashboardRoutes,
  ...sellerRoutes,
  ...orderRoutes,
  ...productRoutes,
  ...reviewRoutes,
  ...paymentAndFulfilmentRoutes,
  ...userRoutes,
  ...customerRoutes,
  ...materialRoutes,
  ...utilitiesRoutes,
  ...dragAndDropRoute,
  ...formsRoutes,
  ...mapRoutes,
  ...mainRoute,
  ...redirectRoute,
  ...errorRoute
];

export default routes;
