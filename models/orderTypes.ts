import Product from "./product"
import CartItem from "./cartTypes"

export interface AddOrder {
  type: 'ADD_ORDER'
  payload: OrderItem
}
export interface HydrateOrders {
  type: 'HYDRATE_ORDERS'
  payload: OrderItem[]
}

export interface OrdersState {
  orders: OrderItem[]
}

export interface OrderCartItem extends CartItem {
  id: string
}

export type OrdersActionTypes = AddOrder | HydrateOrders

export const ADD_ORDER = 'ADD_ORDER'
export const HYDRATE_ORDERS = 'HYDRATE_ORDERS'

export default interface OrderItem {
  id: string,
  items: OrderCartItem[],
  totalAmount: number,
  date: Date
}

