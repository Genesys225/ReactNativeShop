import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";

export interface IProducts {
  availableProducts: Product[],
  userProducts: Product[]
}

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
};

export default (state = initialState, action) => {
  return state;
}
