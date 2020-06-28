import { AddOrder, OrderCartItem } from './../../models/orderTypes';
import { ADD_ORDER } from "../../models/orderTypes";

type IAddOrder = (cartItems: OrderCartItem[], totalAmount: number) => AddOrder

export const addOrder: IAddOrder = (cartItems, totalAmount) => {
  return { type: ADD_ORDER, payload: {items: cartItems, totalAmount}}
}