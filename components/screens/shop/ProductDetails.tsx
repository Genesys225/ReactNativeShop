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
import { ScrollView } from 'react-native-gesture-handler';
import BeImg from '../../common/BeImg';
import BeButton from '../../common/BeButton';
import BeText from '../../common/BeText';
import Colors from '../../../config/colors';
import H1 from '../../common/H1';

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
    <ScrollView>
      <BeImg 
        style={styles.image} 
        source={{ uri: selectedProduct?.imageUrl }} 
      />
      <BeButton
        color={Colors.primary} 
        style={styles.addBtn} 
        title="Add To Cart" 
        onPress={() => { }}
      />
      <H1 style={styles.price}>
        ${selectedProduct?.price.toFixed(2)}
      </H1>
      <BeText style={styles.description}>
        {selectedProduct?.description}
      </BeText>
    </ScrollView>
  );
}

ProductDetails.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  };
}

export default ProductDetails;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  addBtn: {
    marginVertical: 10,
    alignItems: 'center',
    width: 'auto'
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  }
});
