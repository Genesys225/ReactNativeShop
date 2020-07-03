import React, { useState, useCallback, useEffect, useReducer } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BeInput from '../../common/BeInput';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import BeHeaderBtn from '../../common/BeHeaderBtn';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/configureStore';
import { updateProduct, createProduct } from '../../../store/actions/products';
import {
	NavigationStackProp,
	NavigationStackOptions,
} from 'react-navigation-stack';
interface FormState {
	inputValues: {
		[name: string]: string;
	};
	inputValidities: {
		[name: string]: boolean;
	};
	formIsValid: boolean;
}

interface EditProductProps {
	navigation: NavigationStackProp;
	navigationOptions: NavigationStackOptions;
}

type FormActions = {
	type: 'UPDATE_INPUT';
	payload: {
		text: string;
		name: string;
		isValid: boolean;
	};
};

const formIsValid = (state: FormState) =>
	Object.values(state.inputValidities).indexOf(false) === -1;

const formReducer = (state: FormState, action: FormActions): FormState => {
	switch (action.type) {
		case 'UPDATE_INPUT':
			const updatedState: FormState = { ...state };
			const name = action.payload.name;
			updatedState.inputValues[name] = action.payload.text;
			updatedState.inputValidities[name] = action.payload.isValid;
			updatedState.formIsValid = formIsValid(state);
			return updatedState;

		default:
			return state;
	}
};

const EditProduct = (props: EditProductProps) => {
	const productId = props.navigation.getParam('productId');
	const editedProduct = useSelector((state: RootState) =>
		state.products.userProducts.find((product) => product.id === productId)
	);
	const [formState, dispatcher] = useReducer(formReducer, {
		inputValues: {
			title: editedProduct !== undefined ? editedProduct.title : '',
			imageUrl: editedProduct !== undefined ? editedProduct.imageUrl : '',
			description:
				editedProduct !== undefined ? editedProduct.description : '',
			price: '',
		},
		inputValidities: {
			title: !!editedProduct,
			imageUrl: !!editedProduct,
			description: !!editedProduct,
			price: !!editedProduct,
		},
		formIsValid: !!editedProduct,
	});
	const dispatch = useDispatch();
	const { title, imageUrl, description, price } = formState.inputValues;
	const { formIsValid } = formState;
	const submitHandler = useCallback(() => {
		if (formIsValid) {
			if (editedProduct) {
				dispatch(
					updateProduct(productId, title, imageUrl, description)
				);
			} else {
				dispatch(
					createProduct(
						title,
						description,
						imageUrl,
						parseFloat(price)
					)
				);
			}
			props.navigation.goBack();
		}
	}, [dispatch, title, imageUrl, description, price, formIsValid]);

	useEffect(() => {
		props.navigation.setParams({ submit: submitHandler });
	}, [submitHandler]);

	const inputChangeHandler = useCallback(
		(name: string, text: string, isValid: boolean) => {
			dispatcher({
				type: 'UPDATE_INPUT',
				payload: { text, name, isValid },
			});
		},
		[dispatcher]
	);

	const {
		title: titleValid,
		imageUrl: imageUrlValid,
		description: descriptionValid,
		price: priceValid,
	} = formState.inputValidities;

	return (
		<KeyboardAvoidingView
			style={styles.kbAvoid}
			behavior="height"
			keyboardVerticalOffset={100}
		>
			<ScrollView>
				<View style={styles.form}>
					<BeInput
						label="Title"
						initialValue={title}
						name="title"
						required
						onInput={inputChangeHandler}
						autoCapitalize="sentences"
						autoCorrect
						autoFocus={!!editedProduct}
						returnKeyType="next"
						initialValidity={titleValid}
						errorText="Title is Invalid"
					/>
					<BeInput
						label="Image URL"
						name="imageUrl"
						initialValue={imageUrl}
						onInput={inputChangeHandler}
						returnKeyType="next"
						required
						initialValidity={imageUrlValid}
						errorText="Image Url is Invalid"
					/>
					{!editedProduct && (
						<BeInput
							label="Price"
							name="price"
							required
							initialValue={price}
							onInput={inputChangeHandler}
							keyboardType="decimal-pad"
							returnKeyType="next"
							initialValidity={priceValid}
							errorText="The price entered is Invalid"
						/>
					)}
					<BeInput
						label="Description"
						name="description"
						initialValue={description}
						onInput={inputChangeHandler}
						returnKeyType="done"
						initialValidity={descriptionValid}
						errorText="The descriptionValid entered is Invalid"
						required
						multiline
						numberOfLines={3}
					/>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

interface NavData {
	navigation: NavigationStackProp;
}

EditProduct.navigationOptions = (navData: NavData) => {
	const submitCb = navData.navigation.getParam('submit');
	return {
		headerTitle: navData.navigation.getParam('productId')
			? 'Edit Product'
			: 'Add Product',
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={BeHeaderBtn}>
				<Item
					title="Save"
					iconName={
						Platform.OS === 'android'
							? 'md-checkmark'
							: 'ios-checkmark'
					}
					onPress={() => {
						submitCb();
					}}
				/>
			</HeaderButtons>
		),
	};
};

export default EditProduct;

const styles = StyleSheet.create({
	form: {
		margin: 20,
	},
	kbAvoid: {
		flex: 1,
	},
});
