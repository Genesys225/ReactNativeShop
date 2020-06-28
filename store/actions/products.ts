import
Product,
{
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
}
  from './../../models/product';

export const deleteProduct = (productId: string): DeleteProduct => {
  return { type: DELETE_PRODUCT, payload: productId }
}

type IUpdateProduct = (
  id: string,
  title: string,
  imageUrl: string,
  description: string
) => UpdateProduct

export const updateProduct: IUpdateProduct = (
  id,
  title,
  imageUrl,
  description
) => {
  return {
    type: UPDATE_PRODUCT, payload: {
      id,
      title,
      imageUrl,
      description
    }
  }
}

type ICreateProduct = (
  title: string,
  description: string,
  imageUrl: string,
  price: number
) => CreateProduct

export const createProduct: ICreateProduct = (
  title,
  description,
  imageUrl,
  price
) => {
  return {
    type: CREATE_PRODUCT, payload: {
      title, description, imageUrl, price
    }
  }
}