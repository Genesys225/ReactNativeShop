import { DeleteProduct } from './../../models/product';
import { DELETE_PRODUCT } from "../../models/product"

export const deleteProduct = (productId: string): DeleteProduct => {
  return { type: DELETE_PRODUCT, payload: productId }
}