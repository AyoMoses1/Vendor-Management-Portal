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
