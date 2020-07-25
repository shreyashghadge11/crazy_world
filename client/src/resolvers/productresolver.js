export default function (state, action) {
  switch (action.type) {
    case "SET_PRODUCT_LIST":
      return {
        ...state,
        allproducts: action.payload,
      };
    case "SET_PRODUCT":
      return {
        ...state,
        product: action.payload,
      };
    case "SET_CAT_PRODUCTS":
      return {
        ...state,
        categoryproducts: action.payload,
      };
    case "SET_ERRORS":
      return {
        ...state,
        producterrors: action.payload,
      };
    default:
      return state;
  }
}
