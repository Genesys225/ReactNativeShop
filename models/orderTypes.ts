import Product from "./product"
import CartItem from "./cartTypes"

export interface AddOrder {
  type: string
  payload: Omit<OrderItem, 'id'|'date'>
}

export interface OrdersState {
  orders: OrderItem[]
}

export interface OrderCartItem extends CartItem {
  id: string
}

export type OrdersActionTypes = AddOrder

export const ADD_ORDER = 'ADD_ORDER'

export default interface OrderItem {
  id: string,
  items: OrderCartItem[],
  totalAmount: number,
  date: Date
}

