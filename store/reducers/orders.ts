import
  OrderItem,
  { OrdersState, ADD_ORDER, OrdersActionTypes }
from './../../models/orderTypes';

const initialState: OrdersState = {
  orders: []
}

const ordersReducer = (
  state = initialState,
  { type, payload }: OrdersActionTypes
): OrdersState => {
  switch (type) {

  case ADD_ORDER:
    const newOrder: OrderItem = {
      id: new Date().toString(),
      ...payload,
      date: new Date()
    }
    return { orders: [ ...state.orders, newOrder] }

  default:
    return state
  }
}

export default ordersReducer