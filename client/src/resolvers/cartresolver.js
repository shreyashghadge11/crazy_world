export default function (state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      // var cart = mycart;
      return {
        ...state,
        mycart: [...state.mycart, action.payload],
      };
    case "GUEST_TO_CART":
      // var cart = mycart;
      return {
        ...state,
        guestcart: [...state.guestcart, action.payload],
      };
    case "REMOVE_FROM_CART":
      // var newcart =
      // console.log(action.payload);
      return {
        ...state,
        mycart: action.payload.result.filter(
          (item) => item._id !== action.payload.id
        ),
      };
    case "GET_MYCART":
      // console.log(action.payload);
      var cart = [...action.payload];
      // console.log(cart);
      return {
        ...state,
        mycart: cart,
        guestcart: [],
      };
    case "GET_GUEST_CART":
      // console.log(action.payload);
      return {
        ...state,
        guestcart: action.payload,
      };
    case "PLACE_ORDER":
      return {
        ...state,
        mycart: [],
      };
    case "MY_ORDERS":
      return {
        ...state,
        myorders: action.payload,
      };
    case "SET_ERRORS":
      return {
        ...state,
        carterrors: action.payload,
      };
    default:
      return state;
  }
}
