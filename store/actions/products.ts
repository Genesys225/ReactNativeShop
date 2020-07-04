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
  return async (dispatch) => {
    const response = await fetch(
      'https://rn-academind-training.firebaseio.com/products.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price,
          title,
          imageUrl,
          description,
        }),
      }
    );
    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      payload: {
        title,
        description,
        imageUrl,
        price,
        id: resData.name,
      },
    });
  };
};

type IHydrateProduct = () => ThunkAction<Promise<void>, RootState, {}, HydrateProducts>

export const hydrateProducts: IHydrateProduct = () => {
  return async dispatch => {
    const response = await fetch(
      'https://rn-academind-training.firebaseio.com/products.json'
    );
    const resData = await response.json() as Product[];
    const loadedProducts = [];
    for (const productKey in resData) {
      const product = resData[productKey]
      loadedProducts.push({
        id: productKey,
        ownerId: 'u1',
        title: product.title,
        imageUrl: product.imageUrl,
        description: product.description,
        price: +product.price
      })
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
) => (dispatch: (arg0: UpdateProduct) => void) => void;

export const updateProduct: IUpdateProduct = (
  id,
  title,
  imageUrl,
  description
) => {
  return (dispatch: Function) => {
    fetch('https://rn-academind-training.firebaseio.com/products.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        title,
        imageUrl,
        description,
      }),
    });
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

export const deleteProduct = (productId: string): DeleteProduct => {
  return { type: DELETE_PRODUCT, payload: productId };
};
