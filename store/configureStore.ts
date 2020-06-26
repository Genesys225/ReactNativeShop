import productsReducer from './reducers/products';
import { createStore,  combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import cartReducer from './reducers/cart';
import ordersReducer from './reducers/orders';

export type RootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
});

export default function configureStore() {
  const store = createStore(rootReducer, composeWithDevTools())
  return store;
}