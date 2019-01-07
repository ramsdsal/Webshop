let sc = JSON.parse(localStorage.getItem("cart") || "[]");
const initialState = { counter: sc.length };

export function cart(state = initialState, action) {
  switch (action.type) {
    case "CART_COUNTER_UPDATE":
      sc = JSON.parse(localStorage.getItem("cart") || "[]");
      return {
        counter: sc.length
      };

    default:
      return state;
  }
}
