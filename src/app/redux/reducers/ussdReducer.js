import {
  USSD_FEATURE_PRODUCT,
  USSD_FEATURE_PRODUCT_CAT_FAILED,
  USSD_FEATURE_PRODUCT_CAT_SUCCESS,
  USSD_FEATURE_PRODUCT_CAT,
  USSD_PRODUCT_FAILED,
  USSD_PRODUCT_CATEGORIES,
  USSD_PRODUCT_SUCCESS,
  USSD_PRODUCT_CATEGORIES_SUCCESS,
  USSD_PRODUCT_CATEGORIES_FAILED,
  USSD_PRODUCT,
  USSD_FEATURE_PRODUCT_SUCCESS,
  USSD_FEATURE_PRODUCT_FAILED,
  USSD_PICKUP_CENTERS,
  USSD_PICKUP_CENTERS_SUCCESS,
  USSD_PICKUP_CENTERS_FAILED,
  SHIPPING_STATES,
  SHIPPING_STATES_SUCCESS,
  SHIPPING_STATES_FAILED,
  SPECIAL_ORDERS,
  SPECIAL_ORDERS_SUCCESS,
  SPECIAL_ORDERS_FAILED,
} from '../actions/ussd-action';

export const updateUssdCatFeature = (state = { loading: false }, action) => {
  switch (action.type) {
    case USSD_FEATURE_PRODUCT_CAT:
      return {
        ...state,
        loading: true,
      };
    case USSD_FEATURE_PRODUCT_CAT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case USSD_FEATURE_PRODUCT_CAT_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const getFeaturedUssdCat = (
  state = { loading: false, productCategories: [], error: '' },
  action,
) => {
  switch (action.type) {
    case USSD_PRODUCT_CATEGORIES:
      return {
        ...state,
        loading: true,
      };
    case USSD_PRODUCT_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        productCategories: action.payload,
      };
    case USSD_PRODUCT_CATEGORIES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.toString(),
      };
    default:
      return state;
  }
};


export const getFeaturedUssdProducts = (
  state = { loading: false, products: [], error: '' },
  action,
) => {
  switch (action.type) {
    case USSD_PRODUCT:
      return {
        ...state,
        loading: true,
      };
    case USSD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case USSD_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.toString(),
      };
    default:
      return state;
  }
};

export const updateUssdProductFeature = (state = { loading: false }, action) => {
  switch (action.type) {
    case USSD_FEATURE_PRODUCT:
      return {
        ...state,
        loading: true,
      };
    case USSD_FEATURE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case USSD_FEATURE_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const getPickupCenters = (
  state = { loading: false, pickupCenters: [], error: '' },
  action,
) => {
  switch (action.type) {
    case USSD_PICKUP_CENTERS:
      return {
        ...state,
        loading: true,
      };
    case USSD_PICKUP_CENTERS_SUCCESS:
      return {
        ...state,
        loading: false,
        pickupCenters: action.payload,
      };
    case USSD_PICKUP_CENTERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.toString(),
      };
    default:
      return state;
  }
};

export const getShippingStates = (
  state = { loading: false, shippingStates: [], error: '' },
  action,
) => {
  switch (action.type) {
    case SHIPPING_STATES:
      return {
        ...state,
        loading: true,
      };
    case SHIPPING_STATES_SUCCESS:
      return {
        ...state,
        loading: false,
        shippingStates: action.payload,
      };
    case SHIPPING_STATES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.toString(),
      };
    default:
      return state;
  }
};

export const getSpecialOrders = (
  state = { loading: false, specialOrders: [], error: '' },
  action,
) => {
  switch (action.type) {
    case SPECIAL_ORDERS:
      return {
        ...state,
        loading: true,
      };
    case SPECIAL_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        specialOrders: action.payload,
      };
    case SPECIAL_ORDERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.toString(),
      };
    default:
      return state;
  }
};
