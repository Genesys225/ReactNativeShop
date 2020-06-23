import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";

export interface ICart {
  items: Product[],
  totalAmount: number
}

const initialState: ICart = {
  items: [],
  totalAmount: 0
};

export default (state = initialState, action) => {
  return state;
}
