import { http } from './../http';
import { RootState } from './../configureStore';
import { AddOrder, OrderCartItem } from './../../models/orderTypes';
import { ADD_ORDER } from '../../models/orderTypes';
import { ThunkAction } from 'redux-thunk';

type IAddOrder = (
  cartItems: OrderCartItem[],
  totalAmount: number
) => ThunkAction<Promise<void>, RootState, {}, AddOrder>;

export const addOrder: IAddOrder = (cartItems, totalAmount) => {
  return async dispatch => {
    const newOrder = { items: cartItems, totalAmount }
    await http.post('orders.json', newOrder)
    dispatch({ type: ADD_ORDER, payload: newOrder })
  };
};
