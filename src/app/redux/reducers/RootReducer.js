import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import UserReducer from './UserReducer';
import LayoutReducer from './LayoutReducer';
import ScrumBoardReducer from './ScrumBoardReducer';
import NotificationReducer from './NotificationReducer';
import EcommerceReducer from './EcommerceReducer';
import {
  agentReducer,
  createAgentReducer,
  agentDetailsReducer,
  agentCustomersReducer,
  agentOrdersReducer,
  agentApplicationReducer,
  agentApprovalReducer,
  deleteAgentReducer,
  transferCustomerReducer
} from './agents-reducer';
import {
  shippingGroupCreateReducer,
  shippingGroupListReducer,
} from './ShippingReducer';
import{
  updateUssdCatFeature,
  getFeaturedUssdCat,
  getFeaturedUssdProducts,
  updateUssdProductFeature
} from './ussdReducer'

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
  createAgent: createAgentReducer,
  agentApplication: agentApplicationReducer,
  agentApproval: agentApprovalReducer,
  deleteAgentReducer,
  transferCustomerReducer,
  updateUssdCatFeature,
  getFeaturedUssdCat,
  getFeaturedUssdProducts,
  updateUssdProductFeature
});

export default RootReducer;
