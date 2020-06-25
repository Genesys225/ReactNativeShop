import { CartActionTypes } from './../../models/cartActionTypes';
import Product from "../../models/product"
import { ADD_TO_CART } from "../../models/cartActionTypes"

export const addToCart = (product: Product): CartActionTypes => ({
  type: ADD_TO_CART, payload: product  
})