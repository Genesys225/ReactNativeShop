import { 
  CartActionTypes, 
  REMOVE_FROM_CART, 
  ADD_TO_CART 
} from '../../models/cartTypes';
import Product from "../../models/product"


export const addToCart = (product: Product): CartActionTypes => ({
  type: ADD_TO_CART, payload: product  
})


export const removeFromCart = (productId: string): CartActionTypes => ({
  type: REMOVE_FROM_CART, payload: productId  
})