import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform, View, SafeAreaView } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import ProductsOverview from '../components/screens/shop/ProductsOverview';
import ProductDetails from '../components/screens/shop/ProductDetails';
import Colors from '../config/colors';
import Cart from '../components/screens/shop/Cart';
import Orders from '../components/screens/shop/Orders';
import UserProducts from '../components/screens/user/UserProducts';
import EditProduct from '../components/screens/user/EditProduct';
import Auth from '../components/screens/auth/Auth';
import StartUp from '../components/screens/StartUp';
import BeButton from '../components/common/BeButton';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/auth';

const defaultNavigationOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
	},
	headerTitleStyle: {
		fontFamily: 'open-sans-bold',
	},
	headerBackTitleStyle: {
		fontFamily: 'open-sans',
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const ProductNavigator = createStackNavigator(
	{
		ProductsOverview: ProductsOverview as any,
		ProductDetails: ProductDetails,
		Cart: Cart,
	},
	{
		navigationOptions: {
			drawerIcon: (drawerConfig: any) => (
				<Ionicons
					name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
					size={23}
					color={drawerConfig.tintColor}
				/>
			),
		},
		defaultNavigationOptions,
	}
);

const OrdersNavigator = createStackNavigator(
	{
		Orders: Orders,
	},
	{
		navigationOptions: {
			drawerIcon: (drawerConfig: any) => (
				<Ionicons
					name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
					size={23}
					color={drawerConfig.tintColor}
				/>
			),
		},
		defaultNavigationOptions,
	}
);

const UserNavigator = createStackNavigator(
	{
		UserProducts: UserProducts,
		EditProduct: EditProduct,
	},
	{
		navigationOptions: {
			drawerIcon: (drawerConfig: any) => (
				<Ionicons
					name={
						Platform.OS === 'android' ? 'md-create' : 'ios-create'
					}
					size={23}
					color={drawerConfig.tintColor}
				/>
			),
		},
		defaultNavigationOptions,
	}
);

const ShopNavigator = createDrawerNavigator(
	{
		Products: ProductNavigator,
		Orders: OrdersNavigator,
		User: UserNavigator,
	},
	{
		contentOptions: {
			activeTintColor: Colors.primary,
		},
		contentComponent: (props) => {
			const dispatch = useDispatch();

			return (
				<View style={{ flex: 1, paddingTop: 20 }}>
					<SafeAreaView>
						<DrawerItems {...props} />
						<BeButton
							title="Logout"
							onPress={() => {
								dispatch(logout());
							}}
							style={{ width: 'auto' }}
						/>
					</SafeAreaView>
				</View>
			);
		},
	}
);

const AuthNavigator = createStackNavigator(
	{
		Auth: Auth,
	},
	{
		defaultNavigationOptions,
	}
);

const MainNavigator = createSwitchNavigator({
	StartUp: StartUp,
	Auth: AuthNavigator,
	Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
