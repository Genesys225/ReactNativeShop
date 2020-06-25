import productsReducer from './reducers/products';
import { createStore,  combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import cartReducer from './reducers/cart';

export type RootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
});

export default function configureStore() {
  const store = createStore(rootReducer, composeWithDevTools())
  return store;
}