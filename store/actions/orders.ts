import { api } from '../../config/http';
import { RootState } from './../configureStore';
import OrderItem, {
  AddOrder,
  OrderCartItem,
  HydrateOrders,
  HYDRATE_ORDERS,
} from './../../models/orderTypes';
import { ADD_ORDER } from '../../models/orderTypes';
import { ThunkAction } from 'redux-thunk';

interface NewOrderResponse extends Response {
  name: string;
}
type IAddOrder = (
  cartItems: OrderCartItem[],
  totalAmount: number
) => ThunkAction<Promise<void>, RootState, {}, AddOrder>;

export const addOrder: IAddOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const newOrder = { items: cartItems, totalAmount, date: new Date() };
    const response = (await api.post(
      'orders.json',
      newOrder
    )) as NewOrderResponse;
    dispatch({
      type: ADD_ORDER,
      payload: { ...newOrder, id: response.name },
    });
  };
};
interface OrdersIndexResponse {
  [id: string]: {
    items: any[];
    totalAmount: number;
    date: Date
  };
}
type IHydrateOrder = () => ThunkAction<
  Promise<void>,
  RootState,
  {},
  HydrateOrders
>;

export const hydrateOrders: IHydrateOrder = () => {
  return async (dispatch) => {
    const response = (await api.get('orders.json')) as OrdersIndexResponse;
    const loadedOrders: OrderItem[] = [];

    for (const key in response) {
      loadedOrders.push({
        id: key,
        items: response[key].items,
        totalAmount: response[key].totalAmount,
        date: new Date(response[key].date),
      });
    }
    dispatch({ type: HYDRATE_ORDERS, payload: loadedOrders })
  };
};
