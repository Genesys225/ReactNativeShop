import Product from "./product"

export const ADD_TO_CART = 'ADD_TO_CART'

interface AddToCartAction {
  type: string
  payload: Product
}

export type CartActionTypes = AddToCartAction

