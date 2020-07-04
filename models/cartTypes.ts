import Product from "./product"

export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

export interface AddToCartAction {
  type: string
  payload: Product
}

export interface RemoveFromCartAction {
  type: string
  payload: string
}

export interface CartItemList {
  [name: string]: CartItem
}
export interface CartState {
  items: CartItemList,
  totalAmount: number
}

export type CartActionTypes = AddToCartAction | RemoveFromCartAction
export default interface CartItem {
  quantity: number,
  price: number,
  title: string,
  sum: number,
}