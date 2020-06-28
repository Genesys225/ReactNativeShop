import { DELETE_PRODUCT, DeleteProduct } from './../../models/product';
import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";

export interface ProductState {
  availableProducts: Product[],
  userProducts: Product[]
}

const initialState: ProductState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
};

export default (state = initialState, action: DeleteProduct): ProductState => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        userProducts: state.userProducts.filter( 
          product => product.id !== action.payload
        ),
        availableProducts: state.availableProducts.filter( 
          product => product.id !== action.payload
        )
      }

    default:
      return state;
  }
}
