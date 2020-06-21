import React from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { useSelector } from 'react-redux';
import { IProducts } from '../../../store/reducers/products';
import Product from '../../../models/product';
import { NavigationStackProp } from 'react-navigation-stack';
import TNavScreenComp from '../../types/TNavScreenComp';

interface ProductDetailsProps {
  navigation: NavigationStackProp<{ 
    productId: string,
    productTitle: string 
  }>
};

interface IState {
  products: IProducts
};

const ProductDetails: TNavScreenComp = (props: ProductDetailsProps) => {
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector(
    (state: IState) => state.products.availableProducts.find(
      (prod: Product) => prod.id === productId
    )
  );
  return (
    <View>
      <Text>{selectedProduct?.title}</Text>
    </View>
  );
}

ProductDetails.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  };
}

export default ProductDetails;

const styles = StyleSheet.create({
  
});
