import CartItem from "./cartTypes"

export interface AddOrder {
  type: string
  payload: Omit<OrderItem, 'id'|'date'>
}

export interface OrdersState {
  orders: OrderItem[]
}

export type OrdersActionTypes = AddOrder

export const ADD_ORDER = 'ADD_ORDER'

export default interface OrderItem {
  id: string,
  items: CartItem[],
  totalAmount: number,
  date: Date
}

