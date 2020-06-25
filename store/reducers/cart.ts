import { CartActionTypes, ADD_TO_CART } from './../../models/cartActionTypes';
import CartItem from '../../models/cart-item';

export interface CartState {
  items: {
    [name: string]: CartItem
  },
  totalAmount: number
}

const initialState: CartState = {
  items: {},
  totalAmount: 0
};

const cartReducer = (state = initialState, action: CartActionTypes) => {
  switch (action.type) {
    case ADD_TO_CART:
      const {items, totalAmount} = state
      const {price, title, id} = action.payload;
      let newOrUpdatedCartItem: CartItem
      if (items[id]){
        newOrUpdatedCartItem = {
          quantity: items[id].quantity + 1,
          price,
          title,
          sum: items[id].sum + price
        }
      } else {
        newOrUpdatedCartItem = {
          quantity: 1,
          price,
          title,
          sum: price
        }
      }
      return {
        items: {
          ...items,
          [id]: newOrUpdatedCartItem
        },
        totalAmount: totalAmount + price
      }
  
    default:
      return state;
  }
}

export default cartReducer