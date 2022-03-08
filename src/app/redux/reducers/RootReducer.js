import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import ScrumBoardReducer from "./ScrumBoardReducer";
import NotificationReducer from "./NotificationReducer";
import EcommerceReducer from "./EcommerceReducer";
import { agentReducer, createAgentReducer, agentDetailsReducer, agentCustomersReducer, agentOrdersReducer } from "./agents-reducer";
import { shippingGroupCreateReducer, shippingGroupListReducer } from "./ShippingReducer";

const RootReducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  shipping: shippingGroupCreateReducer,
  shippingOptionGroupList: shippingGroupListReducer,
  layout: LayoutReducer,
  scrumboard: ScrumBoardReducer,
  notification: NotificationReducer,
  ecommerce: EcommerceReducer,
  agents: agentReducer,
  agentDetails: agentDetailsReducer,
  agentCustomers: agentCustomersReducer,
  agentOrder: agentOrdersReducer,
  createAgent: createAgentReducer
});

export default RootReducer;
