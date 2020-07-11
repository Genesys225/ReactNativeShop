import { api } from '../../config/http';
import { RootState } from './../configureStore';
import Product, {
  CreateProduct,
  HydrateProducts,
  UpdateProduct,
  DeleteProduct,
  CREATE_PRODUCT,
  HYDRATE_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from './../../models/product';
import { ThunkAction } from 'redux-thunk';

type ICreateProduct = (
  title: string,
  description: string,
  imageUrl: string,
  price: number
) => ThunkAction<Promise<void>, RootState, {}, CreateProduct>;

export const createProduct: ICreateProduct = (
  title,
  description,
  imageUrl,
  price
) => {
  return async (dispatch, getState) => {
    const newProduct = {
      price,
      title,
      imageUrl,
      description,
    }
    const token = getState().auth.token
    const response = await api.post(
      'products.json',
      newProduct,
      { auth: token }
    );
    const resData = await response.json();
    dispatch({
      type: CREATE_PRODUCT,
      payload: {
        ...newProduct,
        id: resData.name,
      },
    });
  };
};

type IHydrateProduct = () => ThunkAction<
  Promise<void>,
  RootState,
  {},
  HydrateProducts
>;

export const hydrateProducts: IHydrateProduct = () => {
  return async (dispatch) => {
    const resData = await api.get('products.json') as Product[];
    const loadedProducts = [];
    for (const productKey in resData) {
      const product = resData[productKey];
      loadedProducts.push({
        id: productKey,
        ownerId: product.ownerId,
        title: product.title,
        imageUrl: product.imageUrl,
        description: product.description,
        price: +product.price,
      });
    }

    dispatch({ type: HYDRATE_PRODUCTS, payload: loadedProducts });
    return;
  };
};

type IUpdateProduct = (
  id: string,
  title: string,
  imageUrl: string,
  description: string
) => ThunkAction<Promise<void>, RootState, {}, UpdateProduct>;

export const updateProduct: IUpdateProduct = (
  id,
  title,
  imageUrl,
  description
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    await api.patch(
      `products/${id}.json`,
      {
        ownerId: 'u1',
        title,
        imageUrl,
        description,
      },
      { auth: token }
    );
    dispatch({
      type: UPDATE_PRODUCT,
      payload: {
        id,
        title,
        imageUrl,
        description,
      },
    });
  };
};

type IDeleteProduct = (
  productId: string
) => ThunkAction<Promise<void>, RootState, {}, DeleteProduct>;

export const deleteProduct: IDeleteProduct = productId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    await api.delete(
      `products/${productId}.json`,
      { auth: token }
    );
    dispatch({ type: DELETE_PRODUCT, payload: productId })
  };
};
