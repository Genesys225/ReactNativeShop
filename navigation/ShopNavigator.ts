import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native'

import ProductsOverview from '../components/screens/shop/ProductsOverview';
import ProductDetails from '../components/screens/shop/ProductDetails';
import Colors from '../config/colors';
import { createAppContainer } from 'react-navigation';
import Cart from '../components/screens/shop/Cart';

const ProductNavigation = createStackNavigator({
    ProductsOverview: ProductsOverview,
    ProductDetails: ProductDetails,
    Cart: Cart
  }, {
    defaultNavigationOptions: {
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
});

export default createAppContainer(ProductNavigation);
