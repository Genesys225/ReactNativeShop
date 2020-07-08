import React, { useEffect } from 'react';
import {
	StyleSheet,
	FlatList,
	Platform,
	ActivityIndicator,
} from 'react-native';
import { RootState } from '../../../store/configureStore';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import BeHeaderBtn from '../../common/BeHeaderBtn';
import OrderItem from '../../../models/orderTypes';
import { hydrateOrders } from '../../../store/actions/orders';
import { useThunk } from '../../hooks/useThunk';
import OrderItemCom from '../../shop/OrderItem';

const Orders = (props: any) => {
	const [orders, isLoading, fetchOrders] = useThunk({
		reduxSelector: (state: RootState) => state.orders.orders,
		action: hydrateOrders,
	});

	useEffect(() => {
		const willFocus = props.navigation.addListener(
			'willFocus',
			fetchOrders
		);
		return () => {
			willFocus.remove();
		};
	}, [fetchOrders]);

	if (isLoading) {
		return <ActivityIndicator />;
	}

	return (
		<FlatList
			data={orders as OrderItem[]}
			renderItem={(itemData) => <OrderItemCom {...itemData.item} />}
		/>
	);
};

Orders.navigationOptions = (navData: any) => {
	return {
		headerTitle: 'Your Orders',
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={BeHeaderBtn}>
				<Item
					title="Menu"
					iconName={
						Platform.OS === 'android' ? 'md-menu' : 'ios-menu'
					}
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		),
	};
};

export default Orders;

const styles = StyleSheet.create({});
