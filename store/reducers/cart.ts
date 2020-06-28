import { DELETE_PRODUCT } from './../../models/product';
import CartItem, {
  CartActionTypes,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CartState,
  CartItemList
} from '../../models/cartTypes';
import Product from '../../models/product';
import { ADD_ORDER } from '../../models/orderTypes';

const initialState: CartState = {
  items: {},
  totalAmount: 0
};

const cartReducer = (
  state = initialState,
  action: CartActionTypes
): CartState => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { items, totalAmount } = state
      const { price, title, id } = action.payload as Product;
      let newOrUpdatedCartItem: CartItem
      if (items[id]) {
        newOrUpdatedCartItem = {
          quantity: items[id].quantity + 1,
          price,
          title,
          sum: items[id].sum + price,
        }
      } else {
        newOrUpdatedCartItem = {
          quantity: 1,
          price,
          title,
          sum: price,
        }
      }
      return {
        items: {
          ...items,
          [id]: newOrUpdatedCartItem
        },
        totalAmount: totalAmount + price
      }
    }
    case REMOVE_FROM_CART: {
      let updatedCartItems: CartItemList
      const productId = action.payload as string
      const currentItemQty = state.items[productId].quantity;
      const price = state.items[productId].price;
      if (currentItemQty > 1) {
        const currentSum = state.items[productId].sum;
        const updatedCartItem: CartItem = {
          ...state.items[productId],
          quantity: currentItemQty - 1,
          sum: currentSum - price
        }
        updatedCartItems = {
          ...state.items,
          [productId]: updatedCartItem
        }
      } else {
        updatedCartItems = { ...state.items }
        delete updatedCartItems[productId]
      }
      return {
        items: updatedCartItems,
        totalAmount: state.totalAmount - price
      }
    }
    case ADD_ORDER:
      return initialState
    case DELETE_PRODUCT:
      const productId = action.payload as string
      if (!state.items[productId]) {
        return state
      }
      const updatedItems = { ...state.items }
      const itemTotal = updatedItems[productId].sum
      delete updatedItems[productId]
      return {
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal
      }


    default:
      return state;
  }
}

export default cartReducer