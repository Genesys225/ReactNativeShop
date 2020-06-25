import React from 'react';
import { StyleSheet, FlatList, ListRenderItem, View, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Product from '../../../models/product';
import ProductItem, { ProductItemProps } from '../../shop/ProductItem';
import { NavigationStackProp } from 'react-navigation-stack';
import TNavScreenComp from '../../types/TNavScreenComp';
import { addToCart } from '../../../store/actions/cart';
import { RootState } from '../../../store/configureStore';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import BeHeaderBtn from '../../common/BeHeaderBtn';


interface ProductsOverviewProps  {
  navigation: NavigationStackProp
}

const ProductsOverview: TNavScreenComp = (props: ProductsOverviewProps) => {
  const products = useSelector(
    (state: RootState): Product[] => state.products.availableProducts
  )
  const dispatch = useDispatch()

  const renderItem: ListRenderItem<Product> = (itemData) => {
    const productItemProps: ProductItemProps = { 
      ...itemData.item,
      onViewDetails() {
        props.navigation.navigate(
          'ProductDetails', 
          {
            productId: itemData.item.id,
            productTitle: itemData.item.title
          });
      },
      onViewCart() {
        dispatch(addToCart(itemData.item))
      }
    }
    return (
      <View style={styles.itemContainer}>
        <ProductItem {...productItemProps} />
      </View>
    )
  }

  return (
    <FlatList 
      data={products} 
      renderItem={renderItem}
    />
  )
}

ProductsOverview.navigationOptions = {
  headerTitle: 'All Products',
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={BeHeaderBtn}>
      <Item 
        title='Cart' 
        iconName={ Platform.OS === 'android' ? 'md-cart' : 'ios-cart' } 
        onPress={()=>{}}
      />
    </HeaderButtons>
  )
}

export default ProductsOverview

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1
  }
})
