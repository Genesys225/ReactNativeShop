import { RootState } from './../store/configureStore';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const HYDRATE_PRODUCTS = 'HYDRATE_PRODUCTS';

export interface DeleteProduct {
  type: 'DELETE_PRODUCT';
  payload: string;
}
export interface CreateProduct {
  type: 'CREATE_PRODUCT';
  payload: Omit<Product, 'ownerId'>;
}
export interface HydrateProducts {
  type: 'HYDRATE_PRODUCTS';
  payload: Product[]
}
export interface UpdateProduct {
  type: 'UPDATE_PRODUCT';
  payload: Omit<Product, 'price' | 'ownerId'>;
}

export type ProductActionTypes =
  | DeleteProduct
  | CreateProduct
  | UpdateProduct
  | HydrateProducts;

export default class Product {
  public id: string;
  public ownerId: string;
  public title: string;
  public imageUrl: string;
  public description: string;
  public price: number;

  constructor(
    id: string,
    ownerId: string,
    title: string,
    imageUrl: string,
    description: string,
    price: number
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
}
