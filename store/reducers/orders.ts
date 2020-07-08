import
OrderItem,
{ OrdersState, ADD_ORDER, OrdersActionTypes, HYDRATE_ORDERS }
  from './../../models/orderTypes';

const initialState: OrdersState = {
  orders: []
}

const ordersReducer = (
  state = initialState,
  { type, payload }: OrdersActionTypes
): OrdersState => {
  switch (type) {

    case HYDRATE_ORDERS:
      const newOrder = payload as OrderItem[]
      return { orders: newOrder }

    case ADD_ORDER: {
      const newOrder = payload as OrderItem
      return { orders: [...state.orders, newOrder] }
    }
    default:
      return state
  }
}

export default ordersReducer