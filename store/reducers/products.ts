import {
	DELETE_PRODUCT,
	UPDATE_PRODUCT,
	CREATE_PRODUCT,
	ProductActionTypes,
	HYDRATE_PRODUCTS,
} from './../../models/product';
import Product from '../../models/product';

export interface ProductState {
	availableProducts: Product[];
	userProducts: Product[];
}

const initialState: ProductState = {
	availableProducts: [],
	userProducts: [],
};

export const productsReducer = (
	state = initialState,
	action: ProductActionTypes
): ProductState => {
	switch (action.type) {
		case CREATE_PRODUCT:
			const {
				title,
				description,
				imageUrl,
				price,
				id,
				ownerId,
			} = action.payload;
			const newProduct = new Product(
				id,
				ownerId,
				title,
				imageUrl,
				description,
				price
			);
			return {
				availableProducts: [...state.availableProducts, newProduct],
				userProducts: [...state.userProducts, newProduct],
			};
		case HYDRATE_PRODUCTS:
			const newState = {
				availableProducts: action.payload.products,
				userProducts: action.payload.products.filter(
					(product) =>
						product.ownerId === action.payload.currentUserId
				),
			};
			return newState;
		case UPDATE_PRODUCT:
			const productId = action.payload.id;
			const productIndex = state.userProducts.findIndex(
				(product) => product.id === productId
			);
			const updateProduct = new Product(
				productId,
				state.userProducts[productIndex].ownerId,
				action.payload.title,
				action.payload.imageUrl,
				action.payload.description,
				state.userProducts[productIndex].price
			);
			const updatedUserProducts = [...state.userProducts];
			updatedUserProducts[productIndex] = updateProduct;
			const availableProductIndex = state.availableProducts.findIndex(
				(product) => product.id === productId
			);
			const updatedAvailableProducts = [...state.availableProducts];
			updatedAvailableProducts[availableProductIndex] = updateProduct;
			return {
				availableProducts: updatedAvailableProducts,
				userProducts: updatedUserProducts,
			};
		case DELETE_PRODUCT:
			return {
				userProducts: state.userProducts.filter(
					(product) => product.id !== action.payload
				),
				availableProducts: state.availableProducts.filter(
					(product) => product.id !== action.payload
				),
			};

		default:
			return state;
	}
};
