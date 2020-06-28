import React from 'react'
import { StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import Product from '../../../models/product';
import { NavigationStackProp } from 'react-navigation-stack';
import TNavScreenComp from '../../types/TNavScreenComp';
import { ScrollView } from 'react-native-gesture-handler';
import BeImg from '../../common/BeImg';
import BeButton from '../../common/BeButton';
import BeText from '../../common/BeText';
import Colors from '../../../config/colors';
import H1 from '../../common/H1';
import { addToCart } from '../../../store/actions/cart';
import { RootState } from '../../../store/configureStore';

interface ProductDetailsProps {
  navigation: NavigationStackProp<{
    productId: string,
    productTitle: string
  }>
};

const ProductDetails: TNavScreenComp = (props: ProductDetailsProps) => {
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector(
    (state: RootState) => state.products.availableProducts.find(
      (prod: Product) => prod.id === productId
    )
  );
  const dispatch = useDispatch()
  
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
        onPress={() => dispatch(addToCart(selectedProduct as Product))}
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
