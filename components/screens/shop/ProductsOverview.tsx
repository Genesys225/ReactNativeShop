import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	FlatList,
	ListRenderItem,
	View,
	Platform,
	ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Product from '../../../models/product';
import ProductItem, { ProductItemProps } from '../../shop/ProductItem';
import { NavigationStackProp } from 'react-navigation-stack';
import { addToCart } from '../../../store/actions/cart';
import { RootState } from '../../../store/configureStore';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import BeHeaderBtn from '../../common/BeHeaderBtn';
import BeButton from '../../common/BeButton';
import Colors from '../../../config/colors';
import { hydrateProducts } from '../../../store/actions/products';
import { useThunk } from '../../hooks/useThunk';

interface ProductsOverviewProps {
	navigation: NavigationStackProp;
}

const ProductsOverview = (props: ProductsOverviewProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [products, isRefreshing, fetchProducts] = useThunk({
		reduxSelector: (state: RootState): Product[] =>
			state.products.availableProducts,
		action: hydrateProducts,
		fetchOnInit: false,
	}) as [Product[], boolean, any];
	const dispatch = useDispatch();

	useEffect(() => {
		const willFocus = props.navigation.addListener(
			'willFocus',
			fetchProducts
		);
		return () => {
			willFocus.remove();
		};
	}, [fetchProducts]);

	useEffect(() => {
		setIsLoading(true);
		fetchProducts().then(() => setIsLoading(false));
	}, [fetchProducts]);

	const renderItem: ListRenderItem<Product> = (itemData) => {
		const onSelect = () => {
			props.navigation.navigate('ProductDetails', {
				productId: itemData.item.id,
				productTitle: itemData.item.title,
			});
		};
		const productItemProps: ProductItemProps = {
			...itemData.item,
			onSelect,
		};
		return (
			<View style={styles.itemContainer}>
				<ProductItem {...productItemProps}>
					<BeButton
						title="View Details"
						style={{ width: 'auto' }}
						color={Colors.primary}
						onPress={onSelect.bind(renderItem)}
					/>
					<BeButton
						title="To Cart"
						color={Colors.accent}
						onPress={() => {
							dispatch(addToCart(itemData.item));
						}}
					/>
				</ProductItem>
			</View>
		);
	};

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	return (
		<FlatList
			onRefresh={fetchProducts}
			refreshing={isRefreshing}
			data={products}
			renderItem={renderItem}
		/>
	);
};

ProductsOverview.navigationOptions = (navData: any) => ({
	headerTitle: 'All Products',
	headerRight: () => (
		<HeaderButtons HeaderButtonComponent={BeHeaderBtn}>
			<Item
				title="Cart"
				iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
				onPress={() => {
					navData.navigation.navigate('Cart');
				}}
			/>
		</HeaderButtons>
	),
	headerLeft: () => (
		<HeaderButtons HeaderButtonComponent={BeHeaderBtn}>
			<Item
				title="Menu"
				iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
				onPress={() => {
					navData.navigation.toggleDrawer();
				}}
			/>
		</HeaderButtons>
	),
});

export default ProductsOverview;

const styles = StyleSheet.create({
	itemContainer: {
		flex: 1,
	},
	centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
