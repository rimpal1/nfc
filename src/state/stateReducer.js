const getLocalToken = () => {
   return JSON.parse(localStorage.getItem("tokenData")) ? true : false;
};

const getRole = (token) => {
   let roleSplit = token.userInfo.role;
   if (roleSplit.includes("customer")) {
      return "customer";
   } else if (roleSplit.includes("vendor")) {
      return "vendor";
   } else if (roleSplit.includes("admin")) {
      return "admin";
   }
};

export const initialState = {
   tokenData: getLocalToken() ? JSON.parse(localStorage.getItem("tokenData")) : null,
   isAuthenticated: getLocalToken(),
   role: getLocalToken() ? getRole(JSON.parse(localStorage.getItem("tokenData"))) : "",
   cart: []
};

export const stateReducer = (state, action) => {
   switch (action.type) {
      case "LOGIN_SUCCESS":
         console.log("&&&&&", action.payload);
         localStorage.setItem("tokenData", JSON.stringify(action.payload));
         return {
            ...state,
            tokenData: action.payload,
            isAuthenticated: true,
            role: getRole(action.payload)
         };
      case "LOGOUT":
         return {
            ...state,
            isAuthenticated: false
         };
      case "CLEAR_CART":
         return {
            ...state,
            cart: []
         };
      case "ADD_TO_CART":
         const req_product = action.payload;
         const alreadyExistInCart = state.cart.find((item) =>
            item.productId === req_product.productId ? true : false
         );
         return {
            ...state,
            cart: alreadyExistInCart
               ? state.cart.map((cartItem) =>
                    cartItem.productId === req_product.productId
                       ? { ...cartItem, quantity: cartItem.quantity + 1 }
                       : cartItem
                 )
               : [...state.cart, { ...req_product, quantity: 1 }]
         };

      default:
         return state;
   }
};
