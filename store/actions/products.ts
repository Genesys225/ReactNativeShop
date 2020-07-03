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

type ICreateProduct = (
  title: string,
  description: string,
  imageUrl: string,
  price: number
) => (dispatch: (arg0: CreateProduct) => void) => void;

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
    console.log(resData);

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

type IHydrateProduct = () => (
  dispatch: (arg0: HydrateProducts) => void
) => void;

export const hydrateProducts: IHydrateProduct = () => {
  return async (dispatch) => {
    const response = await fetch(
      'https://rn-academind-training.firebaseio.com/products.json'
    );
    const resData = await response.json();
    console.log(resData);

    dispatch({ type: HYDRATE_PRODUCTS, payload: resData });
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
