import http from '../../services/api';
import routes from '../routes';
import getURLParams from '../../../utils/getURLParams';

export const USSD_PRODUCT_CATEGORIES = 'USSD_PRODUCT_CATEGORIES';
export const USSD_PRODUCT_CATEGORIES_SUCCESS =
  'USSD_PRODUCT_CATEGORIES_SUCCESS';
export const USSD_PRODUCT_CATEGORIES_FAILED = 'USSD_PRODUCT_CATEGORIES_FAILED';

export const USSD_PRODUCT = 'USSD_PRODUCT';
export const USSD_PRODUCT_SUCCESS = 'USSD_PRODUCT_SUCCESS';
export const USSD_PRODUCT_FAILED = 'USSD_PRODUCT_FAILED';

export const USSD_FEATURE_PRODUCT_CAT = 'USSD_FEATURE_PRODUCT_CAT';
export const USSD_FEATURE_PRODUCT_CAT_SUCCESS =
  'USSD_FEATURE_PRODUCT_CAT_SUCCESS';
export const USSD_FEATURE_PRODUCT_CAT_FAILED =
  'USSD_FEATURE_PRODUCT_CAT_FAILED';

export const USSD_FEATURE_PRODUCT = 'USSD_FEATURE_PRODUCT';
export const USSD_FEATURE_PRODUCT_SUCCESS = 'USSD_FEATURE_PRODUCT_SUCCESS';
export const USSD_FEATURE_PRODUCT_FAILED = 'USSD_FEATURE_PRODUCT_FAILED';

export const USSD_PICKUP_CENTERS = 'USSD_PICKUP_CENTERS';
export const USSD_PICKUP_CENTERS_SUCCESS = 'USSD_PICKUP_CENTERS_SUCCESS';
export const USSD_PICKUP_CENTERS_FAILED = 'USSD_PICKUP_CENTERS_FAILED';

export const SHIPPING_STATES = 'SHIPPING_STATES';
export const SHIPPING_STATES_SUCCESS = 'SHIPPING_STATES_SUCCESS';
export const SHIPPING_STATES_FAILED = 'SHIPPING_STATES_FAILED';

export const SPECIAL_ORDERS = 'SPECIAL_ORDERS';
export const SPECIAL_ORDERS_SUCCESS = 'SPECIAL_ORDERS_SUCCESS';
export const SPECIAL_ORDERS_FAILED = 'SPECIAL_ORDERS_FAILED';

export const getProductCategories = (payload) => (dispatch) => {
  dispatch({ type: USSD_PRODUCT_CATEGORIES });
  const params = getURLParams(payload.params);
  http
    .get(`${routes.ussdProductCategories}/${params}`)
    .then(({ data }) => {
      dispatch({
        type: USSD_PRODUCT_CATEGORIES_SUCCESS,
        payload: data.object,
      });
    })
    .catch((err) => {
      dispatch({ type: USSD_PRODUCT_CATEGORIES_FAILED, payload: err });
    });
};

export const updateCategoryFeature = (payload) => async (dispatch) => {
  try {
    dispatch({ type: USSD_FEATURE_PRODUCT_CAT });

    await http.patch(`${routes.featureProductCategoriesUssd}`, payload.data);

    dispatch({
      type: USSD_FEATURE_PRODUCT_CAT_SUCCESS,
    });
  } catch (err) {
    dispatch({ type: USSD_FEATURE_PRODUCT_CAT_FAILED, payload: err });
  }
};

export const getProducts = (payload) => (dispatch) => {
  dispatch({ type: USSD_PRODUCT });
  const params = getURLParams(payload.params);
  http
    .get(`${routes.ussdProducts(payload.catId)}`)
    .then(({ data }) => {
      dispatch({
        type: USSD_PRODUCT_SUCCESS,
        payload: data.object,
      });
    })
    .catch((err) => {
      dispatch({ type: USSD_PRODUCT_FAILED, payload: err });
    });
};

export const updateProductFeature = (payload) => async (dispatch) => {
  try {
    dispatch({ type: USSD_FEATURE_PRODUCT });

    await http.patch(`${routes.featureProductUssd}`, payload.data);

    dispatch({
      type: USSD_FEATURE_PRODUCT_SUCCESS,
    });
  } catch (err) {
    dispatch({ type: USSD_FEATURE_PRODUCT_FAILED, payload: err });
  }
};

export const getPickupCenters = (payload) => (dispatch) => {
  dispatch({ type: USSD_PICKUP_CENTERS });
  const params = getURLParams(payload.params);
  http
    .get(`${routes.ussdPickupCenters}/${params}`)
    .then(({ data }) => {
      dispatch({
        type: USSD_PICKUP_CENTERS_SUCCESS,
        payload: data.object,
      });
    })
    .catch((err) => {
      dispatch({ type: USSD_PICKUP_CENTERS_FAILED, payload: err });
    });
};

export const getFilteredPickupCenters = (payload) => (dispatch) => {
  dispatch({ type: USSD_PICKUP_CENTERS });
  const params = getURLParams(payload.params);
  http
    .get(`${routes.ussdPickupCenters}/search${params}`)
    .then(({ data }) => {
      dispatch({
        type: USSD_PICKUP_CENTERS_SUCCESS,
        payload: data.object.content,
      });
    })
    .catch((err) => {
      dispatch({ type: USSD_PICKUP_CENTERS_FAILED, payload: err });
    });
};

export const getShippingStates = () => (dispatch) => {
  dispatch({ type: SHIPPING_STATES });
  http
    .get(`${routes.shippingState}`)
    .then(({ data }) => {
      dispatch({
        type: SHIPPING_STATES_SUCCESS,
        payload: data.object,
      });
    })
    .catch((err) => {
      dispatch({ type: SHIPPING_STATES_FAILED, payload: err });
    });
};

export const getSpecialOrders = (payload) => (dispatch) => {
  dispatch({ type: SPECIAL_ORDERS });
  const params = getURLParams(payload.params);
  http
    .get(`${routes.specialOrders}/${params}`)
    .then(({ data }) => {
      dispatch({
        type: SPECIAL_ORDERS_SUCCESS,
        payload: data.object.content,
      });
    })
    .catch((err) => {
      dispatch({ type: SPECIAL_ORDERS_FAILED, payload: err });
    });
};
