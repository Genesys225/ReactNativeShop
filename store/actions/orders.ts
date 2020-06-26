import { AddOrder } from './../../models/orderTypes';
import CartItem from "../../models/cartTypes";
import { ADD_ORDER } from "../../models/orderTypes";

type IAddOrder = (cartItems: CartItem[], totalAmount: number) => AddOrder

export const addOrder: IAddOrder = (cartItems, totalAmount) => {
  return { type: ADD_ORDER, payload: {items: cartItems, totalAmount}}
}