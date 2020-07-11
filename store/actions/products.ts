import { api } from '../../config/http';
import { RootState } from './../configureStore';
import {
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
		const { token, userId } = getState().auth;
		const newProduct = {
			price,
			title,
			imageUrl,
			description,
			ownerId: userId,
		};
		const resData = await api.post('products.json', newProduct, {
			auth: token,
		});

		dispatch({
			type: CREATE_PRODUCT,
			payload: {
				...newProduct,
				ownerId: userId as string,
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
	return async (dispatch, getState) => {
		const { userId } = getState().auth;
		const resData = await api.get('products.json');
		const loadedProducts = Object.keys(resData).map(
			(productKey: string) => {
				const product = resData[productKey];
				return {
					id: productKey,
					ownerId: product.ownerId,
					title: product.title,
					imageUrl: product.imageUrl,
					description: product.description,
					price: +product.price,
				};
			}
		);

		dispatch({
			type: HYDRATE_PRODUCTS,
			payload: {
				products: loadedProducts,
				currentUserId: userId as string,
			},
		});
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
		const { token, userId } = getState().auth;
		await api.patch(
			`products/${id}.json`,
			{
				ownerId: userId,
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
				ownerId: userId as string,
			},
		});
	};
};

type IDeleteProduct = (
	productId: string
) => ThunkAction<Promise<void>, RootState, {}, DeleteProduct>;

export const deleteProduct: IDeleteProduct = (productId) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		await api.delete(`products/${productId}.json`, { auth: token });
		dispatch({ type: DELETE_PRODUCT, payload: productId });
	};
};
