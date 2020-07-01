import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons'
import ProductsOverview from '../components/screens/shop/ProductsOverview';
import ProductDetails from '../components/screens/shop/ProductDetails';
import Colors from '../config/colors';
import Cart from '../components/screens/shop/Cart';
import Orders from '../components/screens/shop/Orders';
import UserProducts from '../components/screens/user/UserProducts';
import EditProduct from '../components/screens/user/EditProduct';

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' 
      ? Colors.primary
      : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' 
    ? 'white'
    : Colors.primary,
}

const ProductNavigator = createStackNavigator({
  ProductsOverview: ProductsOverview,
  ProductDetails: ProductDetails,
  Cart: Cart,
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons 
        name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        size={23}
        color={drawerConfig.tintColor}
      />
    )
  },
  defaultNavigationOptions
});
    
const OrdersNavigator = createStackNavigator({
  Orders: Orders
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons 
        name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
        size={23}
        color={drawerConfig.tintColor}
      />
    )
  },
  defaultNavigationOptions
})

const UserNavigator = createStackNavigator({
  UserProducts: UserProducts,
  EditProduct: EditProduct
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons 
        name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
        size={23}
        color={drawerConfig.tintColor}
      />
    )
  },
  defaultNavigationOptions
})

const ShopNavigator = createDrawerNavigator({
    Products: ProductNavigator,
    Orders: OrdersNavigator,
    User: UserNavigator
  }, {
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
)



export default createAppContainer(ShopNavigator);